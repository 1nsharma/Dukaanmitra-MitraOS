import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { LandingPage } from './components/LandingPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { StoreDashboard } from './components/StoreDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { WhatsAppSimulation } from './components/WhatsAppSimulation';
import { View, UserRole } from './types';
import { ShieldCheck, Store, LogOut, MessageSquare, LayoutDashboard } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Check role
        const adminDoc = await getDoc(doc(db, 'admins', u.uid));
        if (adminDoc.exists()) {
          setRole({ uid: u.uid, role: 'superadmin' });
          setView('admin_dashboard');
        } else {
          // Check if merchant has a store
          const merchantDoc = await getDoc(doc(db, 'merchants', u.uid));
          if (merchantDoc.exists()) {
            const storeId = merchantDoc.data().storeId;
            setRole({ uid: u.uid, role: 'merchant', storeId });
            setView('store_dashboard');
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
            setView('store_dashboard');
          }
        }
      } else {
        setRole(null);
        setView('landing');
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

  const handleLogout = async () => {
    await signOut(auth);
    setView('landing');
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-indigo-600 font-black uppercase tracking-widest text-xs">Initialising Munim...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {view === 'landing' ? (
        <LandingPage 
          onStart={user ? () => setView(role?.role === 'superadmin' ? 'admin_dashboard' : 'store_dashboard') : handleLogin} 
          onNavigate={setView} 
          isLoggedIn={!!user}
        />
      ) : view === 'privacy' ? (
        <PrivacyPolicy onBack={() => setView('landing')} />
      ) : view === 'terms' ? (
        <TermsOfService onBack={() => setView('landing')} />
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className="w-72 bg-slate-900 text-white flex flex-col shrink-0 border-r border-white/5">
            <div className="p-10 border-b border-white/10">
              <h1 className="text-3xl font-black tracking-tighter italic text-white group cursor-pointer" onClick={() => setView('landing')}>
                DukaanMitra
              </h1>
              <div className="mt-2 inline-flex items-center px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded text-[8px] font-black uppercase tracking-[0.2em] border border-indigo-500/30">
                {role?.role === 'superadmin' ? '🛡️ Infrastructure Ops' : '🏪 Retail Merchant'}
              </div>
            </div>
            
            <nav className="flex-1 p-6 space-y-2 overflow-y-auto no-scrollbar">
              <div className="px-3 mb-3 mt-2 text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center justify-between">
                <span>Management</span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              </div>

              {role?.role === 'superadmin' ? (
                <button 
                  onClick={() => setView('admin_dashboard')}
                  className={cn(
                    "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300",
                    view === 'admin_dashboard' ? "bg-indigo-600 text-white shadow-xl shadow-indigo-900/40" : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <ShieldCheck size={20} />
                  <span className="font-bold text-[13px] uppercase tracking-tight">Platform Dashboard</span>
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => setView('store_dashboard')}
                    className={cn(
                      "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300",
                      view === 'store_dashboard' ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100" : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <LayoutDashboard size={20} />
                    <span className="font-bold text-[13px] uppercase tracking-tight">Shop Ledger</span>
                  </button>
                  <button 
                    onClick={() => setView('whatsapp_sim')}
                    className={cn(
                      "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300",
                      view === 'whatsapp_sim' ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100" : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <MessageSquare size={20} />
                    <span className="font-bold text-[13px] uppercase tracking-tight">WhatsApp Munim</span>
                  </button>
                </>
              )}
            </nav>

            <div className="p-6 border-t border-white/10 bg-black/20">
              <div className="flex items-center gap-4 mb-6 px-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white shadow-lg">
                  {user?.displayName?.[0]}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-black truncate">{user?.displayName}</p>
                  <p className="text-[10px] text-slate-500 truncate font-medium">{user?.email}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-transparent hover:border-rose-500/20"
              >
                <LogOut size={16} />
                End Session
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-slate-50 relative">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none" />
            <div className="relative z-10">
              {view === 'store_dashboard' && role?.storeId && <StoreDashboard storeId={role.storeId} />}
              {view === 'admin_dashboard' && <AdminDashboard />}
              {view === 'whatsapp_sim' && role?.storeId && (
                <div className="p-10 flex flex-col items-center justify-center min-h-screen">
                  <div className="text-center mb-10 space-y-4">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase">WhatsApp Munim AI</h2>
                    <p className="text-gray-500 font-medium max-w-md mx-auto">Simulate your WhatsApp chat with the Munim AI. Try logging a sale or udhaar below.</p>
                  </div>
                  <WhatsAppSimulation storeId={role.storeId} />
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
