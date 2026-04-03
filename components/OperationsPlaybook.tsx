
import React from 'react';

const OperationsPlaybook: React.FC = () => {
  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">
      <header className="border-b border-slate-200 pb-6">
        <div className="flex items-center space-x-3 mb-2">
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Phase 3</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500 font-medium">Operations Architect View</span>
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Pilot Scale Ops Playbook</h2>
        <p className="text-lg text-slate-500 mt-2 max-w-3xl">
          Field-ready protocols for onboarding the first 10–20 kirana shops, auditing reliability, and generating investor-ready signals.
        </p>
      </header>

      {/* SECTION 1: ONBOARDING */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-200">
            🚚
          </div>
          <h3 className="text-2xl font-bold text-slate-900">1. Pilot Onboarding Flow</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 border-b pb-2">Step-by-Step Checklist</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">01</span>
                <div>
                  <p className="font-bold text-sm text-slate-900">Assign StoreID</p>
                  <p className="text-xs text-slate-500">Assign unique ID (e.g., DM_DEL_001). Essential for data segmentation.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">02</span>
                <div>
                  <p className="font-bold text-sm text-slate-900">Sheet Tab Isolation</p>
                  <p className="text-xs text-slate-500">Create a filtered view in Master DB for this StoreID. Ensure shop privacy.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">03</span>
                <div>
                  <p className="font-bold text-sm text-slate-900">Activate WABA Number</p>
                  <p className="text-xs text-slate-500">Send `dm_welcome` via Gupshup to open the WhatsApp session window.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-blue-900 text-white p-6 rounded-3xl relative overflow-hidden">
            <h4 className="font-bold text-blue-400 mb-4 uppercase tracking-wider text-xs">The Physical Kit</h4>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <p className="text-center font-bold text-xl mb-4">A4 Signage Template</p>
              <div className="border-2 border-dashed border-white/40 p-4 text-center space-y-2">
                <p className="text-sm opacity-80">Is Number pe Bill bhejein:</p>
                <p className="text-2xl font-mono font-bold text-blue-300">+91 [Gupshup Number]</p>
                <div className="h-px bg-white/20 my-4"></div>
                <p className="text-xs font-bold">FORMAT:</p>
                <p className="text-sm italic">"Naam Amount Samaan"</p>
                <p className="text-[10px] opacity-60">Example: Aman 500 Doodh</p>
              </div>
            </div>
            <p className="text-[10px] mt-4 opacity-50">Physical signage reduces friction. Shopkeepers don't need to remember commands.</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: VALUE LOOP */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-200">
            📈
          </div>
          <h3 className="text-2xl font-bold text-slate-900">2. Daily Value Loop ("The Little Report")</h3>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem]">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm">
                <h5 className="font-bold text-emerald-900 mb-2">Scenario: Daily_EOD_Summary</h5>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span><strong>Trigger:</strong> Scheduler (21:00 IST)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span><strong>Compute:</strong> Sum(Amount), Count(Bills)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span><strong>Channel:</strong> WhatsApp Template `daily_summary`</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-emerald-700 leading-relaxed italic">
                "Daily feedback prevents churn. It proves the ledger is working while they sleep."
              </p>
            </div>
            <div className="w-full lg:w-80 bg-slate-900 p-6 rounded-3xl text-white font-mono text-xs leading-relaxed border-4 border-slate-800">
              <p className="text-emerald-400 mb-2">// Sample EOD Message</p>
              <p>Namaste!</p>
              <p>Aaj ki Total Sales: <span className="text-emerald-400">₹4,250</span></p>
              <p>Total Bills: <span className="text-emerald-400">12</span></p>
              <p className="mt-2">Details dekhne ke liye yahan click karein:</p>
              <p className="text-blue-400 underline">[Sheets_Link]</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TRIAGE */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-rose-200">
            🩺
          </div>
          <h3 className="text-2xl font-bold text-slate-900">3. System Audit Protocol</h3>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Symptom</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Diagnosis</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Immediate Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-bold text-slate-900">Double Rows</td>
                <td className="px-6 py-4 text-xs text-slate-500">Duplicate Webhook trigger from Gupshup</td>
                <td className="px-6 py-4 text-xs text-blue-600 font-medium">Add TransID uniqueness filter in Make</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-bold text-slate-900">Blank Names</td>
                <td className="px-6 py-4 text-xs text-slate-500">AI Parse failure (Bad syntax)</td>
                <td className="px-6 py-4 text-xs text-blue-600 font-medium">Set default name = "Customer" in Prompt</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-bold text-slate-900">Undelivered WA</td>
                <td className="px-6 py-4 text-xs text-slate-500">User blocked number or balance low</td>
                <td className="px-6 py-4 text-xs text-blue-600 font-medium">Check Wallet balance & set status=BLOCKED</td>
              </tr>
            </tbody>
          </table>
          <div className="p-4 bg-amber-50 text-[10px] text-amber-700 font-bold text-center border-t border-amber-100">
            CRITICAL: FOUNDERS MUST REVIEW SYSTEMLOGS SHEET DAILY AT 08:00 AM.
          </div>
        </div>
      </section>

      {/* SECTION 4: RECONCILIATION */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-200">
            💸
          </div>
          <h3 className="text-2xl font-bold text-slate-900">4. Cash-Flow & Payment Loop</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-4">Automation Rule: Renewal</h4>
            <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-400 uppercase">Condition</span>
                <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">Trigger</span>
              </div>
              <p className="text-sm font-medium text-slate-700">
                IF <span className="text-indigo-600">Today &gt; TrialEndDate</span> AND <span className="text-indigo-600">Status == TRIAL</span>
              </p>
              <div className="h-px bg-slate-100"></div>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                "Aapka free trial khatam ho gaya hai. DukaanMitra jaari rakhne ke liye ₹499 pay karein: [Link]"
              </p>
            </div>
          </div>
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
            <h4 className="font-bold text-emerald-900 mb-4">Success Webhook (Razorpay)</h4>
            <ul className="space-y-3 text-sm text-emerald-800">
              <li className="flex items-center space-x-3">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-600 flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Match Phone from `notes.phone`</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-600 flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Update `PaidStatus` = ACTIVE</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-600 flex items-center justify-center text-[10px] font-bold">3</span>
                <span>Send `payment_success` WA template</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 5: LIMITATIONS */}
      <section className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row gap-10">
          <div className="md:w-1/3">
            <h3 className="text-3xl font-black mb-4 leading-tight">Internal Honesty List</h3>
            <p className="text-slate-400 text-sm">Documenting MVP limits builds investor trust and prevents system crashes.</p>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h5 className="font-bold text-rose-400 text-sm mb-2">Sheet Row Locking</h5>
              <p className="text-xs text-slate-300">Google Sheets APIs can lock during high concurrency. <strong>Fix:</strong> Add 2s delay in Make scenarios.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h5 className="font-bold text-rose-400 text-sm mb-2">Slang/Dialect Accuracy</h5>
              <p className="text-xs text-slate-300">Mixed dialects drop accuracy &lt; 80%. <strong>Fix:</strong> Set AI Temperature = 0.1 for deterministic parsing.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h5 className="font-bold text-rose-400 text-sm mb-2">No Context Memory</h5>
              <p className="text-xs text-slate-300">Each message is stateless. <strong>Rule:</strong> Full command must be in ONE message.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h5 className="font-bold text-rose-400 text-sm mb-2">Scaling Limit</h5>
              <p className="text-xs text-slate-300">Sheets will crawl after 10k rows. <strong>Next Step:</strong> Migration to Supabase/PostgreSQL.</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* SECTION 6: METRICS */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white text-2xl shadow-lg shadow-amber-200">
            📊
          </div>
          <h3 className="text-2xl font-bold text-slate-900">6. Investor Readiness Metrics</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
            <p className="text-3xl font-black text-slate-900 mb-1">92%</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Accuracy Rate</p>
            <p className="text-[8px] text-slate-500 mt-2">Valid Parses / Total msgs</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
            <p className="text-3xl font-black text-slate-900 mb-1">14</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">DAS (Active Shops)</p>
            <p className="text-[8px] text-slate-500 mt-2">Shops sending ≥3 bills/day</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
            <p className="text-3xl font-black text-slate-900 mb-1">₹85</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CAC (Projected)</p>
            <p className="text-[8px] text-slate-500 mt-2">Meta + Gupshup / Shop</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
            <p className="text-3xl font-black text-slate-900 mb-1">&lt; 4s</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TTR (Response Time)</p>
            <p className="text-[8px] text-slate-500 mt-2">Webhook → Confirmation</p>
          </div>
        </div>
      </section>

      <footer className="pt-10 text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span>Next Phase: Scale-Up Conditions (Airtable Migration)</span>
        </div>
        <p className="text-slate-400 text-xs italic">All protocols verified for 2025 regional market pilot.</p>
      </footer>
    </div>
  );
};

export default OperationsPlaybook;
