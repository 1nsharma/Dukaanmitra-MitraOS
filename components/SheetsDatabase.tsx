
import React, { useState } from 'react';
import { Transaction, Customer, DatabaseConfig } from '../types';

interface SheetsDatabaseProps {
  transactions: Transaction[];
  customers: Customer[];
}

const SheetsDatabase: React.FC<SheetsDatabaseProps> = ({ transactions, customers }) => {
  const [activeSheet, setActiveSheet] = useState<'transactions' | 'customers'>('transactions');
  const [dbConfig] = useState<DatabaseConfig>({
    sheetId: "1pX_DM_2025_KIRANA_MASTER",
    webhookUrl: "https://hook.make.com/dm_prod_v2_99182",
    status: "CONNECTED",
    lastSync: new Date().toISOString()
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span className="p-2 bg-emerald-100 rounded-xl">📑</span>
            Google Sheets DB
          </h2>
          <p className="text-slate-500">Real-time persistence layer connected via Make.com</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             <span className="text-xs font-bold text-slate-600">ID: {dbConfig.sheetId}</span>
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg hover:bg-slate-800 transition">
            OPEN GOOGLE SHEETS ↗
          </button>
        </div>
      </header>

      {/* Sheet Selector Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-2xl overflow-hidden">
        <button 
          onClick={() => setActiveSheet('transactions')}
          className={`px-6 py-3 text-sm font-bold transition-all ${activeSheet === 'transactions' ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-500' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Sheet 1: Transactions_Ledger
        </button>
        <button 
          onClick={() => setActiveSheet('customers')}
          className={`px-6 py-3 text-sm font-bold transition-all ${activeSheet === 'customers' ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-500' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Sheet 2: Customer_Master
        </button>
      </div>

      {/* Grid Interface */}
      <div className="bg-white border border-slate-200 rounded-b-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="w-10 px-2 py-1 bg-slate-100 border-r border-slate-200"></th>
                {activeSheet === 'transactions' ? (
                  <>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase border-r border-slate-200 min-w-[120px]">Column A (ID)</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase border-r border-slate-200 min-w-[150px]">Column B (Name)</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase border-r border-slate-200 min-w-[100px]">Column C (Amt)</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase border-r border-slate-200 min-w-[200px]">Column D (Items)</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase border-r border-slate-200">Column E (Date)</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase border-r border-slate-200 min-w-[150px]">Column A (Phone)</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase border-r border-slate-200 min-w-[150px]">Column B (Name)</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase border-r border-slate-200 min-w-[120px]">Column C (Status)</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase border-r border-slate-200 min-w-[150px]">Column D (Total LTV)</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase border-r border-slate-200">Column E (Join Date)</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {activeSheet === 'transactions' ? (
                transactions.map((t, idx) => (
                  <tr key={t.transId} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-2 py-1 bg-slate-50 border-r border-slate-200 text-center text-[10px] text-slate-400 font-bold">{idx + 1}</td>
                    <td className="px-4 py-2 text-xs font-mono border-r border-slate-100 truncate max-w-[120px]">{t.transId}</td>
                    <td className="px-4 py-2 text-xs font-bold text-slate-900 border-r border-slate-100">{t.customerName}</td>
                    <td className="px-4 py-2 text-xs font-bold text-emerald-600 border-r border-slate-100">₹{t.amount}</td>
                    <td className="px-4 py-2 text-xs text-slate-600 border-r border-slate-100 italic">{t.items}</td>
                    <td className="px-4 py-2 text-xs text-slate-400 border-r border-slate-100">{new Date(t.date).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                customers.map((c, idx) => (
                  <tr key={c.phone} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-2 py-1 bg-slate-50 border-r border-slate-200 text-center text-[10px] text-slate-400 font-bold">{idx + 1}</td>
                    <td className="px-4 py-2 text-xs border-r border-slate-100">+{c.phone}</td>
                    <td className="px-4 py-2 text-xs font-bold text-slate-900 border-r border-slate-100">{c.name}</td>
                    <td className="px-4 py-2 text-xs border-r border-slate-100">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.paidStatus === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {c.paidStatus}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-xs font-black text-slate-900 border-r border-slate-100">₹{c.totalLTV.toLocaleString()}</td>
                    <td className="px-4 py-2 text-xs text-slate-400 border-r border-slate-100">{new Date(c.joinDate).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
              {/* Empty Rows for Realism */}
              {[...Array(5)].map((_, i) => (
                <tr key={`empty-${i}`} className="border-b border-slate-50 h-8">
                  <td className="px-2 py-1 bg-slate-50 border-r border-slate-200 text-center text-[10px] text-slate-400 font-bold">
                    {(activeSheet === 'transactions' ? transactions.length : customers.length) + i + 1}
                  </td>
                  <td className="border-r border-slate-50"></td>
                  <td className="border-r border-slate-50"></td>
                  <td className="border-r border-slate-50"></td>
                  <td className="border-r border-slate-50"></td>
                  <td className="border-r border-slate-50"></td>
                  {activeSheet === 'transactions' && <td className="border-r border-slate-50"></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Automation Specs */}
      <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-emerald-400">⚡</span>
              Make.com Webhook Contract
            </h3>
            <p className="text-sm opacity-60">This JSON contract is enforced for every AI parse event moving to storage.</p>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 font-mono text-xs">
              <pre>{`POST ${dbConfig.webhookUrl}\nContent-Type: application/json\n\n{\n  "action": "ADD_ROW",\n  "sheet": "Ledger",\n  "payload": {\n    "name": "{{ai_customer}}",\n    "amt": {{ai_amount}},\n    "item": "{{ai_item}}"\n  }\n}`}</pre>
            </div>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl border border-white/20 text-center md:w-64">
            <p className="text-2xl font-black text-emerald-400">0.4s</p>
            <p className="text-[10px] uppercase font-bold tracking-widest opacity-50">Sync Latency</p>
            <div className="mt-4 h-1 w-full bg-white/20 rounded">
              <div className="h-full bg-emerald-500 rounded animate-pulse w-[95%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheetsDatabase;
