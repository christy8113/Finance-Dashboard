const Insights = ({ transactions, stats }) => {
  const highest = transactions
    .filter(t => t.type === 'expense')
    .sort((a, b) => b.amount - a.amount)[0];

  return (
    <div className="bg-indigo-600 dark:bg-indigo-700 text-white p-6 rounded-xl flex justify-between">

      <div>
        <h3 className="font-bold">Insights</h3>
        <p>
          {highest
            ? `Highest spending: $${highest.amount} on ${highest.category}`
            : "No data"}
        </p>
      </div>

      <div>
        <p>Savings Rate</p>
        <h2 className="text-xl font-bold">
          {stats.income ? Math.round((stats.balance / stats.income) * 100) : 0}%
        </h2>
      </div>

    </div>
  );
};

export default Insights;
