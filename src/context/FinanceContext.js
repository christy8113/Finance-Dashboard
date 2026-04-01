import React, { createContext, useContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

const initialTransactions = [
  { id: 1, date: '2023-10-01', amount: 2500, category: 'Salary', type: 'income' },
  { id: 2, date: '2023-10-02', amount: 50, category: 'Food', type: 'expense' },
  { id: 3, date: '2023-10-05', amount: 120, category: 'Utilities', type: 'expense' },
  { id: 4, date: '2023-10-10', amount: 200, category: 'Entertainment', type: 'expense' },
  { id: 5, date: '2023-10-15', amount: 1500, category: 'Freelance', type: 'income' },
];

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  
  const [role, setRole] = useState('admin'); // 'admin' or 'viewer'

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (t) => setTransactions([...transactions, { ...t, id: Date.now() }]);
  const deleteTransaction = (id) => setTransactions(transactions.filter(t => t.id !== id));

  return (
    <FinanceContext.Provider value={{ transactions, role, setRole, addTransaction, deleteTransaction }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);