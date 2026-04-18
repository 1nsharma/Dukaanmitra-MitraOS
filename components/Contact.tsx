import React from 'react';
import { Helmet } from 'react-helmet-async';

const Contact: React.FC = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "DukaanMitra Technologies",
    "image": "https://dukaanmitra.in/logo.png",
    "@id": "https://dukaanmitra.in",
    "url": "https://dukaanmitra.in",
    "telephone": "Available strictly via WhatsApp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Swaroop Nagar",
      "addressLocality": "Kanpur",
      "addressRegion": "UP",
      "postalCode": "208005",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.4837,
      "longitude": 80.3168
    },
    "founder": {
      "@type": "Person",
      "name": "Amit Sharma"
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-6 relative z-10">
      <Helmet>
        <title>Contact Us | DukaanMitra Support Kanpur</title>
        <meta name="description" content="Contact DukaanMitra for merchant support, WhatsApp business setup, and Google Business Profile consulting in Kanpur and across India." />
        <link rel="canonical" href="https://dukaanmitra.in/contact" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      <div className="text-center mb-16 space-y-6">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 italic tracking-tighter uppercase relative inline-block">
          Get in Touch
          <div className="absolute -bottom-4 left-0 w-full h-2 bg-indigo-600 rounded-full"></div>
        </h1>
        <p className="text-xl text-slate-600 font-bold max-w-2xl mx-auto">
          Need help digitizing your retail shop or setting up your WhatsApp Munim? We are here to help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact info */}
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col space-y-8">
          <h2 className="text-3xl font-black text-slate-900 italic uppercase">Reach Out</h2>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl shrink-0">📱</div>
            <div>
              <h3 className="font-black text-lg text-slate-900">WhatsApp Support</h3>
              <p className="text-slate-500 font-medium mb-2">Fastest way to reach us for app set up or business queries.</p>
              <a href="https://whatsapp.com/channel/0029VbBxi9eJZg4DGvYpBx0U" target="_blank" rel="noopener noreferrer" className="text-green-600 font-black uppercase tracking-widest text-sm hover:underline">
                Chat with DukaanMitra ➔
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl shrink-0">✉️</div>
            <div>
              <h3 className="font-black text-lg text-slate-900">Email Us</h3>
              <p className="text-slate-500 font-medium mb-2">For business partnerships or detailed SEO consultation.</p>
              <a href="mailto:support@dukaanmitra.in" className="text-indigo-600 font-black uppercase tracking-widest text-sm hover:underline">
                support@dukaanmitra.in
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center text-2xl shrink-0">📍</div>
            <div>
              <h3 className="font-black text-lg text-slate-900">Registered Office</h3>
              <p className="text-slate-500 font-medium">
                DukaanMitra Technologies <br/>
                Swaroop Nagar, Kanpur <br/>
                Uttar Pradesh 208005 <br/>
                Bharat (India)
              </p>
            </div>
          </div>
        </div>

        {/* Contact form (visual only for static site) */}
        <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 space-y-6">
             <h2 className="text-3xl font-black text-white italic uppercase">Drop a Message</h2>
             <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
               <div>
                 <input type="text" placeholder="Your Name or Shop Name" className="w-full px-6 py-4 rounded-2xl bg-white/10 text-white font-medium border border-white/20 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400" />
               </div>
               <div>
                 <input type="text" placeholder="WhatsApp Number" className="w-full px-6 py-4 rounded-2xl bg-white/10 text-white font-medium border border-white/20 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400" />
               </div>
               <div>
                 <textarea placeholder="How can we help you grow?" rows={4} className="w-full px-6 py-4 rounded-2xl bg-white/10 text-white font-medium border border-white/20 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400 resize-none"></textarea>
               </div>
               <button className="w-full bg-indigo-500 text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-xl shadow-indigo-500/30 hover:bg-indigo-400 transition-all active:scale-95">
                 Send Request
               </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
