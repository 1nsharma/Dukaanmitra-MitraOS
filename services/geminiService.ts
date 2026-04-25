
import { GoogleGenAI, Type } from "@google/genai";
import { 
  ParsedBill, 
  Transaction, 
  BlogPost, 
  OpsHealthSnapshot, 
  SystemManifest, 
  ChatMessage, 
  ParsedTransaction,
  AgentRoutingResponse
} from "../types";
import { SYSTEM_MANIFEST } from "../constants";
import { memoryService } from "./memoryService";

const DUKAAN_MITRA_v2_SYSTEM_PROMPT = `
Role: DukaanMitra v2.0 "Bharat OS" AI Orchestrator.
System: WhatsApp-Native CRM for Kirana stores.
Capabilities:
1. Mem0g: Graph-based memory for customer preferences.
2. Swarm Architecture: Specialized agents (Sales, Udhaar, Inventory).
3. Hybrid Guardrails: Deterministic pricing (strictly forbid hallucinations).

Tone: Helpful "Digital Dost" (Hinglish/English).
`;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Agent Swarm: Triage logic
export const routeMessage = async (text: string, storeId: string): Promise<AgentRoutingResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const model = ai.models.get("gemini-1.5-flash");
  
  const response = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: `Triage this user message from a shopkeeper or customer: "${text}"` }] }],
    config: {
      systemInstruction: "Classify into ORDER, CREDIT, INVENTORY, or GENERAL. Return JSON. Reasoning must be short.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          intent: { type: Type.STRING, enum: ['ORDER', 'CREDIT', 'INVENTORY', 'GENERAL', 'CLARIFICATION'] },
          confidence: { type: Type.NUMBER },
          reasoning: { type: Type.STRING },
          suggestedAgent: { type: Type.STRING }
        },
        required: ["intent", "confidence", "reasoning", "suggestedAgent"]
      }
    }
  });
  
  return JSON.parse(response.text || '{}');
};

// Main Chat with Memory Context
export const generateV2Response = async (
  prompt: string, 
  storeId: string, 
  customerName?: string, 
  history: ChatMessage[] = []
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const model = ai.models.get("gemini-1.5-flash");

  // 1. Retrieve Memory Context (Mem0g)
  let memoryContext = "";
  if (customerName) {
    const context = await memoryService.getContext(storeId, customerName);
    if (context.length > 0) {
      memoryContext = `\n[LONG_TERM_MEMORY]: ${context.join(", ")}`;
    }
  }

  // 2. Deterministic Pricing Check (Placeholder for real DB call)
  const hybridGuardrail = "\n[GUARDRAIL]: If query is about price, ONLY use prices provided in context. Never guess.";

  const response = await model.generateContent({
    contents: [
      { role: 'user', parts: [{ text: DUKAAN_MITRA_v2_SYSTEM_PROMPT + memoryContext + hybridGuardrail }] },
      ...history.map(m => ({ 
        role: m.role || (m.sender === 'bot' ? 'model' : 'user'), 
        parts: [{ text: m.text }] 
      })),
      { role: 'user', parts: [{ text: prompt }] }
    ],
    config: { temperature: 0.2 } // High deterministic focus
  });

  // 3. Post-processing: Extract new memories
  if (customerName && response.text) {
     // Trigger background memory extraction (async)
     extractMemories(storeId, customerName, prompt, response.text);
  }

  return response.text || "Munim focus kar raha hai...";
};

const extractMemories = async (storeId: string, customer: string, input: string, output: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const model = ai.models.get("gemini-1.5-flash");
  try {
    const res = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: `Extract customer preferences or debts from this chat:\nUser: ${input}\nAI: ${output}` }] }],
      config: {
        systemInstruction: "Return JSON array of {relationship: string, target: string, type: string}. Example: {relationship: 'prefers', target: 'Amul Milk', type: 'preference'}",
        responseMimeType: "application/json"
      }
    });
    const memories = JSON.parse(res.text || '[]');
    for (const m of memories) {
      await memoryService.remember(storeId, customer, m.type, m.relationship, m.target);
    }
  } catch (e) {
    console.warn("Memory extraction failed", e);
  }
};

export const parseMessage = async (text: string, context?: string, retries = 2): Promise<ParsedBill & { logic_trace: string[] }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [{ parts: [{ text: `[STATE]: ${context || 'Initial'}\n[INGRESS]: ${text}` }] }],
      config: {
        systemInstruction: "[SYSTEM_PROTOCOL: MUNIM_INTELLIGENCE_v1M] STRICT JSON OUTPUT.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            action: { type: Type.STRING },
            customer_name: { type: Type.STRING },
            amount: { type: Type.NUMBER },
            items: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            user_message: { type: Type.STRING },
            strategic_intent: { type: Type.STRING },
            logic_trace: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["action", "confidence", "user_message", "strategic_intent", "logic_trace"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error: any) {
    if (retries > 0) { await delay(1000); return parseMessage(text, context, retries - 1); }
    return { action: 'clarification_required', user_message: "Error.", confidence: 0.1, strategic_intent: "Fail.", logic_trace: ["FAIL"] };
  }
};

export const getSmartSuggestions = async (transactions: Transaction[]): Promise<string[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 3 short WhatsApp commands. Data: ${JSON.stringify(transactions.slice(-5))}`,
      config: { responseMimeType: "application/json", responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } } }
    });
    return JSON.parse(response.text || '[]');
  } catch { return ["Rahul 500", "Aman 200", "Summary"]; }
};

export const generateMarketingContent = async (type: string, details: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({ 
    model: "gemini-3-flash-preview", 
    contents: `Generate catchy message for ${type}: ${details}.`,
  });
  return response.text?.replace(/^"|"$/g, '') || "";
};

export const generateMarketingPoster = async (prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: `Indian retail poster: ${prompt}. 4K.` }] },
    config: { imageConfig: { aspectRatio: "1:1" } }
  });
  for (const part of response.candidates[0].content.parts) { if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`; }
  return "";
};

export const generateAlertAction = async (title: string, desc: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({ 
    model: "gemini-3-flash-preview", 
    contents: `WhatsApp nudge for ${title}: ${desc}.`,
  });
  return response.text?.replace(/^"|"$/g, '') || "";
};

export const generateDailyBlogs = async (): Promise<BlogPost[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({ 
      model: "gemini-3-flash-preview", 
      contents: "Generate 3 retail insight blogs for Indian kirana stores. JSON.", 
      config: { 
        responseMimeType: "application/json",
        responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, title: { type: Type.STRING }, excerpt: { type: Type.STRING }, content: { type: Type.STRING }, tag: { type: Type.STRING }, date: { type: Type.STRING } } } }
      } 
    });
    return JSON.parse(response.text || '[]');
  } catch { return []; }
};

export const generateSEOContent = async (keyword: string): Promise<{ title: string, content: string, meta: string }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Generate a high-ranking SEO blog post for the keyword: "${keyword}". Target audience: Indian kirana store owners. Include a catchy title, 800+ words of content in HTML format, and a meta description.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            meta: { type: Type.STRING }
          },
          required: ["title", "content", "meta"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("SEO generation error:", error);
    return { title: "Error", content: "Could not generate content.", meta: "" };
  }
};

export const searchGroundingQuery = async (query: string): Promise<{ text: string, links: { uri: string, title: string }[] }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({ model: "gemini-3-pro-preview", contents: query, config: { tools: [{ googleSearch: {} }] } });
  const links = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({ uri: chunk.web?.uri || "", title: chunk.web?.title || "Result" })) || [];
  return { text: response.text || "", links };
};

export const getTemporalForecast = async (transactions: Transaction[]) => ({ predicted_revenue: [100, 200, 150, 300, 250, 400, 350], confidence_interval: "95%", growth_strategy: "Scaling" });
export const getSystemOptimization = async (q: string, s: string) => ({ diagnosis: "Load Balanced", patch_code: "OPTIMIZE_SHARD", impact_analysis: "High", architect_note: "Ready" });
export const generateOpsDailySummary = async (s: OpsHealthSnapshot) => ({ latency: "45ms", throughput: 120, errorRate: "0.01%", activeShards: 4, aiAccuracy: "99%", summary: "Stable", cpuLoad: "20%" });
export const parseImageBill = async (b: string) => ({ action: 'add_entry' as const, confidence: 0.9, user_message: "Parsed." });
export const getNearbyLogistics = async (la: number, lo: number) => ({ text: "Available", links: [] });
export const animateImage = async (b: string, p: string) => "";
export const analyzeVideo = async (b: string, p: string) => "";
export const fastChat = async (p: string) => "Fast response.";
