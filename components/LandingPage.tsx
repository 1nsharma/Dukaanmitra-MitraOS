
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { WhatsAppSimulation } from './WhatsAppSimulation';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { cn } from '../lib/utils';

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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Rajesh Kirana Store"
        }
      }
    ],
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": "3",
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
    { name: "Khata Basic", price: "Free Forever", features: ["100 transactions/mo", "Basic udhaar tracking", "WhatsApp reports"], bestFor: "New shops adopting digital." },
    { name: "Merchant Pro", price: "₹299/mo", features: ["Unlimited transactions", "Inventory alerts", "Google Business Setup", "GST-Ready Billing"], bestFor: "Growing kiranas aiming for more footfall." },
    { name: "Growth + Supply", price: "₹899/mo", features: ["Advanced FMCG analytics", "B2B Supply chain leads", "Google Cloud Backup", "Distributor Referrals"], bestFor: "Established stores wanting to optimize procurement." }
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
              <Button 
                onClick={() => window.open("https://whatsapp.com/channel/0029VbBxi9eJZg4DGvYpBx0U", "_blank")}
                size="xl"
                className="bg-white text-indigo-900 border-none shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all h-24"
              >
                START MANAGING YOUR DUKAAN 🚀
              </Button>
              <Button 
                onClick={() => navigate('/demo')}
                variant="outline"
                size="xl"
                className="border-white/30 text-white hover:bg-white/10 active:scale-[0.98] h-24"
              >
                VIEW DEMO DASHBOARD 📊
              </Button>
            </div>
          </div>
          <div className="relative" ref={mockupRef}>
            <div className="sm:p-4 rounded-[2rem] sm:rounded-[3rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] border-[8px] sm:border-[12px] border-slate-800 rotate-2 transform hover:rotate-0 transition-transform duration-1000 group max-w-[420px] mx-auto bg-slate-800 overflow-hidden relative">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-b-3xl z-20 flex items-center justify-center">
                 <div className="w-14 h-1 bg-slate-800 rounded-full"></div>
               </div>
               <div className="bg-[#efe7de] w-full h-[600px] flex flex-col relative z-10 pointer-events-auto">
                 <WhatsAppSimulation storeId="demo-mode" />
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
              <Card key={i} className="p-12 space-y-8 group hover:bg-indigo-600 transition-all duration-500 border-b-8 border-slate-900 hover:border-indigo-900 relative">
                <div className="w-20 h-20 bg-indigo-50 rounded-[1.5rem] flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform group-hover:bg-white/20">
                  {f.icon}
                </div>
                <div className="space-y-4">
                  <Card.Title className="text-4xl group-hover:text-white leading-none tracking-tighter">{f.title}</Card.Title>
                  <Card.Description className="text-lg group-hover:text-indigo-50 font-bold italic opacity-70">"{f.desc}"</Card.Description>
                  <div className="pt-6 border-t border-slate-100 group-hover:border-indigo-400">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 group-hover:text-white mb-2">Bharat Advantage</p>
                    <p className="text-sm font-black italic text-slate-800 group-hover:text-white underline decoration-emerald-400 decoration-4 underline-offset-4">{f.benefit}</p>
                  </div>
                </div>
                <div className="absolute top-10 right-10 text-slate-100/10 group-hover:text-white/10 text-9xl font-black italic pointer-events-none uppercase tracking-tighter leading-none select-none italic">
                   {i + 1}
                </div>
              </Card>
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
              <Card key={i} className="p-12 flex flex-col items-center text-center space-y-8 border-b-8 border-indigo-600 hover:translate-y-[-8px] transition-all duration-500 bg-white group shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="text-8xl group-hover:scale-110 transition-transform duration-500">{p.icon}</div>
                <Card.Title className="text-3xl leading-tight italic tracking-tighter uppercase">{p.problem}</Card.Title>
                <Button 
                  onClick={() => navigate(p.link)}
                  className="w-full h-14 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  {p.cta} ➔
                </Button>
              </Card>
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
              <Card key={i} className={cn(
                "p-10 flex flex-col border-b-8 transition-all duration-500 relative overflow-hidden h-full",
                p.name === 'Growth + Supply' 
                  ? 'bg-slate-900 text-white border-indigo-500 scale-105 shadow-2xl z-10' 
                  : 'bg-white text-slate-900 border-slate-200 shadow-xl'
              )}>
                <div className="mb-8">
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-4 opacity-70 leading-none">{p.name}</h3>
                  <div className="flex flex-col">
                    <span className="text-5xl font-black italic tracking-tighter">{p.price}</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-1 italic">per shop / month</span>
                  </div>
                </div>
                <div className="flex-1 space-y-5 mb-10">
                  {p.features.map((feat, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-[10px] font-black italic">✓</div>
                      <span className="text-sm font-bold opacity-80 italic tracking-tight">{feat}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  <div className={cn(
                    "p-5 rounded-3xl border-2 italic",
                    p.name === 'Growth + Supply' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'
                  )}>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-2">Mission Fit</p>
                    <p className="text-xs font-black tracking-tight leading-relaxed">{p.bestFor}</p>
                  </div>
                  <Button 
                    variant={p.name === 'Growth + Supply' ? 'primary' : 'secondary'}
                    className="w-full py-6 h-14 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none transition-all italic tracking-tighter"
                  >
                    CHOOSE THIS PLAN ➔
                  </Button>
                </div>
                <div className="absolute -top-4 -right-4 text-9xl font-black italic opacity-[0.03] select-none pointer-events-none italic uppercase">
                  {p.name[0]}
                </div>
              </Card>
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
              <Card key={i} className="p-12 border-b-8 border-indigo-100 hover:border-indigo-600 space-y-8 relative group hover:scale-105 transition-all duration-500 bg-white shadow-xl">
                <div className="text-8xl text-indigo-100 absolute top-4 left-4 opacity-30 group-hover:opacity-60 transition-opacity italic font-black">“</div>
                <p className="text-2xl font-black italic tracking-tight text-slate-900 leading-tight relative z-10 pt-8">
                  {t.quote}
                </p>
                <div className="flex items-center gap-5 pt-8 border-t-2 border-slate-50">
                  <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg italic">
                    {t.icon}
                  </div>
                  <div>
                    <p className="text-xl font-black italic tracking-tight text-slate-900 leading-none mb-1">{t.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 italic">{t.shop}</p>
                  </div>
                </div>
              </Card>
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
            ].map((b, i) => ( b &&
              <Card key={i} className="p-10 border-b-8 border-slate-100 hover:border-indigo-600 hover:scale-105 transition-all duration-500 group bg-white">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-indigo-600 transition-colors italic">{b.tag}</span>
                <Card.Title className="text-3xl mt-4 mb-6 leading-none italic">{b.title}</Card.Title>
                <Card.Description className="mb-8 opacity-80 italic font-bold">"{b.excerpt}"</Card.Description>
                <Button 
                   onClick={() => navigate('/blog')}
                   variant="ghost"
                   className="text-[11px] font-black uppercase tracking-widest text-slate-900 p-0 h-auto hover:bg-transparent underline decoration-emerald-400 decoration-4 underline-offset-8 hover:decoration-indigo-600"
                >
                  READ ANALYSIS ➔
                </Button>
              </Card>
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

      {/* Internal Navigation for Discovery Crawl */}
      <section className="py-32 px-6 lg:px-20 bg-white border-y border-slate-100">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900 leading-tight">
              Top Growth Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Manage Udhaar Safely", link: "/p/bahi-khata-alternative" },
                { title: "Increase Shop GMV", link: "/p/kirana-store-ko-grow-kaise-kare" },
                { title: "WhatsApp Billing Setup", link: "/p/kirana-store-software" },
                { title: "Inventory Masterclass", link: "/p/inventory-management-kirana" },
                { title: "Automate Reviews", link: "/get-more-google-reviews-for-shop" },
                { title: "Zero Cost Shop Launch", link: "/p/dukaan-online-kaise-laye" },
              ].map((guide, i) => (
                <Link key={i} to={guide.link} className="p-6 bg-slate-50 hover:bg-slate-100 rounded-3xl border border-slate-100 transition-colors flex justify-between items-center group">
                  <span className="font-bold text-slate-700 italic group-hover:text-indigo-600 transition-colors">{guide.title}</span>
                  <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">➔</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-12">
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900 leading-tight">
              Areas We Serve
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                "Lucknow", "Kanpur", "Delhi", "Mumbai", "Bangalore", "Pune", 
                "Ahmedabad", "Hyderabad", "Chennai", "Kolkata", "Jaipur", "Surat"
              ].map((city, i) => (
                <Link key={i} to={`/${city.toLowerCase()}`} className="p-6 bg-indigo-50 hover:bg-indigo-600 rounded-3xl border border-indigo-100 transition-colors flex justify-between items-center group">
                  <span className="font-black tracking-tight text-indigo-900 group-hover:text-white transition-colors">{city}</span>
                </Link>
              ))}
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
