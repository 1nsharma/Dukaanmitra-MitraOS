
import React, { useState } from 'react';
import { Customer, Transaction } from '../types';

interface CustomerListProps {
  customers: Customer[];
  transactions: Transaction[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, transactions }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getCustomerTransactions = (phone: string) => {
    return transactions.filter(t => t.phone === phone);
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Customers (Sheet 1)</h2>
          <p className="text-slate-500">Master database of all connected shop profiles.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition">
          Export to CSV
        </button>
      </header>

      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-slate-400 group-focus-within:text-indigo-500 transition-colors">🔍</span>
        </div>
        <input
          type="text"
          placeholder="Search by name or phone number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Total LTV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((c, i) => (
                <tr 
                  key={i} 
                  className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedCustomer(c)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                        {c.name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">+{c.phone}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {new Date(c.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      c.paidStatus === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                      c.paidStatus === 'Trial' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {c.paidStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">
                    ₹{c.totalLTV.toLocaleString()}
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium italic">
                    No customers found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Slide-over/Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex justify-end">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <header className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-slate-900">{selectedCustomer.name}</h3>
                <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">+{selectedCustomer.phone}</p>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl hover:bg-slate-200 transition"
              >
                ✕
              </button>
            </header>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Total LTV</p>
                  <p className="text-2xl font-black text-indigo-700">₹{selectedCustomer.totalLTV.toLocaleString()}</p>
                </div>
                <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Entries</p>
                  <p className="text-2xl font-black text-emerald-700">{getCustomerTransactions(selectedCustomer.phone).length}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-black text-slate-900 uppercase tracking-tighter italic">Ledger Entries</h4>
                <div className="space-y-3">
                  {getCustomerTransactions(selectedCustomer.phone).map((t, idx) => (
                    <div key={idx} className="p-4 bg-white border border-slate-100 rounded-2xl flex justify-between items-center shadow-sm">
                      <div>
                        <p className="font-bold text-slate-900">{t.items}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{new Date(t.date).toLocaleDateString()}</p>
                      </div>
                      <p className="text-lg font-black text-emerald-600">₹{t.amount}</p>
                    </div>
                  ))}
                  {getCustomerTransactions(selectedCustomer.phone).length === 0 && (
                    <p className="text-center py-10 text-slate-400 font-medium">No transactions found for this customer.</p>
                  )}
                </div>
              </div>
            </div>

            <footer className="p-8 border-t border-slate-100">
              <button 
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition"
                onClick={() => setSelectedCustomer(null)}
              >
                Close Ledger
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
