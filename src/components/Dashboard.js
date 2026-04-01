import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import SummaryCard from './SummaryCard';
import Insights from './Insights';
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const Dashboard = () => {
  const { transactions } = useFinance();

  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income')
      .reduce((a, t) => a + t.amount, 0);

    const expense = transactions.filter(t => t.type === 'expense')
      .reduce((a, t) => a + t.amount, 0);

    return { income, expense, balance: income - expense };
  }, [transactions]);

  const categoryData = useMemo(() => {
    const map = {};
    transactions.forEach(t => {
      if (t.type === 'expense') {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });
    return Object.keys(map).map(k => ({ name: k, value: map[k] }));
  }, [transactions]);

  return (
    <div className="p-6 space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Balance" value={stats.balance} />
        <SummaryCard title="Income" value={stats.income} />
        <SummaryCard title="Expenses" value={stats.expense} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={transactions}>
              <XAxis dataKey="date" />
              <Tooltip />
              <Area dataKey="amount" stroke="#6366f1" fill="#6366f1" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} dataKey="value">
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={['#6366f1', '#10b981', '#f59e0b'][i % 3]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      <Insights transactions={transactions} stats={stats} />

    </div>
  );
};

export default Dashboard;
