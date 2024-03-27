import { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const mockTask = { name: 'Comprar mantimentos', startDate: new Date(), endDate: new Date(), status: 'Em andamento' }

const EditTaskPage = () => {
  const [editedTask, setEditedTask] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { task } = useParams();

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setEditedTask({
      ...editedTask,
      [name]: value
    });
  };

  useEffect(() => {
    setEditedTask(mockTask);
    setStartDate(new Date(mockTask.startDate));
    setEndDate(new Date(mockTask.endDate));
  }, []);

  const handleStartDateChange = (date: SetStateAction<Date>) => {
    setStartDate(date);
    setEditedTask({
      ...editedTask,
      startDate: date.toLocaleDateString()
    });
  };

  const handleEndDateChange = (date: SetStateAction<Date>) => {
    setEndDate(date);
    setEditedTask({
      ...editedTask,
      endDate: date.toLocaleDateString()
    });
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log("Tarefa editada:", editedTask);
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
            value={editedTask.name || ''}
            onChange={handleChange}
            className="py-2 px-4 border rounded-lg focus:outline-none w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block mb-2">Data de Início:</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
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
            value={editedTask.status || ''}
            onChange={handleChange}
            className="py-2 px-4 border rounded-lg focus:outline-none w-full"
          >
            <option value="Em andamento">Em andamento</option>
            <option value="Planejado">Planejado</option>
            <option value="Concluído">Concluído</option>
            <option value="Atrasado">Atrasado</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditTaskPage;
