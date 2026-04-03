
import React, { useState } from 'react';

const DeploymentGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Database", icon: "📑" },
    { title: "Gupshup", icon: "💬" },
    { title: "Make.com", icon: "⚙️" },
    { title: "Razorpay", icon: "💳" },
    { title: "Templates", icon: "📧" },
    { title: "Stability", icon: "🛡️" },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="space-y-8 pb-20">
      <header>
        <h2 className="text-3xl font-bold text-slate-900">Phase 2: Deployment Execution</h2>
        <p className="text-slate-500">Step-by-step instructions to take the DukaanMitra MVP live.</p>
      </header>

      {/* Step Indicator */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        {steps.map((step, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`flex flex-col items-center space-y-1 px-4 transition-all ${
              activeStep === idx ? 'scale-110' : 'opacity-40 hover:opacity-100'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm border ${
              activeStep === idx ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-400 border-slate-200'
            }`}>
              {step.icon}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${
              activeStep === idx ? 'text-blue-600' : 'text-slate-400'
            }`}>
              {step.title}
            </span>
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 min-h-[500px] overflow-hidden">
        {activeStep === 0 && (
          <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Module 1: Database Construction (Google Sheets)</h3>
            
            <div className="space-y-6">
              <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center space-x-2">
                  <span className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center text-xs">1</span>
                  <span>Sheet Setup: Customers</span>
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-white rounded-lg border border-slate-200"><strong>Column A:</strong> Phone (Plain Text)</div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200"><strong>Column B:</strong> Name</div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200"><strong>Column C:</strong> JoinDate (Date Time)</div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200"><strong>Column D:</strong> TrialEndDate</div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200"><strong>Column E:</strong> PaidStatus (TRIAL)</div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200"><strong>Column F:</strong> LastActivity</div>
                </div>
              </section>

              <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2">Master Balance Calculation Formula</h4>
                <p className="text-sm text-blue-700 mb-4">Paste this into Customers sheet to auto-calculate real-time balance from Transactions.</p>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-blue-200 font-mono text-xs">
                  <code className="flex-1 text-blue-600">=SUMIFS(Transactions!C:C, Transactions!B:B, A2, Transactions!D:D, "CREDIT") - SUMIFS(Transactions!C:C, Transactions!B:B, A2, Transactions!D:D, "PAYMENT")</code>
                  <button onClick={() => copyToClipboard('=SUMIFS(Transactions!C:C, Transactions!B:B, A2, Transactions!D:D, "CREDIT") - SUMIFS(Transactions!C:C, Transactions!B:B, A2, Transactions!D:D, "PAYMENT")')} className="text-blue-500 hover:text-blue-700 font-bold">COPY</button>
                </div>
              </section>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start space-x-3">
                <span className="text-amber-600">⚠️</span>
                <p className="text-xs text-amber-800">
                  <strong>Critical:</strong> Share the sheet with "Anyone with link - Editor" for the initial Make.com connection phase.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeStep === 1 && (
          <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Module 2: Gupshup Connectivity</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-slate-900">Sandbox Setup</h4>
                  <p className="text-sm text-slate-500">Go to Gupshup Console > WhatsApp Dashboard > Create App. Select 'Service' as the type.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-slate-900">Coexistence API</h4>
                  <p className="text-sm text-slate-500">Import your number. Emphasize OBO (On-Behalf-Of) flow to ensure no chat history loss for existing shop numbers.</p>
                </div>
              </div>
              <div className="bg-slate-900 text-white p-6 rounded-2xl">
                <h4 className="text-emerald-400 font-bold mb-2">Meta Approval Note</h4>
                <p className="text-sm opacity-80 leading-relaxed">
                  Sandbox messages are free. Once moving to production, verify your Facebook Business Manager (FBM) to enable official template messaging.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Module 3: Make.com Logic (Inbound Scenario)</h3>
            <div className="space-y-6">
              <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-900">AI Prompt (Engine)</h4>
                  <button onClick={() => copyToClipboard('Analyze this WhatsApp message: "{{webhook_text}}"\nSender Name: {{webhook_sender_name}}\n\nIdentify:\n1. Action (CREDIT or PAYMENT)\n2. Amount (Integer only)\n3. Items (List)\n4. Name of debtor (else null)\n\nReturn ONLY valid JSON.')} className="text-xs bg-slate-900 text-white px-2 py-1 rounded">COPY PROMPT</button>
                </div>
                <div className="bg-slate-800 text-slate-300 p-4 rounded-xl font-mono text-xs leading-relaxed">
                  Analyze this WhatsApp message: "{`{{webhook_text}}`}"<br/>
                  Sender Name: {`{{webhook_sender_name}}`}<br/><br/>
                  Identify:<br/>
                  1. Action (CREDIT or PAYMENT)<br/>
                  2. Amount (Integer only)<br/>
                  3. Items (List)<br/>
                  4. Name of debtor (else null)<br/><br/>
                  Return ONLY valid JSON.
                </div>
              </section>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
                  <div className="text-2xl mb-1">🔍</div>
                  <div className="text-xs font-bold text-blue-900">Step 1</div>
                  <div className="text-[10px] text-blue-700">Search Row</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
                  <div className="text-2xl mb-1">🤖</div>
                  <div className="text-xs font-bold text-blue-900">Step 2</div>
                  <div className="text-[10px] text-blue-700">AI Parse</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
                  <div className="text-2xl mb-1">🔀</div>
                  <div className="text-xs font-bold text-blue-900">Step 3</div>
                  <div className="text-[10px] text-blue-700">State Router</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Module 4: Razorpay Subscription Logic</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                  <h4 className="font-bold text-indigo-900 mb-2">Plan Details</h4>
                  <ul className="text-sm text-indigo-700 space-y-2">
                    <li>• Name: DukaanMitra_Basic</li>
                    <li>• Amount: ₹499</li>
                    <li>• Period: Monthly</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <h4 className="font-bold text-emerald-900 mb-2">Webhook Events</h4>
                  <ul className="text-sm text-emerald-700 space-y-2">
                    <li>• subscription.authenticated</li>
                    <li>• payment.captured</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 flex items-start space-x-3">
                <span className="text-rose-600">🚨</span>
                <p className="text-xs text-rose-800">
                  <strong>Warning:</strong> Ensure you capture the phone number in <code>notes.phone</code> during the Razorpay checkout or the automation will break.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Module 5: WhatsApp Template Approvals</h3>
            <div className="space-y-6">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 border-l-4 border-l-blue-600">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-blue-600">ID: dm_welcome</span>
                  <button onClick={() => copyToClipboard("Namaste! Swagat hai DukaanMitra mein.\nAapka phone number register ho chuka hai.\n30 din ka free trial shuru!\nPehla bill likhein:\n'Rahul 250 Dudh Dahi'")} className="text-[10px] text-slate-400">COPY</button>
                </div>
                <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                  Namaste! Swagat hai DukaanMitra mein.<br/>
                  Aapka phone number register ho chuka hai.<br/>
                  30 din ka free trial shuru!<br/>
                  Pehla bill likhein:<br/>
                  "Rahul 250 Dudh Dahi"
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 border-l-4 border-l-emerald-600">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-emerald-600">ID: dm_bill_success</span>
                  <button onClick={() => copyToClipboard("Entry Confirm! ✅\nNaam: {{1}}\nAmount: {{2}}\nItem: {{3}}")} className="text-[10px] text-slate-400">COPY</button>
                </div>
                <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                  Entry Confirm! ✅<br/>
                  Naam: {'{{1}}'}<br/>
                  Amount: {'{{2}}'}<br/>
                  Item: {'{{3}}'}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeStep === 5 && (
          <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Module 6: Marketing & Retention</h3>
            <div className="space-y-8">
              <div className="p-6 bg-slate-900 text-white rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-bold mb-4 text-emerald-400">Canva / Marketing Hook Copy</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                      <p className="text-sm font-bold">Headline 1: "Bahi-Khata ab WhatsApp par!"</p>
                      <p className="text-xs opacity-70">No App. No Hassel. Sirf Message.</p>
                    </div>
                    <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                      <p className="text-sm font-bold">Headline 2: "Hisaab Clear, Dhanda Superfast."</p>
                      <p className="text-xs opacity-70">WhatsApp pe 'Rahul 500' likho, entry done.</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-2">Regex Amount Extractor</h4>
                  <p className="text-xs text-slate-500 mb-2">Use in Make.com for fast fallback parsing.</p>
                  <code className="text-[10px] bg-slate-100 p-1 rounded font-mono">/(?:rs\.?|₹|rupaye|rupees|ka|re)\s*(\d+(?:\.\d+)?)/gi</code>
                </div>
                <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl">
                  <h4 className="font-bold text-rose-900 mb-2">Churn Warning Nudge</h4>
                  <p className="text-[10px] text-rose-700 leading-relaxed italic">
                    "Namaste! Do din se koi entry nahi hui. Sab theek hai? Aaj ka pehla bill likhein."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center">
        <button
          disabled={activeStep === 0}
          onClick={() => setActiveStep(prev => prev - 1)}
          className="px-6 py-2 rounded-xl font-bold text-slate-500 disabled:opacity-30 hover:bg-slate-200 transition"
        >
          Previous Module
        </button>
        <button
          disabled={activeStep === steps.length - 1}
          onClick={() => setActiveStep(prev => prev + 1)}
          className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition"
        >
          {activeStep === steps.length - 1 ? 'Finish Deployment' : 'Next Module'}
        </button>
      </div>
    </div>
  );
};

export default DeploymentGuide;
