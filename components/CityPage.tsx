
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';

const cityData = {
  "lucknow": {
    name: "Lucknow",
    title: "Best Dukaan Management App in Lucknow | Kirana Software Lucknow",
    description: "Empowering Lucknow's kirana stores with AI-powered WhatsApp automation. Join 500+ shops in Lucknow using DukaanMitra to manage sales and udhaar.",
    keywords: "kirana software lucknow, dukaan app lucknow, retail management lucknow, shop automation lucknow",
    stats: "500+ Shops in Lucknow",
    testimonial: "Lucknow ke dukaandaaro ke liye DukaanMitra sabse bada vardaan hai. Ab bahi-khata ki tension khatam!",
    author: "Rajesh Kumar, Aminabad",
    localTips: "Lucknow markets like Aminabad and Chowk are seeing a massive shift to digital payments. DukaanMitra helps local merchants track these UPI payments alongside cash automatically.",
    cityGuides: ["kanpur-me-shop-ko-online-kaise-laaye", "google-business-profile-kaise-banaye"]
  },
  "kanpur": {
    name: "Kanpur",
    title: "Top Kirana Store Software in Kanpur | Retail Automation Kanpur",
    description: "Digitize your Kanpur retail business with DukaanMitra. The most trusted shop management app for Kanpur's busy traders and kirana owners.",
    keywords: "kirana store software kanpur, retail software kanpur, dukaan management kanpur, business automation kanpur",
    stats: "750+ Shops in Kanpur",
    testimonial: "Kanpur ki bheed mein hisaab rakhna mushkil tha, par DukaanMitra ne sab asaan kar diya.",
    author: "Suresh Gupta, Gumti No. 5",
    localTips: "In Kanpur's busy hubs like Naveen Market, speed is key. Our AI parses voice notes and texts in seconds, perfect for high-volume traders.",
    cityGuides: ["kanpur-me-shop-ko-online-kaise-laaye", "gbp-suspend-kyun-hota-hai"]
  },
  "delhi": {
    name: "Delhi",
    title: "Enterprise Retail App Delhi | Digital Shop Software NCR",
    description: "Scale your Delhi retail empire with DukaanMitra. Advanced automation for Delhi's competitive markets from Chandni Chowk to Karol Bagh.",
    keywords: "kirana software delhi, retail app delhi, shop management software delhi, business automation delhi",
    stats: "1200+ Shops in Delhi NCR",
    testimonial: "Delhi NCR ke competitive market mein DukaanMitra humein edge deta hai.",
    author: "Mohit Jain, Chandni Chowk",
    localTips: "Delhi merchants use DukaanMitra to handle both local customers and wholesale tracking efficiently.",
    cityGuides: ["google-business-profile-kaise-banaye", "ai-sandboxing-secure-shop-data"]
  },
  "mumbai": {
    name: "Mumbai",
    title: "Retail Automation Mumbai | Smart Dukaan App Maharashtra",
    description: "Automate your Mumbai shop with India's smartest AI Munim. Trusted by retailers across Mumbai and Navi Mumbai.",
    keywords: "kirana software mumbai, retail management mumbai, dukaan app mumbai, business automation mumbai",
    stats: "1000+ Shops in Mumbai",
    testimonial: "Mumbai local jaisi tezi chahiye shop management mein, aur woh DukaanMitra deta hai.",
    author: "Vikas Patil, Dadar",
    localTips: "Mumbai's high real estate costs mean you need efficient inventory. Tracking dead stock helps save space.",
    cityGuides: ["whatsapp-se-order-kaise-le", "local-business-ko-customer-kaise-mile"]
  },
  "bangalore": {
    name: "Bangalore",
    title: "Tech-Forward Retail App Bangalore | Kirana Software Bengaluru",
    description: "Bring the Silicon Valley efficiency to your Bangalore kirana store. AI-driven shop management for modern Karnataka retailers.",
    keywords: "kirana software bangalore, retail app bangalore, shop management software bengaluru, business automation karnataka",
    stats: "850+ Shops in Bangalore",
    testimonial: "Tech city ke liye tech-smart munim! DukaanMitra is revolutionary.",
    author: "Ananth K, Indiranagar",
    localTips: "Bangalore customers expect digital bills. DukaanMitra sends them instantly via WhatsApp.",
    cityGuides: ["ai-sandboxing-secure-shop-data", "manage-kirana-store-digitally-india-2026"]
  },
  "pune": {
    name: "Pune",
    title: "Smart Shop Management Pune | Retail Software Maharashtra",
    description: "The most efficient way to manage your retail business in Pune. Simplify bahi-khata and recover udhaar faster with AI.",
    keywords: "kirana software pune, retail app pune, shop management software pune, business automation maharashtra",
    stats: "600+ Shops in Pune",
    testimonial: "Pune ki dukaano ke liye sabse asaan digital tool.",
    author: "Abhishek Deshmukh, Kothrud",
    localTips: "Pune merchants prefer our clean analytics to track monthly growth trends.",
    cityGuides: ["manage-kirana-store-digitally-india-2026", "gbp-suspend-kyun-hota-hai"]
  },
  "ahmedabad": {
    name: "Ahmedabad",
    title: "Best Kirana Software Ahmedabad | Shop App Gujarat",
    description: "Modernize your Ahmedabad business with AI. Top-rated retail management for merchants in Manek Chowk and CG Road.",
    keywords: "kirana software ahmedabad, retail app ahmedabad, shop management gujarat",
    stats: "450+ Shops in Ahmedabad",
    testimonial: "Ahmedabad ke vyapariyon ke liye sabse tez hisaab-kitab software.",
    author: "Gautam Shah, Manek Chowk",
    localTips: "Ahmedabad merchants use our AI to track bulk transactions and festive season sales.",
    cityGuides: ["kirana-shop-daily-sales-system", "google-business-profile-kaise-banaye"]
  },
  "hyderabad": {
    name: "Hyderabad",
    title: "Top Retail App Hyderabad | Kirana Software Telangana",
    description: "Efficiency meeting tradition. The best WhatsApp-first shop software for Hyderabad's busy retailers and wholesalers.",
    keywords: "retail app hyderabad, kirana software telangana, shop management hyderabad",
    stats: "550+ Shops in Hyderabad",
    testimonial: "Banjara Hills and Ameerpet shops are managing wholesale orders via our WhatsApp catalogue automation.",
    author: "Srinivas Rao, Ameerpet",
    localTips: "Hyderabad businesses are moving to digital catalogues to handle high order volumes.",
    cityGuides: ["whatsapp-se-order-kaise-le", "best-billing-software-for-small-shop"]
  },
  "chennai": {
    name: "Chennai",
    title: "Smart Shop App Chennai | Retail Software Tamil Nadu",
    description: "Automate your Chennai shop with AI. Recover udhaar faster and manage sales via WhatsApp. Trusted by T. Nagar merchants.",
    keywords: "shop app chennai, retail software tamil nadu, kirana software chennai",
    stats: "400+ Shops in Chennai",
    testimonial: "Anna Nagar boutiques are automating customer replies using our AI sandbox logic.",
    author: "Karthik Raja, T. Nagar",
    localTips: "Chennai merchants prioritize data privacy, which our AI Sandbox ensures.",
    cityGuides: ["ai-sandboxing-secure-shop-data", "local-business-ko-customer-kaise-mile"]
  },
  "kolkata": {
    name: "Kolkata",
    title: "Best Bahi-Khata App Kolkata | Retail Software West Bengal",
    description: "Replace manual registers in Kolkata with AI Munim. Digital transformation for Burrabazar and Park Street wholesalers.",
    keywords: "bahi khata app kolkata, retail software west bengal, shop management kolkata",
    stats: "650+ Shops in Kolkata",
    testimonial: "Kolkata wholesalers are digitizing their manual registers using DukaanMitra AI.",
    author: "Arijit Das, Burrabazar",
    localTips: "Burrabazar traders save 4 hours daily using our automated ledger sync.",
    cityGuides: ["udhaar-ka-hisaab-kaise-rakhe", "best-billing-software-for-small-shop"]
  },
  "jaipur": {
    name: "Jaipur",
    title: "Shop Management App Jaipur | Kirana Software Rajasthan",
    description: "The most trusted digital munim for Jaipur's retailers. Manage your Pink City shop with the power of WhatsApp AI.",
    keywords: "shop app jaipur, kirana software rajasthan, retail management jaipur",
    stats: "350+ Shops in Jaipur",
    testimonial: "Johari Bazar and C-Scheme outlets use AI insights to manage seasonal stock demands.",
    author: "Vikram Singh, C-Scheme",
    localTips: "Jaipur outlets use AI reports to predict tourist season stock requirements.",
    cityGuides: ["manage-kirana-store-digitally-india-2026", "kirana-shop-daily-sales-system"]
  },
  "surat": {
    name: "Surat",
    title: "Fast Billing Software Surat | Retail App Gujarat",
    description: "Handle 100+ daily transactions easily. The fastest WhatsApp billing software for Surat's textile and kirana markets.",
    keywords: "billing software surat, retail app surat, shop management gujarat",
    stats: "700+ Shops in Surat",
    testimonial: "Textile market merchants are using high-speed WhatsApp billing to manage 100+ daily transactions.",
    author: "Dhaval Patel, Varachha",
    localTips: "Surat traders love our 'One-Message Billing' for high-frequency sales.",
    cityGuides: ["best-billing-software-for-small-shop", "udhaar-ka-hisaab-kaise-rakhe"]
  }
};

const CityPage: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  let data = city ? cityData[city.toLowerCase() as keyof typeof cityData] : null;

  if (!data && city) {
    const formattedCity = city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    data = {
      name: formattedCity,
      title: `Best Dukaan & Kirana Software in ${formattedCity} | DukaanMitra`,
      description: `Empowering ${formattedCity}'s retail stores with AI-powered WhatsApp automation. Start managing udhaar and billing digitally.`,
      keywords: `kirana software ${formattedCity}, dukaan app ${formattedCity}, retail management ${formattedCity}, shop automation ${formattedCity}`,
      stats: `Trusted Local Business Tool`,
      testimonial: `${formattedCity} ke dukaandaaron ke liye sabse asaan WhatsApp munim. Zero tracking errors aur faster udhaar recovery.`,
      author: "Local Merchant",
      localTips: `Digital payments are booming in ${formattedCity}. DukaanMitra helps local merchants track these alongside cash automatically.`,
      cityGuides: ["kanpur-me-shop-ko-online-kaise-laaye", "whatsapp-se-order-kaise-le"]
    };
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-6 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-8 italic uppercase">City Not Found</h1>
        <Link to="/" className="text-indigo-600 font-black uppercase tracking-widest border-b-2 border-indigo-600 pb-1">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="keywords" content={data.keywords} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `DukaanMitra ${data.name}`,
            "description": data.description,
            "areaServed": {
              "@type": "City",
              "name": data.name
            },
            "url": `https://dukaanmitra.in/${city}`,
            "telephone": "+91 63937 41171"
          })}
        </script>
      </Helmet>

      <section className="py-32 px-6 lg:px-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 bg-white/10 px-5 py-2 rounded-full border border-white/10 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Local SEO Spotlight: {data.name}</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black italic tracking-tighter leading-[0.8] uppercase">
            DukaanMitra <br/>
            <span className="text-emerald-400">in {data.name}</span>
          </h1>
          <p className="text-2xl text-slate-300 font-bold italic max-w-3xl mx-auto">
            {data.description}
          </p>
          <div className="pt-12">
            <Link 
              to="/"
              className="bg-white text-indigo-900 px-12 py-6 rounded-[2.5rem] font-black text-2xl shadow-2xl hover:scale-105 transition-all inline-block italic tracking-tighter"
            >
              Get Started for FREE in {data.name} 🚀
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-slate-900 leading-none">
              Why {data.name}'s Smart दुकानदार Choose Us?
            </h2>
            <div className="space-y-6">
              {[
                { t: "99.9% Accuracy", d: "Our AI understands local dialects and slang used in UP markets." },
                { t: "Zero Training", d: "If you can use WhatsApp, you can use DukaanMitra." },
                { t: "Instant Udhaar Reminders", d: "Recover payments faster with automated WhatsApp alerts." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex-shrink-0 flex items-center justify-center text-white font-black">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-black italic text-slate-900 uppercase">{item.t}</h3>
                    <p className="text-slate-500 font-bold italic">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-100 shadow-2xl space-y-8">
            <div className="text-6xl text-indigo-600 opacity-20 font-black italic">"</div>
            <p className="text-2xl font-black italic text-slate-900 leading-relaxed">
              {data.testimonial}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-xs">
                {data.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-black italic text-slate-900">{data.author}</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{data.stats}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-20 bg-slate-50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900 leading-none">
              Local Insights for {data.name} Retailers
            </h2>
            <p className="text-xl text-slate-500 font-bold italic">{data.localTips}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-4">
              <h3 className="text-xl font-black italic text-slate-900 uppercase">Best Shop App in {data.name}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Looking for the best shop management app in {data.name}? DukaanMitra provides localized AI tools for {data.name} retailers.
              </p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-4">
              <h3 className="text-xl font-black italic text-slate-900 uppercase">Kirana Software {data.name}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Join 500+ kirana stores in {data.name} using our WhatsApp billing system. Modernize your {data.name} business today.
              </p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-4">
              <h3 className="text-xl font-black italic text-slate-900 uppercase">WhatsApp Billing {data.name}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Setup high-speed WhatsApp billing for your {data.name} based shop. No hardware, just your phone.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-6">
              <h3 className="text-2xl font-black italic text-slate-900 uppercase">Related Guides for {data.name}</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/blog/kanpur-me-shop-ko-online-kaise-laaye" className="text-indigo-600 font-black italic text-lg hover:underline block leading-tight">
                    • How to take your {data.name} based physical shop online?
                  </Link>
                </li>
                <li>
                  <Link to="/blog/gbp-suspend-kyun-hota-hai" className="text-indigo-600 font-black italic text-lg hover:underline block leading-tight">
                    • Fixing your shop's Google Maps location issues in {data.name}.
                  </Link>
                </li>
              </ul>
            </div>
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-6">
              <h3 className="text-2xl font-black italic text-slate-900 uppercase">Our Presence in {data.name}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                DukaanMitra is actively partnering with local merchant associations in {data.name} to digitize the traditional kirana ecosystem. We believe in "Local First, Digital Next".
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-20 bg-indigo-600 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Join the {data.name} Retail Revolution</h2>
          <p className="text-xl font-bold italic opacity-90">Stop wasting time on manual entries. Let AI handle your dukaan.</p>
          <a 
            href="https://whatsapp.com/channel/0029VbBxi9eJZg4DGvYpBx0U"
            target="_blank" rel="noopener noreferrer"
            className="bg-slate-900 text-white px-12 py-6 rounded-[2.5rem] font-black text-2xl shadow-2xl hover:bg-white hover:text-indigo-600 transition-all inline-block italic tracking-tighter"
          >
            Start Your 14-Day Free Trial ➔
          </a>
        </div>
      </section>
    </div>
  );
};

export default CityPage;
