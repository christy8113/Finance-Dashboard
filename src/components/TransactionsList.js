import React, { useState } from 'react';
import { useFinance } from './FinanceContext';
import { Search, Trash2, Plus, Filter } from 'lucide-react';

const TransactionsList = () => {
  const { transactions, role, deleteTransaction, addTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredData = transactions.filter(t => {
    const matchesSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || t.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 m-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search category..." 
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="border rounded-lg px-3 py-2 bg-white outline-none"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {role === 'admin' && (
            <button 
              onClick={() => addTransaction({ date: new Date().toISOString().split('T')[0], amount: 100, category: 'New', type: 'expense' })}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm border-b">
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium">Category</th>
              <th className="pb-4 font-medium">Type</th>
              <th className="pb-4 font-medium text-right">Amount</th>
              {role === 'admin' && <th className="pb-4 font-medium text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredData.length > 0 ? filteredData.map(t => (
              <tr key={t.id} className="hover:bg-gray-50 transition">
                <td className="py-4 text-sm text-gray-600">{t.date}</td>
                <td className="py-4 font-medium text-gray-800">{t.category}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    t.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {t.type}
                  </span>
                </td>
                <td className={`py-4 text-right font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-gray-800'}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount}
                </td>
                {role === 'admin' && (
                  <td className="py-4 text-right">
                    <button onClick={() => deleteTransaction(t.id)} className="text-rose-400 hover:text-rose-600">
                      <Trash2 className="w-4 h-4 ml-auto" />
                    </button>
                  </td>
                )}
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-400">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;