"use client"

import { Key, SetStateAction, useEffect, useState } from 'react';
import Task from '../../components/Task';
import { JSX } from 'react/jsx-runtime';
import { redirect, useNavigate } from 'react-router-dom';

const TasksPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<any>([]);

  const handleSearch = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredTasks = () => {
    if(searchTerm.length === 0){
      getAllTasks()
    }
    const newFIlteredTasks = filteredTasks.filter((filtered: { name: string; }) =>
      filtered.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(newFIlteredTasks)
  }


  const getAllTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tasks');
      if (!response.ok) {
        throw new Error('Falha ao obter as tasks');
      }
      const tasksData = await response.json();
      setFilteredTasks(tasksData);
    } catch (error) {
      console.error('Erro ao obter as tasks:', error);
    }
  }

  useEffect(() => {
    getFilteredTasks()
  }, [searchTerm])

  useEffect(() => {
    getAllTasks()
  }, [])


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Minhas tasks</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Buscar Tarefas..."
          value={searchTerm}
          onChange={handleSearch}
          className="py-2 px-4 border rounded-1-lg focus:outline-none text-black bg-slate-200"
        />
        <button className="bg-green-500 hover:bg-green-700  text-white font-bold py-2 px-4 rounded-3-lg sm:w-auto w-full"  onClick={()=>{navigate('/criar')}}>
          Criar
        </button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((todo: JSX.IntrinsicAttributes & { id: any; name: any; startDate: any; endDate: any; status: any; onDelete: any; }, index: Key | null | undefined) => (
          <div key={index}>
            <Task {...todo} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default TasksPage;
