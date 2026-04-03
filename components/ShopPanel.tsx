
import React, { useState, useEffect } from 'react';
import Simulator from './Simulator';
import { Customer, Transaction, SystemLog, ChatMessage, View } from '../types';
import { generateMarketingContent, generateAlertAction, generateMarketingPoster } from '../services/geminiService';
import anime from 'animejs';

interface ShopPanelProps {
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
  setView: (view: View) => void;
}

const ShopPanel: React.FC<ShopPanelProps> = (props) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'marketing' | 'alerts' | 'qr'>('chat');
  const [marketingType, setMarketingType] = useState('Festival Greeting');
  const [marketingDetails, setMarketingDetails] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedPoster, setGeneratedPoster] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPosterGenerating, setIsPosterGenerating] = useState(false);
  const [isBlasting, setIsBlasting] = useState(false);
  const [blastProgress, setBlastProgress] = useState(0);

  // QR Customizer State
  const [qrShopName, setQrShopName] = useState('Aman General Store');
  const [qrUpi, setQrUpi] = useState('aman@upi');

  // Smart Alerts State
  const [selectedAlert, setSelectedAlert] = useState<{ title: string, desc: string, count: number } | null>(null);
  const [alertNudge, setAlertNudge] = useState('');
  const [isAlertProcessing, setIsAlertProcessing] = useState(false);
  const [triggeredAlerts, setTriggeredAlerts] = useState<Set<string>>(new Set());

  const handleGenerateMarketing = async () => {
    if (!marketingDetails.trim()) return;
    setIsGenerating(true);
    setGeneratedContent('');
    try {
      const content = await generateMarketingContent(marketingType, marketingDetails);
      setGeneratedContent(content);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGeneratePoster = async () => {
    if (!marketingDetails.trim()) return;
    setIsPosterGenerating(true);
    setGeneratedPoster(null);
    try {
      const poster = await generateMarketingPoster(`${marketingType}: ${marketingDetails}`);
      setGeneratedPoster(poster);
    } catch (e) {
      console.error("Poster gen failed", e);
    } finally {
      setIsPosterGenerating(false);
    }
  };

  const handleExecuteBlast = async () => {
    setIsBlasting(true);
    setBlastProgress(0);
    
    // Simulate real API trigger progress
    const interval = setInterval(() => {
      setBlastProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    await new Promise(r => setTimeout(r, 2500));
    setIsBlasting(false);
    alert(`DukaanMitra Blast: Campaign successfully dispatched to ${props.customers.length} Grahaks!`);
  };

  const handleAlertAction = async (title: string, desc: string, count: number) => {
    setSelectedAlert({ title, desc, count });
    setIsAlertProcessing(true);
    const nudge = await generateAlertAction(title, desc);
    setAlertNudge(nudge);
    setIsAlertProcessing(false);
  };

  const calculateShopHealth = () => {
    const totalUdhaar = props.transactions.reduce((acc, t) => acc + t.amount, 0);
    const health = Math.max(0, 100 - (totalUdhaar / 5000) * 10); 
    return Math.floor(health);
  };

  const alerts = [
    { title: "Udhaar Recovery", icon: "💸", desc: "4 customers haven't paid in 15+ days. Recover ₹2,450.", count: 4, priority: 'High' },
    { title: "Review Prompt", icon: "⭐", desc: "12 happy customers from yesterday. Ask for Google Reviews.", count: 12, priority: 'Med' },
    { title: "Restock: Sugar", icon: "📦", desc: "Frequently logged in bills, but stock is low.", count: 1, priority: 'Urgent' },
  ];

  return (
    <div className="space-y-10 pb-20 w-full h-full max-w-[1600px] mx-auto animate-in fade-in duration-700">
      {/* High-Fidelity Header */}
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 px-4 lg:px-0">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-2xl shadow-indigo-200 transform -rotate-3 transition-transform hover:rotate-0 duration-500">🏪</div>
          <div className="space-y-1">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic leading-none uppercase">Command Center</h2>
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Munim v2.0 Active</span>
              <span className="text-slate-400 font-bold">•</span>
              <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest italic">{qrShopName}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
           {/* Shop Health Gauge */}
           <div className="bg-white px-8 py-4 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-indigo-200 transition-colors">
              <div className="relative w-12 h-12 flex items-center justify-center">
                 <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * calculateShopHealth() / 100)} className="text-indigo-600 transition-all duration-1000" />
                 </svg>
                 <span className="text-[10px] font-black text-indigo-600">{calculateShopHealth()}%</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Munim Rating</p>
                <p className="text-sm font-bold text-slate-900">Steady Operations</p>
              </div>
           </div>

           <div className="flex bg-slate-200/50 backdrop-blur-xl p-1.5 rounded-full border border-white shadow-xl overflow-x-auto no-scrollbar max-w-full">
            {[
              { id: 'chat', label: 'SIMULATION', icon: '⚡' },
              { id: 'marketing', label: 'MARKETING', icon: '🎨' },
              { id: 'alerts', label: 'ALERTS', icon: '🔔' },
              { id: 'qr', label: 'STANDEE', icon: '🏷️' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-full text-[10px] font-black tracking-[0.2em] transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-white text-indigo-600 shadow-xl scale-105' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="relative">
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
             <div className="xl:col-span-8">
                <Simulator {...props} />
             </div>
             <div className="xl:col-span-4 space-y-6">
                <div className="bg-slate-900 text-white p-8 rounded-[3.5rem] shadow-2xl space-y-6 relative overflow-hidden border border-white/5">
                   <div className="flex items-center justify-between">
                     <h3 className="text-xl font-black italic uppercase tracking-widest text-indigo-400 leading-none">Live Ledger Feed</h3>
                     <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                   </div>
                   <div className="space-y-4 max-h-[500px] overflow-y-auto no-scrollbar pr-2">
                      {[...props.transactions].reverse().map((t, i) => (
                        <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-3xl flex justify-between items-center group hover:bg-white/10 transition-all border-l-4 border-l-transparent hover:border-l-indigo-500">
                           <div>
                              <p className="text-sm font-bold">{t.customerName}</p>
                              <p className="text-[10px] text-slate-500 uppercase tracking-widest">{t.items}</p>
                           </div>
                           <p className="text-emerald-400 font-black italic tracking-tighter text-lg">₹{t.amount}</p>
                        </div>
                      ))}
                      {props.transactions.length === 0 && <p className="text-center text-slate-600 italic text-sm py-10 opacity-50">Awaiting first entry from Simulator...</p>}
                   </div>
                   <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-[60px]"></div>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[3rem] space-y-4 shadow-sm">
                   <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">AI Business Insight</p>
                   <p className="text-sm text-indigo-900 leading-relaxed font-bold italic opacity-80">"Rahul just crossed ₹2,000 in debt. Maybe remind him gently before his next purchase?"</p>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'marketing' && (
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-white p-10 lg:p-14 rounded-[4rem] border border-slate-100 shadow-sm space-y-12">
              <div className="space-y-4">
                 <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">Creative Hub</h3>
                 <p className="text-slate-500 text-lg leading-relaxed font-medium italic opacity-80">
                   Generate professional-grade marketing assets for your local shop followers instantly.
                 </p>
              </div>
              
              <div className="space-y-10">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'Festival Greeting', icon: '🪔' },
                    { id: 'New Arrival', icon: '🚚' },
                    { id: 'Flash Sale', icon: '🏷️' },
                    { id: 'Trust Building', icon: '🤝' }
                  ].map(type => (
                    <button 
                      key={type.id}
                      onClick={() => setMarketingType(type.id)}
                      className={`p-6 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-3 group ${
                        marketingType === type.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-indigo-200'
                      }`}
                    >
                      <span className={`text-4xl group-hover:scale-110 transition-transform ${marketingType === type.id ? 'animate-bounce' : ''}`}>{type.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{type.id}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4 italic">Campaign Context</label>
                  <textarea 
                    value={marketingDetails}
                    onChange={(e) => setMarketingDetails(e.target.value)}
                    placeholder="e.g. Holi discount 10% on sweets, free delivery for seniors..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-[3rem] p-8 h-48 font-bold text-slate-700 focus:outline-none focus:ring-8 focus:ring-indigo-500/5 transition-all text-lg shadow-inner placeholder:italic placeholder:font-medium"
                  />
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={handleGenerateMarketing}
                    disabled={isGenerating || !marketingDetails.trim()}
                    className="flex-1 bg-slate-900 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black transition active:scale-95 disabled:opacity-50"
                  >
                    {isGenerating ? 'Drafting...' : 'Write Message'}
                  </button>
                  <button 
                    onClick={handleGeneratePoster}
                    disabled={isPosterGenerating || !marketingDetails.trim()}
                    className="flex-1 bg-indigo-600 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95 disabled:opacity-50"
                  >
                    {isPosterGenerating ? 'Rendering...' : 'Design Poster'}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-8 flex flex-col h-full">
               <div className="bg-slate-900 text-white p-10 lg:p-14 rounded-[4.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden flex-1 flex flex-col border border-white/5">
                  <div className="relative z-10 space-y-10 flex flex-col h-full">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-indigo-400">
                           <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center text-lg">✨</div>
                           <h4 className="font-black text-xs uppercase tracking-[0.4em] italic leading-none">Creative Preview</h4>
                        </div>
                        {(generatedContent || generatedPoster) && (
                          <span className="bg-emerald-500 text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-lg shadow-emerald-900/40">Ready</span>
                        )}
                     </div>
                     
                     <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[4rem] flex flex-col items-center justify-center text-center relative overflow-hidden shadow-inner min-h-[300px]">
                        {isGenerating || isPosterGenerating ? (
                           <div className="space-y-8">
                              <div className="w-20 h-20 border-[6px] border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_30px_rgba(79,70,229,0.5)]"></div>
                              <div className="space-y-2">
                                <p className="text-indigo-400 font-black uppercase text-[10px] tracking-[0.4em] animate-pulse">Consulting Munim Intel...</p>
                                <p className="text-slate-500 text-[8px] font-bold uppercase opacity-50 tracking-widest italic">Optimizing for local conversion</p>
                              </div>
                           </div>
                        ) : generatedPoster ? (
                           <div className="w-full h-full relative group">
                              <img src={generatedPoster} className="w-full h-full object-cover rounded-[3rem] shadow-2xl animate-in zoom-in duration-700" alt="Generated Campaign" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem] flex items-center justify-center">
                                 <button className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-black uppercase text-xs shadow-2xl">Preview Full Res</button>
                              </div>
                           </div>
                        ) : generatedContent ? (
                           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
                             {/* WhatsApp Bubble Preview */}
                             <div className="p-6 bg-[#dcf8c6] rounded-3xl rounded-tr-none shadow-2xl text-left max-w-[90%] mx-auto border border-[#c3e6a9]">
                               <p className="text-lg font-bold leading-relaxed text-slate-800 italic tracking-tight">"{generatedContent}"</p>
                               <div className="mt-2 text-right text-[10px] text-slate-400 font-bold uppercase">Today 12:45 PM</div>
                             </div>
                             <button 
                               onClick={() => {navigator.clipboard.writeText(generatedContent); alert('Message copied to clipboard!')}}
                               className="px-6 py-2 rounded-full border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all"
                             >
                               Copy to Clipboard
                             </button>
                           </div>
                        ) : (
                          <div className="opacity-10 space-y-6">
                             <span className="text-9xl block">🎨</span>
                             <p className="text-xs font-black uppercase tracking-[0.5em] leading-none">Drafting Area Empty</p>
                          </div>
                        )}
                     </div>

                     {(generatedContent || generatedPoster) && (
                       <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                             <button 
                               className="bg-white/5 text-slate-400 border border-white/10 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition active:scale-95"
                               onClick={() => {setGeneratedContent(''); setGeneratedPoster(null); setMarketingDetails('')}}
                             >
                               Start Over
                             </button>
                             <button 
                               onClick={handleExecuteBlast}
                               disabled={isBlasting}
                               className="bg-emerald-600 text-white py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition shadow-xl shadow-emerald-900/40 active:scale-95 disabled:opacity-50 relative overflow-hidden"
                             >
                               {isBlasting ? (
                                 <div className="relative z-10 flex items-center justify-center gap-3">
                                   <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                   <span>Sending...</span>
                                 </div>
                               ) : (
                                 <span className="relative z-10">🚀 Trigger Blast</span>
                               )}
                               {isBlasting && (
                                 <div 
                                   className="absolute bottom-0 left-0 h-1 bg-white/40 transition-all duration-300"
                                   style={{ width: `${blastProgress}%` }}
                                 />
                               )}
                             </button>
                          </div>
                          <p className="text-center text-slate-500 text-[9px] font-bold uppercase tracking-widest italic opacity-60">Reaching: {props.customers.length} Verified Grahaks</p>
                       </div>
                     )}
                  </div>
                  <div className="absolute top-0 right-0 w-[70%] h-[70%] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none translate-x-1/4 -translate-y-1/4"></div>
                  <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/4 translate-y-1/4"></div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-8 animate-in fade-in duration-1000">
            <div className="bg-indigo-950 p-14 rounded-[5rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl border border-white/5">
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">🤖</div>
                     <h3 className="text-5xl font-black italic tracking-tighter uppercase leading-none">Smart Recovery</h3>
                  </div>
                  <p className="text-indigo-200 text-lg font-bold max-w-xl opacity-70 uppercase tracking-tight italic leading-relaxed">
                    Automated debt management protocols to improve cash flow without damaging relationships.
                  </p>
               </div>
               <div className="relative z-10 bg-white/5 backdrop-blur-xl p-12 rounded-[4rem] border border-white/10 text-center min-w-[280px] shadow-2xl">
                  <p className="text-7xl font-black italic tracking-tighter text-indigo-400">₹2,450</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mt-4 leading-none">Targeted for Recovery</p>
               </div>
               <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[150px] translate-x-1/4 -translate-y-1/4"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {alerts.map((alert, i) => (
                <div key={i} className={`bg-white p-12 rounded-[4rem] border-2 transition-all group relative overflow-hidden ${triggeredAlerts.has(alert.title) ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-50 hover:border-indigo-200 shadow-sm hover:shadow-2xl'}`}>
                    <div className="flex justify-between items-start mb-10">
                      <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center text-4xl shadow-inner transition-colors ${triggeredAlerts.has(alert.title) ? 'bg-emerald-100' : 'bg-slate-50 group-hover:bg-indigo-50'}`}>
                        {alert.icon}
                      </div>
                      <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                        alert.priority === 'Urgent' ? 'bg-rose-100 text-rose-600' : 
                        alert.priority === 'High' ? 'bg-orange-100 text-orange-600' : 
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {alert.priority}
                      </span>
                    </div>
                    <div className="space-y-4">
                       <h3 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">{alert.title}</h3>
                       <p className="text-slate-500 text-[15px] font-bold leading-relaxed italic opacity-80">"{alert.desc}"</p>
                       <div className={`h-1.5 w-16 rounded-full transition-all duration-1000 ${triggeredAlerts.has(alert.title) ? 'w-full bg-emerald-500' : 'bg-indigo-200 group-hover:w-full'}`}></div>
                    </div>
                    <button 
                      onClick={() => handleAlertAction(alert.title, alert.desc, alert.count)}
                      disabled={triggeredAlerts.has(alert.title)}
                      className={`mt-10 w-full py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
                        triggeredAlerts.has(alert.title) 
                          ? 'bg-emerald-600 text-white shadow-xl cursor-default' 
                          : 'bg-slate-900 text-white shadow-2xl hover:bg-indigo-600'
                      }`}
                    >
                      {triggeredAlerts.has(alert.title) ? 'DEACTIVATE & SENT' : 'PREVIEW & SEND ➔'}
                    </button>
                    {triggeredAlerts.has(alert.title) && (
                      <div className="absolute top-4 right-4 text-emerald-500 text-2xl font-black">✓</div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'qr' && (
          <div className="grid lg:grid-cols-12 gap-16 items-center py-10 animate-in fade-in duration-1000">
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <h3 className="text-7xl font-black text-slate-900 italic tracking-tighter leading-none uppercase">Physical Assets</h3>
                <p className="text-slate-500 text-2xl font-bold uppercase opacity-60 italic tracking-tight leading-none">Your digital dukaan presence.</p>
              </div>

              <div className="bg-white p-12 rounded-[5rem] border border-slate-100 shadow-xl space-y-10 border-l-[12px] border-l-indigo-600">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic">Branding Customization</h4>
                 <div className="grid sm:grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-6">Display Name</label>
                       <input 
                          value={qrShopName}
                          onChange={e => setQrShopName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-[2.2rem] px-8 py-5 font-bold text-slate-800 focus:outline-none focus:ring-8 focus:ring-indigo-500/5 text-lg shadow-inner"
                       />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-6">UPI Linkage</label>
                       <input 
                          value={qrUpi}
                          onChange={e => setQrUpi(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-[2.2rem] px-8 py-5 font-bold text-slate-800 focus:outline-none focus:ring-8 focus:ring-indigo-500/5 text-lg shadow-inner"
                       />
                    </div>
                 </div>
                 <div className="flex gap-6 pt-4">
                    <button className="flex-1 bg-slate-900 text-white py-6 rounded-3xl font-black text-[11px] uppercase tracking-widest shadow-2xl hover:bg-black transition active:scale-95 italic">Get PDF Asset</button>
                    <button className="flex-1 bg-indigo-600 text-white py-6 rounded-3xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95 italic">Order Standee</button>
                 </div>
              </div>

              <div className="bg-emerald-50 p-10 rounded-[3.5rem] border border-emerald-100 space-y-3 shadow-inner">
                 <p className="text-emerald-800 font-bold italic text-lg leading-relaxed">"Physical standees increase customer transparency by 40%."</p>
                 <p className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">— Pilot Data v1.0</p>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white p-3 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)] rounded-[5.5rem] border-[14px] border-slate-900 max-w-md w-full transform -rotate-2 hover:rotate-0 transition-all duration-1000 group">
                 <div className="bg-indigo-600 rounded-[4.8rem] p-16 text-center text-white space-y-12 flex flex-col items-center shadow-inner">
                    <div className="space-y-2">
                      <h4 className="text-5xl lg:text-6xl font-black italic tracking-tighter leading-none">DukaanMitra</h4>
                      <p className="text-[11px] font-black uppercase tracking-[0.6em] opacity-80 leading-none">Digital Munim Pro</p>
                    </div>

                    <div className="bg-white p-12 rounded-[4rem] shadow-2xl flex items-center justify-center relative group-hover:scale-105 transition-transform duration-700">
                      <div className="grid grid-cols-6 gap-3 w-56 h-56 opacity-90">
                        {[...Array(36)].map((_, i) => (
                          <div key={i} className={`rounded-[3px] ${Math.random() > 0.4 ? 'bg-slate-900' : 'bg-transparent'}`}></div>
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-2xl border-4 border-white transform -rotate-12">Ω</div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <p className="text-3xl font-black italic leading-tight tracking-tighter uppercase leading-none">SCAN TO VIEW LEDGER</p>
                      <div className="space-y-2 border-t border-white/20 pt-8">
                        <p className="text-xl font-black uppercase tracking-widest text-indigo-100">{qrShopName}</p>
                        <p className="text-[12px] font-bold opacity-60 uppercase tracking-widest italic">{qrUpi}</p>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Alert Action Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-2xl z-[150] flex items-center justify-center p-6">
          <div className="w-full max-w-2xl bg-white rounded-[5.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 border border-white/10">
            <div className="bg-slate-900 p-14 text-white flex justify-between items-start relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-xl">🧠</div>
                  <h4 className="font-black text-4xl uppercase tracking-tighter italic leading-none">Logic Gate</h4>
                </div>
                <p className="text-sm text-indigo-400 uppercase font-black tracking-[0.5em] ml-20 leading-none">{selectedAlert.title}</p>
              </div>
              <button onClick={() => setSelectedAlert(null)} className="relative z-10 text-slate-500 hover:text-white transition-colors">
                 <span className="text-5xl font-light leading-none">✕</span>
              </button>
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
            </div>
            
            <div className="p-16 space-y-12">
              <div className="space-y-8">
                <div className="flex justify-between items-center px-6">
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Optimized for {selectedAlert.count} Contacts</p>
                   <span className="bg-emerald-500/10 text-emerald-600 text-[9px] font-black px-3 py-1 rounded-full border border-emerald-500/20">Gemini 3 Pro Pulse</span>
                </div>
                <div className="p-12 bg-slate-50 rounded-[4.5rem] border-2 border-slate-100 min-h-[250px] flex items-center justify-center relative shadow-inner group overflow-y-auto max-h-[400px]">
                  {isAlertProcessing ? (
                    <div className="flex flex-col items-center gap-8">
                      <div className="flex gap-4">
                        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
                        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-150"></div>
                        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-300"></div>
                      </div>
                      <span className="text-[13px] font-black text-indigo-600 uppercase tracking-[0.5em] animate-pulse leading-none">Reasoning Best Tone...</span>
                    </div>
                  ) : (
                    <div className="space-y-6 text-center animate-in fade-in duration-700 w-full">
                       {/* Result Bubble */}
                       <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-xl relative inline-block text-left w-full">
                          <p className="text-2xl font-bold italic text-slate-800 leading-tight italic tracking-tight">"{alertNudge}"</p>
                          <div className="mt-2 text-right text-[9px] text-slate-400 font-bold">MUNIM GENERATED NUDGE</div>
                       </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <button 
                  onClick={() => setSelectedAlert(null)}
                  className="py-7 rounded-[3rem] font-black text-slate-400 uppercase tracking-[0.3em] text-[11px] border-2 border-slate-100 hover:bg-slate-50 transition active:scale-95"
                >
                  Discard
                </button>
                <button 
                  onClick={() => {
                    setTriggeredAlerts(prev => new Set(prev).add(selectedAlert.title));
                    setSelectedAlert(null);
                    handleExecuteBlast(); 
                  }}
                  className="py-7 rounded-[3rem] font-black text-white bg-indigo-600 shadow-[0_40px_80px_-15px_rgba(79,70,229,0.5)] hover:bg-indigo-700 transition active:scale-95 uppercase tracking-[0.3em] text-[11px]"
                >
                  Execute Trigger ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPanel;
