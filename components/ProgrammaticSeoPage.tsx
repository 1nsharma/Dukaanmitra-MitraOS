import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, ChevronRight, Zap } from 'lucide-react';

interface SeoPageData {
  title: string;
  metaDesc: string;
  keywords: string;
  h1: string;
  subtitle: string;
  problemHeading: string;
  problems: string[];
  solutionHeading: string;
  solutions: string[];
  ctaText: string;
  category: 'Money' | 'Growth' | 'Problem';
}

const seoPagesDatabase: Record<string, SeoPageData> = {
  // Pillar 1: Core Product (Money)
  "kirana-store-software": {
    category: "Money",
    title: "Kirana Store Management Software | WhatsApp First App",
    metaDesc: "The only kirana store software you need runs directly on WhatsApp. No complex POS, no learning curve. Manage inventory and billing fast.",
    keywords: "kirana store management software, retail shop software india, small shop billing software",
    h1: "The Simplest Kirana Store Software is WhatsApp",
    subtitle: "Stop paying for heavy desktop POS systems. Upgrade to AI Munim.",
    problemHeading: "Traditional Software is Broken",
    problems: ["Requires expensive computers", "Hard to train new staff", "Constant app updates", "Hidden annual fees"],
    solutionHeading: "Why Kirana Shops Choose WhatsApp",
    solutions: ["Works on any smartphone instantly", "Zero learning curve for staff", "Fastest billing via simple texts", "Always free to start"],
    ctaText: "Start Digital Kirana"
  },
  "bahi-khata-alternative": {
    category: "Money",
    title: "Best Bahi Khata App Alternative | DukaanMitra",
    metaDesc: "Throw away the red notebook. DukaanMitra is the smartest bahi khata alternative that lives entirely on WhatsApp with automatic reminders.",
    keywords: "bahi khata app alternative, khata book app whatsapp, udhaar ledger app india",
    h1: "Replace Your Bahi Khata with WhatsApp",
    subtitle: "Digital ledger with automated Udhaar recovery.",
    problemHeading: "The Red Notebook is Costing You Money",
    problems: ["Water damage and lost books", "Forgetting to write down udhaar", "Calculations take hours", "Awkward to ask for money back"],
    solutionHeading: "The AI Bahi Khata",
    solutions: ["Auto-calculation of all dues", "Polite automated WhatsApp reminders", "Cloud backup every second", "Daily summary reports"],
    ctaText: "Upgrade Bahi Khata"
  },
  "inventory-management-kirana": {
    category: "Money",
    title: "Inventory Management for Kirana Store | Automated Tool",
    metaDesc: "Smart stock management app for Kirana stores. Get low-stock alerts on WhatsApp automatically.",
    keywords: "inventory management kirana store, stock management app india, grocery store inventory management",
    h1: "Kirana Inventory Management on Auto-Pilot",
    subtitle: "Know exactly what to order, before you run out.",
    problemHeading: "Manual Stock Counting is Slow",
    problems: ["Running out of best-sellers", "Dead stock eating cash flow", "No idea of actual profit", "Hours spent manually matching items"],
    solutionHeading: "The AI Stock Manager",
    solutions: ["Real-time stock deduction", "Low-inventory WhatsApp alerts", "Fast-moving vs Dead item reports", "Data-driven purchasing"],
    ctaText: "Automate Inventory"
  },
  // Pillar 2: Growth (GMB)
  "increase-google-business-rating": {
    category: "Growth",
    title: "How to Increase Google My Business Rating | Fast Strategy",
    metaDesc: "Increase your Local shop's Google My Business rating automatically by collecting 5-star reviews via WhatsApp after every sale.",
    keywords: "increase google my business rating, how to rank on google maps india, gmb optimization for small business india",
    h1: "Increase Your Google Business Rating Automatically",
    subtitle: "Rank #1 on Google Maps in your neighborhood effortlessly.",
    problemHeading: "Why Are You Losing to Local Competitors?",
    problems: ["Low total review count", "Negative reviews standing out", "Customers simply forget to rate", "Poor local SEO map ranking"],
    solutionHeading: "The Automated 5-Star Engine",
    solutions: ["Trigger review requests via WhatsApp", "Increase 5-star baseline frequency", "Boost Google map local rankings", "Drive 3x more organic footfall"],
    ctaText: "Grow GMB Rating"
  },
  "whatsapp-review-automation": {
    category: "Growth",
    title: "WhatsApp Review Automation for Local Shops",
    metaDesc: "Generate Google review links and send them automatically on WhatsApp. The best automation tool for local retail growth.",
    keywords: "whatsapp review automation, generate google review link, google review link generator",
    h1: "Automate Your Google Reviews via WhatsApp",
    subtitle: "Turn happy customers into 5-star Google promoters without asking.",
    problemHeading: "Asking for Reviews is Awkward & Manual",
    problems: ["Staff forgets to actually ask", "Customers ignore SMS links", "Pasting generic links looks spammy", "No system to track success rate"],
    solutionHeading: "DukaanMitra's Silent Growth Loop",
    solutions: ["100% automated post-purchase sequence", "WhatsApp has a 98% open rate", "One-click frictionless path to Google Maps", "Track daily rating growth visually"],
    ctaText: "Start Automating Reviews"
  },
  // Pillar 3: Problem / Traffic
  "dukaan-online-kaise-laye": {
    category: "Problem",
    title: "Dukaan Online Kaise Laye? | Bina Website Beche",
    metaDesc: "Apni dukaan online kaise laye bina kisi app ya website ke? DukaanMitra se WhatsApp ke zariye online business shuru karein 2 minute mein.",
    keywords: "dukaan online kaise laye, whatsapp se dukaan kaise chalaye, bina app ke dukaan manage kaise kare",
    h1: "Dukaan Online Kaise Laye? (Bina Kisi App Ke)",
    subtitle: "Website banana mehenga hai. WhatsApp par business shuru karna bilkul free aur aasan hai.",
    problemHeading: "Online Jaane Ke Puraane aur Mehenge Tarike",
    problems: ["₹20,000+ custom website development", "Grahak app download nahi karte hain", "Swiggy/Zomato jaise >30% commission", "Technical knowledge ki zaroorat"],
    solutionHeading: "WhatsApp Hi Aapki Nayi Dukaan Hai",
    solutions: ["WhatsApp par digital ordering link", "Direct chat par order sheet", "Zero commission on localized sales", "Sirf 2 minute mein set-up live"],
    ctaText: "Dukaan Online Layein"
  },
  "whatsapp-se-saman-kaise-beche": {
    category: "Problem",
    title: "WhatsApp Se Saman Kaise Beche? | Kirana Guide",
    metaDesc: "Aasan tariko se jane whatsapp se saman kaise beche. Local customers se seedhe order receive karein aur sales badhayein.",
    keywords: "whatsapp se saman kaise beche, how to sell on whatsapp business, whatsapp order management system",
    h1: "WhatsApp Se Seedhe Saman Kaise Beche",
    subtitle: "Jab poora Bharat WhatsApp chalata hai, toh order lene ke liye kisi alag app ki kyun zaroorat?",
    problemHeading: "Phone Calls Par Order Lene Ke Nuksaan",
    problems: ["Line busy aana aur grahak laut jana", "Items list slip me bhool jana", "Rate aur inventory ko lekar confusion", "Dukaandar ke samay ki barbaadi"],
    solutionHeading: "Smart WhatsApp Store Layout",
    solutions: ["Automated readable order list", "Instant digital bill PDF sharing", "UPI link generated for payment", "No missed orders, complete clarity"],
    ctaText: "WhatsApp Store Start Karein"
  },
  "kirana-store-ko-grow-kaise-kare": {
    category: "Problem",
    title: "Kirana Store Ko Grow Kaise Kare | AI Strategy",
    metaDesc: "Janiye apna kirana store ko grow kaise kare. Modern AI tools aur WhatsApp marketing se sales aur footfall dono badhayein.",
    keywords: "kirana store ko grow kaise kare, how to increase shop sales, local business promotion ideas india",
    h1: "Apne Kirana Store Ko Agle Level Par Kaise Le Jayein",
    subtitle: "Dukaan wahi, Graahak Naye. AI ki madad se badhayein apna business practically.",
    problemHeading: "Sales Badhane Me Aane Wali Pareshaniya",
    problems: ["Bade corporate supermarts se competition", "Naye grahak nahi judna", "Purane grahak Dmart shift hona", "Koi targeted marketing system na hona"],
    solutionHeading: "DukaanMitra Ka Business Growth System",
    solutions: ["Google reviews se top neighborhood ranking", "WhatsApp par automated aakarshak offers bhejna", "Udhaar time par wapas lakar cash-flow badhana", "Data-based inventory decisions lena"],
    ctaText: "Grow Your Kirana Store"
  }
};

import { NotFound } from './NotFound';

// Extract the valid slugs from the database to restrict rendering of fake paths
const validSlugs = Object.keys(seoPagesDatabase);

// Additional generated slugs from the sitemap list that don't have explicit DB entries yet, 
// to ensure we don't 404 on them while they use the fallback generator.
const sitemapSlugs = [
  'kirana-store-software', 'bahi-khata-alternative', 'inventory-management-kirana',
  'increase-google-business-rating', 'whatsapp-review-automation', 'dukaan-online-kaise-laye',
  'whatsapp-se-saman-kaise-beche', 'kirana-store-ko-grow-kaise-kare', 'best-billing-software-for-mobile-shop',
  'garment-shop-software-free', 'hardware-shop-billing-app', 'medical-store-software-india',
  'supermarket-billing-software-free-download', 'jewellery-shop-management-software',
  'sweet-shop-billing-software', 'footwear-shop-software', 'electronics-shop-billing-app',
  'kirana-khata-app-for-pc', 'bina-internet-ke-billing-machine', 'whatsapp-par-customer-ko-bill-kaise-bheje',
  'auto-parts-shop-free-billing', 'grocery-shop-inventory-excel', 'retail-shop-accounting-software',
  'free-gst-billing-software', 'mobile-accessories-shop-software', 'kirana-shop-profit-calculator',
  'whatsapp-catalog-maker-app', 'digital-payment-tracker-for-shop'
];

export const ProgrammaticSeoPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || (!validSlugs.includes(slug.toLowerCase()) && !sitemapSlugs.includes(slug.toLowerCase()))) {
    return <NotFound />;
  }

  let data = seoPagesDatabase[slug.toLowerCase()];

  if (!data && slug) {
    const formattedTitle = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    data = {
      category: "Growth",
      title: `${formattedTitle} | DukaanMitra AI Solutions`,
      metaDesc: `Discover the best automated solutions for ${formattedTitle} using DukaanMitra's WhatsApp-first AI engine.`,
      keywords: `${slug.replace(/-/g, ' ')}, small business tools india, retail shop software`,
      h1: formattedTitle,
      subtitle: "Transform your dukaan business practically with AI automation.",
      problemHeading: "The Traditional Hassle",
      problems: [
        "Manual tracking takes up to 3 hours daily", 
        "Losing track of important financial data", 
        "Inefficient customer retention flow", 
        "Competitive disadvantage against modern marts"
      ],
      solutionHeading: "The AI-Powered Path",
      solutions: [
        "100% automated WhatsApp workflows", 
        "Zero staff training required", 
        "Data-driven business decisions", 
        "Increase overall GMV margins"
      ],
      ctaText: "Get Started Now"
    };
  }

  if (!data) {
    return <Navigate to="/blog" replace />; // Fallback if slug not found
  }

  const badgeColor = 
    data.category === 'Money' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' :
    data.category === 'Growth' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
    'bg-amber-500/20 text-amber-400 border-amber-500/30';

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.metaDesc} />
        <meta name="keywords" content={data.keywords} />
        <link rel="canonical" href={`https://dukaanmitra.in/p/${slug}`} />
      </Helmet>

      {/* Primary Hero */}
      <section className="bg-slate-900 text-white py-24 lg:py-32 px-6 lg:px-20 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[100px] transform -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-emerald-500/10 rounded-full blur-[100px] transform translate-y-1/4 translate-x-1/4 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${badgeColor}`}>
            {data.category} Solution
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter leading-tight drop-shadow-lg">
            {data.h1}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-bold max-w-2xl mx-auto opacity-90">
            {data.subtitle}
          </p>
          <div className="pt-8">
             <a href="https://whatsapp.com/channel/0029VbBxi9eJZg4DGvYpBx0U" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-[2rem] font-black tracking-widest uppercase hover:bg-slate-100 transition-all shadow-xl hover:scale-105">
                <Zap size={20} className="text-amber-500" />
                <span>{data.ctaText}</span>
             </a>
          </div>
        </div>
      </section>

      {/* Problem Framework */}
      <section className="py-24 px-6 lg:px-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-slate-900 uppercase">
              {data.problemHeading}
            </h2>
            <div className="space-y-4">
              {data.problems.map((problem, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 shrink-0 bg-red-100 text-red-500 rounded-full flex items-center justify-center font-black">❌</div>
                  <p className="font-bold text-slate-600 text-lg">{problem}</p>
                </div>
              ))}
            </div>
            <p className="text-xl font-black italic text-red-500 uppercase tracking-wide pt-4">You are losing money and time.</p>
          </div>
          <div className="relative h-full min-h-[400px] flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-white rounded-[3rem] shadow-inner border border-slate-200 transform rotate-3"></div>
             <div className="relative z-10 text-center space-y-6">
                <div className="text-8xl">🤦</div>
                <h3 className="text-2xl font-black text-slate-400 italic uppercase">The Old Way</h3>
             </div>
          </div>
        </div>
      </section>

      {/* Solution Framework */}
      <section className="py-24 px-6 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center flex-col-reverse md:flex-row">
          <div className="relative h-full min-h-[400px] flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-emerald-50 rounded-[3rem] shadow-xl border border-indigo-50 transform -rotate-3"></div>
             <div className="relative z-10 text-center space-y-6">
                <div className="text-8xl animate-bounce">📱</div>
                <h3 className="text-2xl font-black text-indigo-600 italic uppercase">The Munim Way</h3>
             </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-slate-900 uppercase">
              {data.solutionHeading}
            </h2>
            <div className="space-y-4">
              {data.solutions.map((solution, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border-l-[6px] border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                  <CheckCircle2 className="text-emerald-500 shrink-0" size={28} />
                  <p className="font-black italic text-slate-800 text-lg tracking-tight">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Action */}
      <section className="py-24 px-6 bg-slate-900 border-t-8 border-indigo-500 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-8 relative z-10 text-white">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
            Join Thousands of Smart Shopkeepers
          </h2>
          <p className="text-xl font-bold text-slate-400 pb-8">
            DukaanMitra lets you operate natively via WhatsApp. Free to start, entirely AI powered.
          </p>
          <a href="https://whatsapp.com/channel/0029VbBxi9eJZg4DGvYpBx0U" target="_blank" rel="noopener noreferrer" className="inline-flex mt-8 items-center gap-3 px-12 py-6 bg-emerald-500 text-slate-900 rounded-[2rem] font-black text-xl tracking-widest uppercase hover:bg-emerald-400 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:scale-105">
            <span>Send "START" Now</span>
            <ChevronRight size={24} />
          </a>
        </div>
      </section>
    </div>
  );
};
