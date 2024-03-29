const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Em andamento':
        return 'text-blue-500';
      case 'Concluído':
        return 'text-gray-500';
      case 'Impedido':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  export default getStatusColor;