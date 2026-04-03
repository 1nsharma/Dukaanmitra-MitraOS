
import React from 'react';

const OptimizationPlaybook: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">
      <header className="border-b border-slate-200 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Day 6 Protocol</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-900 font-bold">Optimization & Cost Control</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-xs font-black text-slate-500 uppercase tracking-tighter italic text-indigo-600">Efficiency Mode Active</span>
          </div>
        </div>
        <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none italic">Day 6: Chai-Sutta Filter</h2>
        <p className="text-xl text-slate-500 mt-4 max-w-3xl leading-relaxed">
          Reducing AI costs by 40% and preventing data corruption through intelligent filtering and refined Desi slang understanding.
        </p>
      </header>

      {/* PART 1: PRE-AI COST FILTER */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-2xl shadow-xl">☕</div>
          <h3 className="text-3xl font-bold text-slate-900">1. Pre-AI Cost Filter (Chai-Sutta Filter)</h3>
        </div>
        
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Make.com Filter Config</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Add this filter <strong>BEFORE</strong> the AI module to stop garbage messages from consuming credits.
              </p>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                   <span>FILTER NAME</span>
                   <span className="text-indigo-600">Skip Garbage Messages</span>
                </div>
                <div className="space-y-1">
                   <p className="text-xs font-bold text-slate-700">Rule 1: Does NOT contain (case-insensitive)</p>
                   <code className="text-[10px] bg-white p-1 rounded border">ok, okay, thanks, thank you, theek, accha, 👍</code>
                </div>
                <div className="space-y-1">
                   <p className="text-xs font-bold text-slate-700">Rule 2: Length Greater Than</p>
                   <code className="text-[10px] bg-white p-1 rounded border">3 characters</code>
                </div>
              </div>
            </div>
            <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] flex flex-col justify-center border-4 border-indigo-800">
               <h4 className="text-indigo-400 font-bold uppercase text-xs tracking-widest mb-4">The Savings Logic</h4>
               <p className="text-sm opacity-80 leading-relaxed italic mb-4">
                 "Average kirana owners send 3-4 garbage messages for every 1 real bill. By filtering 'Ok' and 'Thanks', we save roughly 40% of our AI budget immediately."
               </p>
               <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                  <p className="text-2xl font-black text-indigo-300">₹420 saved</p>
                  <p className="text-[10px] uppercase font-bold opacity-50">Estimated Monthly Savings per 10 Shops</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* PART 2: PROMPT ENGINEERING 2.0 */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-2xl shadow-xl">📖</div>
          <h3 className="text-3xl font-bold text-slate-900">2. Desi Dictionary (Prompt 2.0)</h3>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 p-10 rounded-[4rem] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-12 relative z-10">
            <div className="flex-1 space-y-6">
              <h4 className="text-xl font-bold text-emerald-900">Updated System Engine</h4>
              <p className="text-sm text-emerald-700 leading-relaxed">
                We've moved beyond simple text extraction to <strong>Intent Classification</strong>. Gemini now acts as a high-precision accountant.
              </p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white p-4 rounded-2xl border border-emerald-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">NEW_BILL (Credit)</p>
                    <p className="text-xs italic">"Likh lo", "Udhari", "Dena hai"</p>
                 </div>
                 <div className="bg-white p-4 rounded-2xl border border-emerald-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">PAYMENT (Debit)</p>
                    <p className="text-xs italic">"Jama", "Pay kiya", "Kat lo"</p>
                 </div>
              </div>
            </div>
            <div className="lg:w-96 bg-slate-900 text-emerald-400 p-6 rounded-[2rem] font-mono text-[10px] leading-relaxed relative border-4 border-slate-800">
               <button 
                  onClick={() => copyToClipboard(`# ROLE: Indian Kirana Accountant\nAnalyze intent: NEW_BILL | PAYMENT_RECEIVED | SKIP\nSlang: "Likh lo" -> CREDIT, "Jama" -> DEBIT.`)}
                  className="absolute top-4 right-4 bg-emerald-500 text-slate-900 px-2 py-1 rounded font-bold hover:bg-emerald-400 transition"
               >
                 COPY PROMPT
               </button>
               <pre>{`{
  "intent": "NEW_BILL",
  "amount": 500,
  "item_list": "2kg Sugar",
  "customer_name": "Rahul",
  "confidence": 0.98
}`}</pre>
               <p className="mt-4 text-slate-500 italic">// Optimization: Confidence field enables Phase 3 Safety Loop</p>
            </div>
          </div>
        </div>
      </section>

      {/* PART 3: CONFIDENCE SAFETY LOOP */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-xl">🛡️</div>
          <h3 className="text-3xl font-bold text-slate-900">3. Confidence Loop (Maaf Kijiye)</h3>
        </div>

        <div className="bg-white border border-slate-100 p-8 rounded-[3rem] shadow-sm flex flex-col md:flex-row gap-10">
          <div className="flex-1 space-y-4">
            <h4 className="font-bold text-slate-900 underline decoration-indigo-300">The "Maaf Kijiye" Logic</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Never guess. If AI confidence is {"<="} 0.7, we halt the ledger entry and ask the owner to clarify.
            </p>
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 font-mono text-[10px] text-indigo-700">
              IF (AI.confidence {"<="} 0.7) <br/>
              THEN Send Clarification Template
            </div>
          </div>
          <div className="md:w-80 bg-slate-100 rounded-3xl p-6 border-2 border-white shadow-inner">
             <div className="bg-white p-4 rounded-2xl shadow-sm space-y-3">
                <p className="text-xs italic text-slate-800 leading-relaxed">
                  "Maaf kijiye 🙏, baat clear nahi hui. Bill ke liye likhein: 'Rahul 500 Chini'. Dobara koshish karein."
                </p>
                <div className="h-1 w-full bg-indigo-600 rounded"></div>
                <p className="text-[10px] text-center font-bold text-slate-400">FALLBACK TEMPLATE: dm_clarify_v2</p>
             </div>
          </div>
        </div>
      </section>

      {/* PART 4: TESTING CHECKLIST */}
      <section className="bg-slate-50 p-10 rounded-[4rem] border border-slate-200">
         <h3 className="text-2xl font-black text-slate-900 italic mb-8 uppercase tracking-tighter">Founder Testing Checklist</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { t: "Garbage Check", d: "Send 'Ok' via Simulator. Verify AI cost is NOT triggered.", icon: "🗑️" },
              { t: "Slang Check", d: "Send 'Kat lo 100'. Verify intent = PAYMENT_RECEIVED.", icon: "🗣️" },
              { t: "Precision Check", d: "Send '10k Chawal'. Verify amount = 10,000.", icon: "🎯" },
              { t: "Safety Check", d: "Send vague msg like 'Aman 100'. Verify Confidence fallback.", icon: "🛡️" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start space-x-4 group hover:border-indigo-200 transition-all">
                 <span className="text-3xl">{item.icon}</span>
                 <div>
                    <h5 className="font-bold text-slate-900">{item.t}</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.d}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>

      <footer className="text-center pt-12 pb-20 border-t border-slate-200 space-y-6">
         <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">Optimization Cycle Complete</h3>
         <div className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-bold shadow-xl">
            <span>🚀</span>
            <span>SYSTEM HARDENED: GO LIVE IN 24H</span>
         </div>
         <p className="text-slate-400 text-[10px] mt-4 uppercase font-black tracking-widest italic">DukaanMitra Platform Architect | Dec 2025</p>
      </footer>
    </div>
  );
};

export default OptimizationPlaybook;
