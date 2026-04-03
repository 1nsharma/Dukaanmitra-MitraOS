
import React from 'react';

const StreetSalesPlaybook: React.FC = () => {
  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">
      <header className="border-b border-slate-200 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Phase 8</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-900 font-bold uppercase tracking-tighter">Street Sales & Pilot Acquisition</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
            <span className="text-xs font-black text-slate-500 uppercase">Boots on the Ground</span>
          </div>
        </div>
        <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none">The Ground-Level Playbook</h2>
        <p className="text-xl text-slate-500 mt-4 max-w-3xl leading-relaxed italic">
          Forget jargon. Forget digital marketing. This is how you win the first 20 kirana shops with nothing but a WhatsApp number and a smile.
        </p>
      </header>

      {/* SECTION 1: WHATSAPP PITCH */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-2xl shadow-xl">📱</div>
          <h3 className="text-3xl font-bold text-slate-900">1. The "Vasooli" WhatsApp Pitch</h3>
        </div>
        
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-slate-900 uppercase tracking-tighter italic">"Keep it Desi"</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                In India, Kirana owners care about two things: <strong>Recovering money (Vasooli)</strong> and <strong>Easy ledger (Hisaab)</strong>. Use words they know.
              </p>
              <div className="p-4 bg-orange-50 border-l-4 border-orange-500 text-orange-800 text-xs italic">
                "Simple message works because it doesn't sound like an ad. It sounds like a recommendation."
              </div>
            </div>
            
            <div className="bg-[#e5ddd5] rounded-[2rem] p-6 border-4 border-white shadow-xl">
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-800 leading-relaxed relative">
                  <p>Bhai, dukaan ki udhari register mein likhna band karo. Maine <strong>DukaanMitra</strong> banaya hai—WhatsApp pe 'Rahul 500' likho, hisaab save ho jayega. Customer ko auto-reminder bhi jayega.</p>
                  <p className="mt-2 font-bold">Free beta trial chahiye? 'YES' reply karo.</p>
                  <span className="absolute bottom-1 right-2 text-[8px] text-slate-400 uppercase font-bold">10:45 AM</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </section>

      {/* SECTION 2: 30-SECOND DEMO */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl shadow-xl">⏱️</div>
          <h3 className="text-3xl font-bold text-slate-900">2. The 30-Second In-Store Demo</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 text-white p-8 rounded-[3rem] space-y-6">
            <h4 className="text-blue-400 font-bold uppercase text-xs tracking-widest">The "Magic Moment" Script</h4>
            <div className="space-y-4 font-medium">
              <p className="text-sm opacity-60 italic">"Bhaiya, udhari ka hisaab register mein karte ho? Kitna time lagta hai dhundne mein?"</p>
              <p className="text-sm bg-white/10 p-3 rounded-xl border border-white/10">Owner: "Time lagta hai."</p>
              <p className="text-sm opacity-60 italic">"Mera number save karo. Ab WhatsApp pe bhejo: <strong>Amit 10 chai</strong>."</p>
              <div className="flex items-center space-x-3 text-emerald-400 animate-pulse">
                <span>➔</span>
                <span className="text-xs font-bold uppercase">Confirmation arrives in &lt; 2 seconds</span>
              </div>
              <p className="text-sm border-t border-white/10 pt-4">
                <strong>Hook:</strong> "Bas. Hisaab save. Raat ko PDF bhi mil jayegi. Try karoge?"
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 p-8 rounded-[3rem] flex flex-col justify-center text-center">
            <div className="text-5xl mb-4">✨</div>
            <h4 className="text-xl font-black text-blue-900 italic mb-2">"Proof beats pitch."</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              Kirana owners get pitched by 10 apps a day. DukaanMitra wins because the demo happens inside <strong>their own WhatsApp</strong> in 10 seconds.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: OBJECTIONS */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white text-2xl shadow-xl">🛡️</div>
          <h3 className="text-3xl font-bold text-slate-900">3. Handling Trust Barriers</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm border-b-4 border-b-rose-500">
            <h4 className="font-bold text-slate-900 mb-2 italic">"Data Safe Hai?"</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              "WhatsApp jaisa hi secure hai. Register kho sakta hai, WhatsApp nahi. Aapka phone aapki dukaan."
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm border-b-4 border-b-rose-500">
            <h4 className="font-bold text-slate-900 mb-2 italic">"Customer ko message?"</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              "Setting band kar sakte hain. Par bill hoga toh customer deny nahi karega. Aapki imandari badhegi."
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm border-b-4 border-b-rose-500">
            <h4 className="font-bold text-slate-900 mb-2 italic">"Kitne Paise?"</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              "30 din free. Uske baad sirf ₹15 roz ka — ek chai se kam. Dhande mein itna toh bachega hi."
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: STANDEE */}
      <section className="bg-slate-900 text-white p-12 rounded-[4rem] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-12 relative z-10 items-center">
          <div className="flex-1 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white text-2xl">🏷️</div>
            <h3 className="text-3xl font-bold">4. The Physical QR Standee</h3>
            <p className="opacity-70 leading-relaxed">
              Physical assets build <strong>Social Proof</strong>. When a customer sees a standee on the counter, DukaanMitra becomes a real "Service" and not just a message.
            </p>
            <div className="space-y-4">
               <div className="flex items-center space-x-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold">1</span>
                  <span>Headline: "Hisaab Yahi WhatsApp Karein!"</span>
               </div>
               <div className="flex items-center space-x-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold">2</span>
                  <span>Action: Scan QR for Bill Log</span>
               </div>
            </div>
          </div>
          
          <div className="w-72 aspect-[3/4] bg-white rounded-2xl p-6 text-slate-900 flex flex-col items-center justify-between shadow-2xl rotate-3 transform border-8 border-slate-800">
            <div className="text-center">
              <h5 className="font-black text-2xl italic tracking-tighter">HISAAB YAHI!</h5>
              <p className="text-[10px] font-bold text-slate-400 uppercase">WhatsApp Ledger Active</p>
            </div>
            <div className="w-32 h-32 bg-slate-100 rounded-xl flex items-center justify-center text-4xl border-2 border-dashed border-slate-300 italic text-slate-300">
              [QR]
            </div>
            <div className="text-center w-full">
              <p className="text-[10px] font-bold text-indigo-600 mb-1 tracking-widest uppercase">Powered By</p>
              <h6 className="font-black text-xl italic text-slate-900">DukaanMitra</h6>
              <div className="h-1 w-full bg-indigo-600 mt-2"></div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* SECTION 5: CEREMONY */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-xl">🤝</div>
          <h3 className="text-3xl font-bold text-slate-900">5. The Onboarding Ceremony</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Save Number", detail: "Save as 'Dukaan Manager' so it appears at top of contacts.", icon: "💾" },
            { step: "02", title: "Pin Chat", detail: "Show them how to 'Pin' the chat so it never gets lost.", icon: "📌" },
            { step: "03", title: "First Real Entry", detail: "Make them enter ONE real pending udhari live. Ownership starts now.", icon: "✍️" },
          ].map((item, i) => (
            <div key={i} className="bg-indigo-50 p-6 rounded-[2.5rem] border border-indigo-100 flex flex-col items-center text-center space-y-3">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">{item.step}</p>
              <h5 className="font-bold text-slate-900">{item.title}</h5>
              <p className="text-xs text-indigo-700 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: VIRAL LOOP */}
      <section className="bg-emerald-50 border border-emerald-100 p-10 rounded-[4rem] text-center space-y-6">
         <h3 className="text-3xl font-black text-emerald-900 italic tracking-tighter">"Bhai-Bhai" Referrals</h3>
         <p className="text-emerald-700 max-w-2xl mx-auto text-sm leading-relaxed">
            Market associations and local clusters are networks. One happy shopkeeper can bring the whole lane.
         </p>
         <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-emerald-100 inline-block">
            <p className="text-2xl font-black text-slate-900 mb-2">Offer: 2 Friend = 1 Month Free</p>
            <p className="text-xs text-slate-500">"Agar aap 2 dukaanon ko jodein, toh agla mahina aapka muft."</p>
         </div>
      </section>

      {/* SECTION 7: ACTION PLAN */}
      <section className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-2xl shadow-xl">🏁</div>
          <h3 className="text-3xl font-bold text-slate-900">7. Daily Founder Action Plan</h3>
        </div>

        <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                 <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Today's Mission</h4>
                 <ul className="space-y-3">
                    <li className="flex items-center space-x-3 text-sm">
                       <input type="checkbox" className="rounded border-slate-300" />
                       <span>Finish Phase 1 connection (Gupshup + Sheet)</span>
                    </li>
                    <li className="flex items-center space-x-3 text-sm">
                       <input type="checkbox" className="rounded border-slate-300" />
                       <span>Send "Vasooli" pitch to 50 local contacts</span>
                    </li>
                    <li className="flex items-center space-x-3 text-sm">
                       <input type="checkbox" className="rounded border-slate-300" />
                       <span>Print 10 QR Standee samples (DIY)</span>
                    </li>
                 </ul>
              </div>
              <div className="space-y-4">
                 <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Tomorrow's Groundwork</h4>
                 <ul className="space-y-3">
                    <li className="flex items-center space-x-3 text-sm">
                       <input type="checkbox" className="rounded border-slate-300" />
                       <span>Visit 5 physical shops in nearest market</span>
                    </li>
                    <li className="flex items-center space-x-3 text-sm">
                       <input type="checkbox" className="rounded border-slate-300" />
                       <span>Do not go home until 2 active pilots signed</span>
                    </li>
                    <li className="flex items-center space-x-3 text-sm font-bold text-emerald-600">
                       <input type="checkbox" className="rounded border-slate-300" />
                       <span>Target: 20 Pilots by January 10</span>
                    </li>
                 </ul>
              </div>
           </div>
        </div>
      </section>

      <footer className="text-center pt-12 pb-20 space-y-6">
         <h2 className="text-4xl font-black italic text-slate-900 tracking-tighter uppercase">Blueprint Complete. Execution Begins Now.</h2>
         <div className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-bold shadow-xl">
            <span>🚀</span>
            <span>LAUNCH MODE: ACTIVE</span>
         </div>
      </footer>
    </div>
  );
};

export default StreetSalesPlaybook;
