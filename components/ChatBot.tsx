
import React, { useState, useRef, useEffect } from 'react';
import { generateAssistantResponse } from '../services/geminiService';
import { SYSTEM_MANIFEST } from '../constants';
import anime from 'animejs';

interface ChatBotProps {
  role: 'ops' | 'merchant';
}

const ChatBot: React.FC<ChatBotProps> = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { 
      role: 'bot', 
      text: role === 'ops' 
        ? `Munim Architect Mode v${SYSTEM_MANIFEST.version} Engaged. I have full knowledge of our Tech Stack, Database Schema, and AI Reasoning logic. Ask me anything.` 
        : "Namaste! I'm your DukaanMitra guide. I can explain our features, app flow, or how our AI helps your business." 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const infoChips = [
    { label: "🚀 Tech Stack", query: "What is the full technology stack (frontend, backend, database) of DukaanMitra?" },
    { label: "📑 Database", query: "Explain the database strategy. How is data stored for MVP and how will it scale?" },
    { label: "🧠 Munim AI", query: "How does the Munim AI reasoning work? Explain Bayesian inference usage." },
    { label: "🎨 UI Design", query: "What are the core design principles and theme of DukaanMitra?" },
    { label: "💳 Services", query: "List and explain all key services like recovery, billing, and creative studio." }
  ];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (customQuery?: string) => {
    const userText = customQuery || input.trim();
    if (!userText || isTyping) return;
    
    if (!customQuery) setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    const response = await generateAssistantResponse(userText, role, messages);
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsTyping(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center text-3xl transition-all duration-500 z-[200] ${
          isOpen ? 'bg-rose-500 rotate-90 scale-90' : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-110'
        }`}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      <div className={`fixed bottom-28 right-8 w-[450px] max-w-[calc(100vw-40px)] h-[700px] max-h-[calc(100vh-140px)] bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] border border-slate-200 flex flex-col overflow-hidden transition-all duration-500 z-[200] transform origin-bottom-right ${
        isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10 pointer-events-none'
      }`}>
        {/* Header */}
        <div className={`p-8 text-white flex items-center justify-between relative overflow-hidden ${role === 'ops' ? 'bg-slate-900' : 'bg-indigo-600'}`}>
          <div className="flex items-center space-x-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-inner backdrop-blur-md">
              {role === 'ops' ? '🧠' : '✨'}
            </div>
            <div>
              <h3 className="font-black text-lg tracking-tight leading-none uppercase italic">System Architect</h3>
              <div className="flex items-center space-x-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Manifest v{SYSTEM_MANIFEST.version}</span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>

        {/* Chat Feed */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50 no-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] p-6 rounded-3xl shadow-sm text-sm leading-relaxed border ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none border-indigo-500 font-bold italic' 
                  : 'bg-white text-slate-800 rounded-tl-none border-slate-100 font-medium'
              }`}>
                <p className="whitespace-pre-wrap">{m.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-5 rounded-3xl flex items-center space-x-3 shadow-sm border border-slate-100">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                </div>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Parsing Manifest...</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer & Quick Actions */}
        <div className="p-6 bg-white border-t border-slate-100 space-y-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {infoChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSend(chip.query)}
                className="shrink-0 px-4 py-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all active:scale-95"
              >
                {chip.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-3 bg-slate-100 rounded-3xl p-2 px-5 group focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all border border-transparent focus-within:border-indigo-200">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Query tech, design, or brand..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm py-4 font-bold text-slate-700 placeholder:opacity-50"
            />
            <button 
              onClick={() => handleSend()}
              className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xl hover:bg-indigo-700 transition-all active:scale-90"
            >
              ➔
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
