
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { auth, db } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
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
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-indigo-600 font-black uppercase tracking-widest text-xs">Initialising Munim...</p>
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
    <Layout isAdmin={role?.role === 'superadmin'} user={user}>
      <Routes>
        <Route path="/" element={
          <LandingPage 
            onStart={handleLogin} 
            isLoggedIn={!!user}
          />
        } />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/seo-dashboard" element={<SeoDashboard />} />
        <Route path="/privacy" element={<PrivacyPolicy onBack={() => {}} />} />
        <Route path="/terms" element={<TermsOfService onBack={() => {}} />} />
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
              <div className="p-10 flex flex-col items-center justify-center min-h-screen">
                <div className="text-center mb-10 space-y-4">
                  <h2 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase">WhatsApp Munim AI</h2>
                  <p className="text-gray-500 font-medium max-w-md mx-auto">Simulate your WhatsApp chat with the Munim AI. Try logging a sale or udhaar below.</p>
                </div>
                <WhatsAppSimulation storeId={role.storeId} />
              </div>
            ) : <div>Loading Store...</div>}
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
