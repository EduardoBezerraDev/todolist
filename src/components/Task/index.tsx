import { useState } from 'react';
import { ButtonDanger, ButtonInfo } from '../Button';
import { useNavigate } from 'react-router-dom';

const Task = ({ id, name, startDate, endDate, status, onDelete }) => {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = (taskId) => {
    console.log(taskId)
    navigate(`/editar/${taskId}`);
  }

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
        <p className="mb-1"><strong>Data de Início:</strong> {startDate}</p>
        <p className="mb-1"><strong>Data de Término:</strong> {endDate}</p>
        <p className="mb-1"><strong>Status:</strong> {status}</p>
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
