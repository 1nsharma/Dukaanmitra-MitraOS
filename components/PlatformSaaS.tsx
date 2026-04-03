
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PlatformSaaS: React.FC = () => {
  const storeHealthData = [
    { name: 'Store A', gtv: 45000, retention: 98 },
    { name: 'Store B', gtv: 12000, retention: 75 },
    { name: 'Store C', gtv: 31000, retention: 92 },
    { name: 'Store D', gtv: 8000, retention: 45 },
    { name: 'Store E', gtv: 52000, retention: 99 },
  ];

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">
      <header className="border-b border-slate-200 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Phase 6</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-900 font-bold">Multi-Tenant SaaS Operations</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Global Hub Active</span>
          </div>
        </div>
        <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none">The Centralized SaaS Engine</h2>
        <p className="text-xl text-slate-500 mt-4 max-w-3xl leading-relaxed">
          Transforming individual deployments into a unified platform. Sharding, document orchestration, and proactive churn intelligence.
        </p>
      </header>

      {/* SECTION 1: GLOBAL ROUTER */}
      <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden relative">
        <div className="flex flex-col lg:flex-row gap-12 relative z-10">
          <div className="flex-1 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-xl">🌐</div>
            <h3 className="text-3xl font-bold text-slate-900">1. Tenant Sharding Router</h3>
            <p className="text-slate-600 leading-relaxed">
              We no longer use one webhook per shop. A single entry point filters traffic based on the <code>destination_number</code>.
            </p>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-black text-slate-400 uppercase mb-3">Router Logic (Supabase)</h4>
              <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs">
                {`SELECT store_id, owner_phone, plan_tier \nFROM stores \nWHERE waba_number = '{{inbound_waba}}';`}
              </div>
            </div>
            <p className="text-xs text-slate-400 italic">"The destination number is the immutable tenant key. It ensures 100% data isolation."</p>
          </div>
          <div className="w-full lg:w-80 bg-slate-100 rounded-[2.5rem] p-6 border-2 border-white shadow-inner">
             <h4 className="font-bold text-slate-900 mb-4 text-center">Global Performance</h4>
             <div className="h-48">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={storeHealthData}>
                   <Bar dataKey="gtv" fill="#4f46e5" radius={[4,4,0,0]} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
             <p className="text-[10px] text-center text-slate-400 mt-4 uppercase font-bold tracking-widest">GTV Per Active Shard</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* SECTION 2: PDF ORCHESTRATION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">📄</div>
          <h3 className="text-3xl font-bold">PDF Mini-Statements</h3>
          <p className="opacity-70 text-sm">Owners can trigger formatted billing exports directly via WhatsApp commands.</p>
          <div className="space-y-3">
             <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                <span className="text-xs font-mono">Command: "PDF Rahul"</span>
                <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded font-bold uppercase">Triggered</span>
             </div>
             <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center opacity-50">
                <span className="text-xs font-mono">Status: Generating...</span>
                <span className="animate-spin text-xs">⚙️</span>
             </div>
          </div>
          <p className="text-[10px] text-indigo-300 italic font-medium leading-relaxed">
            "We use signed URL exports with 24-hour expiry to prevent permanent PII exposure on public buckets."
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 p-8 rounded-[3rem] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-4">JSON PDF Contract</h3>
            <p className="text-sm text-blue-700 mb-6">Strict schema contracts prevent template breakages during high-volume generation.</p>
            <div className="bg-white p-4 rounded-2xl border border-blue-200 font-mono text-[10px] text-blue-800 h-40 overflow-y-auto">
              <pre>{`{
  "template_id": "DM_BILL_02",
  "data": {
    "shop": "Aman Stores",
    "customer": "Rahul V.",
    "entries": [
      {"d": "01-Dec", "i": "Milk", "a": 50},
      {"d": "05-Dec", "i": "Sugar", "a": 120}
    ],
    "total": 170
  }
}`}</pre>
            </div>
          </div>
          <div className="mt-6 flex items-center space-x-3 text-xs font-bold text-blue-600 bg-white/50 p-3 rounded-xl border border-blue-200">
             <span>🛡️</span>
             <span>Role-Based Command Gating: ONLY Owners can request PDFs.</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: RETENTION ENGINE */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-2xl shadow-lg">💓</div>
          <h3 className="text-3xl font-bold text-slate-900">3. Retention Pulse Monitor</h3>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 p-10 rounded-[4rem]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="col-span-2 space-y-6">
              <h4 className="text-xl font-bold text-emerald-900 italic">"48-Hour Silence Protocol"</h4>
              <p className="text-emerald-700 leading-relaxed">
                Platform-level automation identifies shops with zero logs in 48 hours. This indicates churn risk, hardware issues, or competitor poaching.
              </p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white p-6 rounded-3xl border border-emerald-200 text-center">
                    <p className="text-4xl font-black text-emerald-600">84%</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Nudge Success Rate</p>
                 </div>
                 <div className="bg-white p-6 rounded-3xl border border-emerald-200 text-center">
                    <p className="text-4xl font-black text-emerald-600">-22%</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Churn Reduction</p>
                 </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white flex flex-col justify-center border-4 border-slate-800">
              <p className="text-[10px] font-bold text-emerald-400 uppercase mb-2">Template: churn_nudge</p>
              <p className="text-sm italic leading-relaxed">
                "Namaste! <br/><br/>
                Do din se koi entry nahi hui. Sab theek hai? <br/><br/>
                Aaj ka pehla bill likhne ke liye reply karein."
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between">
                <span className="text-[10px] opacity-50 uppercase font-bold">Priority</span>
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">High</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: RECOVERY & SECURITY */}
      <section className="bg-rose-900 text-white p-12 rounded-[4rem] relative overflow-hidden shadow-2xl">
         <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
           <div className="md:w-1/2 space-y-6">
              <h3 className="text-4xl font-black italic tracking-tighter">Zero-Loss Disaster Recovery</h3>
              <p className="text-rose-100 opacity-80 leading-relaxed">
                Automated Batch Resync scripts poll the Gupshup History API every 6 hours to catch messages missed during webhook downtime.
              </p>
              <div className="flex gap-4">
                 <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 text-xs font-bold">PII Hashing Active</div>
                 <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 text-xs font-bold">RBAC Enforced</div>
              </div>
           </div>
           <div className="md:w-1/2 w-full">
              <div className="bg-slate-950/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 space-y-4">
                 <h4 className="text-xs font-bold text-rose-400 uppercase">System Integrity Log</h4>
                 <div className="space-y-2 font-mono text-[10px]">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                       <span className="opacity-50">2025-12-28 10:00</span>
                       <span className="text-emerald-400">BATCH_SYNC: SUCCESS (4 msgs)</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                       <span className="opacity-50">2025-12-28 09:30</span>
                       <span className="text-blue-400">PII_CLEANUP: 120 rows hashed</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="opacity-50">2025-12-28 08:00</span>
                       <span className="text-amber-400">RECOVERY: Shard DM_02 re-routed</span>
                    </div>
                 </div>
              </div>
           </div>
         </div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* SECTION 5: BUILD PLAN */}
      <section className="space-y-8">
        <h3 className="text-3xl font-bold text-slate-900">Phase 6 Build Plan (Day 23–30)</h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            { day: "D23", title: "Global Multi-Tenant Router", detail: "WABA destination mapping & store_id sharding implementation." },
            { day: "D24", title: "PDF Engine Integration", detail: "Contract-based statement generation with 24h temp links." },
            { day: "D25", title: "RBAC & Command Gating", detail: "Owner-only permission validation for sensitive commands." },
            { day: "D26", title: "Churn Pulse Dashboard", detail: "Inactivity monitoring scenarios & automated WhatsApp nudges." },
            { day: "D28", title: "Batch Sync Recovery", detail: "Gupshup history polling for downtime resynchronization." },
            { day: "D30", title: "Platform Maintenance SOP", detail: "API key rotation & PII hashing compliance review." },
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-indigo-300 transition-all shadow-sm">
               <div className="flex items-center space-x-6">
                  <span className="text-sm font-black text-indigo-400 w-8">{item.day}</span>
                  <div>
                    <h5 className="font-bold text-slate-900">{item.title}</h5>
                    <p className="text-xs text-slate-500">{item.detail}</p>
                  </div>
               </div>
               <span className="text-xs font-bold text-slate-300 group-hover:text-indigo-600 transition-colors">READY ➔</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center pt-12 pb-20 border-t border-slate-200 space-y-4">
         <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">
            <span>🛡️</span>
            <span>GDPR Compliance: PII Protection Active</span>
         </div>
         <p className="text-slate-400 text-xs italic">All platform protocols verified for multi-regional scaling.</p>
      </footer>
    </div>
  );
};

export default PlatformSaaS;
