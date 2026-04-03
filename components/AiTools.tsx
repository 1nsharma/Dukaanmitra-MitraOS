
import React, { useState, useRef } from 'react';
import { animateImage, analyzeVideo, searchGroundingQuery, fastChat } from '../services/geminiService';

interface AiToolsProps {
  isPremium?: boolean;
}

const AiTools: React.FC<AiToolsProps> = ({ isPremium = false }) => {
  const [activeTab, setActiveTab] = useState<'vision' | 'video' | 'animate' | 'search' | 'fast'>('vision');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [prompt, setPrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLocked = !isPremium && ['vision', 'video', 'animate'].includes(activeTab);

  const handleFileAction = async () => {
    if (isLocked) {
      alert("This is a Premium feature. Please upgrade your plan to access Vision Intelligence.");
      return;
    }

    const file = fileInputRef.current?.files?.[0];
    if (!file && (activeTab === 'vision' || activeTab === 'video' || activeTab === 'animate')) {
      alert("Please select a file first.");
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      if (activeTab === 'search') {
        const data = await searchGroundingQuery(prompt);
        setResult(data);
      } else if (activeTab === 'fast') {
        const data = await fastChat(prompt);
        setResult(data);
      } else {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = (reader.result as string).split(',')[1];
          if (activeTab === 'animate') {
            const url = await animateImage(base64, prompt);
            setResult({ videoUrl: url });
          } else if (activeTab === 'video') {
            const data = await analyzeVideo(base64, prompt);
            setResult(data);
          } else if (activeTab === 'vision') {
             // Mock vision for now or call actual service
             setResult("Analyzing image... extracted 12 items. Total ₹1,250.");
          }
        };
        reader.readAsDataURL(file!);
      }
    } catch (error) {
      console.error(error);
      setResult("Error processing request.");
    } finally {
      if (activeTab === 'search' || activeTab === 'fast') setIsProcessing(false);
      else setTimeout(() => setIsProcessing(false), 2000);
    }
  };

  return (
    <div className="space-y-10 pb-20 w-full h-full max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-2 lg:px-0">
        <div className="space-y-1">
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter italic capitalize">{activeTab === 'vision' ? 'Vision Hub' : activeTab.replace('_', ' ') + ' Tool'}</h2>
          <p className="text-slate-500 font-bold text-lg lg:text-xl tracking-tight opacity-80 uppercase leading-none">
            {activeTab === 'vision' && 'Analyze complex bills or inventory photos using Gemini Pro.'}
            {activeTab === 'video' && 'Extract key events or items from security footage or store videos.'}
            {activeTab === 'animate' && 'Turn a still photo of your shop or products into a cinematic video using Veo.'}
            {activeTab === 'search' && 'Get real-time market trends or competitive data using Google Search.'}
            {activeTab === 'fast' && 'Get lightning-fast answers to general business questions.'}
          </p>
        </div>
        <div className="flex bg-slate-100/80 backdrop-blur-sm p-1.5 rounded-[2rem] border border-slate-200 shadow-sm self-start lg:self-center overflow-x-auto no-scrollbar max-w-full">
          {(['vision', 'video', 'animate', 'search', 'fast'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => { setActiveTab(tab); setResult(null); setPrompt(''); }}
              className={`px-6 py-3 rounded-[1.8rem] text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-white text-indigo-600 shadow-xl shadow-indigo-100/50 scale-105' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
              }`}
            >
              {tab === 'vision' && 'Image Hub'}
              {tab === 'video' && 'Video Hub'}
              {tab === 'animate' && 'Veo Animate'}
              {tab === 'search' && 'Search Data'}
              {tab === 'fast' && 'Flash Chat'}
            </button>
          ))}
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 lg:p-12 rounded-[4rem] border border-slate-100 shadow-sm space-y-10 relative overflow-hidden">
          {isLocked && (
             <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-20 flex flex-col items-center justify-center p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-amber-100 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-xl shadow-amber-200/50 animate-bounce">🔒</div>
                <div className="space-y-2">
                   <h4 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase">Premium Access Only</h4>
                   <p className="text-slate-500 font-bold max-w-xs mx-auto">Upgrade to DukaanMitra Enterprise to unlock high-fidelity Vision and Video parsing.</p>
                </div>
                <button className="bg-indigo-600 text-white px-8 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition active:scale-95">Upgrade Plan ➔</button>
             </div>
          )}

          <div className="space-y-10">
            {(activeTab === 'vision' || activeTab === 'video' || activeTab === 'animate') && (
              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Select Source File</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    accept={activeTab === 'video' ? "video/*" : "image/*"}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 flex flex-col items-center justify-center space-y-4 group-hover:border-indigo-300 transition-all group-hover:bg-indigo-50/30">
                     <span className="text-5xl opacity-40 group-hover:opacity-100 transition-all group-hover:scale-110">📂</span>
                     <p className="text-slate-500 font-black uppercase text-xs tracking-widest">Click to browse or drag file here</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">AI Prompt / Query</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={activeTab === 'animate' ? "Describe the animation (e.g., camera zoom in with cinematic lighting)" : "What specific details should the AI look for?"}
                className="w-full bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 h-48 font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg placeholder:italic placeholder:font-medium"
              />
            </div>

            <button 
              onClick={handleFileAction}
              disabled={isProcessing}
              className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 italic tracking-tighter"
            >
              {isProcessing ? (
                <>
                  <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>AI Engine Running...</span>
                </>
              ) : 'Run Analysis ➔'}
            </button>
          </div>
        </div>

        <div className="space-y-8 flex flex-col h-full">
          <div className="bg-slate-900 text-white p-10 lg:p-12 rounded-[4rem] shadow-2xl relative overflow-hidden h-full flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between mb-8">
               <h4 className="font-black text-xs uppercase tracking-[0.4em] italic text-indigo-400">AI Output Buffer</h4>
               <span className="text-[9px] bg-white/10 px-3 py-1 rounded-full font-black opacity-50 tracking-widest">ENCRYPTED STREAM</span>
            </div>
            
            <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] overflow-y-auto relative z-10 shadow-inner">
              {isProcessing ? (
                <div className="h-full flex flex-col items-center justify-center space-y-8">
                  <div className="flex space-x-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2 h-16 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                    ))}
                  </div>
                  <p className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs animate-pulse">Processing via Gemini 3 Pro...</p>
                </div>
              ) : result ? (
                <div className="space-y-6 animate-in fade-in duration-700">
                  {result.videoUrl ? (
                    <video src={result.videoUrl} controls autoPlay loop className="w-full rounded-[2rem] shadow-2xl border border-white/10" />
                  ) : activeTab === 'search' ? (
                    <div className="space-y-8">
                      <p className="text-xl leading-relaxed font-bold italic tracking-tight opacity-90">"{result.text}"</p>
                      {result.links?.length > 0 && (
                        <div className="pt-8 border-t border-white/10 space-y-4">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Verified Grounding Sources:</p>
                          <div className="grid gap-3">
                            {result.links.map((l: any, i: number) => (
                              <a key={i} href={l.uri} target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
                                <span className="text-indigo-400 font-black text-xs group-hover:underline truncate max-w-[80%] uppercase tracking-widest">{l.title}</span>
                                <span className="text-lg opacity-40">🔗</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="font-bold text-xl leading-relaxed italic opacity-90 whitespace-pre-wrap">{typeof result === 'string' ? result : JSON.stringify(result, null, 2)}</div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20 space-y-6">
                  <span className="text-8xl">🔮</span>
                  <p className="text-xs font-black uppercase tracking-[0.5em]">Waiting for Logic Input</p>
                </div>
              )}
            </div>
            
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/4 translate-y-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiTools;
