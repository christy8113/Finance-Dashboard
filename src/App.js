import React from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionsList from './components/TransactionsList';

function AppContent() {
  const { darkMode } = useFinance();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header />
        <Dashboard />
        <TransactionsList />
      </div>
    </div>
  );
}

function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}

export default App;
