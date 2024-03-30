const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Bem-vindo ao My Tasks</h1>
        <p className="text-lg text-gray-700 mb-8">Gerencie suas tarefas de forma fácil e eficiente.</p>
        <div className="flex justify-center">
          <a href="/tarefas" className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">
            Ver Tarefas
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
