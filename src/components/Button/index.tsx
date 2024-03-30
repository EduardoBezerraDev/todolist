import React from 'react';

interface ButtonProps {
  action: () => void;
  text: string;
}

const ButtonDanger: React.FC<ButtonProps> = ({ action, text }) => {
  return (
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3-lg sm:w-auto w-full" onClick={action}>
      {text}
    </button>
  );
};

const ButtonInfo: React.FC<ButtonProps> = ({ action, text }) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3-lg sm:w-auto w-full" onClick={action}>
      {text}
    </button>
  );
};

const ButtonSuccess: React.FC<ButtonProps> = ({ action, text }) => {
  return (
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3-lg sm:w-auto w-full" onClick={action}>
      {text}
    </button>
  );
};

export { ButtonDanger, ButtonInfo, ButtonSuccess };
