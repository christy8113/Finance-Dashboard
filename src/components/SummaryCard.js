const SummaryCard = ({ title, value }) => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-xl font-bold">${value}</h2>
    </div>
  );
};

export default SummaryCard;
