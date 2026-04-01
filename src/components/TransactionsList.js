import React from 'react';
import { useFinance } from '../context/FinanceContext';

const TransactionsList = () => {
  const {
    transactions, role, deleteTransaction, addTransaction,
    filterType, setFilterType, search, setSearch
  } = useFinance();

  const filtered = transactions.filter(t => {
    return (
      (filterType === 'all' || t.type === filterType) &&
      t.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6 bg-white m-6 shadow rounded">
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {role === 'admin' && (
          <button onClick={() =>
            addTransaction({
              date: new Date().toISOString().split('T')[0],
              amount: 100,
              category: 'New',
              type: 'expense'
            })
          }>
            Add
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        filtered.map(t => (
          <div key={t.id} className="flex justify-between border-b py-2">
            <span>{t.date}</span>
            <span>{t.category}</span>
            <span>${t.amount}</span>

            {role === 'admin' && (
              <button onClick={() => deleteTransaction(t.id)}>Delete</button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionsList;
