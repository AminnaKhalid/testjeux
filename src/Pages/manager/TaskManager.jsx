import { useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import TaskStats from "./TaskStats";
import PriorityFilter from "./PriorityFilter";
import Navbar from "../../components/Navbar"
const TaskManager = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy groceries", priority: "medium", completed: false },
    { id: 2, title: "Finish project", priority: "high", completed: true },
    { id: 3, title: "Call mom", priority: "high", completed: false },
  ]);
  const [filter, setFilter] = useState("all");

  const createTask = (title, priority) => {
    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filterByPriority = (priority) => {
    if (priority === "all") return tasks;
    return tasks.filter((task) => task.priority === priority);
  };

  const getTaskStats = () => {
    const completedCount = tasks.filter((task) => task.completed).length;
    return {
      total: tasks.length,
      completed: completedCount,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
    <Navbar />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Task Manager
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <TaskForm onCreateTask={createTask} />
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <PriorityFilter currentFilter={filter} onFilterChange={setFilter} />
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <TaskList
            tasks={filterByPriority(filter)}
            onToggleComplete={toggleComplete}
            onDeleteTask={deleteTask}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <TaskStats stats={getTaskStats()} />
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
