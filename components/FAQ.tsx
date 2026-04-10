
import React from 'react';
import { Helmet } from 'react-helmet-async';

const FAQ: React.FC = () => {
  const faqs = [
    { q: "How do I start?", a: "Just sign up with your mobile number and start sending messages on our WhatsApp number." },
    { q: "Is my data safe?", a: "Yes, we use bank-grade encryption and Firebase security to protect your shop's data." },
    { q: "Can I use it offline?", a: "You need an internet connection for WhatsApp, but your data is synced whenever you're online." },
    { q: "Do my customers need the app?", a: "No, they receive bills and reminders directly on their WhatsApp." }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Helmet>
        <title>FAQ | DukaanMitra - Common Questions Answered</title>
        <meta name="description" content="Find answers to common questions about DukaanMitra AI WhatsApp assistant. Learn how to manage your kirana store digitally." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <h1 className="text-4xl font-black text-slate-900 mb-12 italic tracking-tighter uppercase text-center">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-lg font-black text-slate-900 mb-3 italic">Q: {faq.q}</h3>
            <p className="text-slate-600 font-medium leading-relaxed">A: {faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
