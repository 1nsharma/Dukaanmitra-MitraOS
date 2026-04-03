
import React from 'react';

const RecoveryOps: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">
      <header className="border-b border-slate-200 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Day 4 Protocol</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-900 font-bold">Safe Recovery Strategist</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-black text-slate-500 uppercase tracking-tighter">Vasooli Mode Active</span>
          </div>
        </div>
        <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none italic">The Gentle Vasooli Engine</h2>
        <p className="text-xl text-slate-500 mt-4 max-w-3xl leading-relaxed">
          Recover old udhaari safely. We use "Account Statements" instead of "Collection Notices" to maintain trust and stay policy-compliant.
        </p>
      </header>

      {/* TASK 1: DATA PREPARATION */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-2xl shadow-xl">📊</div>
          <h3 className="text-3xl font-bold text-slate-900">1. Data Prep (Google Sheets)</h3>
        </div>
        
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
          <p className="text-slate-600 text-sm">Add these columns to your <strong>Customers</strong> sheet to enable debt ageing visualization.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-xs uppercase mb-2">Column F: LastUpdate</h4>
              <p className="text-[10px] text-slate-500">Record of last payment or bill entry.</p>
            </div>
            <div className="p-5 bg-blue-50 rounded-2xl border border-blue-200">
              <h4 className="font-bold text-blue-900 text-xs uppercase mb-2">Column G: PendingSince</h4>
              <div className="flex items-center justify-between bg-white p-2 rounded border border-blue-100 mt-2">
                <code className="text-[10px] text-blue-600">=TODAY()-F2</code>
                <button onClick={() => copyToClipboard('=IF(E2="Trial","",TODAY()-F2)')} className="text-[8px] font-bold text-blue-500">COPY</button>
              </div>
            </div>
            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200">
              <h4 className="font-bold text-emerald-900 text-xs uppercase mb-2">Column H: PaymentLink</h4>
              <p className="text-[10px] text-emerald-600 font-mono">upi://pay?pa=shop@upi...</p>
            </div>
          </div>

          <div className="p-6 bg-rose-50 border-l-4 border-rose-500 rounded-r-2xl">
            <h5 className="font-bold text-rose-900 mb-2">Rule: Red Flagging</h5>
            <p className="text-xs text-rose-700">
              Apply Conditional Formatting to <strong>Column G</strong>: If value &gt; 15, background = RED. 
              <br/><em>Visual red flags force the owner to act on old debts during their morning review.</em>
            </p>
          </div>
        </div>
      </section>

      {/* TASK 2: WHATSAPP STRATEGY */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-2xl shadow-xl">💬</div>
          <h3 className="text-3xl font-bold text-slate-900">2. Gentle Reminder Template</h3>
        </div>

        <div className="bg-slate-900 text-white p-10 rounded-[4rem] flex flex-col lg:flex-row gap-12 items-center relative overflow-hidden">
          <div className="flex-1 space-y-6 relative z-10">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
               <p className="text-xs font-bold text-emerald-400 mb-1">TEMPLATE ID: dm_gentle_remind_v1</p>
               <p className="text-sm italic leading-relaxed">
                 "Namaste {"{{1}}"} 🙏 <br/>
                 {"{{2}}"} par aapka naya account statement generate hua hai. <br/><br/>
                 Total Pending Amount: <strong>₹{"{{3}}"}</strong> <br/>
                 Pending Since: {"{{4}}"} se <br/><br/>
                 Kripya dukan par visit karein ya online pay karein: {"{{5}}"} <br/><br/>
                 Agar already payment ho chuka hai, to is message ko ignore karein."
               </p>
            </div>
            <button 
              onClick={() => copyToClipboard(`Namaste {{1}} 🙏\n{{2}} par aapka naya account statement generate hua hai.\n\nTotal Pending Amount: ₹{{3}}\nPending Since: {{4}} se\n\nKripya dukan par visit karein\nya online pay karein: {{5}}\n\nAgar already payment ho chuka hai,\nto is message ko ignore karein.`)}
              className="text-xs font-bold text-emerald-400 hover:underline"
            >
              COPY STRATEGY TEMPLATE
            </button>
          </div>
          <div className="lg:w-80 bg-emerald-50 text-slate-900 p-8 rounded-3xl border-4 border-emerald-500/20 shadow-2xl space-y-4">
             <h5 className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Why this works</h5>
             <p className="text-xs leading-relaxed">
               <strong>1. No Shame:</strong> Calls it an "Account Statement". <br/>
               <strong>2. Professional:</strong> Focuses on data, not demand. <br/>
               <strong>3. Safe:</strong> Respects WhatsApp policy against aggressive collection.
             </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* TASK 3: AUTOMATION LOGIC */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-xl">⚙️</div>
          <h3 className="text-3xl font-bold text-slate-900">3. Weekly Sweeper (Make.com)</h3>
        </div>

        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h4 className="font-bold text-slate-900">The "Owner-First" Loop</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Never message customers directly. Always aggregate the list and send it to the Shop Owner for approval first.
              </p>
              <div className="space-y-3">
                 <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                    <span className="text-xs font-medium">Search: PendingSince &gt;= 15 days</span>
                 </div>
                 <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                    <span className="text-xs font-medium">Aggregate: List of customer names + amounts</span>
                 </div>
                 <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                    <span className="text-xs font-medium">Notify Owner: "Should I send reminders? YES/NO"</span>
                 </div>
              </div>
            </div>
            <div className="bg-indigo-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-center border-4 border-indigo-800">
               <p className="text-[10px] font-bold text-indigo-400 uppercase mb-3">Owner Preview Example</p>
               <div className="bg-white/5 p-4 rounded-xl font-mono text-[10px] space-y-1">
                 <p>Sir,</p>
                 <p>15 din se pending list:</p>
                 <p className="text-emerald-400 mt-2">1. Rahul - ₹1,200 (18 days)</p>
                 <p className="text-emerald-400">2. Sunil - ₹850 (15 days)</p>
                 <p className="mt-2 opacity-60 italic">Kya inhen reminder bhejun?</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* TASK 4: OPERATION DEC 31 */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white text-2xl shadow-xl">🎯</div>
          <h3 className="text-3xl font-bold text-slate-900">4. Dec 31 Field Operation</h3>
        </div>

        <div className="bg-orange-50 border border-orange-100 p-10 rounded-[4rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-2xl font-black text-orange-900 italic tracking-tighter uppercase">The PMF Litmus Test</h4>
              <p className="text-orange-800 text-sm leading-relaxed">
                If even <strong>ONE</strong> customer pays after a reminder, you have proved the core value of DukaanMitra. It's no longer a "Ledger"—it's a "Recovery Partner".
              </p>
              <ul className="space-y-3">
                 {[
                   "Identify top 3 pending customers per pilot shop.",
                   "Send reminder LIVE in front of the shop owner.",
                   "Observe response (UPI pay, Phone call, or Visit).",
                   "Record 'Time to Payment' as a key investor metric."
                 ].map((task, i) => (
                   <li key={i} className="flex items-center space-x-3 text-sm font-bold text-orange-900">
                      <input type="checkbox" className="rounded border-orange-300 bg-white" />
                      <span>{task}</span>
                   </li>
                 ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-orange-200/50 border border-orange-100 flex flex-col justify-center">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Founder Mindset</p>
               <p className="text-2xl font-black text-slate-900 leading-tight">"Money in the owner's pocket is the only metric that prevents churn."</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL SAFETY CHECK */}
      <section className="bg-slate-900 text-white p-12 rounded-[4rem] relative overflow-hidden">
         <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
               <h3 className="text-3xl font-black italic mb-4">Safety & Compliance Audit</h3>
               <p className="opacity-60 text-sm leading-relaxed">
                 Protecting the founder and the platform from legal and technical bans.
               </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
               <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs font-bold text-emerald-400 uppercase mb-1">Manual Gate</p>
                  <p className="text-[10px] opacity-70">No auto-spam. Owner must click YES.</p>
               </div>
               <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs font-bold text-blue-400 uppercase mb-1">UPI Validity</p>
                  <p className="text-[10px] opacity-70">Deep link tested for PhonePe/GPay.</p>
               </div>
               <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs font-bold text-rose-400 uppercase mb-1">Policy Guard</p>
                  <p className="text-[10px] opacity-70">Avoid words like "Due", "Late", "Fine".</p>
               </div>
               <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs font-bold text-amber-400 uppercase mb-1">Wallet Check</p>
                  <p className="text-[10px] opacity-70">Ensure Gupshup balance for utility msgs.</p>
               </div>
            </div>
         </div>
      </section>

      <footer className="text-center pt-12 pb-20 border-t border-slate-200">
         <div className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-bold shadow-xl">
            <span>🚀</span>
            <span>DAY 4 DEPLOYMENT: RECOVERY MODULE ARMED</span>
         </div>
         <p className="text-slate-400 text-[10px] mt-4 uppercase font-black tracking-widest italic">Blueprint Complete. Revenue Mode Engaged.</p>
      </footer>
    </div>
  );
};

export default RecoveryOps;
