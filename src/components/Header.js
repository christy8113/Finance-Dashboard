import React from 'react';
import { useFinance } from '../context/FinanceContext';

const Header = () => {
  const { role, setRole } = useFinance();

  return (
    <header className="flex justify-between p-4 bg-white shadow">
      <h1 className="text-xl font-bold">Finance Dashboard</h1>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border px-2 py-1"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </header>
  );
};

export default Header;
