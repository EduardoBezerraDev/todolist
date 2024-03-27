import { useState } from 'react';

const Task = ({ id, name, startDate, endDate, status, onDelete }) => {
  const [expanded, setExpanded] = useState(true);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="border rounded-md p-4">
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
          <hr />
          <div className='mt-5 flex justify-between'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Alterar
            </button>
            <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
              Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
