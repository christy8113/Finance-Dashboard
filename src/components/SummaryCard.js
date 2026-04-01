const SummaryCard = ({ title, value }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow border dark:border-gray-700">
      <p className="text-gray-500 dark:text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold mt-1">${value}</h2>
    </div>
  );
};

export default SummaryCard;
