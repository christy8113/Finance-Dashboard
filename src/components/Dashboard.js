import React, { useMemo } from 'react';
import { useFinance } from './FinanceContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpCircle, ArrowDownCircle, Wallet, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { transactions } = useFinance();

  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  // Data for Charts
  const categoryData = useMemo(() => {
    const categories = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });
    return Object.keys(categories).map(name => ({ name, value: categories[name] }));
  }, [transactions]);

  const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981'];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Balance" amount={stats.balance} icon={<Wallet className="text-indigo-600" />} color="bg-white" />
        <SummaryCard title="Total Income" amount={stats.income} icon={<ArrowUpCircle className="text-emerald-500" />} color="bg-white" />
        <SummaryCard title="Total Expenses" amount={stats.expenses} icon={<ArrowDownCircle className="text-rose-500" />} color="bg-white" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time-Based Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Spending Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={transactions}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" hide />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#6366f1" fillOpacity={1} fill="url(#colorAmt)" />
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categorical Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Insights Section */}
      <Insights transactions={transactions} stats={stats} />
    </div>
  );
};

const SummaryCard = ({ title, amount, icon, color }) => (
  <div className={`${color} p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between`}>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h2 className="text-2xl font-bold mt-1">${amount.toLocaleString()}</h2>
    </div>
    <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
  </div>
);

const Insights = ({ transactions, stats }) => {
  const highestExp = transactions
    .filter(t => t.type === 'expense')
    .sort((a, b) => b.amount - a.amount)[0];

  return (
    <div className="bg-indigo-900 text-white p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center gap-4">
        <TrendingUp className="w-10 h-10 text-indigo-300" />
        <div>
          <h3 className="font-bold text-lg">Financial Insight</h3>
          <p className="text-indigo-200 text-sm">
            {highestExp 
              ? `Your highest spending was $${highestExp.amount} on ${highestExp.category}.`
              : "Start logging transactions to see insights!"}
          </p>
        </div>
      </div>
      <div className="mt-4 md:mt-0 text-right">
        <p className="text-xs uppercase tracking-wider text-indigo-300">Savings Rate</p>
        <p className="text-2xl font-bold">{stats.income > 0 ? Math.round((stats.balance / stats.income) * 100) : 0}%</p>
      </div>
    </div>
  );
};

export default Dashboard;