import { useEffect, useState } from "react";
import { FaCopy, FaTrash, FaVolumeMute } from "react-icons/fa";

interface Messages {
  username: string;
  message: string;
  timestemp: string;
}
function Room() {
  const [messages, setMessages] = useState<Messages[]>([]);
  const roomId = "7878"; // ID da sala, pode ser gerado dinamicamente cGustavo necessário
  const [participants, setParticipants] = useState([
    { name: "Pedro", muted: false },
    { name: "Gustavo", muted: false },
  ]);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("ID copiado para a área de transferência");
  };

  const handleRemoveParticipant = (name: string) => {
    setParticipants(
      participants.filter((participant) => participant.name !== name)
    );
  };

  const handleMuteParticipant = (name: string) => {
    setParticipants(
      participants.map((participant) =>
        participant.name === name
          ? { ...participant, muted: !participant.muted }
          : participant
      )
    );
  };

  useEffect(() => {
    // Aqui você pode adicionar o código para conectar ao WebSocket e atualizar mensagens
    setMessages([
      {
        message: "eae",
        username: "Pedro",
        timestemp: "14:24",
      },
      {
        message: "save",
        username: "Gustavo",
        timestemp: "14:25",
      },
    ]);
  }, []);

  return (
    <div className="h-full w-full bg-gray-100 flex justify-center items-center">
    <div className="flex  w-[50%] h-full flex-col gap-4 justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="flex justify-between space-x-2">
          <h1 className="text-3xl font-bold text-left text-gray-800">
            Chat em Tempo Real
          </h1>
          <div className="flex items-center gap-2">

          <span className="text-sm font-medium text-gray-700">
            ID da Sala: {roomId}
          </span>
          <button
            onClick={() => copyToClipboard(roomId)}
            className="text-blue-500 hover:text-blue-600 focus:outline-none"
          >
            <FaCopy />
          </button>
          </div>

        </div>
        <div className="flex flex-col space-y-4 h-96 overflow-y-auto">
          {messages.map((msg, index) => (
            <Message
              key={index}
              name={msg.username}
              message={msg.message}
              timestemp={msg.timestemp}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2 items-center">
          <textarea
            placeholder="Digite sua mensagem"
            className="w-full px-4 py-2 border text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-2 py-2 w-[20%] bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Enviar
          </button>
        </div>
      </div>

      <div className="w-full h-full max-w-2xl bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Participantes
          </h2>
          <div className="flex flex-col space-y-2">
            {participants.map((participant, index) => (
              <Participant
                key={index}
                name={participant.name}
                onRemove={() => handleRemoveParticipant(participant.name)}
                onMute={() => handleMuteParticipant(participant.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Room;

const Message = ({
  name,
  message,
  timestemp,
}: {
  name: string;
  message: string;
  timestemp: string;
}) => (
  <div className="flex items-center space-x-4 p-4">
    <div className="flex-shrink-0">
      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
        <p className="text-lg font-bold uppercase">{name.charAt(0)}</p>
      </div>
    </div>
    <div className="w-full">
      <div className="flex justify-between">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{timestemp}</p>
      </div>
      <div className="text-gray-600">{message}</div>
    </div>
  </div>
);

const Participant = ({
  name,
  onMute,
  onRemove,
}: {
  name: string;
  onRemove: () => void;
  onMute: () => void;
}) => (
  <div className="flex items-center justify-start w-full space-x-2 p-2">
    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
      {name.charAt(0)}
    </div>
    <div className="flex justify-between w-full">
      <div className="flex items-start space-x-2">
        <span className="text-gray-700">{name}</span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onMute}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FaVolumeMute />
        </button>
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  </div>
);
