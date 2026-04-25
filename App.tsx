
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { auth, db } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Card } from './components/ui/Card';
import LandingPage from './components/LandingPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { StoreDashboard } from './components/StoreDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { WhatsAppSimulation } from './components/WhatsAppSimulation';
import About from './components/About';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import CityPage from './components/CityPage';
import SeoDashboard from './components/SeoDashboard';
import Layout from './components/Layout';
import Contact from './components/Contact';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import CaseStudies from './components/CaseStudies';
import FreeTools from './components/FreeTools';
import Templates from './components/Templates';
import { WhatsAppShopManagement } from './components/WhatsAppShopManagement';
import { GoogleReviewsShop } from './components/GoogleReviewsShop';
import { UdhaarManagementApp } from './components/UdhaarManagementApp';
import { ComparisonPage } from './components/ComparisonPage';
import { ProgrammaticSeoPage } from './components/ProgrammaticSeoPage';
import { NotFound } from './components/NotFound';
import { UserRole } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Check role
        const adminDoc = await getDoc(doc(db, 'admins', u.uid));
        if (adminDoc.exists()) {
          setRole({ uid: u.uid, role: 'superadmin' });
        } else {
          // Check if merchant has a store
          const merchantDoc = await getDoc(doc(db, 'merchants', u.uid));
          if (merchantDoc.exists()) {
            const storeId = merchantDoc.data().storeId;
            setRole({ uid: u.uid, role: 'merchant', storeId });
          } else {
            // New user, create a default store for demo
            const storeRef = await addDoc(collection(db, 'stores'), {
              name: `${u.displayName}'s Kirana Store`,
              ownerUid: u.uid,
              whatsappNumber: "+91 98765 43210",
              createdAt: serverTimestamp(),
              totalSales: 0,
              totalUdhaar: 0
            });
            await setDoc(doc(db, 'merchants', u.uid), { storeId: storeRef.id });
            setRole({ uid: u.uid, role: 'merchant', storeId: storeRef.id });
          }
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="relative group">
        <div className="w-20 h-20 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] animate-bounce">
          <span className="text-white text-4xl font-black italic">D</span>
        </div>
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
           <p className="text-slate-900 font-black uppercase tracking-[0.3em] text-[10px] italic animate-pulse">Initialising Munim AI v2.0...</p>
        </div>
      </div>
    </div>
  );

  const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    if (adminOnly && role?.role !== 'superadmin') {
      return <Navigate to="/dashboard" replace />;
    }
    return <>{children}</>;
  };

  return (
    <Layout isAdmin={role?.role === 'superadmin'} user={user} onLogin={handleLogin}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/free-tools" element={<FreeTools />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/seo-dashboard" element={<SeoDashboard />} />
        <Route path="/privacy" element={<PrivacyPolicy onBack={() => {}} />} />
        <Route path="/terms" element={<TermsOfService onBack={() => {}} />} />
        <Route path="/whatsapp-shop-management" element={<WhatsAppShopManagement />} />
        <Route path="/get-more-google-reviews-for-shop" element={<GoogleReviewsShop />} />
        <Route path="/udhaar-management-app" element={<UdhaarManagementApp />} />
        <Route path="/compare/:competitor" element={<ComparisonPage />} />
        <Route path="/p/:slug" element={<ProgrammaticSeoPage />} />
        <Route path="/:city" element={<CityPage />} />

        {/* Merchant Routes */}
        <Route path="/demo" element={<StoreDashboard storeId="demo-mode" />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            {role?.storeId ? <StoreDashboard storeId={role.storeId} /> : <div>Loading Store...</div>}
          </ProtectedRoute>
        } />
        <Route path="/whatsapp" element={
          <ProtectedRoute>
            {role?.storeId ? (
              <div className="p-10 flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent)]">
                <div className="text-center mb-12 space-y-6 max-w-2xl">
                  <div className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] italic border-2 border-indigo-100 shadow-sm">
                    Simulation Protocol Active
                  </div>
                  <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">WhatsApp Munim AI</h2>
                  <p className="text-slate-500 font-bold italic opacity-70 underline decoration-indigo-200 decoration-offset-4">Try logging a sale (e.g. "Sent 2L milk to Ramesh for 120") or check your ledger in the dashboard after.</p>
                </div>
                <Card className="w-full max-w-2xl h-[700px] p-0 overflow-hidden shadow-[32px_32px_0px_0px_rgba(15,23,42,0.05)] border-4 border-slate-900 relative">
                   <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                   <div className="relative z-10 h-full">
                      <WhatsAppSimulation storeId={role.storeId} />
                   </div>
                </Card>
                <div className="mt-12 flex gap-4">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      End-to-End Encrypted
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                      Agent Swarm Routed
                   </div>
                </div>
              </div>
            ) : <div className="h-screen flex items-center justify-center font-black italic uppercase text-slate-400 text-2xl animate-pulse">Synchronizing Data...</div>}
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
