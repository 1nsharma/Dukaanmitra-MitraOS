import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Check, Clock, AlertCircle, Sparkles } from 'lucide-react';
import { generateV2Response, routeMessage } from '../services/geminiService';
import { ParsedTransaction, AgentRoutingResponse } from '../types';
import { logTransaction } from '../services/storeService';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  parsed?: ParsedTransaction;
  triage?: AgentRoutingResponse;
}

export const WhatsAppSimulation: React.FC<{ storeId: string }> = ({ storeId }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Namaste! I'm your DukaanMitra v2.0 AI. Send me your transactions or ask about customer preferences. I remember everything!",
      sender: 'bot',
      timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      status: 'read'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // 1. Triage the message (Agent Swarm routing)
      const triage = await routeMessage(input, storeId);
      
      // 2. Generate response with Memory context
      const botResponse = await generateV2Response(input, storeId, undefined, messages.map(m => ({ 
        sender: m.sender, 
        text: m.text, 
        timestamp: m.timestamp.toISOString(),
        role: m.sender === 'bot' ? 'model' : 'user'
      })));

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        status: 'read',
        triage
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("AI processing error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Munim is thinking too hard... Please try again in a bit.",
        sender: 'bot',
        timestamp: new Date(),
        status: 'read'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };



  return (
    <div className="flex flex-col h-full w-full bg-[#e5ddd5] overflow-hidden">
      {/* Header */}
      <div className="bg-[#075e54] p-4 flex items-center gap-3 text-white">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-[#075e54]">
          <Bot size={24} />
        </div>
        <div>
          <h3 className="font-bold">Munim AI (DukaanMitra)</h3>
          <p className="text-xs opacity-80">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={cn(
              "max-w-[80%] p-3 rounded-lg shadow-sm relative",
              msg.sender === 'user' 
                ? "bg-[#dcf8c6] ml-auto rounded-tr-none" 
                : "bg-white mr-auto rounded-tl-none"
            )}
          >
            <p className="text-sm text-gray-800">{msg.text}</p>
            {msg.triage && (
              <div className="mt-2 pt-2 border-t border-black/5 flex items-center gap-1.5">
                <Sparkles size={10} className="text-indigo-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-tighter text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                  {msg.triage.intent} Agent
                </span>
                <span className="text-[8px] text-gray-400 italic truncate max-w-[120px]">
                  {msg.triage.reasoning}
                </span>
              </div>
            )}
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-[10px] text-gray-500">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              {msg.sender === 'user' && (
                <Check size={12} className={cn(msg.status === 'read' ? "text-blue-500" : "text-gray-400")} />
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="bg-white p-3 rounded-lg shadow-sm w-16 flex justify-center gap-1">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-[#f0f0f0] p-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-white p-2 px-4 rounded-full border-none focus:ring-2 focus:ring-[#075e54] text-sm"
        />
        <button 
          onClick={handleSend}
          className="w-10 h-10 bg-[#075e54] text-white rounded-full flex items-center justify-center hover:bg-[#054d44] transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};
