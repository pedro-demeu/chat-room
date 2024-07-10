import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Socket, io } from "socket.io-client";
import * as Yup from "yup";
import { loggedUserAtom } from "../../atoms/rooms";
import useScrollChat from "../../hooks/useScrollChat";

interface Messages {
  [roomId: string]: {
    username: string;
    message: string;
    timestemp: string;
  };
}

const schema = Yup.object().shape({
  message: Yup.string()
    .min(1, "Mensagem deve ter no mínimo 1 caracter")
    .max(50, "A mensagem deve ter no máximo 50 caracteres"),
});

function Room() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Messages[]>([]);
  const [username, setLoggedUser] = useRecoilState(loggedUserAtom);
  const [messageValue, setMessageValue] = useState("");
  const { roomId } = useParams();
  const socketRef = useRef<Socket | null>();
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("ID copiado para a área de transferência");
  };

  const handleJoinOut = () => {
    navigate("/");
  };

  const ref = useScrollChat(messages);

  useEffect(() => {
    socketRef.current = io("ws://localhost:8000");

    socketRef.current.open();

    socketRef.current.emit("participant_connected", { roomId, username });

    socketRef.current.on(String(roomId), (msgs) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      setMessages((current) => {
        return [
          ...current,
          {
            [msgs.roomId]: msgs,
          },
        ];
      });
    });

    return () => {
      socketRef.current?.emit("participant_disconnected", { roomId });
      socketRef.current?.off(roomId);
      socketRef.current?.close();
    };
  }, [roomId, username]);

  useEffect(() => {
    const getMessages = async () => {
      const msgs = await fetch(
        `http://localhost:8000/v1/room/${roomId}/messages`,
        {
          method: "GET",
        }
      );

      const res = await msgs.json();

      setMessages(res);
    };

    getMessages();
  }, [roomId]);

  if (!username) {
    return (
      <div className="bg-gray-950 h-screen w-screen">
        <div className="flex flex-col justify-center items-center h-full w-full">
          <div className="bg-gray-200 rounded-lg p-8">
            <Formik
              initialValues={{
                username: "",
              }}
              onSubmit={(values) => {
                setLoggedUser(values.username);
              }}
            >
              {({
                values,
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <form
                  className="flex flex-col h-full justify-between"
                  onSubmit={handleSubmit}
                >
                  <h2 className="py-4 font-bold text-3xl text-center">
                    Chat Room | WS
                  </h2>
                  <div className="text-center py-8">
                    <p className="py-4">
                      Você foi convidado para participar desta Sala de Bate-papo
                      🥳
                    </p>
                  </div>
                  <input
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Qual o seu nome?"
                    autoComplete="off"
                    autoFocus
                    className={`
            ${
              errors.username
                ? "border-red-600 text-red-500 focus:ring-red-500"
                : "focus:ring-blue-500 "
            }
           w-full px-4 py-2 my-2 border rounded-md shadow-sm focus:outline-none 
            focus:ring-2 
            focus:border-transparent`}
                  />
                  {errors.username && (
                    <p className="px-4 text-red-600 text-sm">
                      {errors.username}
                    </p>
                  )}

                  <button
                    className="w-full px-4 mt-2 py-2 bg-emerald-500 text-white rounded-md shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-opacity-50 disabled:bg-gray-400 disabled:text-gray-300"
                    type="submit"
                    disabled={isSubmitting || Boolean(errors.username)}
                  >
                    Entrar
                  </button>

                  <button
                    className="w-full mt-2 py-2 px-4 bg-cyan-600 text-white rounded-md "
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Página inicial
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-950 flex justify-center items-center">
      <div className="flex  lg:w-[50%] h-full flex-col gap-4 justify-center items-center min-h-scree p-4">
        <div className="w-full lg:max-w-2xl bg-gray-900 rounded-lg shadow-md p-6 space-y-6">
          <div className="flex justify-between space-x-2">
            <h1 className="text-3xl font-bold text-left text-white">
              Chat em Tempo Real
            </h1>
            {roomId && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">
                  ID da Sala: {roomId}
                </span>
                <button
                  onClick={() => copyToClipboard(roomId)}
                  className="text-emerald-500 hover:text-emerald-600 focus:outline-none"
                >
                  <FaCopy />
                </button>
              </div>
            )}
          </div>
          {ref && (
            <div
              ref={ref as React.LegacyRef<HTMLDivElement>}
              className="flex scrollable-div flex-col space-y-4 h-96 overflow-y-auto border-2 border-gray-950 rounded-lg py-4"
            >
              {!messages.length ? (
                <p className="text-white text-center m-auto">
                  Não há mensagens ainda ...
                </p>
              ) : (
                messages.map(
                  (msg, index) =>
                    roomId && (
                      <Message
                        key={index}
                        name={msg[roomId]?.username}
                        message={msg[roomId]?.message}
                        timestemp={msg[roomId]?.timestemp}
                      />
                    )
                )
              )}
            </div>
          )}
          <Formik
            initialValues={{
              message: "",
            }}
            validationSchema={schema}
            onSubmit={() => {
              socketRef.current?.emit("new_message", {
                username,
                message: messageValue,
                roomId,
              });
            }}
          >
            {({
              values,
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              resetForm,
            }) => (
              <form
                onSubmit={(e) => {
                  setMessageValue(values.message);
                  handleSubmit(e);
                  resetForm();
                }}
              >
                <p className="text-white py-4 ml-1">Olá {username} 🤗</p>
                <div className="flex flex-col gap-2 items-center">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Digite sua mensagem"
                    value={values.message}
                    autoFocus
                    tabIndex={-1}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="w-full text-white bg-gray-900 px-4 py-2 mb-2 border border-gray-950 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  {errors.message && (
                    <p className="px-4 text-red-600 text-sm">
                      {errors.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || Boolean(errors.message)}
                    className="px-2 py-2 w-full bg-emerald-500 text-white rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:text-gray-300"
                  >
                    Enviar
                  </button>

                  <button
                    className="px-2 py-2 w-full bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={handleJoinOut}
                  >
                    Sair
                  </button>
                </div>
              </form>
            )}
          </Formik>
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
}) => {
  return (
    <div className="flex items-center space-x-4 p-4">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          <p className="text-lg font-bold uppercase">{name.charAt(0)}</p>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <p className="text-lg text-white font-semibold">{name}</p>
          <p className="text-sm text-gray-500">{timestemp}</p>
        </div>
        <div className="text-gray-500 text-sm">{message}</div>
      </div>
    </div>
  );
};