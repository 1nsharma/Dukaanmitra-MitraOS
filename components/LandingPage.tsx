import React from 'react';
import { ArrowRight, CheckCircle2, MessageSquare, TrendingUp, ShieldCheck, Zap, Smartphone, Users } from 'lucide-react';
import { cn } from '../lib/utils';

export const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-600">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <TrendingUp size={24} />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tighter italic">DukaanMitra</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-black uppercase tracking-widest text-gray-500">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
          </div>
          <button 
            onClick={onStart}
            className="px-6 py-3 bg-indigo-600 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest">
              <Zap size={14} />
              <span>Aapka Digital Munim</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] italic">
              Digitize Your Shop via <span className="text-indigo-600">WhatsApp.</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-lg leading-relaxed">
              No complex apps. No training. Just chat with our AI Munim to manage sales, track udhaar, and recover credit 40% faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onStart}
                className="px-10 py-5 bg-indigo-600 text-white rounded-2xl text-lg font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center gap-3 active:scale-95"
              >
                Launch Your Digital Shop
                <ArrowRight size={24} />
              </button>
              <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://picsum.photos/seed/${i + 10}/100/100`} alt="user" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Trusted by <span className="text-gray-900">1,200+</span> Kirana Stores
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-indigo-50 rounded-full blur-3xl opacity-50" />
            <div className="relative bg-white p-4 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-100 transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="bg-[#e5ddd5] rounded-[2.5rem] overflow-hidden border border-gray-200 h-[600px] flex flex-col">
                <div className="bg-[#075e54] p-6 flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-md">🤖</div>
                  <div>
                    <h4 className="font-black text-lg">Munim AI</h4>
                    <p className="text-xs opacity-70">Aapka Digital Munim</p>
                  </div>
                </div>
                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] space-y-2">
                    <p className="text-sm font-bold text-gray-800">Namaste! Ramesh ji. Aaj ki sales kya rahi?</p>
                    <p className="text-[10px] text-gray-400">10:45 AM</p>
                  </div>
                  <div className="bg-[#dcf8c6] p-4 rounded-2xl rounded-tr-none shadow-sm max-w-[80%] ml-auto space-y-2">
                    <p className="text-sm font-bold text-gray-800 italic">Sold 2kg sugar for 100, and gave 500 udhaar to Rahul.</p>
                    <p className="text-[10px] text-gray-400">10:46 AM</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] space-y-2">
                    <p className="text-sm font-bold text-gray-800">Got it! Logged ₹100 sale and ₹500 udhaar for Rahul. Daily summary will be sent at 8 PM.</p>
                    <p className="text-[10px] text-gray-400">10:46 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter italic uppercase">
              Built for the <span className="text-indigo-600">Real Bharat.</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium">
              We understand the unique challenges of local shopkeepers. No complex interfaces, just results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "WhatsApp First", 
                desc: "No new app to download. Manage everything through the app you already use every day.", 
                icon: <MessageSquare className="text-emerald-500" size={32} />,
                color: "bg-emerald-50"
              },
              { 
                title: "AI Munim", 
                desc: "Our AI understands Hindi, English, and Hinglish. Just talk to it like a real accountant.", 
                icon: <Zap className="text-indigo-500" size={32} />,
                color: "bg-indigo-50"
              },
              { 
                title: "Auto-Reminders", 
                desc: "Polite, automated WhatsApp reminders to customers who owe you money. Recover credit faster.", 
                icon: <Smartphone className="text-rose-500" size={32} />,
                color: "bg-rose-50"
              }
            ].map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-6 hover:shadow-xl transition-all duration-500 group">
                <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500", f.color)}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight italic uppercase">{f.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full bg-indigo-600 rounded-[4rem] rotate-3" />
            <div className="relative bg-slate-900 p-12 rounded-[4rem] space-y-10 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="space-y-4">
                <h3 className="text-4xl font-black italic tracking-tighter uppercase">Daily Ledger</h3>
                <p className="text-indigo-300 font-medium">Your Munim works 24/7</p>
              </div>
              <div className="space-y-6">
                {[
                  { label: "Total Sales Today", val: "₹4,250", color: "text-emerald-400" },
                  { label: "New Udhaar", val: "₹1,100", color: "text-rose-400" },
                  { label: "Recovered", val: "₹800", color: "text-indigo-400" }
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/10">
                    <span className="text-sm font-black uppercase tracking-widest opacity-60">{s.label}</span>
                    <span className={cn("text-2xl font-black italic tracking-tighter", s.color)}>{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <h2 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter italic uppercase leading-none">
              Simple 3-Step <span className="text-indigo-600">Setup.</span>
            </h2>
            <div className="space-y-8">
              {[
                { step: "01", title: "Register Your Shop", desc: "Sign up with your WhatsApp number and shop name." },
                { step: "02", title: "Chat with Munim", desc: "Start logging sales and udhaar via WhatsApp messages." },
                { step: "03", title: "Grow Your Business", desc: "Get daily reports and automated credit recovery." }
              ].map((s, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="text-4xl font-black text-indigo-100 group-hover:text-indigo-600 transition-colors duration-500">{s.step}</div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-gray-900 tracking-tight italic uppercase">{s.title}</h4>
                    <p className="text-gray-500 font-medium leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter italic">DukaanMitra</span>
          </div>
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            © 2024 DukaanMitra. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
