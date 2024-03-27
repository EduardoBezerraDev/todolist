import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import TasksPage from "./pages/Tasks";
import Update from "./pages/update";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route Component={HomePage} path="/" />
        <Route Component={TasksPage} path="/tarefas" />
        <Route Component={Update} path="/tarefas" />
        {/* Adicione outras rotas aqui */}
      </Routes>

    </Router>
  );
};

export default App
