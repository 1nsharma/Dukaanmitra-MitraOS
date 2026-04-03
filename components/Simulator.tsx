
import React, { useState, useRef, useEffect } from 'react';
import { parseMessage, parseImageBill, getSmartSuggestions } from '../services/geminiService';
import { Customer, Transaction, SystemLog, ChatMessage, DeviceType } from '../types';
import anime from 'animejs';

interface SimulatorProps {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  logs: SystemLog[];
  setLogs: React.Dispatch<React.SetStateAction<SystemLog[]>>;
  mitraChat: ChatMessage[];
  setMitraChat: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  grahakChat: ChatMessage[];
  setGrahakChat: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const Simulator: React.FC<SimulatorProps> = ({ 
  customers, setCustomers, 
  transactions, setTransactions, 
  mitraChat, setMitraChat,
  grahakChat, setGrahakChat
}) => {
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeRoute, setActiveRoute] = useState<string | null>(null);
  const [simulatedTime, setSimulatedTime] = useState(new Date());
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [deviceMode, setDeviceMode] = useState<DeviceType>('mobile');
  const [logicTrace, setLogicTrace] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  
  const mitraEndRef = useRef<HTMLDivElement>(null);
  const grahakEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setSimulatedTime(prev => new Date(prev.getTime() + 60000)), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (mitraEndRef.current) {
      mitraEndRef.current.scrollIntoView({ behavior: "smooth" });
      const lastMessage = mitraEndRef.current.previousElementSibling;
      if (lastMessage) {
        (anime as any)({
          targets: lastMessage,
          scale: [0.9, 1],
          opacity: [0, 1],
          translateY: [10, 0],
          easing: 'easeOutElastic(1, .8)',
          duration: 600
        });
      }
    }
  }, [mitraChat, isProcessing]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (transactions.length > 0) {
        const hints = await getSmartSuggestions(transactions);
        const validHints = hints.filter(h => typeof h === 'string');
        setSuggestions(validHints);
      }
    };
    fetchSuggestions();
  }, [transactions]);

  const handleSendMessage = async (customMsg?: string) => {
    const userMsg = (customMsg || message).trim();
    if (!userMsg || isProcessing) return;

    setMessage("");
    const nowStr = simulatedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMitraChat(prev => [...prev, { sender: 'user', text: userMsg, timestamp: nowStr }]);
    setIsProcessing(true);
    setActiveRoute("MUNIM_v1M_INGRESS");
    setLogicTrace(["INGRESS_RECEIVED", "TOKENIZING_PAYLOAD..."]);

    const result = await parseMessage(userMsg, `Context: Bharat Kirana Ledger State Alpha`);
    setActiveRoute("MUNIM_REASONING");
    setLogicTrace(result.logic_trace || []);
    
    await new Promise(r => setTimeout(r, 1200));

    if (result.action === 'add_entry' || result.action === 'modify_entry') {
      setActiveRoute("MUNIM_SETTLEMENT");
      setLogicTrace(prev => [...prev, "SETTLEMENT_INITIATED", "COMMITTING_TO_LEDGER"]);
      
      const newTrans: Transaction = {
        transId: `TX-${Date.now()}`,
        storeId: "DM-001",
        phone: "919000000000",
        customerName: result.customer_name || "Merchant",
        amount: result.amount || 0,
        items: result.items || "Uncategorized Item",
        date: simulatedTime.toISOString()
      };
      setTransactions(prev => [...prev, newTrans]);
      
      const intentStr = typeof result.strategic_intent === 'string' 
        ? result.strategic_intent 
        : JSON.stringify(result.strategic_intent);

      setGrahakChat(prev => [...prev, { 
        sender: 'system', 
        text: `Munim Alert: Entry Recorded for ${newTrans.customerName} - ₹${newTrans.amount}.\nIntent: ${intentStr}`,
        timestamp: nowStr 
      }]);
    }

    setMitraChat(prev => [...prev, { sender: 'bot', text: result.user_message, timestamp: nowStr }]);
    setIsProcessing(false);
    setTimeout(() => {
      setActiveRoute(null);
      setLogicTrace([]);
    }, 2000);
  };

  return (
    <div className="space-y-8 h-full max-w-full mx-auto p-2 lg:p-6 flex flex-col relative">
      {/* Logic Debug Console Overlay */}
      {isProcessing && (
        <div className="fixed bottom-32 right-12 z-[100] w-72 bg-black/90 text-emerald-400 p-6 rounded-3xl border border-emerald-500/30 font-mono text-[10px] shadow-2xl animate-in slide-in-from-right-10">
           <div className="flex justify-between items-center mb-4 border-b border-emerald-500/20 pb-2">
              <span className="font-black uppercase tracking-widest">Logic Decomposition</span>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
           </div>
           <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
              {logicTrace.map((step, i) => (
                <div key={i} className="flex gap-2">
                   <span className="opacity-40">[{i}]</span>
                   <span className="uppercase">{step}</span>
                </div>
              ))}
              <div className="animate-pulse">_</div>
           </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4 bg-slate-900 p-4 rounded-[2rem] border border-white/10 shadow-2xl z-20">
         <div className="flex items-center gap-2 border-r border-white/10 pr-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Logic Tier</span>
            <div className="flex bg-white/5 rounded-xl p-1 gap-1">
               {['mobile', 'tablet', 'desktop'].map(mode => (
                 <button key={mode} onClick={() => setDeviceMode(mode as DeviceType)} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter transition-all ${deviceMode === mode ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>{mode}</button>
               ))}
            </div>
         </div>
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Munim Link 1.0M</span>
            </div>
            <button onClick={() => setShowConsole(!showConsole)} className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${showConsole ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-500'}`}>
              Debug Console
            </button>
         </div>
      </div>

      <div className={`flex flex-col xl:flex-row gap-6 lg:gap-10 items-start justify-center transition-all duration-700 ${deviceMode === 'desktop' ? 'flex-col items-center' : ''}`}>
        <div className={`flex flex-col items-center transition-all duration-500 ${deviceMode === 'desktop' ? 'w-full' : 'flex-1 max-w-lg'}`}>
          <div className={`device-frame mode-${deviceMode} transition-all duration-700`}>
            <div className="device-content">
              <div className="bg-indigo-700 p-6 pt-12 text-white flex items-center justify-between shrink-0 shadow-xl z-10 relative">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-black text-sm shadow-xl">Ω</div>
                  <div className="space-y-0.5">
                    <p className="font-black text-sm tracking-tight leading-none italic uppercase">Digital Munim</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Reasoning Core</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] opacity-70 font-black tracking-widest">{simulatedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-indigo-500 opacity-50"></div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar bg-slate-50">
                {mitraChat.map((chat, i) => (
                  <div key={i} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-[1.6rem] text-[14px] shadow-lg relative ${
                      chat.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white rounded-tl-none border-l-[6px] border-l-indigo-600'
                    }`}>
                      {chat.isImage && <img src={chat.imageData} className="rounded-2xl mb-4 max-h-64 w-full object-cover shadow-2xl" />}
                      <p className="whitespace-pre-wrap leading-relaxed font-bold italic tracking-tight">{chat.text}</p>
                      <div className="flex items-center justify-end space-x-1.5 mt-2 opacity-60">
                        <span className="text-[10px] font-black italic">{chat.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-white p-4 px-6 rounded-[1.8rem] flex items-center space-x-3 shadow-2xl border-l-[6px] border-l-emerald-500">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={mitraEndRef} />
              </div>

              <div className="p-6 bg-white border-t border-slate-100 space-y-5 shrink-0">
                <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-1">
                  {suggestions.map((s, i) => (
                    <button key={i} onClick={() => handleSendMessage(s)} className="shrink-0 px-4 py-2 bg-slate-50 hover:bg-indigo-600 hover:text-white transition-all rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200 shadow-sm">
                      {s}
                    </button>
                  ))}
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => fileInputRef.current?.click()} className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shadow-inner">📸</button>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
                  <input value={message} onChange={e => setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Munim command..." className="flex-1 bg-slate-100 rounded-2xl px-6 py-4 text-[14px] focus:outline-none font-bold text-slate-900" />
                  <button onClick={() => handleSendMessage()} className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-2xl">➔</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trace Panel */}
        <div className="hidden lg:flex flex-col w-full xl:w-96 space-y-6">
          <div className="bg-slate-950 rounded-[3rem] p-8 flex-1 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col group">
            <div className="relative z-10 flex flex-col h-full">
              <h4 className="text-white font-black italic uppercase tracking-[0.4em] mb-8 text-[10px] flex items-center gap-4">
                <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span></span>
                REASONING PIPELINE
              </h4>
              <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar">
                {[
                  { id: 'MUNIM_v1M_INGRESS', label: 'Protocol Ingress', icon: '🌀', activeColor: 'bg-indigo-600' },
                  { id: 'MUNIM_REASONING', label: 'Inference Cycle', icon: '🧠', activeColor: 'bg-emerald-600' },
                  { id: 'VISION_ENGINE', label: 'Neural Scan', icon: '📸', activeColor: 'bg-rose-600' },
                  { id: 'MUNIM_SETTLEMENT', label: 'State Settlement', icon: '📑', activeColor: 'bg-amber-600' }
                ].map((route) => (
                  <div key={route.id} className={`p-4 rounded-2xl border transition-all duration-500 flex items-center gap-4 ${
                    activeRoute === route.id ? `${route.activeColor} border-white/30 text-white scale-105 shadow-xl` : 'bg-white/5 border-white/5 text-slate-500'
                  }`}>
                    <span className="text-xl">{route.icon}</span>
                    <p className={`text-[11px] font-black uppercase tracking-widest`}>{route.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-white/5 rounded-3xl p-6 border border-white/5">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Recursive Accuracy</p>
                <p className="text-5xl font-black text-emerald-400 tracking-tighter tabular-nums italic">99.98%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer View */}
        <div className={`flex flex-col items-center transition-all duration-500 ${deviceMode === 'desktop' ? 'w-full' : 'flex-1 max-w-lg'}`}>
          <div className={`device-frame mode-${deviceMode} border-emerald-900/20 shadow-emerald-500/10`}>
            <div className="device-content">
              <div className="bg-emerald-600 p-6 pt-12 text-white flex items-center justify-between shrink-0 shadow-xl z-10">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl shadow-2xl backdrop-blur-md">🏪</div>
                  <div className="space-y-0.5">
                    <p className="font-black text-sm tracking-tight leading-none italic uppercase">Aman General Store</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Munim Verified</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-5 no-scrollbar bg-slate-50">
                {grahakChat.map((chat, i) => (
                  <div key={i} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-[1.6rem] text-[15px] shadow-lg relative ${
                      chat.sender === 'user' ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none border-l-[6px] border-l-emerald-600'
                    }`}>
                      <p className="whitespace-pre-wrap leading-relaxed text-slate-800 font-bold italic tracking-tight">{chat.text}</p>
                      <div className="flex items-center justify-end mt-3 opacity-60"><span className="text-[10px] font-black italic">{chat.timestamp}</span></div>
                    </div>
                  </div>
                ))}
                <div ref={grahakEndRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
