import { useState } from "react";

const StudentForm = ({ onAddStudent }) => {
  const [name, setName] = useState("");
  const [grades, setGrades] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && grades) {
      const gradesArray = grades
        .split(",")
        .map((grade) => parseFloat(grade.trim()));
      onAddStudent(name, gradesArray);
      setName("");
      setGrades("");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Add New Student
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Student Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter student name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="grades"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Grades (comma separated)
          </label>
          <input
            type="text"
            id="grades"
            value={grades}
            onChange={(e) => setGrades(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 85, 90, 78"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Enter grades separated by commas
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
