import React, { createContext, useContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

const initialTransactions = [
  { id: 1, date: '2024-01-01', amount: 3000, category: 'Salary', type: 'income' },
  { id: 2, date: '2024-01-03', amount: 200, category: 'Food', type: 'expense' },
  { id: 3, date: '2024-01-05', amount: 500, category: 'Shopping', type: 'expense' },
];

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [role, setRole] = useState('admin');
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (t) => {
    setTransactions([...transactions, { ...t, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      role,
      setRole,
      addTransaction,
      deleteTransaction,
      filterType,
      setFilterType,
      search,
      setSearch
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
