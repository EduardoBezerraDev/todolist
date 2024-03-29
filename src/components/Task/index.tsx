import { useState } from 'react';
import { ButtonDanger, ButtonInfo } from '../Button';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const Task = ({ id, name, startDate, endDate, status, onDelete }) => {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = (taskId: number) => {
    navigate(`/editar/${taskId}`);
  }

  const formattedStartDate = parseISO(startDate);
  const formattedEndDate = parseISO(endDate);

  // Função para obter a classe de cor com base no status
  const getStatusColorClass = (status) => {
    switch (status) {
      case 'Em andamento':
        return 'text-blue-500';
      case 'Planejado':
        return 'text-green-500';
      case 'Concluído':
        return 'text-gray-500';
      case 'Atrasado':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="border rounded-md p-4 bg-slate-100">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{name}</h2>
        <div>
          <button onClick={handleToggleExpand} className="text-blue-500 hover:text-blue-700 mr-2">
            {expanded ? 'Recolher' : 'Expandir'}
          </button>
        </div>
      </div>
      <div>
        <p className="mb-1"><strong>Data de Início:</strong> {format(formattedStartDate, 'dd-MM-yyyy')}</p>
        <p className="mb-1"><strong>Data de Término:</strong> {format(formattedEndDate, 'dd-MM-yyyy')}</p>
        {/* Adicionando a classe de cor condicional com base no status */}
        <p className={`mb-1 ${getStatusColorClass(status)}`}><strong>Status:</strong> {status}</p>
      </div>
      {expanded && (
        <div className='mt-5'>
          <div className='mt-5 flex justify-between'>
            <ButtonInfo action={()=>handleEdit(id)} text={'Alterar'}/>
            <ButtonDanger text={'Excluir'} action={handleDelete}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
