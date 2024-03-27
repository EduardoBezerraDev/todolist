"use client"

import { useEffect, useState } from 'react';
import Task from '../../components/Task';

const todos = [
  { name: 'Comprar mantimentos', startDate: '28/01/2024', endDate: '28/01/2024', status: 'Em andamento' },
  { name: 'Ler um livro', startDate: '28/01/2024', endDate: '28/01/2024', status: 'Planejado' },
  { name: 'Fazer exercícios', startDate: '28/01/2024', endDate: '28/01/2024', status: 'Em andamento' },
];

const TasksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<any>(todos);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredTasks = () => {
    const newFIlteredTasks = todos.filter(todo =>
      todo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(newFIlteredTasks)
  }

  useEffect(() => {
    getFilteredTasks()
  }, [searchTerm])


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Minhas tasks</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Buscar Tarefas..."
          value={searchTerm}
          onChange={handleSearch}
          className="py-2 px-4 border rounded-1-lg focus:outline-none text-black"
        />
        <button className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded-3-lg">
          Alterar
        </button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((todo, index) => (
          <div key={index}>
            <Task {...todo} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default TasksPage;
