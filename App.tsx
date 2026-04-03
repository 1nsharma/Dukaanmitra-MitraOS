
import React, { useState, useEffect, useRef } from 'react';
import { auth } from './firebase';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import CustomerList from './components/CustomerList';
import TransactionList from './components/TransactionList';
import ShopPanel from './components/ShopPanel';
import SuperAdmin from './components/SuperAdmin';
import SystemLogs from './components/SystemLogs';
import ArchitectureGuide from './components/ArchitectureGuide';
import SheetsDatabase from './components/SheetsDatabase';
import TrainingCenter from './components/TrainingCenter';
import BlogEngine from './components/BlogEngine';
import ChatBot from './components/ChatBot';
import Auth from './components/Auth';
import AiTools from './components/AiTools';
import CustomerPortal from './components/CustomerPortal';
import ProjectDetail from './components/ProjectDetail';
import ProductStrategy from './components/ProductStrategy';
import JanSunwaiPortal from './components/JanSunwaiPortal';
import { INITIAL_CUSTOMERS, INITIAL_TRANSACTIONS, INITIAL_LOGS } from './constants';
import { Customer, Transaction, SystemLog, View, ChatMessage, AppliedPatch, ShardHealth } from './types';
import anime from 'animejs';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('landing');
  const [user, setUser] = useState<any | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'alert' } | null>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  
  // SHARED MUNIM INFRASTRUCTURE STATE
  const [appliedPatches, setAppliedPatches] = useState<AppliedPatch[]>([]);
  const [shards, setShards] = useState<ShardHealth[]>([
    { id: 'MAH-01', region: 'Maharashtra', load: 45, latency: 140, status: 'Healthy', color: 'bg-emerald-500' },
    { id: 'DEL-04', region: 'Delhi NCR', load: 92, latency: 480, status: 'Hot', color: 'bg-rose-500' },
    { id: 'KAR-02', region: 'Karnataka', load: 22, latency: 95, status: 'Idle', color: 'bg-blue-500' },
    { id: 'UP-09', region: 'Uttar Pradesh', load: 61, latency: 210, status: 'Warning', color: 'bg-amber-500' },
  ]);

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('dm_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('dm_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });
  const [logs, setLogs] = useState<SystemLog[]>(INITIAL_LOGS);

  const [mitraChat, setMitraChat] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('dm_mitra_chat');
    return saved ? JSON.parse(saved) : [{ sender: 'bot', text: "Namaste Mitra! Munim AI Active. 🧠 Aapka Digital Munim ready hai.", timestamp: "00:00" }];
  });
  const [grahakChat, setGrahakChat] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('dm_grahak_chat');
    return saved ? JSON.parse(saved) : [{ sender: 'system', text: "Swagat hai!", timestamp: "00:00" }];
  });

  const checkIsOpsTeam = (email?: string | null) => {
    if (!email) return false;
    const lowerEmail = email.toLowerCase();
    return lowerEmail.includes('admin') || lowerEmail.includes('ops') || lowerEmail.includes('test');
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      
      if (currentUser) {
        const isOps = checkIsOpsTeam(currentUser.email);
        if (activeView === 'landing') {
          setActiveView(isOps ? 'dashboard' : 'shop_panel');
        }
      }
    });
    return () => unsubscribe();
  }, [activeView]);

  useEffect(() => {
    localStorage.setItem('dm_customers', JSON.stringify(customers));
    localStorage.setItem('dm_transactions', JSON.stringify(transactions));
    localStorage.setItem('dm_mitra_chat', JSON.stringify(mitraChat));
    localStorage.setItem('dm_grahak_chat', JSON.stringify(grahakChat));
  }, [customers, transactions, mitraChat, grahakChat]);

  // Global Notification Monitor with anime.js
  useEffect(() => {
    if (notification && notificationRef.current) {
      (anime as any)({
        targets: notificationRef.current,
        translateY: [0, 20],
        opacity: [0, 1],
        easing: 'easeOutElastic(1, .6)',
        duration: 800
      });

      const timer = setTimeout(() => {
        if (notificationRef.current) {
          (anime as any)({
            targets: notificationRef.current,
            translateY: [20, 0],
            opacity: [1, 0],
            easing: 'easeInQuad',
            duration: 300,
            complete: () => setNotification(null)
          });
        }
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-indigo-400">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_20px_rgba(79,70,229,0.4)]"></div>
        <p className="font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Establishing Munim Link...</p>
      </div>
    );
  }

  const isOpsTeam = checkIsOpsTeam(user?.email);
  const isPremium = customers.some(c => c.paidStatus === 'Active');
  const isProtectedView = activeView !== 'landing' && activeView !== 'blog_engine' && activeView !== 'customer_portal';
  
  if (isProtectedView && !user) return <Auth onSuccess={() => {}} />;

  const renderView = () => {
    switch (activeView) {
      case 'landing': return <LandingPage setView={setActiveView} />;
      case 'blog_engine': return <BlogEngine />;
      case 'customer_portal': return <CustomerPortal grahakChat={grahakChat} setGrahakChat={setGrahakChat} />;
      case 'shop_panel': return <ShopPanel customers={customers} setCustomers={setCustomers} transactions={transactions} setTransactions={setTransactions} logs={logs} setLogs={setLogs} mitraChat={mitraChat} setMitraChat={setMitraChat} grahakChat={grahakChat} setGrahakChat={setGrahakChat} setView={setActiveView} />;
      case 'ai_tools': return <AiTools isPremium={isPremium} />;
      case 'dashboard': return <Dashboard customers={customers} transactions={transactions} shards={shards} setShards={setShards} appliedPatches={appliedPatches} setAppliedPatches={setAppliedPatches} setView={setActiveView} />;
      case 'superadmin': return <SuperAdmin customers={customers} transactions={transactions} logs={logs} shards={shards} appliedPatches={appliedPatches} setAppliedPatches={setAppliedPatches} setView={setActiveView} />;
      case 'logs': return <SystemLogs logs={logs} />;
      case 'architecture': return <ArchitectureGuide />;
      case 'sheets_db': return <SheetsDatabase customers={customers} transactions={transactions} />;
      case 'customers': return <CustomerList customers={customers} transactions={transactions} />;
      case 'transactions': return <TransactionList transactions={transactions} />;
      case 'training': return <TrainingCenter />;
      case 'project_detail': return <ProjectDetail />;
      case 'product_strategy': return <ProductStrategy />;
      case 'jan_sunwai': return <JanSunwaiPortal />;
      default: return <LandingPage setView={setActiveView} />;
    }
  };

  return (
    <Layout activeView={activeView} setView={setActiveView} isPremium={isPremium} isAdmin={isOpsTeam}>
      {notification && (
        <div 
          ref={notificationRef}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] w-full max-w-md px-6 opacity-0"
        >
           <div className={`p-5 rounded-[2rem] shadow-2xl backdrop-blur-xl border flex items-center gap-4 ${
             notification.type === 'success' ? 'bg-emerald-600/90 border-emerald-400 text-white' : 'bg-rose-600/90 border-rose-400 text-white'
           }`}>
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center text-xl">
                 {notification.type === 'success' ? '⚡' : '⚠️'}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-none mb-1">Munim Update</p>
                <p className="font-bold text-sm italic tracking-tight">{notification.message}</p>
              </div>
           </div>
        </div>
      )}

      {renderView()}
      
      {user && activeView !== 'landing' && activeView !== 'customer_portal' && (
        <ChatBot role={isOpsTeam ? 'ops' : 'merchant'} />
      )}
    </Layout>
  );
};

export default App;
