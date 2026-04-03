import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { LayoutDashboard, Store, Users, TrendingUp, Search, MoreVertical, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { cn } from '../lib/utils';

interface StoreData {
  id: string;
  name: string;
  ownerUid: string;
  whatsappNumber: string;
  totalSales: number;
  totalUdhaar: number;
  createdAt: any;
}

export const AdminDashboard: React.FC = () => {
  const [stores, setStores] = useState<StoreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storesRef = collection(db, 'stores');
    const q = query(storesRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const storesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StoreData));
      setStores(storesList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const totalSales = stores.reduce((acc, s) => acc + (s.totalSales || 0), 0);
  const totalUdhaar = stores.reduce((acc, s) => acc + (s.totalUdhaar || 0), 0);
  
  const filteredStores = stores.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.whatsappNumber.includes(searchTerm)
  );

  const chartData = stores.slice(0, 5).map(s => ({
    name: s.name,
    sales: s.totalSales || 0,
    udhaar: s.totalUdhaar || 0
  }));

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Admin Dashboard...</div>;

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Super Admin</h1>
            <p className="text-gray-500 font-medium">DukaanMitra Platform Overview</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <LayoutDashboard size={20} />
          </div>
          <span className="font-bold text-gray-700 pr-4">Dashboard</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-2">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Stores</p>
          <h3 className="text-3xl font-black text-gray-900">{stores.length}</h3>
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
            <TrendingUp size={14} />
            <span>+12% this month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-2">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Platform Sales</p>
          <h3 className="text-3xl font-black text-gray-900">₹{totalSales.toLocaleString()}</h3>
          <p className="text-xs text-gray-400 font-medium">Across all stores</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-2">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Udhaar</p>
          <h3 className="text-3xl font-black text-gray-900 text-rose-500">₹{totalUdhaar.toLocaleString()}</h3>
          <p className="text-xs text-gray-400 font-medium">Pending recovery</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-2">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Avg. Store Sales</p>
          <h3 className="text-3xl font-black text-gray-900">₹{Math.round(totalSales / (stores.length || 1)).toLocaleString()}</h3>
          <p className="text-xs text-gray-400 font-medium">Per month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stores List */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Active Stores</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search stores..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 w-64"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <th className="px-6 py-4">Store Name</th>
                  <th className="px-6 py-4">WhatsApp</th>
                  <th className="px-6 py-4">Sales</th>
                  <th className="px-6 py-4">Udhaar</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredStores.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-black">
                          {s.name[0]}
                        </div>
                        <span className="font-bold text-gray-900">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-medium">{s.whatsappNumber}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{s.totalSales?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 text-sm font-bold text-rose-500">₹{s.totalUdhaar?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">Active</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Platform Insights */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
          <h3 className="text-xl font-black text-gray-900 tracking-tight">Platform Insights</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-400">
                <span>Sales Growth</span>
                <span className="text-emerald-500">+24%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 w-[74%] rounded-full" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-400">
                <span>Udhaar Recovery</span>
                <span className="text-rose-500">-12%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[42%] rounded-full" />
              </div>
            </div>
          </div>

          <div className="h-64 pt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="sales" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="udhaar" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 bg-indigo-600 rounded-2xl text-white space-y-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500" />
            <h4 className="font-black text-lg">Munim AI v2.0</h4>
            <p className="text-xs opacity-80 font-medium">New feature: Automatic voice-to-ledger parsing is now live for all stores.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
