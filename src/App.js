import React from 'react';
import { FinanceProvider, useFinance } from './FinanceContext';
import Dashboard from './Dashboard';
import TransactionsList from './TransactionsList';
import { ShieldCheck, User } from 'lucide-react';
import Header from './components/Header'; // Update this import at the top of App.js
const Header = () => {
  const { role, setRole } = useFinance();
  
  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">FinFlow</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setRole('viewer')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition ${role === 'viewer' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
          >
            <User className="w-4 h-4" /> Viewer
          </button>
          <button 
            onClick={() => setRole('admin')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition ${role === 'admin' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
          >
            <ShieldCheck className="w-4 h-4" /> Admin
          </button>
        </div>
      </div>
    </header>
  );
};

function App() {
  return (
    <FinanceProvider>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Header />
        <main className="max-w-7xl mx-auto">
          <Dashboard />
          <TransactionsList />
        </main>
      </div>
    </FinanceProvider>
  );
}

export default App;