import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Task from '../../components/Task';
import Modal from '../../components/Modal';
import { ButtonDanger, ButtonInfo } from '../../components/Button';

interface TaskType {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
}

const TasksPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch('http://localhost:8000/api/tasks/delete', {
        method: 'DELETE',
        body: JSON.stringify({
          id: id,
        }),
      });

      if (response.ok) {
        getAllTasks()
        setIsOpen(false)
      }
      if (!response.ok) {
        throw new Error('Failed to create task');
      }

    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getAllTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasksData: TaskType[] = await response.json();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3-lg sm:w-auto w-full" onClick={() => navigate('/criar')}>
          Criar
        </button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task: TaskType) => (
            <div key={task.id} onClick={() => setSelectedTask(task.id)}>
              <Task {...task} onDelete={() => setIsOpen(true)} />
            </div>
          ))
        ) : (
          <h1>Não há tarefas cadastradas</h1>
        )}
      </section>

      <Modal isOpen={isOpen} onClose={closeModal} title={'Tem certeza?'}>
        <div className="p-4">
          <p className="text-lg">Deseja realmente deletar essa tarefa?</p>
        </div>
        <div className='mt-5 flex justify-between'>
          <div> <ButtonInfo action={() => setIsOpen(false)} text={"Não, cancelar"} /></div>
          <div> <ButtonDanger action={() => handleDelete(selectedTask!)} text={"Sim, desejo deletar"} /></div>
        </div>
      </Modal>
    </div>
  );
};

export default TasksPage;
