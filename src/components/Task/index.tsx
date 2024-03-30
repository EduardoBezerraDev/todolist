import { useState } from 'react';
import { ButtonDanger, ButtonInfo } from '../Button';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import getStatusColor from '../../util/getStatusColor';
import { TtaskProps } from '../../types/Task';


const Task = ({ id, name, startDate, endDate, status, onDelete }: TtaskProps) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handleEditClick = () => {
    navigate(`/editar/${id}`);
  };

  const parsedStartDate = parseISO(startDate);
  const parsedEndDate = parseISO(endDate);

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

      {expanded && (
        <>
          <div>
            <p className="mb-1"><strong>Data de Início:</strong> {format(parsedStartDate, 'dd-MM-yyyy')}</p>
            <p className="mb-1"><strong>Data de Término:</strong> {format(parsedEndDate, 'dd-MM-yyyy')}</p>
            <p className={`mb-1 ${getStatusColor(status)}`}><strong>Status:</strong> {status}</p>
          </div><div className='mt-5'>
            <div className='mt-5 flex justify-between'>
              <ButtonInfo action={handleEditClick} text={'Alterar'} />
              <ButtonDanger text={'Excluir'} action={handleDeleteClick} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
