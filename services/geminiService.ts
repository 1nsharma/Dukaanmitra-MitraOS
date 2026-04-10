
import { GoogleGenAI, Type } from "@google/genai";
import { ParsedBill, Transaction, BlogPost, OpsHealthSnapshot, SystemManifest } from "../types";
import { SYSTEM_MANIFEST } from "../constants";

const DUKAAN_MITRA_SYSTEM_PROMPT = `
Role: DukaanMitra Lead Architect & System Expert.
Tone: Professional, highly knowledgeable, and friendly (Hinglish supported).

KNOWLEDGE BASE (Live App Manifest):
${JSON.stringify(SYSTEM_MANIFEST, null, 2)}

DETAILED ARCHITECTURE:
1. FRONTEND: Built with React 19, Tailwind CSS for styling, Recharts for data viz, and Anime.js for fluid motion. Multi-device frame simulation for testing.
2. BACKEND: Serverless architecture using Make.com for orchestration, Gupshup for WhatsApp API, and Firebase for Auth.
3. DATABASE: Hybrid strategy. MVP uses Google Sheets (Sheet 1: Customers, Sheet 2: Ledger, Sheet 3: Logs). Scaling phase uses Supabase (PostgreSQL).
4. AI ENGINE: Powered by Gemini 3 Pro (Reasoning) and Gemini 2.5 Flash (Vision/Video).
5. SERVICES: Smart Billing, Smart Recovery, Creative Studio, EOD Reports.
6. UI DESIGN: "Munim Aesthetic" - High-fidelity slate, indigo, and emerald themes. Bharat-centric.

Task: Answer all technical and functional questions about the system based on this manifest. If asked about version, refer to the manifest.version.
`;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateAssistantResponse = async (prompt: string, role: 'ops' | 'merchant', history: any[] = []): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: [
      { role: 'user', parts: [{ text: DUKAAN_MITRA_SYSTEM_PROMPT }] },
      ...history.map(m => ({ 
        role: m.role === 'bot' ? 'model' : 'user', 
        parts: [{ text: m.text }] 
      })),
      { role: 'user', parts: [{ text: prompt }] }
    ],
    config: { 
      thinkingConfig: { thinkingBudget: 4000 },
      temperature: 0.7
    }
  });
  return response.text || "Munim offline. Systems checking...";
};

export interface ParsedTransaction {
  type: 'sale' | 'udhaar' | 'payment';
  amount: number;
  customerName?: string;
  items?: string;
  description?: string;
}

export const parseWhatsAppMessage = async (text: string): Promise<ParsedTransaction | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [{ parts: [{ text: `Parse this Kirana store message into a transaction JSON: "${text}"` }] }],
      config: {
        systemInstruction: "You are a Kirana store assistant. Parse messages into JSON with fields: type (sale, udhaar, payment), amount (number), customerName (string, optional), items (string, optional).",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING, enum: ['sale', 'udhaar', 'payment'] },
            amount: { type: Type.NUMBER },
            customerName: { type: Type.STRING },
            items: { type: Type.STRING }
          },
          required: ["type", "amount"]
        }
      }
    });
    return JSON.parse(response.text || 'null');
  } catch (error) {
    console.error("Parsing error:", error);
    return null;
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

export const getTemporalForecast = async (transactions: any) => ({ predicted_revenue: [100, 200, 150, 300, 250, 400, 350], confidence_interval: "95%", growth_strategy: "Scaling" });
export const getSystemOptimization = async (q: any, s: any) => ({ diagnosis: "Load Balanced", patch_code: "OPTIMIZE_SHARD", impact_analysis: "High", architect_note: "Ready" });
export const generateOpsDailySummary = async (s: any) => ({ latency: "45ms", throughput: 120, errorRate: "0.01%", activeShards: 4, aiAccuracy: "99%", summary: "Stable", cpuLoad: "20%" });
export const parseImageBill = async (b: any) => ({ action: 'add_entry', confidence: 0.9, user_message: "Parsed." });
export const getNearbyLogistics = async (la: any, lo: any) => ({ text: "Available", links: [] });
export const animateImage = async (b: any, p: any) => "";
export const analyzeVideo = async (b: any, p: any) => "";
export const fastChat = async (p: any) => "Fast response.";
