import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, orderBy, limit, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { TrendingUp, Users, CreditCard, Clock, ArrowUpRight, ArrowDownRight, IndianRupee } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '../lib/utils';

interface StoreData {
  id: string;
  name: string;
  totalSales: number;
  totalUdhaar: number;
}

interface Transaction {
  id: string;
  type: 'sale' | 'udhaar' | 'payment';
  amount: number;
  description: string;
  timestamp: any;
  customerName?: string;
}

interface Customer {
  id: string;
  name: string;
  balance: number;
}

export const StoreDashboard: React.FC<{ storeId: string }> = ({ storeId }) => {
  const [store, setStore] = useState<StoreData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storeRef = doc(db, 'stores', storeId);
    const unsubscribeStore = onSnapshot(storeRef, (doc) => {
      if (doc.exists()) {
        setStore({ id: doc.id, ...doc.data() } as StoreData);
      }
    });

    const transactionsRef = collection(storeRef, 'transactions');
    const qTransactions = query(transactionsRef, orderBy('timestamp', 'desc'), limit(10));
    const unsubscribeTransactions = onSnapshot(qTransactions, (snapshot) => {
      const txs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
      setTransactions(txs);
      setLoading(false);
    });

    const customersRef = collection(storeRef, 'customers');
    const qCustomers = query(customersRef, where('balance', '>', 0), orderBy('balance', 'desc'), limit(5));
    const unsubscribeCustomers = onSnapshot(qCustomers, (snapshot) => {
      const custs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Customer));
      setCustomers(custs);
    });

    return () => {
      unsubscribeStore();
      unsubscribeTransactions();
      unsubscribeCustomers();
    };
  }, [storeId]);

  const chartData = [
    { name: 'Sales', value: store?.totalSales || 0, color: '#10b981' },
    { name: 'Udhaar', value: store?.totalUdhaar || 0, color: '#ef4444' }
  ];

  if (loading) return <div className="p-8 text-center text-gray-500">Loading your Munim...</div>;

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{store?.name}</h1>
          <p className="text-gray-500">Aapka Digital Munim Dashboard</p>
        </div>
        <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full flex items-center gap-2 font-medium">
          <Clock size={18} />
          <span>Live Updates</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Sales</p>
            <h3 className="text-2xl font-bold text-gray-900">₹{store?.totalSales?.toLocaleString() || 0}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Udhaar</p>
            <h3 className="text-2xl font-bold text-gray-900">₹{store?.totalUdhaar?.toLocaleString() || 0}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pending Customers</p>
            <h3 className="text-2xl font-bold text-gray-900">{customers.length}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
            <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    tx.type === 'sale' ? "bg-emerald-100 text-emerald-600" : 
                    tx.type === 'udhaar' ? "bg-rose-100 text-rose-600" : "bg-blue-100 text-blue-600"
                  )}>
                    {tx.type === 'sale' ? <ArrowUpRight size={20} /> : 
                     tx.type === 'udhaar' ? <ArrowDownRight size={20} /> : <IndianRupee size={20} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 capitalize">{tx.type}</p>
                    <p className="text-xs text-gray-500">{tx.description || 'No description'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-sm font-bold",
                    tx.type === 'sale' ? "text-emerald-600" : 
                    tx.type === 'udhaar' ? "text-rose-600" : "text-blue-600"
                  )}>
                    {tx.type === 'udhaar' ? '-' : '+'}₹{tx.amount}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {tx.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Udhaar Customers */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Top Udhaar Customers</h3>
            <button className="text-indigo-600 text-sm font-medium hover:underline">Remind All</button>
          </div>
          <div className="space-y-4">
            {customers.map((cust) => (
              <div key={cust.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    {cust.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{cust.name}</p>
                    <p className="text-xs text-gray-500">Last seen: Today</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-rose-600">₹{cust.balance}</p>
                  <button className="text-[10px] bg-indigo-600 text-white px-2 py-1 rounded-md mt-1 hover:bg-indigo-700">
                    Send Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="h-48 mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} hide />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
