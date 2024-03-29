import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Modal from '../../components/Modal';
import { ButtonSuccess } from '../../components/Button';
import { format, parseISO } from 'date-fns';
import getStatusColor from '../../util/getStatusColor';
import 'react-datepicker/dist/react-datepicker.css';

interface EditedTask {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

const EditTaskPage = () => {
  const [editedTask, setEditedTask] = useState<EditedTask>({
    id: '',
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    status: ''
  });
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { task } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const formatDateForMySQL = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
  };

  const getTaskById = async (taskId: string | undefined) => {
    try {
      const response = await fetch('http://localhost:8000/api/tasks?id=' + taskId);
      if (!response.ok) {
        throw new Error('Falha ao obter as tasks');
      }
      const tasksData = await response.json();
      const formattedStartDate = parseISO(tasksData.startDate);
      const formattedEndDate = parseISO(tasksData.endDate);

      setEditedTask(tasksData);
      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
    } catch (error) {
      console.error('Erro ao obter as tasks:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedTask({
      ...editedTask,
      [name]: value
    });
  };

  useEffect(() => {
    getTaskById(task);
  }, [task]);

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    setEditedTask({
      ...editedTask,
      startDate: date
    });
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
    setEditedTask({
      ...editedTask,
      endDate: date
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/tasks/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: editedTask.id,
          name: editedTask.name,
          startDate: formatDateForMySQL(editedTask.startDate),
          endDate: formatDateForMySQL(editedTask.endDate),
          status: editedTask.status,
        }),
      });

      if (response.ok) {
        openModal();
      } else {
        throw new Error('Failed to update task');
      }

    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Editar Tarefa</h1>
      <form onSubmit={handleSubmit} className="sm:w-1/2 lg:w-1/3">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedTask.name}
            onChange={handleChange}
            className="py-2 px-4 border rounded-lg focus:outline-none w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block mb-2">Data de Início:</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            className="py-2 px-4 border rounded-lg focus:outline-none w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block mb-2">Data de Término:</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
            className="py-2 px-4 border rounded-lg focus:outline-none w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block mb-2">Status:</label>
          <select
            id="status"
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            className="py-2 px-4 border rounded-lg focus:outline-none w-full"
          >
            <option value="Em andamento" className={`mb-1 ${getStatusColor('Em andamento')}`}>Em andamento</option>
            <option value="Concluído" className={`mb-1 ${getStatusColor('Concluído')}`}>Concluído</option>
            <option value="Impedido" className={`mb-1 ${getStatusColor('Impedido')}`}>Impedido</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Salvar Alterações</button>
      </form>
      <Modal isOpen={isOpen} onClose={closeModal} title={'Sucesso!'}>
        <div className="p-4">
          <p className="text-lg">Alterações realizadas com sucesso</p>
        </div>
        <div className='float-right'>
          <ButtonSuccess action={() => { navigate('/tarefas') }} text={"Ir para tarefas"} />
        </div>
      </Modal>
    </div>
  );
};

export default EditTaskPage;
