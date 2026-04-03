
import React from 'react';
import { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-slate-900">Ledger (Sheet 2)</h2>
        <p className="text-slate-500">Historical records of all AI-parsed sales entries.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[...transactions].reverse().map((t, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-slate-900 text-sm font-medium">
                    {new Date(t.date).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-slate-400">
                    {new Date(t.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-slate-900">{t.customerName}</span>
                  <div className="text-xs text-slate-400">+{t.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-600 line-clamp-1 max-w-xs">{t.items}</div>
                </td>
                <td className="px-6 py-4 text-right font-bold text-emerald-600">
                  ₹{t.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {transactions.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            No transactions found. Use the Simulator to add some!
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
