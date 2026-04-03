
import React from 'react';

const ReliabilityPlaybook: React.FC = () => {
  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">
      <header className="border-b border-slate-200 pb-6">
        <div className="flex items-center space-x-3 mb-2">
          <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Phase 4</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500 font-medium">Reliability & Scale Architect</span>
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight italic">The Hardening Protocol</h2>
        <p className="text-lg text-slate-500 mt-2 max-w-3xl">
          Transitioning from a working MVP to a resilient, fault-tolerant revenue service. Protecting data integrity during concurrent load spikes.
        </p>
      </header>

      {/* SECTION 1: TECHNICAL HARDENING */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-2xl shadow-lg">
            🛡️
          </div>
          <h3 className="text-2xl font-bold text-slate-900">1. No-Crash Protocol (Anti-Concurrency)</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl space-y-4">
            <h4 className="font-bold text-rose-900">The "Race Condition" Risk</h4>
            <p className="text-sm text-rose-700 leading-relaxed">
              Google Sheets allows only ~60 write requests per minute. If 5 shop owners message simultaneously, the Sheet may lock, causing <strong>Data Loss</strong>.
            </p>
            <div className="p-4 bg-white rounded-2xl border border-rose-200">
              <p className="text-xs font-bold text-slate-900 mb-2">FIX: Make.com Sleep Logic</p>
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="bg-slate-100 p-1 px-2 rounded">Webhook</span>
                <span className="text-slate-400">→</span>
                <span className="bg-blue-600 text-white p-1 px-2 rounded font-bold">Tools: Sleep (2s)</span>
                <span className="text-slate-400">→</span>
                <span className="bg-slate-100 p-1 px-2 rounded">Sheets</span>
              </div>
              <p className="mt-2 text-[10px] text-slate-500 italic">This enforces a staggered queue, bypassing API rate limits.</p>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-3xl relative overflow-hidden">
            <h4 className="font-bold text-blue-400 mb-4 uppercase tracking-wider text-xs">Stateful Audit Trail</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span>Scenario Run ID Logging</span>
                <span className="text-emerald-400 font-bold">ENABLED</span>
              </div>
              <p className="text-xs opacity-60 leading-relaxed">
                {/* Fix: Wrapped {{scenario.runId}} in curly braces and a string to prevent it from being parsed as a JSX object expression */}
                We now map every Sheet row to a <code>{"{{scenario.runId}}"}</code>. If a transaction fails, we can jump directly to the Make.com execution log using the phone number as the key.
              </p>
              <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/20 font-mono text-[10px]">
                {"{ phone: '9198...', runId: 'rt_8829x', status: 'SUCCESS' }"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: RETENTION VALUE */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-2xl shadow-lg">
            📊
          </div>
          <h3 className="text-2xl font-bold text-slate-900">2. Retention Value (Owner Snapshot)</h3>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem] relative">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              <h4 className="font-bold text-emerald-900 mb-2">Scenario: 9PM_Daily_Snapshot</h4>
              <p className="text-sm text-emerald-700 mb-6">Daily financial visibility is the #1 predictor of kirana retention. Owners want to see their hard work quantified.</p>
              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 mb-3">TEMPLATE: shop_daily_stats</p>
                <p className="text-sm font-medium text-slate-800 leading-relaxed">
                  "Namaste! 🙏<br/>
                  Aaj ka Vyapar: <span className="text-emerald-600">₹4,250</span><br/>
                  Naye Grahak: <span className="text-emerald-600">3</span><br/>
                  Total Udhaari: <span className="text-emerald-600">₹850</span><br/><br/>
                  DukaanMitra se jude rehne ke liye shukriya!"
                </p>
              </div>
            </div>
            <div className="w-full lg:w-72 space-y-4">
               <div className="p-4 bg-emerald-900 rounded-2xl text-white">
                  <h5 className="text-[10px] font-bold uppercase opacity-60 mb-2">Human-in-the-loop</h5>
                  <p className="text-xs">If owner replies <span className="text-amber-400 font-bold">"Galat"</span>, the system alerts the founder immediately. <strong>Trust is fragile; handle errors with human touch.</strong></p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: REVENUE OPS */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg">
            💳
          </div>
          <h3 className="text-2xl font-bold text-slate-900">3. Revenue Ops (Pay-or-Wait Gate)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <div className="text-indigo-600 font-bold text-sm mb-2">GATE LOGIC</div>
            <p className="text-xs text-slate-500 mb-4">Messages from EXPIRED status are blocked from AI Parsing.</p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-mono">
              IF (Status == 'EXPIRED') <br/>
              THEN Send 'payment_required'
            </div>
          </div>
          <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <div className="text-indigo-600 font-bold text-sm mb-2">AUTO-UNBLOCK</div>
            <p className="text-xs text-slate-500 mb-4">Razorpay Webhook automatically sets status to ACTIVE.</p>
            <div className="flex items-center space-x-2 text-[10px] text-emerald-600 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Zero-latency reconnection.</span>
            </div>
          </div>
          <div className="p-6 bg-indigo-900 text-white rounded-3xl">
            <div className="text-indigo-300 font-bold text-sm mb-2">EXIT CRITERIA</div>
            <p className="text-xs opacity-80 leading-relaxed mb-4">When to migrate from Sheets to PostgreSQL:</p>
            <ul className="text-[10px] space-y-1 opacity-90 italic">
              <li>• Transactions &gt; 5,000 rows</li>
              <li>• Response Latency &gt; 10s</li>
              <li>• Concurrent Users &gt; 5</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: ROADMAP */}
      <section className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center space-x-2">
           <span>📅</span>
           <span>Day 8–15 Execution Roadmap</span>
        </h3>
        
        <div className="space-y-4 relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
          
          {[
            { day: "D08", task: "Deploy Sleep modules to prevent Sheets race conditions.", icon: "💤" },
            { day: "D10", task: "Harden Hinglish Slang Parser (Low Temp 0.1).", icon: "🤖" },
            { day: "D12", task: "Activate 9PM Daily Sales Reports for all stores.", icon: "📉" },
            { day: "D15", task: "Audit ARPU vs System Latency. Signal Phase 5 (Scaling).", icon: "🏁" },
          ].map((item, i) => (
            <div key={i} className="relative pl-12">
              <div className="absolute left-2 w-4 h-4 rounded-full bg-white border-4 border-blue-600 z-10"></div>
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-bold text-slate-400">{item.day}</span>
                  <span className="text-sm text-slate-700">{item.task}</span>
                </div>
                <span className="text-xl">{item.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-rose-900 text-white p-8 rounded-[2rem] text-center">
        <h4 className="text-xl font-bold mb-2 uppercase tracking-tighter italic">"Scale is a liability without hardening."</h4>
        <p className="text-xs opacity-60">Phase 4 focuses on ensuring every single WhatsApp message creates a reliable financial record.</p>
      </footer>
    </div>
  );
};

export default ReliabilityPlaybook;
