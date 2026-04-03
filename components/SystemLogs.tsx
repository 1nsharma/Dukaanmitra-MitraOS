
import React from 'react';
import { SystemLog } from '../types';

interface SystemLogsProps {
  logs: SystemLog[];
}

const SystemLogs: React.FC<SystemLogsProps> = ({ logs }) => {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">System Logs (Sheet 3)</h2>
          <p className="text-slate-500">Monitoring Webhook failures, AI parsing errors, and service health.</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Uptime: 99.9%</span>
          </span>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Payload</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Resolution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[...logs].reverse().map((l, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                  {new Date(l.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-600 text-[10px] font-bold uppercase">
                    {l.errorSource}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-slate-500 font-mono bg-slate-50 p-2 rounded border border-slate-100 max-w-xs truncate">
                    {l.payloadReceived}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {l.resolution}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            No system logs recorded. All systems operational.
          </div>
        )}
      </div>

      <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl">
        <h3 className="font-bold text-rose-900 mb-2">Emergency Kill-Switch</h3>
        <p className="text-sm text-rose-700 mb-4">
          Manual override to pause all outgoing WhatsApp messages in case of infinite loops or systemic failure.
        </p>
        <button className="bg-rose-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-rose-700 transition shadow-lg shadow-rose-200">
          Deactivate All Scenarios
        </button>
      </div>
    </div>
  );
};

export default SystemLogs;
