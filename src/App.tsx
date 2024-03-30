import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import TasksPage from "./pages/Tasks";
import EditTaskPage from "./pages/Edit";
import CreateTaskPage from './pages/Create/index';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route Component={HomePage} path="/" />
        <Route Component={TasksPage} path="/tarefas" />
        <Route Component={EditTaskPage} path="/editar/:task" />
        <Route Component={CreateTaskPage} path="/criar" />
        <Route path="*" element={<p>Você descobriu uma rota não existente :) </p>} />
      </Routes>
    </Router>
  );
};

export default App
