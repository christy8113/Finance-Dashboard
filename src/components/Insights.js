const Insights = ({ transactions, stats }) => {
  const highest = transactions
    .filter(t => t.type === 'expense')
    .sort((a, b) => b.amount - a.amount)[0];

  return (
    <div className="mt-6 p-4 bg-indigo-600 text-white rounded">
      <h3 className="font-bold">Insights</h3>

      {highest ? (
        <p>Highest spending: ${highest.amount} on {highest.category}</p>
      ) : (
        <p>No insights available</p>
      )}

      <p>
        Savings Rate: {stats.income ? Math.round((stats.balance / stats.income) * 100) : 0}%
      </p>
    </div>
  );
};

export default Insights;
