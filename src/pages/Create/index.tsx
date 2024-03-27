import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from 'react';

const CreateTaskPage = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const setInitialDates = () => {
    const today = new Date();
    setValue("startDate", today);
    setValue("endDate", today);
  };

  useEffect(() => {
    setInitialDates();
  }, [])
  

  const onSubmit = (data: any) => {
    
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:w-1/2">
      <h1 className="text-3xl font-semibold mb-8">Criar Nova Tarefa</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Nome:</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "O nome da tarefa é obrigatório" })}
            className={`py-2 px-4 border rounded-lg focus:outline-none w-full ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block mb-2">Data de Início:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setValue("startDate", date)}
            dateFormat="dd/MM/yyyy"
            className={`py-2 px-4 border rounded-lg focus:outline-none w-full ${errors.startDate ? 'border-red-500' : ''}`}
          />
          {errors.startDate && <p className="text-red-500 mt-1">A data de início é obrigatória</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block mb-2">Data de Término:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setValue("endDate", date)}
            dateFormat="dd/MM/yyyy"
            className={`py-2 px-4 border rounded-lg focus:outline-none w-full ${errors.endDate ? 'border-red-500' : ''}`}
          />
          {errors.endDate && <p className="text-red-500 mt-1">A data de término é obrigatória</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block mb-2">Status:</label>
          <select
            id="status"
            {...register("status")}
            className="py-2 px-4 border rounded-lg focus:outline-none w-full"
          >
            <option value="Em andamento">Em andamento</option>
            <option value="Planejado">Planejado</option>
            <option value="Concluído">Concluído</option>
            <option value="Atrasado">Atrasado</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Criar Tarefa</button>
      </form>
    </div>
  );
};

export default CreateTaskPage;
