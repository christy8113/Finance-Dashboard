import React from 'react';
import { useFinance } from '../context/FinanceContext';

const Header = () => {
  const { role, setRole, darkMode, setDarkMode } = useFinance();

  return (
    <header className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">💰 Finance Dashboard</h1>

      <div className="flex gap-3 items-center">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border px-2 py-1 rounded dark:bg-gray-700"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};

export default Header;
