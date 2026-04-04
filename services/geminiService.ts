import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: (process.env.API_KEY || process.env.GEMINI_API_KEY) as string });

export interface ParsedTransaction {
  type: "sale" | "udhaar" | "payment";
  amount: number;
  customerName?: string;
  description?: string;
}

const SYSTEM_PROMPT = `
You are an AI-powered accountant, or "Munim," for a small local shop in India (Kirana store).
Your job is to parse natural language messages from shopkeepers about their daily transactions.
Transactions can be of three types:
1. "sale": A direct cash sale.
2. "udhaar": Credit given to a customer.
3. "payment": A customer paying back their credit.

Extract the following fields:
- type: "sale", "udhaar", or "payment"
- amount: The numeric value of the transaction.
- customerName: The name of the customer (required for "udhaar" and "payment").
- description: Any additional details (e.g., "sold 2kg sugar").

Respond ONLY with a JSON object.
`;

export async function parseWhatsAppMessage(message: string): Promise<ParsedTransaction | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING, enum: ["sale", "udhaar", "payment"] },
            amount: { type: Type.NUMBER },
            customerName: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["type", "amount"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as ParsedTransaction;
  } catch (error) {
    console.error("Error parsing WhatsApp message:", error);
    return null;
  }
}

// Keep existing functionality if needed, but the user wants a Munim AI
export async function generateAssistantResponse(query: string, role: string, history: any[]) {
  // This is for the chatbot
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: query,
    config: {
      systemInstruction: `You are Munim AI, a helpful assistant for DukaanMitra. Role: ${role}.`
    }
  });
  return response.text;
}
