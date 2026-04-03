
import React, { useRef, useEffect, useState } from 'react';
import { ChatMessage } from '../types';

interface CustomerPortalProps {
  grahakChat: ChatMessage[];
  setGrahakChat?: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const CustomerPortal: React.FC<CustomerPortalProps> = ({ grahakChat, setGrahakChat }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [grahakChat]);

  const handleAction = async (action: 'STATEMENT' | 'PAY') => {
    if (isProcessing || !setGrahakChat) return;
    setIsProcessing(true);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (action === 'STATEMENT') {
      setGrahakChat(prev => [...prev, { sender: 'user', text: "Requesting mini-statement...", timestamp: now }]);
      setTimeout(() => {
        setGrahakChat(prev => [...prev, { 
          sender: 'system', 
          text: "📄 Statement Generated: \nBalance: ₹1,250\nLast Entry: Milk (₹500)\nStatus: Overdue (15 days)", 
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }]);
        setIsProcessing(false);
      }, 1500);
    } else {
      setGrahakChat(prev => [...prev, { sender: 'user', text: "Initiating UPI Payment for ₹500...", timestamp: now }]);
      setTimeout(() => {
        setGrahakChat(prev => [...prev, { 
          sender: 'system', 
          text: "✅ Payment Received: ₹500 via UPI.\nTransaction ID: UPI-8829-DM\nYour updated balance is ₹750.", 
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }]);
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto py-8 lg:py-16 px-6 flex flex-col items-center h-full">
      <header className="mb-14 text-center lg:text-left w-full max-w-2xl animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="inline-flex items-center space-x-3 bg-emerald-50 text-emerald-700 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-100 shadow-sm">
          <span className="animate-pulse">🔔</span>
          <span>End-to-End Vasooli Simulation</span>
        </div>
        <h2 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter italic leading-none">Customer Portal</h2>
        <p className="text-lg lg:text-xl text-slate-500 font-bold mt-4 uppercase opacity-80 leading-tight">Witness the automated WhatsApp experience from your customer's perspective.</p>
      </header>

      <div className="device-frame bg-slate-950 p-2.5 lg:p-4 rounded-[4.5rem] shadow-[0_80px_160px_-30px_rgba(16,185,129,0.3)] border-[14px] border-slate-900 relative flex flex-col overflow-hidden transition-all duration-700 group hover:rotate-1 hover:scale-[1.01]">
        <div className="flex-1 bg-[#efe7de] rounded-[3.6rem] overflow-hidden flex flex-col relative border border-slate-800 shadow-inner">
          {/* WhatsApp Header */}
          <div className="bg-emerald-600 p-6 pt-16 text-white flex items-center justify-between shrink-0 shadow-2xl relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl shadow-inner backdrop-blur-xl border border-white/10">🏪</div>
              <div>
                <p className="font-black text-sm tracking-tight leading-none uppercase italic">Aman General Store</p>
                <div className="flex items-center space-x-2 mt-1">
                   <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse shadow-sm"></span>
                   <p className="text-[10px] opacity-90 font-black uppercase tracking-widest">Active Munim</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-5 opacity-90">
              <span className="text-xl">📹</span>
              <span className="text-xl">📞</span>
              <span className="text-xl">⋮</span>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-[0.04]">
            <div className="text-center py-4">
              <span className="bg-slate-900/5 text-slate-500 px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-inner border border-slate-200/50 backdrop-blur-md">Today - Business Ledger</span>
            </div>

            {grahakChat.map((chat, i) => (
              <div key={i} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                <div className={`max-w-[85%] p-5 rounded-[1.8rem] text-[16px] shadow-xl relative ${
                  chat.sender === 'user' ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none border-l-[6px] border-l-emerald-500'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed text-slate-800 font-bold italic tracking-tight">"{chat.text}"</p>
                  <div className="flex items-center justify-end mt-4 opacity-50">
                    <span className="text-[11px] font-black tracking-widest italic">{chat.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-white p-4 px-6 rounded-[1.5rem] shadow-md border-l-4 border-emerald-500">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Interactive Footer */}
          <div className="p-8 bg-white/95 backdrop-blur-2xl border-t border-slate-100 space-y-6 shrink-0 shadow-[0_-20px_50px_rgba(0,0,0,0.06)]">
            <div className="flex gap-4">
              <button 
                onClick={() => handleAction('STATEMENT')}
                className="flex-1 bg-slate-100 text-slate-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition active:scale-95 border border-slate-200"
              >
                📜 Get Statement
              </button>
              <button 
                onClick={() => handleAction('PAY')}
                className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition active:scale-95"
              >
                💳 Pay via UPI
              </button>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <p className="text-[12px] font-black text-slate-600 uppercase tracking-[0.3em] italic">DukaanMitra Secure</p>
              <div className="h-1 w-12 bg-emerald-100 rounded-full shadow-inner"></div>
            </div>
          </div>
        </div>
        
        {/* iPhone Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-44 h-9 bg-slate-950 rounded-full z-50 flex items-center justify-center border border-white/5">
           <div className="w-16 h-1.5 bg-slate-800 rounded-full opacity-40"></div>
        </div>
      </div>

      <div className="mt-16 w-full max-w-2xl bg-white border border-slate-100 p-10 lg:p-14 rounded-[4rem] flex flex-col md:flex-row items-center gap-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] group transition-all duration-500 hover:border-emerald-200">
        <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl shadow-indigo-200 shrink-0 transform -rotate-6 transition-transform group-hover:rotate-0 duration-500">🤝</div>
        <div className="text-center md:text-left space-y-4">
          <h4 className="font-black text-slate-900 text-3xl italic tracking-tighter leading-none uppercase">Eliminate Disputes</h4>
          <p className="text-lg text-slate-500 leading-relaxed font-bold opacity-80 italic uppercase tracking-tight">
            By mirroring the ledger to customers instantly, you cut "Hisaab Me Galti" arguments by <span className="text-indigo-600 font-black">90%</span> and increase payment speed by <span className="text-emerald-600 font-black">40%</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;
