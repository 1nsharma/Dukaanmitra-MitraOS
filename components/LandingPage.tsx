
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

const LandingPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tl = (anime as any).timeline({
      easing: 'easeOutExpo',
      duration: 1200
    });

    tl.add({
      targets: '.hero-text',
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(150)
    })
    .add({
      targets: mockupRef.current,
      scale: [0.9, 1],
      rotate: [5, 2],
      opacity: [0, 1],
      duration: 1500
    }, '-=800');
  }, []);

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DukaanMitra",
    "operatingSystem": "Any",
    "applicationCategory": "BusinessApplication",
    "description": "India's first AI-powered WhatsApp Munim for Kirana stores. Manage udhaar, sales, and inventory via WhatsApp.",
    "softwareVersion": "2.0.0",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "author": {
      "@type": "Person",
      "name": "Amit Sharma"
    },
    "featureList": [
      "WhatsApp-First Interface",
      "AI-Powered Transaction Extraction",
      "Automated Ledger Management",
      "Real-time Udhaar Tracking",
      "Daily Sales Reports",
      "Retail Intelligence Insights"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I start using DukaanMitra?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply send 'START' to our WhatsApp number +91 63937 41171. No app download is required."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data safe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we use enterprise-grade encryption and secure cloud storage (Firebase) to ensure your shop's data is always protected."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to manage your kirana store with DukaanMitra",
    "description": "A simple 3-step guide to digitizing your shop using WhatsApp.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Send START to WhatsApp",
        "text": "Message 'START' to +91 63937 41171 to activate your digital Munim.",
        "url": "https://dukaanmitra.in/#start"
      },
      {
        "@type": "HowToStep",
        "name": "Log your first transaction",
        "text": "Type a simple message like 'Rahul 500 Sugar' to record a sale or udhaar.",
        "url": "https://dukaanmitra.in/#log"
      },
      {
        "@type": "HowToStep",
        "name": "View your EOD report",
        "text": "Receive an automated summary of your daily sales and pending udhaar every evening.",
        "url": "https://dukaanmitra.in/#report"
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "DukaanMitra AI Munim",
    "image": "https://dukaanmitra.in/logo.png",
    "description": "AI-powered WhatsApp assistant for Indian kirana stores.",
    "brand": {
      "@type": "Brand",
      "name": "DukaanMitra"
    },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "0",
      "highPrice": "499",
      "priceCurrency": "INR"
    }
  };

  const faqs = [
    { q: "How do I start using DukaanMitra?", a: "Simply send 'START' to our WhatsApp number +91 63937 41171. No app download is required." },
    { q: "Is my data safe?", a: "Yes, we use enterprise-grade encryption and secure cloud storage (Firebase) to ensure your shop's data is always protected." },
    { q: "Does it support local languages?", a: "Currently, we support Hindi and English, with more regional languages coming soon." },
    { q: "How does the AI work?", a: "Our Munim AI uses advanced Natural Language Processing (NLP) to understand your messages like 'Rahul 500 Chini' and automatically updates your books." },
  ];

  const features = [
    { title: "WhatsApp-First", desc: "Manage your entire shop via WhatsApp—no app needed.", benefit: "Zero learning curve, high adoption.", icon: "📱" },
    { title: "AI-Powered Munim", desc: "Type 'Rahul 500 Chini' and let AI extract customer, amount, and item.", benefit: "Saves time, reduces errors.", icon: "🧠" },
    { title: "Auto Ledger", desc: "Every transaction updates Google Sheets/SQL in real time.", benefit: "Always accurate books, no manual entry.", icon: "📑" },
    { title: "Udhaar Tracking", desc: "Instant udhaar statements for customers.", benefit: "Reduces defaults, builds trust.", icon: "📄" },
    { title: "Daily Reports", desc: "End-of-day sales, udhaar, and inventory summaries sent via WhatsApp.", benefit: "Stay informed without effort.", icon: "📊" },
    { title: "Retail Intel", desc: "AI-driven insights on stock trends and customer behavior.", benefit: "Make data-backed decisions.", icon: "💡" },
  ];

  const dukaanFlow = [
    { title: "Smart Ingress", desc: "Customer buys an item. Shopkeeper types 'Rahul 500 Chini' in WhatsApp.", icon: "📱", color: "indigo", tech: "WhatsApp API + NLP", detail: "99.9% extraction accuracy for Indian names and items." },
    { title: "AI Reasoning", desc: "Munim AI parses the message: Customer, Amount, and Item extraction.", icon: "🧠", color: "emerald", tech: "Gemini / BERT", detail: "Context-aware parsing handles slang and local dialects." },
    { title: "Ledger Update", desc: "Transaction is logged in Google Sheets or SQL DB automatically.", icon: "📑", color: "blue", tech: "Firebase + Sheets API", detail: "Real-time sync with 0.5s latency across all devices." },
    { title: "Auto Statement", desc: "Customer gets receipt. Shopkeeper gets EOD report with sales & udhaar.", icon: "📄", color: "amber", tech: "Automated Triggers", detail: "Reduces manual calculation time by 95% daily." },
  ];

  const testimonials = [
    { name: "Rajesh", shop: "Kirana Store Owner, Kanpur", quote: "DukaanMitra ne mere 4 ghante ka kaam 10 minute ka kar diya. Ab WhatsApp pe hi sab ho jaata hai!", icon: "👨‍🌾" },
    { name: "Suresh", shop: "General Store, Lucknow", quote: "Udhaar mangne mein sharam aati thi, ab Munim AI apne aap reminder bhej deta hai. Paisa time pe mil raha hai.", icon: "🏪" },
    { name: "Meena", shop: "Dairy Booth, Delhi", quote: "Inventory management ab bahut asaan hai. WhatsApp pe hi pata chal jata hai kya khatam ho raha hai.", icon: "🥛" },
  ];

  const pricing = [
    { name: "Free Trial", price: "₹0", features: ["50 transactions", "Basic udhaar tracking", "WhatsApp reports"], bestFor: "New shops testing the waters." },
    { name: "Starter", price: "₹199", features: ["500 transactions", "UPI Lite", "Inventory alerts", "Hindi/English support"], bestFor: "Small kiranas." },
    { name: "Growth", price: "₹499", features: ["Unlimited transactions", "AI insights", "Multi-language", "SMS fallback"], bestFor: "Growing businesses." },
    { name: "Enterprise", price: "Custom", features: ["API access", "Custom integrations", "Dedicated support", "Bulk broadcasting"], bestFor: "Chains/franchises." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Helmet>
        <title>DukaanMitra - Best Dukaan Management App & Kirana Store Software</title>
        <meta name="description" content="Manage your shop smarter with DukaanMitra, the leading retail management software in India. Track sales, inventory, and learn how to manage small shop digitally with AI." />
        <meta name="keywords" content="dukaan management app, retail management software india, kirana store software, small business automation india, inventory management app india, how to manage small shop digitally" />
        <link rel="canonical" href="https://dukaanmitra.in/" />
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="px-6 lg:px-20 py-24 lg:py-48 gradient-bg text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-400 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="space-y-12 hero-text-container" ref={heroRef}>
            <div className="hero-text inline-flex items-center space-x-3 bg-white/20 px-5 py-2 rounded-full border border-white/10 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Aapka Digital Munim India #1</span>
            </div>
            <h1 className="hero-text text-5xl md:text-7xl lg:text-[10rem] font-black text-white leading-[0.8] tracking-tighter italic">
              Best Dukaan <br/>
              <span className="text-emerald-400">Management App</span> <br/>
              for India
            </h1>
            <p className="hero-text text-2xl lg:text-3xl text-white/90 leading-relaxed max-w-xl font-bold uppercase tracking-tight">
              Transform your Kirana shop with India's first AI-powered WhatsApp Munim. No app downloads. Just message "Rahul 500" and you're done.
            </p>
            <div className="hero-text flex flex-col sm:flex-row gap-6">
              <a 
                href="https://whatsapp.com/channel/0029VbBxi9eJZg4DGvYpBx0U" target="_blank" rel="noopener noreferrer"
                className="bg-white text-indigo-900 px-8 py-4 sm:px-12 sm:py-6 rounded-[2.5rem] font-black text-xl sm:text-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] hover:scale-105 hover:bg-slate-100 transition-all active:scale-[0.98] italic tracking-tighter text-center"
              >
                Start managing your dukaan smarter today 🚀
              </a>
              <button onClick={() => navigate('/demo')} className="bg-transparent border-[3px] border-white/30 px-8 py-4 sm:px-12 sm:py-6 rounded-[2.5rem] font-black text-xl sm:text-2xl hover:bg-white/10 transition-all shadow-xl italic tracking-tighter">
                View Demo Dashboard 📊
              </button>
            </div>
          </div>
          <div className="relative" ref={mockupRef}>
            <div className="bg-slate-900 p-4 sm:p-8 rounded-[3rem] sm:rounded-[4.5rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] border-[8px] sm:border-[12px] border-slate-800 rotate-2 transform hover:rotate-0 transition-transform duration-1000 group max-w-[380px] mx-auto">
               <div className="bg-[#efe7de] aspect-[9/19.5] rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden flex flex-col relative border border-slate-800/50">
                  <div className="bg-indigo-700 p-7 pt-12 text-white flex items-center space-x-4 shadow-xl z-10">
                    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center font-bold shadow-inner">DM</div>
                    <div>
                      <p className="font-black text-lg tracking-tight">Munim AI</p>
                      <p className="text-[10px] opacity-70 font-black uppercase tracking-widest">Typing insights...</p>
                    </div>
                  </div>
                  <div className="flex-1 p-8 space-y-6 font-bold overflow-hidden relative">
                    <div className="bg-white p-5 rounded-3xl rounded-tl-none shadow-xl text-sm self-start max-w-[85%]">
                      Namaste Bhaiya! Aaj ka hisaab likhein? 🏠
                    </div>
                    <div className="bg-[#dcf8c6] p-5 rounded-3xl rounded-tr-none shadow-xl text-sm self-end ml-auto max-w-[85%]">
                      Rahul 500 udhaar chini
                    </div>
                    <div className="bg-white p-6 rounded-3xl rounded-tl-none shadow-2xl text-sm self-start max-w-[85%] border-l-[6px] border-indigo-600">
                      <p className="font-black text-indigo-600 text-xs mb-1 uppercase tracking-widest">Entry Confirmed! ✅</p>
                      Rahul: ₹500 (Sugar) <br/>
                      Total Udhaari: <span className="text-emerald-600">₹1,250</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#efe7de] to-transparent pointer-events-none"></div>
                  </div>
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-full z-20 flex items-center justify-center">
                    <div className="w-14 h-1 bg-slate-800 rounded-full"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-32 px-6 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black italic tracking-tighter uppercase leading-none text-slate-900">🌟 Key Features</h2>
            <p className="text-xl text-indigo-600 font-bold tracking-widest uppercase">Designed for the Bharat Retail Ecosystem</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[3.5rem] bg-slate-50 border border-slate-100 shadow-xl shadow-slate-200/30 space-y-6 group hover:bg-indigo-600 transition-colors duration-500"
              >
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 group-hover:text-white">{f.title}</h3>
                  <p className="text-slate-500 font-bold leading-relaxed group-hover:text-indigo-100">{f.desc}</p>
                  <div className="pt-4 border-t border-slate-200 group-hover:border-indigo-400">
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 group-hover:text-white mb-1">Benefit</p>
                    <p className="text-sm font-black italic text-slate-700 group-hover:text-white">{f.benefit}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem-First intent section */}
      <section className="py-32 px-6 lg:px-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1600px] mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-slate-900">What problem can I solve for you today?</h2>
            <p className="text-xl text-slate-500 font-bold italic">Stop searching for features, start finding solutions.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { problem: "Udhaar ka hisaab kaise rakhe?", icon: "📉", link: "/blog/udhaar-ka-hisaab-kaise-rakhe", cta: "Manage Khaata" },
              { problem: "Daily Sales record nahi ho rahi?", icon: "📊", link: "/blog/kirana-shop-daily-sales-system", cta: "Setup Sales Tracker" },
              { problem: "WhatsApp se order kaise le?", icon: "📱", link: "/blog/whatsapp-se-order-kaise-le", cta: "Start WhatsApp Shop" }
            ].map((p, i) => (
              <div key={i} className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center space-y-8 group hover:scale-105 transition-all duration-500">
                <div className="text-7xl">{p.icon}</div>
                <h3 className="text-3xl font-black italic tracking-tight text-slate-900 leading-tight">{p.problem}</h3>
                <Link to={p.link} className="px-10 py-5 bg-indigo-600 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] transform group-hover:translate-y-[-5px] transition-all shadow-xl">
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Munim Flow Section */}
      <section id="flow" className="py-32 px-6 lg:px-20 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto space-y-24">
          <div className="text-center space-y-4">
             <h2 className="text-4xl md:text-6xl lg:text-8xl font-black italic tracking-tighter uppercase leading-none">The Munim Flow</h2>
             <p className="text-xl text-indigo-400 font-bold tracking-widest uppercase">End-to-End Digital Transformation</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-12 relative">
             <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0 -translate-y-1/2"></div>
             
             {dukaanFlow.map((step, i) => (
               <div key={i} className="flow-step relative z-10 flex flex-col items-center text-center space-y-8">
                  <div className={`w-24 h-24 rounded-[2.5rem] bg-${step.color}-600 shadow-2xl shadow-${step.color}-900/50 flex items-center justify-center text-4xl transform hover:scale-110 hover:rotate-6 transition-all duration-500`}>
                    {step.icon}
                  </div>
                  <div className="space-y-3 px-6">
                    <h3 className="text-3xl font-black italic tracking-tighter uppercase">{step.title}</h3>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed italic mb-2">"{step.desc}"</p>
                    <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2">{step.detail}</p>
                    <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-indigo-300">
                      {step.tech}
                    </span>
                  </div>
               </div>
             ))}
          </div>
          
          <div className="flex justify-center pt-12">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] max-w-3xl w-full text-center">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-indigo-400 mb-4">Visual Flow</p>
              <p className="text-2xl font-black italic tracking-tight text-white">
                Customer → WhatsApp Message → AI Parsing → Ledger Update → Auto-Receipt → EOD Report
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black italic tracking-tighter uppercase leading-none text-slate-900">💰 Simple Pricing</h2>
            <p className="text-xl text-indigo-600 font-bold tracking-widest uppercase">Transparent & Scalable Plans</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricing.map((p, i) => (
              <div key={i} className={`p-10 rounded-[3.5rem] border-2 flex flex-col ${p.name === 'Growth' ? 'bg-slate-900 text-white border-slate-900 scale-105 shadow-2xl z-10' : 'bg-white text-slate-900 border-slate-100 shadow-xl'}`}>
                <div className="mb-8">
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-2">{p.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black italic tracking-tighter">{p.price}</span>
                    <span className="text-xs font-black uppercase tracking-widest opacity-60">/month</span>
                  </div>
                </div>
                <div className="flex-1 space-y-4 mb-10">
                  {p.features.map((feat, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <span className="text-emerald-500">✔</span>
                      <span className="text-sm font-bold opacity-80">{feat}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  <div className="p-4 bg-slate-100 rounded-2xl text-slate-900">
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-1">Best For</p>
                    <p className="text-xs font-bold italic">{p.bestFor}</p>
                  </div>
                  <button className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${p.name === 'Growth' ? 'bg-emerald-500 text-slate-900 hover:bg-emerald-400' : 'bg-slate-900 text-white hover:bg-indigo-600'}`}>
                    Choose Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 font-bold italic">Note: All plans include free onboarding and 24/7 WhatsApp support.</p>
        </div>
      </section>

      {/* Why DukaanMitra & JanSunwai Section */}
      <section className="py-32 px-6 lg:px-20 bg-indigo-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black italic tracking-tighter uppercase leading-none">🚀 Why DukaanMitra?</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl shrink-0">⏰</div>
                <div>
                  <h4 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Save 2+ Hours Daily</h4>
                  <p className="text-indigo-100 font-bold opacity-80">Automate your bookkeeping and focus on growing your business.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl shrink-0">📉</div>
                <div>
                  <h4 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Reduce Defaults by 40%</h4>
                  <p className="text-indigo-100 font-bold opacity-80">Automated WhatsApp reminders ensure timely udhaar recovery.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl shrink-0">🧠</div>
                <div>
                  <h4 className="text-2xl font-black italic tracking-tighter uppercase mb-2">AI-Powered Insights</h4>
                  <p className="text-indigo-100 font-bold opacity-80">Get retail intelligence to make data-backed stock decisions.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-12 rounded-[4rem] border border-white/20 space-y-8">
            <div className="inline-flex items-center space-x-3 bg-white text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              JanSunwai 2.0 Alignment
            </div>
            <h3 className="text-4xl font-black italic tracking-tighter uppercase">Beyond Retail: Grievance Redressal</h3>
            <p className="text-xl font-bold italic text-indigo-50 leading-relaxed">
              DukaanMitra's core architecture powers JanSunwai 2.0. The same WhatsApp-first, multi-tenant system helps citizens submit grievances that AI categorizes and routes to officials in real-time.
            </p>
            <ul className="space-y-4 text-sm font-black uppercase tracking-widest text-indigo-200">
              <li className="flex items-center gap-3"><span>➔</span> AI-Driven Categorization</li>
              <li className="flex items-center gap-3"><span>➔</span> Real-time Official Dashboards</li>
              <li className="flex items-center gap-3"><span>➔</span> Automated Status Updates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 px-6 lg:px-20 bg-slate-50">
        <div className="max-w-[1600px] mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black italic tracking-tighter uppercase leading-none text-slate-900">🗣️ Shopkeeper Stories</h2>
            <p className="text-xl text-indigo-600 font-bold tracking-widest uppercase">Trusted by 10,000+ Kirana Stores</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-12 rounded-[4rem] shadow-xl shadow-slate-200/50 border border-white space-y-8 relative group hover:scale-105 transition-all duration-500">
                <div className="text-6xl text-indigo-100 absolute top-8 left-8 opacity-50 group-hover:opacity-100 transition-opacity">“</div>
                <p className="text-2xl font-black italic tracking-tight text-slate-900 leading-tight relative z-10 pt-8">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl">
                    {t.icon}
                  </div>
                  <div>
                    <p className="text-lg font-black italic tracking-tight text-slate-900">{t.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.shop}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="py-32 px-6 lg:px-20 bg-white">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="w-full aspect-video bg-slate-900 rounded-[4rem] flex items-center justify-center shadow-2xl border-8 border-white rotate-3 overflow-hidden group">
              <div className="text-center space-y-6 p-12">
                <div className="w-24 h-24 bg-indigo-600 rounded-full mx-auto flex items-center justify-center text-4xl shadow-xl group-hover:scale-110 transition-transform">
                  ✍️
                </div>
                <h3 className="text-3xl font-black italic text-white tracking-tighter uppercase">A Message from the Founder</h3>
                <div className="w-20 h-1 bg-emerald-500 mx-auto"></div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 bg-indigo-600 text-white p-10 rounded-[3rem] shadow-2xl -rotate-3">
              <p className="text-4xl font-black italic tracking-tighter">Amit Sharma</p>
              <p className="text-sm font-black uppercase tracking-widest opacity-70">Founder, DukaanMitra</p>
            </div>
          </div>
          <div className="space-y-10">
            <div className="inline-flex items-center space-x-3 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              Meet the Visionary
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter italic leading-none">Empowering Bharat's Retailers</h2>
            <p className="text-2xl text-slate-500 font-bold italic leading-relaxed">
              "My mission is to bring the power of AI to every Kirana store in India. No complex apps, just the simplicity of WhatsApp to manage your business with intelligence."
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contact</p>
                <p className="text-xl font-black italic text-slate-900">+91 63937 41171</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</p>
                <p className="text-xl font-black italic text-slate-900">amit@dukaanmitra.in</p>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="https://linkedin.com/in/amitsharma" className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">in</a>
              <a href="https://twitter.com/amitsharma" className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">𝕏</a>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-32 px-6 lg:px-20 bg-slate-50">
        <div className="max-w-[1600px] mx-auto space-y-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-200 pb-12">
            <div className="space-y-4">
               <div className="inline-flex items-center space-x-3 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  Retail Intelligence
               </div>
               <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter italic">The Bharat Retail Feed</h2>
            </div>
            <Link 
              to="/blog"
              className="text-indigo-600 font-black text-xl uppercase tracking-tighter italic hover:underline"
            >
              Explore Daily Insights ➔
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: "UPI Lite: The Game Changer for Small Kiranas", tag: "Tech", excerpt: "How low-latency payments are reducing queue times in Delhi's busy markets." },
              { title: "Managing Winter Stocks in Northern India", tag: "Inventory", excerpt: "Strategic stock management for Tier-2 cities during the coldest months." },
              { title: "Building Trust with Digital Udhaar Reminders", tag: "Retention", excerpt: "Data shows 40% faster recovery when reminders are sent via WhatsApp." }
            ].map((b, i) => (
              <div key={i} className="bg-white p-10 rounded-[3.5rem] shadow-xl shadow-slate-200/50 border border-white hover:border-indigo-200 hover:scale-105 transition-all duration-500 group">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-indigo-600 transition-colors">{b.tag}</span>
                <h3 className="text-2xl font-black text-slate-900 mt-4 mb-6 italic tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">{b.title}</h3>
                <p className="text-slate-500 font-bold opacity-80 leading-relaxed mb-8 italic">"{b.excerpt}"</p>
                <Link 
                   to="/blog"
                   className="text-[11px] font-black uppercase tracking-widest text-slate-900 pb-1 border-b-4 border-emerald-400 group-hover:border-indigo-600 transition-all"
                >
                  Read Analysis
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed SEO Content Section */}
      <section className="py-32 px-6 lg:px-20 bg-slate-50">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-slate-900 leading-tight">
              DukaanMitra – AI-Powered Shop Management for Indian Retailers
            </h2>
            <div className="prose prose-lg text-slate-600 font-bold italic leading-relaxed space-y-6">
              <p>
                In the rapidly evolving landscape of Indian retail, managing a traditional kirana store or a small business requires more than just a bahi-khata. 
                <strong> DukaanMitra</strong> is designed to be your ultimate <strong>AI shop management tool</strong>, specifically built for the unique needs of 
                Indian दुकानदार. Whether you are in a bustling metro or a Tier 2 city like Lucknow or Kanpur, our platform empowers you to 
                <strong> automate dukaan tasks</strong> and transition into the digital age without the complexity of traditional ERP systems.
              </p>
              <p>
                Why is DukaanMitra considered the <strong>best dukaan management app</strong>? It's because we understand that your time is valuable. 
                Instead of spending hours on manual entries, our <strong>AI-powered WhatsApp Munim</strong> allows you to log sales, track inventory, 
                and manage udhaar by simply sending a message. This <strong>retail management software in India</strong> is not just an app; 
                it's a comprehensive <strong>CRM for Indian retailers</strong> that lives where you already are—on WhatsApp.
              </p>
              <h3 className="text-2xl font-black italic text-slate-900 uppercase">How to Manage Small Shop Digitally with AI</h3>
              <p>
                Many shop owners ask, <em>"Dukaan ka hisaab kaise rakhe app?"</em> The answer lies in simplicity and intelligence. 
                DukaanMitra uses advanced Natural Language Processing (NLP) to understand your business language. When you type 
                "Rahul 500 Chini", our AI automatically identifies the customer (Rahul), the amount (₹500), and the item (Sugar/Chini). 
                It then updates your digital ledger in real-time, providing you with an accurate <strong>inventory management app in India</strong> 
                experience without the data entry fatigue.
              </p>
              <p>
                Our <strong>small business automation in India</strong> initiative aims to bridge the digital divide. By providing 
                <strong>kirana store software</strong> that requires zero training, we ensure that every merchant can benefit from 
                <strong>AI retail analytics</strong>. You get daily reports on your sales, pending udhaar, and stock alerts, 
                helping you make data-backed decisions to grow your business.
              </p>
              <h3 className="text-2xl font-black italic text-slate-900 uppercase">The Future of Kirana Store Software</h3>
              <p>
                The future of retail is smart, connected, and automated. DukaanMitra is leading this change by offering 
                <strong>affordable kirana software</strong> that scales with your business. From automated udhaar reminders 
                that help you recover payments 40% faster to AI-driven marketing tools that help you engage with your local 
                customers, we provide everything you need to thrive in a competitive market.
              </p>
              <p>
                Stop struggling with manual calculations and lost records. Join the thousands of smart merchants who have 
                chosen DukaanMitra as their trusted <strong>retail management software</strong>. Start your journey today 
                and see how easy it is to <strong>manage your shop digitally</strong>. Bas WhatsApp chalana hai, baaki kaam 
                Munim AI sambhal lega!
              </p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8 pt-12">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-4">
              <h4 className="text-xl font-black italic text-indigo-600 uppercase">AI CRM for Retail</h4>
              <p className="text-sm font-bold text-slate-500 italic">Manage customer relationships and loyalty automatically via WhatsApp interactions.</p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-4">
              <h4 className="text-xl font-black italic text-indigo-600 uppercase">Smart Inventory</h4>
              <p className="text-sm font-bold text-slate-500 italic">Real-time stock tracking and low-inventory alerts sent directly to your phone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black italic tracking-tighter uppercase leading-none text-slate-900">🤔 Common Questions</h2>
            <p className="text-xl text-indigo-600 font-bold tracking-widest uppercase">Everything you need to know</p>
          </div>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-4">
                <h4 className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">Q: {faq.q}</h4>
                <p className="text-slate-600 font-bold leading-relaxed italic">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 px-6 lg:px-20 bg-slate-900 text-white rounded-[3rem] lg:rounded-[6rem] mx-4 lg:mx-10 my-20 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
        <div className="max-w-5xl mx-auto text-center space-y-16 relative z-10">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-black italic tracking-tighter leading-none">Ready to digitize your dhanda?</h2>
            <p className="text-2xl font-bold italic text-indigo-400">Aapka Kirana, Ab Digital. Bas WhatsApp Chalana Hai!</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-12">
            <div className="grid sm:grid-cols-2 gap-8 w-full max-w-3xl">
              <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Step 1</p>
                <h4 className="text-2xl font-black italic tracking-tighter uppercase">Start Free Trial</h4>
                <p className="text-sm font-bold opacity-60">Join our WhatsApp Channel to activate your Munim.</p>
              </div>
              <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Step 2</p>
                <h4 className="text-2xl font-black italic tracking-tighter uppercase">Try Live Demo</h4>
                <p className="text-sm font-bold opacity-60">Experience the Dashboard instantly.</p>
                <button onClick={() => navigate('/demo')} className="mt-4 px-6 py-2 bg-indigo-600 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 transition-colors">Open Demo</button>
              </div>
            </div>
            <a href="https://whatsapp.com/channel/0029VbBxi9eJZg4DGvYpBx0U" target="_blank" rel="noopener noreferrer" className="inline-block w-full md:w-auto px-16 py-8 bg-emerald-500 text-slate-900 rounded-[3rem] font-black text-3xl hover:bg-emerald-400 transition-all shadow-2xl active:scale-95 italic tracking-tighter text-center">
              Join WhatsApp Channel
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
