import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

const TransactionsList = () => {
  const { transactions, role, addTransaction, deleteTransaction } = useFinance();
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(t =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 m-6 bg-white dark:bg-gray-800 rounded shadow">

      <div className="flex gap-3 mb-4">
        <input
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded dark:bg-gray-700"
        />

        {role === 'admin' && (
          <button
            onClick={() => addTransaction({
              date: new Date().toISOString().split('T')[0],
              amount: 100,
              category: 'New',
              type: 'expense'
            })}
            className="bg-indigo-600 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        )}
      </div>

      {filtered.map(t => (
        <div key={t.id} className="flex justify-between border-b py-2 dark:border-gray-700">
          <span>{t.date}</span>
          <span>{t.category}</span>
          <span>${t.amount}</span>

          {role === 'admin' && (
            <button onClick={() => deleteTransaction(t.id)}>Delete</button>
          )}
        </div>
      ))}

    </div>
  );
};

export default TransactionsList;
