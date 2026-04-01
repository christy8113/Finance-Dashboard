import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { ShieldCheck, User, LayoutDashboard } from 'lucide-react';

const Header = () => {
  const { role, setRole } = useFinance();
  
  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
      {/* Logo & Brand */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-indigo-200 shadow-lg">
          <LayoutDashboard className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 leading-none">FinFlow</h1>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Dashboard v1.0</span>
        </div>
      </div>
      
      {/* Role Switcher */}
      <div className="flex items-center gap-4">
        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
          <button 
            onClick={() => setRole('viewer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              role === 'viewer' 
              ? 'bg-white shadow-md text-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User className="w-4 h-4" /> 
            <span className="hidden sm:inline">Viewer</span>
          </button>
          
          <button 
            onClick={() => setRole('admin')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              role === 'admin' 
              ? 'bg-white shadow-md text-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> 
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;