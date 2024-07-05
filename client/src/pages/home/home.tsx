function Home() {
  return (
    <div className="bg-gray-100">
      <HomeForm />
    </div>
  );
}

export default Home;

const HomeForm = () => {
  return (
    <form className="flex flex-col justify-center items-center space-y-4 min-h-screen">
      <div className="flex justify-center items-center py-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Bem-vindo a Sala de Bate Papo
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4">
        <input
          type="text"
          placeholder="Digite o ID da Sala"
          className="w-80 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex flex-col justify-center items-center space-y-4">
        <input
          type="text"
          placeholder="Qual o seu nome?"
          className="w-80 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button className="w-40 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Entrar
      </button>
    </form>
  );
};
