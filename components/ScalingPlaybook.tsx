
import React, { useState } from 'react';

const ScalingPlaybook: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sql' | 'vision' | 'query' | 'resilience' | 'build'>('sql');

  const tabs = [
    { id: 'sql', label: 'SQL Migration', icon: '🗄️' },
    { id: 'vision', label: 'Vision OCR', icon: '👁️' },
    { id: 'query', label: 'Interactive Assistant', icon: '💬' },
    { id: 'resilience', label: 'Resilience', icon: '🛡️' },
    { id: 'build', label: 'Build Plan', icon: '📅' },
  ];

  return (
    <div className="space-y-8 pb-20">
      <header className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Phase 5</span>
            <span className="text-slate-400 text-sm">• Enterprise Architect View</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Advanced Scaling & Vision Intelligence</h2>
          <p className="text-slate-500 mt-2 max-w-2xl">
            Hardening DukaanMitra for the next 100+ stores using SQL-backed architecture and Vision-first processing.
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex space-x-2 bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="min-h-[600px] animate-in fade-in slide-in-from-bottom-2 duration-500">
        {activeTab === 'sql' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">Why PostgreSQL / Supabase?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Google Sheets is a great MVP tool, but it fails at scale due to <strong>API rate limits (60 req/min)</strong>, 
                  <strong>row-locking during concurrency</strong>, and <strong>lack of complex relational querying</strong>. 
                  Supabase provides the performance required for a multi-tenant retail platform.
                </p>
                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-4">Indexing Strategy</h4>
                  <ul className="space-y-3 text-sm text-blue-800">
                    <li className="flex items-start space-x-2">
                      <span className="mt-1">✅</span>
                      <span>Index <code>customers.phone</code> for O(1) lookups during Webhook ingress.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mt-1">✅</span>
                      <span>Composite Index on <code>ledgers(store_id, created_at)</code> for fast EOD reporting.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="mt-1">✅</span>
                      <span>Foreign Key constraints ensure <code>ledger</code> entries always belong to valid <code>customers</code>.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900 rounded-[2rem] p-8 text-white font-mono text-xs overflow-hidden relative">
                <h4 className="text-emerald-400 font-bold mb-6 text-sm">-- Phase 5 Schema Definition</h4>
                <div className="space-y-6 opacity-90">
                  <div className="border-l-2 border-emerald-500/30 pl-4">
                    <p className="text-emerald-400 italic">CREATE TABLE stores (</p>
                    <p className="pl-4">id UUID PRIMARY KEY DEFAULT gen_random_uuid(),</p>
                    <p className="pl-4">waba_number BIGINT UNIQUE,</p>
                    <p className="pl-4">plan_type TEXT DEFAULT 'trial'</p>
                    <p>);</p>
                  </div>
                  <div className="border-l-2 border-emerald-500/30 pl-4">
                    <p className="text-emerald-400 italic">CREATE TABLE customers (</p>
                    <p className="pl-4">phone BIGINT PRIMARY KEY,</p>
                    <p className="pl-4">store_id UUID REFERENCES stores(id),</p>
                    <p className="pl-4">current_balance DECIMAL(12,2) DEFAULT 0</p>
                    <p>);</p>
                  </div>
                  <div className="border-l-2 border-emerald-500/30 pl-4">
                    <p className="text-emerald-400 italic">CREATE TABLE ledgers (</p>
                    <p className="pl-4">id BIGSERIAL PRIMARY KEY,</p>
                    <p className="pl-4">customer_id BIGINT REFERENCES customers(phone),</p>
                    <p className="pl-4">type ledger_type NOT NULL, -- CREDIT/PAYMENT</p>
                    <p className="pl-4">amount DECIMAL(12,2),</p>
                    <p className="pl-4">created_at TIMESTAMP WITH TIME ZONE</p>
                    <p>);</p>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vision' && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-10">
              <div className="flex-1 space-y-6">
                <h3 className="text-3xl font-bold text-slate-900">Vision-First Architecture</h3>
                <p className="text-slate-600">
                  Kirana owners are busy. Typing "Rahul 500 doodh cheeni" is better than pen-and-paper, but 
                  <strong>sending a photo of a handwritten bill is best.</strong>
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">📸</div>
                    <div>
                      <p className="font-bold text-sm">Image Ingress</p>
                      <p className="text-xs text-slate-500">Gupshup captures image message → Make.com Media Downloader.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg">🤖</div>
                    <div>
                      <p className="font-bold text-sm">Gemini 2.5 Flash Vision</p>
                      <p className="text-xs text-slate-500">Handwriting-aware OCR extracts amounts and items as structured JSON.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-96 bg-slate-100 rounded-[2rem] p-6 border-4 border-white shadow-inner flex flex-col items-center justify-center">
                <div className="w-full h-64 bg-slate-200 rounded-xl mb-4 flex items-center justify-center text-4xl text-slate-400 italic">
                  [Bill Photo]
                </div>
                <div className="w-full bg-white p-4 rounded-xl shadow-sm space-y-2">
                   <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                   <div className="h-2 w-1/2 bg-slate-100 rounded"></div>
                   <div className="h-2 w-full bg-emerald-50 rounded"></div>
                   <p className="text-[10px] text-emerald-600 font-bold text-center mt-2">OCR Confidence: 94%</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl">
               <h4 className="font-bold text-amber-900 mb-2">The Confirmation Loop</h4>
               <p className="text-sm text-amber-800">
                 Vision is never 100%. We always send the parsed result back: 
                 <em>"Aapka bill ₹150 ka parse hua hai (2kg Cheeni). Confirm karne ke liye ✅ bhejein."</em>
               </p>
            </div>
          </div>
        )}

        {activeTab === 'query' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] space-y-6">
              <h3 className="text-2xl font-bold">Interactive Assistant</h3>
              <p className="opacity-80">Transitioning DukaanMitra from a passive logger to an active business partner.</p>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                  <p className="text-xs font-bold text-indigo-300 mb-1">User Query</p>
                  <p className="text-sm italic">"Rahul ka kitna hai?"</p>
                </div>
                <div className="p-4 bg-emerald-500/20 rounded-2xl border border-emerald-500/30">
                  <p className="text-xs font-bold text-emerald-300 mb-1">AI Action</p>
                  <p className="text-sm font-mono text-emerald-400">SELECT sum(amount) FROM ledgers WHERE name='Rahul'</p>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                  <p className="text-xs font-bold text-indigo-300 mb-1">Response</p>
                  <p className="text-sm">"Rahul ka total ₹1,250 bacha hai. Last entry ₹150 (Chai) kal ki thi."</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 py-4">
              <h4 className="font-bold text-slate-900 text-xl">The Intent Logic</h4>
              <p className="text-slate-600">Gemini filters inbound messages into categories:</p>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                   <span className="font-bold text-slate-700">BALANCE_INQUIRY</span>
                   <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">SQL Query</span>
                </div>
                <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                   <span className="font-bold text-slate-700">TRANSACTION_LOG</span>
                   <span className="text-[10px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-bold">SQL Insert</span>
                </div>
                <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                   <span className="font-bold text-slate-700">GENERAL_HELP</span>
                   <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">Bot Response</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">Conversational queries increase daily active usage (DAU) by 40%.</p>
            </div>
          </div>
        )}

        {activeTab === 'resilience' && (
          <div className="space-y-8">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-rose-500">
                  <h4 className="font-bold text-slate-900 mb-2">Dead Letter Queue (DLQ)</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Messages that fail AI parsing or SQL insertion are stored in <code>failed_processing</code> with original payloads.
                  </p>
               </div>
               <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-blue-500">
                  <h4 className="font-bold text-slate-900 mb-2">Automatic Retries</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Make.com scenarios configured with 3 retries (10s intervals) for Supabase API calls to handle transient network issues.
                  </p>
               </div>
               <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm border-t-4 border-t-amber-500">
                  <h4 className="font-bold text-slate-900 mb-2">Admin Alerting</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Real-time Telegram/Slack alerts triggered when error rates exceed 5% in a rolling 1-hour window.
                  </p>
               </div>
             </div>

             <div className="bg-slate-900 p-10 rounded-[3rem] text-center text-white relative overflow-hidden">
                <h3 className="text-3xl font-black mb-4 italic">"Visibility Beats Silent Failure"</h3>
                <p className="text-slate-400 max-w-xl mx-auto text-sm">
                  At 100 stores, you cannot manually check every message. Your dashboard must tell you what's broken before the shop owner calls you.
                </p>
                <div className="absolute top-0 left-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
             </div>
          </div>
        )}

        {activeTab === 'build' && (
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-slate-900">Phase 5 Implementation (Day 16–22)</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { day: "Day 16", title: "Supabase Setup", detail: "Create project, run SQL migration scripts, and define row-level security (RLS).", status: "NEXT" },
                { day: "Day 17", title: "Data Migration", detail: "Export Google Sheets data to CSV → Import to Supabase. Map Phone numbers to StoreIDs.", status: "PLANNED" },
                { day: "Day 18", title: "Vision OCR Pipeline", detail: "Integrate Media Downloader and Gemini-3-Flash Image-to-JSON in Make.com.", status: "PLANNED" },
                { day: "Day 19", title: "Query Engine", detail: "Build balance inquiry logic using SQL aggregations and natural language parsing.", status: "PLANNED" },
                { day: "Day 20", title: "Load Testing", detail: "Stress test with 50 msgs/min to ensure indexing and SQL performance holds.", status: "PLANNED" },
                { day: "Day 21", title: "Onboarding Update", detail: "Update physical signage templates and welcome messages for Image-based billing.", status: "PLANNED" },
                { day: "Day 22", title: "Reconciliation", detail: "Finalize financial reporting dashboard with Razorpay Payout sync.", status: "PLANNED" },
              ].map((step, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all">
                  <div className="flex items-center space-x-6">
                    <span className="text-lg font-black text-slate-300 group-hover:text-blue-500 transition-colors w-16">{step.day}</span>
                    <div>
                       <p className="font-bold text-slate-900">{step.title}</p>
                       <p className="text-xs text-slate-500">{step.detail}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${step.status === 'NEXT' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {step.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScalingPlaybook;
