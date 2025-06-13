const TaskStats = ({ stats }) => {
  const completionPercentage =
    Math.round((stats.completed / stats.total) * 100) || 0;

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Task Statistics
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Total Tasks</p>
          <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Completed</p>
          <p className="text-2xl font-semibold text-gray-900">
            {stats.completed}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-1">
          <span>Progress</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
