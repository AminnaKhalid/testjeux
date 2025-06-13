const ClassSummary = ({ summary }) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Class Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm font-medium text-blue-800">Total Students</p>
          <p className="text-2xl font-semibold text-blue-900">
            {summary.totalStudents}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <p className="text-sm font-medium text-green-800">Highest Average</p>
          <p className="text-2xl font-semibold text-green-900">
            {summary.highestAverage}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <p className="text-sm font-medium text-purple-800">Class Average</p>
          <p className="text-2xl font-semibold text-purple-900">
            {summary.classAverage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClassSummary;
