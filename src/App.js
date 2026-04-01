import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionsList from './components/TransactionsList';

function App() {
  return (
    <FinanceProvider>
      <Header />
      <Dashboard />
      <TransactionsList />
    </FinanceProvider>
  );
}

export default App;
