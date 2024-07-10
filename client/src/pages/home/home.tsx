import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate("/create");
  };

  const handleJoinRoom = () => {
    navigate("/room");
  };
  return (
    <div className="bg-gray-950 h-screen w-screen">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="bg-gray-200 p-8 rounded-lg h-[60%]">
          <h1 className="text-2xl text-gray-800 py-8">
            Olá usuário!
            <br />
            <p className="text-3xl">Seja Bem-vindo(a) ao</p> <br />
            <p className="text-4xl font-extrabold">Chat Room | WS</p>
          </h1>

          <p>Somos uma plataforma de bate-papo em salas públicas.</p>

          <div className="flex flex-col items-center gap-1">
            <h2 className="text-1xl text-gray-800 py-8 text-left w-full">
              O que você quer fazer hoje?
            </h2>

            <button
              className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
              onClick={handleJoinRoom}
            >
              Entrar em uma Sala Existente
            </button>
            ou
            <button
              className="w-full px-4 py-2 bg-sky-600 text-white rounded-md shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handleCreateRoom}
            >
              Criar Uma Nova Sala
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

