
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Pricing: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <Helmet>
        <title>DukaanMitra Pricing | Free Shop Management App & Affordable Kirana Software</title>
        <meta name="description" content="Simple and affordable pricing plans for every small business. Start managing your dukaan today with our free shop management app and AI-powered tools. Dukaan ka hisaab kaise rakhe app?" />
        <meta name="keywords" content="free shop management app, affordable kirana software, dukaan ka hisaab kaise rakhe app, kirana store software price" />
        <link rel="canonical" href="https://dukaanmitra.in/pricing" />
      </Helmet>
      <h1 className="text-4xl font-black text-slate-900 mb-8 italic tracking-tighter uppercase text-center">Simple Pricing</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Free Trial", price: "₹0", features: ["Basic WhatsApp Billing", "50 Transactions/mo", "Single User"], color: "bg-slate-100" },
          { name: "Merchant Pro", price: "₹499/mo", features: ["Unlimited Billing", "Inventory Alerts", "3 Staff Accounts", "AI Analytics"], color: "bg-indigo-600 text-white", popular: true },
          { name: "Enterprise", price: "Custom", features: ["Multi-Store Sync", "Custom Branding", "Dedicated Support", "API Access"], color: "bg-slate-900 text-white" }
        ].map((p, i) => (
          <div key={i} className={`p-10 rounded-[3rem] shadow-xl relative overflow-hidden ${p.color}`}>
            {p.popular && <span className="absolute top-6 right-6 bg-amber-400 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase">Popular</span>}
            <h3 className="text-2xl font-black mb-2">{p.name}</h3>
            <div className="text-4xl font-black mb-6 italic">{p.price}</div>
            <ul className="space-y-4 mb-10">
              {p.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 font-bold text-sm">
                  <span className="opacity-50">✓</span> {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition active:scale-95 ${p.popular ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
