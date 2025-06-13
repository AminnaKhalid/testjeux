const StudentList = ({ students, onRemoveStudent }) => {
  if (students.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No students added yet. Add a student to get started!
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {students.map((student) => (
        <div
          key={student.id}
          className="p-4 hover:bg-gray-50 transition duration-150 ease-in-out"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  {student.name}
                </h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500 mr-2">
                    Grades: {student.grades.join(", ")}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      student.average >= 90
                        ? "bg-green-100 text-green-800"
                        : student.average >= 80
                        ? "bg-blue-100 text-blue-800"
                        : student.average >= 70
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    Average: {student.average}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onRemoveStudent(student.id)}
              className="text-gray-400 hover:text-red-500 transition duration-150 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
