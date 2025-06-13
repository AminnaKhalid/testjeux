import { useState } from "react";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import ClassSummary from "./ClassSummary";
import Navbar from "../../components/Navbar";

const GradeManager = () => {
  const [students, setStudents] = useState([]);

  // 1. Add student with grades
  const addStudent = (name, grades) => {
    const newStudent = {
      id: Date.now(),
      name,
      grades,
      average: calculateAverage(grades),
    };
    setStudents([...students, newStudent]);
  };

  // 2. Calculate average of grades
  const calculateAverage = (grades) => {
    const sum = grades.reduce((total, grade) => total + grade, 0);
    return parseFloat((sum / grades.length).toFixed(2));
  };

  // 3. Get class summary
  const getClassSummary = () => {
    if (students.length === 0) {
      return {
        totalStudents: 0,
        highestAverage: 0,
        classAverage: 0,
      };
    }

    const averages = students.map((student) => student.average);
    const highestAverage = Math.max(...averages);
    const classAverage = calculateAverage(averages);

    return {
      totalStudents: students.length,
      highestAverage,
      classAverage,
    };
  };

  const removeStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
    <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Student Grade Manager
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <StudentForm onAddStudent={addStudent} />
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <ClassSummary summary={getClassSummary()} />
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <StudentList students={students} onRemoveStudent={removeStudent} />
        </div>
      </div>
    </div>
  );
};

export default GradeManager;
