import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

function QueuePage() {
  const navigate = useNavigate();
  const { roomId, username } = useParams<{
    roomId: string;
    username: string;
  }>();
  const [dots, setDots] = useState("");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((_seconds) => _seconds + 1);
      if (seconds === 30) navigate("/");
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, seconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      navigate("/");
      toast.warning("Oops! Parece que você não pode entrar nesta sala");
      setSeconds(0);
    }, 29500);

    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    const interval = setTimeout(() => {
      toast.success("Você foi convocado 🏆");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const socket = io("ws://localhost:8080");

    socket.emit(`user_wants_to_enter_in_the_room_${roomId}`, {
      username,
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, username]);
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 h-screen flex items-center justify-center">
      <div className="w-4/5 md:w-1/2 lg:w-1/3 border border-gray-200 rounded-lg p-8 bg-gray-950 shadow-lg text-center">
        <h2 className="text-white mb-4 text-3xl uppercase tracking-widest">
          Fila de espera
        </h2>
        <h2 className="text-gray-300 text-xl mb-4">
          Estamos aguardando o Host aceitar sua solicitação. Obrigado pela sua
          paciência!
        </h2>
        <div className="flex justify-center items-center mt-8">
          <div className="loader flex space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce200"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce400"></div>
          </div>
        </div>
        <div className="text-gray-300 ml-2 text-lg mt-10">
          Aguardando solicitação ser aprovada{dots}
        </div>
        <p className="text-white mt-10 text-sm">
          Se após 30 segundos, sua solicitação não for aprovada, você será
          redirecionado:
        </p>

        <p className="text-white py-4">{seconds} / 30</p>
      </div>
    </div>
  );
}
export default QueuePage;
