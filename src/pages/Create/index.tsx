import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Modal from '../../components/Modal';
import { ButtonSuccess } from '../../components/Button';
import { format } from 'date-fns';
import getStatusColor from '../../util/getStatusColor';
import 'react-datepicker/dist/react-datepicker.css';

interface FormData {
  name: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

const CreateTaskPage = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [endDateError, setEndDateError] = useState<string>('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const formatDateForMySQL = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
  };

  const setInitialDates = () => {
    const today = new Date();
    setValue("startDate", today);
    setValue("endDate", today);
  };

  useEffect(() => {
    setInitialDates();
  }, [])

  const onSubmit = async (data: FormData) => {
    try {
      if (data.endDate < data.startDate) {
        setEndDateError('A data de término deve ser posterior à data de início');
        return;
      }

      const response = await fetch('http://localhost:8000/api/tasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          startDate: formatDateForMySQL(data.startDate),
          endDate: formatDateForMySQL(data.endDate),
          status: data.status,
        }),
      });

      if (response.ok) {
        openModal()
      } else {
        throw new Error('Failed to create task');
      }

    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:w-1/2">
      <h1 className="text-3xl font-semibold mb-8">Criar Nova Tarefa</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Descrição:</label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "O nome da tarefa é obrigatório",
              minLength: { value: 3, message: "A descrição deve ter no mínimo 3 caracteres" },
              maxLength: { value: 100, message: "A descrição deve ter no máximo 100 caracteres" }
            })}
            className={`py-2 px-4 border rounded-lg focus:outline-none w-full ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block mb-2">Data de Início:</label>
          <DatePicker
            selected={startDate}
            onChange={(date:Date) => setValue("startDate", date)}
            dateFormat="dd/MM/yyyy"
            className={`py-2 px-4 border rounded-lg focus:outline-none w-full ${errors.startDate ? 'border-red-500' : ''}`}
          />
          {errors.startDate && <p className="text-red-500 mt-1">A data de início é obrigatória</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block mb-2">Previsão de Término:</label>
          <DatePicker
            selected={endDate}
            onChange={(date:Date) => setValue("endDate", date)}
            dateFormat="dd/MM/yyyy"
            className={`py-2 px-4 border rounded-lg focus:outline-none w-full ${errors.endDate ? 'border-red-500' : ''}`}
          />
          {errors.endDate && <p className="text-red-500 mt-1">A previsão de término é obrigatória</p>}
          {endDateError && <p className="text-red-500 mt-1">{endDateError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block mb-2">Status:</label>
          <select
            id="status"
            {...register("status")}
            className="py-2 px-4 border rounded-lg focus:outline-none w-full"
          >
            <option value="Em andamento" className={`mb-1 ${getStatusColor('Em andamento')}`}>Em andamento</option>
            <option value="Concluído" className={`mb-1 ${getStatusColor('Concluído')}`}>Concluído</option>
            <option value="Impedido" className={`mb-1 ${getStatusColor('Impedido')}`}>Impedido</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Criar Tarefa</button>
      </form>
      <Modal isOpen={isOpen} onClose={closeModal} title={'Sucesso!'}>
        <div className="p-4">
          <p className="text-lg">Tarefa criada com sucesso!</p>
        </div>
        <div className='float-right'>
          <ButtonSuccess action={() => { navigate('/tarefas') }} text={"Ir para tarefas"} />
        </div>
      </Modal>
    </div>
  );
};

export default CreateTaskPage;
