import "./App.css";
import ProductCatalog from "./Pages/Cart/ProductCatalog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskManager from "./Pages/manager/TaskManager";
import GradeManager from "./Pages/calc/GradeManager";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element=<ProductCatalog /> />
          <Route path="/manager" element=<TaskManager /> />
          <Route path="/grade" element=<GradeManager /> />
        </Routes>
      </Router>
    </>
  );
}

export default App;
