
import React from 'react';
import { StrategyMetric } from '../types';

const ProductStrategy: React.FC = () => {
  const metrics: StrategyMetric[] = [
    { feature: 'WhatsApp Billing', reach: 10, impact: 3, confidence: 9, effort: 2, score: 135 },
    { feature: 'Vision OCR', reach: 8, impact: 2.5, confidence: 8.5, effort: 4, score: 42.5 },
    { feature: 'EOD Reports', reach: 10, impact: 2, confidence: 10, effort: 1, score: 200 },
    { feature: 'Vasooli Nudges', reach: 6, impact: 3, confidence: 7, effort: 3, score: 42 },
  ];

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">
      <header className="border-b border-slate-200 pb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">Strategy v1.2</span>
          <span className="text-slate-400 font-bold">•</span>
          <span className="text-slate-900 font-black italic">The North Star Dashboard</span>
        </div>
        <h2 className="text-6xl font-black text-slate-900 tracking-tighter italic leading-none">Product Strategy</h2>
        <p className="text-xl text-slate-500 mt-4 max-w-3xl leading-relaxed">
          Aligning Kirana needs with technical execution. We prioritize features that solve for <strong>Trust</strong> and <strong>Time</strong>.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6 group hover:border-indigo-400 transition-all">
            <div className="flex justify-between items-start">
               <h4 className="text-lg font-black text-slate-900 italic tracking-tight leading-none">{m.feature}</h4>
               <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">RICE: {m.score}</span>
            </div>
            <div className="space-y-3">
               {[
                 { label: 'Reach', val: m.reach, max: 10 },
                 { label: 'Impact', val: m.impact, max: 3 },
                 { label: 'Confidence', val: m.confidence, max: 10 },
               ].map((attr, idx) => (
                 <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[8px] font-black uppercase text-slate-400 tracking-widest">
                       <span>{attr.label}</span>
                       <span>{attr.val}/{attr.max}</span>
                    </div>
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500 group-hover:bg-indigo-600 transition-all" style={{ width: `${(attr.val/attr.max)*100}%` }}></div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-slate-900 text-white p-12 rounded-[4rem] relative overflow-hidden shadow-2xl">
         <div className="relative z-10 grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
               <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-tight">The "Job" to be Done</h3>
               <div className="space-y-6">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                     <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">Merchant Job Story</p>
                     <p className="text-lg italic leading-relaxed">
                       "When I'm handling a rush of 10 customers, I want to log a debt in 3 seconds on WhatsApp, so I can ensure I don't lose money without slowing down sales."
                     </p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                     <p className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-2">Customer Job Story</p>
                     <p className="text-lg italic leading-relaxed">
                       "When I buy on credit, I want a digital receipt immediately, so I don't feel cheated by handwritten register errors at the end of the month."
                     </p>
                  </div>
               </div>
            </div>
            <div className="flex flex-col justify-center space-y-10">
               <div className="space-y-2">
                  <h4 className="text-xl font-bold text-slate-400 italic">North Star Metric</h4>
                  <p className="text-6xl font-black text-white italic tracking-tighter">1.4 Days</p>
                  <p className="text-sm font-black uppercase text-indigo-400 tracking-widest">Average Time to Debt Settlement</p>
               </div>
               <div className="p-8 bg-indigo-600 rounded-[2.5rem] border border-indigo-400/30">
                  <p className="text-sm font-bold opacity-80 italic">"Feature parity with physical registers is the baseline. Real value is in the 'Munim Intelligence' that predicts cash-flow gaps."</p>
               </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      </section>

      <footer className="text-center space-y-4 pt-10">
         <div className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-widest">
            <span>🎯</span>
            <span>Focus: Retention over Acquisition</span>
         </div>
         <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic opacity-50">Strategic Blueprint | Dec 2025 Market Entry</p>
      </footer>
    </div>
  );
};

export default ProductStrategy;
