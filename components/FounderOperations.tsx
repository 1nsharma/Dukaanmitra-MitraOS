
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Customer } from '../types';

interface FounderOperationsProps {
  customers: Customer[];
}

const FounderOperations: React.FC<FounderOperationsProps> = ({ customers }) => {
  const [activeTab, setActiveTab] = useState<'cockpit' | 'economics' | 'compliance' | 'recovery'>('cockpit');

  const revenueData = [
    { name: 'Week 1', rev: 4000, cost: 800 },
    { name: 'Week 2', rev: 9500, cost: 1400 },
    { name: 'Week 3', rev: 15000, cost: 2100 },
    { name: 'Week 4', rev: 22000, cost: 3200 },
  ];

  const costBreakdown = [
    { name: 'Gupshup', value: 45, color: '#4f46e5' },
    { name: 'Make.com', value: 15, color: '#10b981' },
    { name: 'Gemini OCR', value: 30, color: '#f59e0b' },
    { name: 'Cloud/DB', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="border-b border-slate-200 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Phase 7</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-900 font-bold">Founder Mode Operations</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-black text-slate-500 uppercase tracking-tighter italic text-blue-600">Executive Control Active</span>
          </div>
        </div>
        <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none italic">The Solo Cockpit</h2>
        <p className="text-xl text-slate-500 mt-4 max-w-3xl leading-relaxed">
          Operational mastery for the solo founder. High-density metrics, unit economics enforcement, and structured growth protocols.
        </p>
      </header>

      {/* Navigation */}
      <div className="flex space-x-2 bg-slate-100 p-1 rounded-2xl">
        {[
          { id: 'cockpit', label: 'Admin Cockpit', icon: '🕹️' },
          { id: 'economics', label: 'Unit Economics', icon: '💹' },
          { id: 'compliance', label: 'Compliance & Legal', icon: '⚖️' },
          { id: 'recovery', label: 'Disaster Recovery', icon: '🚨' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'cockpit' && (
        <div className="space-y-8">
          {/* Section 1: Live Ticker */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Paid Stores', value: customers.filter(c => c.paidStatus === 'Active').length, icon: '🏪', trend: '+2 this week' },
              { label: "Today's TTV", value: '₹14,500', icon: '📈', trend: '+12% vs yesterday' },
              { label: 'API Error Rate', value: '0.04%', icon: '⚠️', trend: 'Healthy (Target < 1%)' },
              { label: 'Support Tickets', value: '2', icon: '🎫', trend: 'SLA: 12m' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${i === 2 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>LIVE</span>
                </div>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-[10px] text-emerald-600 mt-2 font-medium">{stat.trend}</p>
              </div>
            ))}
          </div>

          {/* User Management Panel */}
          <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl overflow-hidden relative">
            <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <span className="text-blue-400">🛡️</span>
              <span>Account Controls</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {customers.map((c, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-5 hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-bold text-sm">{c.name}</p>
                      <p className="text-[10px] opacity-50">ID: {c.storeId}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${c.paidStatus === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {c.paidStatus}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="text-[9px] font-bold py-2 bg-rose-500/20 text-rose-400 rounded-xl hover:bg-rose-500/30 transition">PAUSE ACCOUNT</button>
                    <button className="text-[9px] font-bold py-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition">EXTEND TRIAL</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[120px]"></div>
          </div>

          {/* Support Router Flow */}
          <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[3rem] flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold text-indigo-900">Support_Router (Make.com)</h3>
              <p className="text-sm text-indigo-700 leading-relaxed">
                Structured support via Notion Kanban prevent founder burnout. Never use personal WhatsApp for L1 issues.
              </p>
              <div className="flex items-center space-x-4">
                 <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-indigo-50 bg-indigo-200" />)}
                 </div>
                 <p className="text-xs text-indigo-600 font-bold">3 active tickets in Notion</p>
              </div>
            </div>
            <div className="md:w-72 bg-white p-6 rounded-3xl border border-indigo-100 shadow-sm space-y-3">
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SLA Alert Engine</div>
               <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-rose-700">Ticket #882</span>
                  <span className="text-[8px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold">ESCALATED</span>
               </div>
               <p className="text-[10px] text-slate-500 italic">"If ticket not closed in 4 hours, notify founder via mobile push."</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'economics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">Revenue vs Direct Cost</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="rev" stroke="#4f46e5" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                    <Area type="monotone" dataKey="cost" stroke="#ef4444" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 text-[10px] font-bold uppercase tracking-widest">
                <span className="flex items-center space-x-2"><span className="w-2 h-2 rounded-full bg-indigo-600"></span> <span>Subscription Revenue</span></span>
                <span className="flex items-center space-x-2"><span className="w-2 h-2 rounded-full bg-rose-600"></span> <span>Platform Costs</span></span>
              </div>
            </div>

            <div className="space-y-6">
               <div className="bg-emerald-900 text-white p-8 rounded-[3rem]">
                  <h4 className="text-emerald-400 font-black uppercase text-xs mb-4 tracking-tighter">Profitability Check</h4>
                  <div className="space-y-4">
                     <div className="flex justify-between border-b border-emerald-800 pb-2">
                        <span className="text-sm">Revenue per Shop</span>
                        <span className="font-bold text-lg">₹499</span>
                     </div>
                     <div className="flex justify-between border-b border-emerald-800 pb-2">
                        <span className="text-sm">Infrastructure Cost</span>
                        <span className="font-bold text-rose-400">~₹70</span>
                     </div>
                     <div className="flex justify-between pt-2">
                        <span className="text-sm font-bold">Gross Margin</span>
                        <span className="text-2xl font-black text-emerald-400">85.9%</span>
                     </div>
                  </div>
               </div>

               <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem]">
                  <h4 className="font-bold text-amber-900 flex items-center space-x-2 mb-2">
                    <span>⚡</span>
                    <span>Fair Usage Policy (FUP)</span>
                  </h4>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Margins collapse if OCR image uploads &gt; 100/mo. <br/>
                    <strong>Auto-Action:</strong> Switch store to <em>Text-Only Mode</em> once 100 images are hit. Prevents runaway billing.
                  </p>
               </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
             <h3 className="text-xl font-bold mb-6">Component Cost Weight (MTD)</h3>
             <div className="flex items-center justify-around flex-wrap gap-8">
                {costBreakdown.map((item, i) => (
                  <div key={i} className="text-center">
                     <div className="w-24 h-24 rounded-full border-8 border-slate-50 flex items-center justify-center mb-2" style={{ borderTopColor: item.color }}>
                        <span className="font-black text-lg text-slate-900">{item.value}%</span>
                     </div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.name}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
             <h3 className="text-3xl font-bold text-slate-900">India DPDP Act (2025)</h3>
             <p className="text-slate-500 text-sm">Automated compliance tracking to ensure legal safety for the platform.</p>
             <ul className="space-y-4">
                {[
                  { label: "Explicit Consent at Onboarding", status: "VERIFIED" },
                  { label: "Data Localization (Mumbai Region)", status: "VERIFIED" },
                  { label: "User Right to Erasure (STOP cmd)", status: "VERIFIED" },
                  { label: "No Third-Party Data Sharing", status: "VERIFIED" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <span className="text-sm font-medium text-slate-700">{item.label}</span>
                     <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">{item.status}</span>
                  </li>
                ))}
             </ul>
          </div>
          <div className="bg-slate-900 text-white p-8 rounded-[3rem] flex flex-col justify-between">
             <div className="space-y-4">
               <h3 className="text-2xl font-bold italic">"Trust is our #1 Currency"</h3>
               <p className="opacity-60 text-sm leading-relaxed">
                  We clearly state: “We do not sell transaction data to banks or lenders.” This is our primary moat against bigger ERP competitors.
               </p>
               <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-mono leading-relaxed">
                  Privacy Policy: dukaanmitra.com/privacy <br/>
                  Compliance Officer: Founder (Solo Mode) <br/>
                  Encryption: AES-256 for PII
               </div>
             </div>
             <div className="mt-8 p-4 bg-blue-600 rounded-2xl flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest">Legal Review Status</span>
                <span className="text-xs font-black">PENDING FINAL AUDIT</span>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'recovery' && (
        <div className="space-y-8">
          <div className="bg-rose-50 border border-rose-100 p-10 rounded-[4rem] text-center space-y-6">
             <div className="w-20 h-20 bg-rose-600 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-xl shadow-rose-200">
                🚨
             </div>
             <h3 className="text-4xl font-black text-rose-900 italic tracking-tighter">The "Red Button" Protocol</h3>
             <p className="text-rose-700 max-w-2xl mx-auto text-sm leading-relaxed">
                Rehearsed failure plans save companies. Assume Gupshup bans our number or the SQL database corrupts tomorrow.
             </p>
             <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button className="px-8 py-4 bg-rose-600 text-white rounded-2xl font-black shadow-lg hover:bg-rose-700 transition transform hover:scale-105">
                   TRIGGER EMERGENCY BACKUP
                </button>
                <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-lg hover:bg-black transition transform hover:scale-105">
                   DOWNLOAD RECOVERY PLAYBOOK
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-slate-900">Weekly Backup Strategy</h4>
                <p className="text-xs text-slate-500">Every Sunday at 23:00 IST:</p>
                <ul className="text-[10px] space-y-2 font-bold text-slate-700">
                   <li className="flex items-center space-x-2"><span>✅</span> <span>Export all SQL tables to encrypted CSV</span></li>
                   <li className="flex items-center space-x-2"><span>✅</span> <span>Zip & Email to founder backup Gmail</span></li>
                   <li className="flex items-center space-x-2"><span>✅</span> <span>Verify integrity of last backup</span></li>
                </ul>
             </div>
             <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-slate-900">Number Ban Recovery</h4>
                <p className="text-xs text-slate-500">In case of Meta/WABA suspension:</p>
                <ul className="text-[10px] space-y-2 font-bold text-slate-700">
                   <li className="flex items-center space-x-2"><span>1.</span> <span>Set SYSTEM_STATUS = MAINTENANCE</span></li>
                   <li className="flex items-center space-x-2"><span>2.</span> <span>Register new WABA on Gupshup</span></li>
                   <li className="flex items-center space-x-2"><span>3.</span> <span>Broadcast redirect SMS to all owners</span></li>
                </ul>
             </div>
          </div>
        </div>
      )}

      {/* FINAL HANDOFF */}
      <footer className="bg-slate-900 text-white p-12 rounded-[4rem] text-center space-y-6">
         <h3 className="text-3xl font-black italic uppercase tracking-tighter">System Status: Live & Optimized</h3>
         <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/20 text-xs font-bold">Billing Cards Attached</span>
            <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/20 text-xs font-bold">WABA Profile Verified</span>
            <span className="px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-full border border-indigo-500/20 text-xs font-bold">PII Hashing Active</span>
         </div>
         <div className="pt-8 border-t border-white/10 flex flex-col items-center">
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">Final Deployment Handoff</p>
            <div className="flex items-center space-x-8">
               <div className="text-center">
                  <p className="text-2xl font-black">2025</p>
                  <p className="text-[8px] opacity-40 uppercase font-bold">Market Cycle</p>
               </div>
               <div className="w-px h-10 bg-white/10"></div>
               <div className="text-center">
                  <p className="text-2xl font-black">MVP</p>
                  <p className="text-[8px] opacity-40 uppercase font-bold">Build Version</p>
               </div>
               <div className="w-px h-10 bg-white/10"></div>
               <div className="text-center text-emerald-400">
                  <p className="text-2xl font-black">GO</p>
                  <p className="text-[8px] opacity-40 uppercase font-bold">Launch State</p>
               </div>
            </div>
         </div>
         <p className="text-slate-600 text-[8px] italic mt-10">
            SYSTEM STATUS: COMPLETE. BUILD PHASE: ENDED. OPERATIONS PHASE: BEGIN.
         </p>
      </footer>
    </div>
  );
};

export default FounderOperations;
