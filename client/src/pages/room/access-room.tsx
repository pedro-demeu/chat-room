import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { useSetRecoilState } from "recoil";
import { loggedUserAtom } from "../../atoms/rooms";

const schema = Yup.object().shape({
  idRoom: Yup.string()
    .required("Campo obrigatório"),
  username: Yup.string()
    .min(4, "Nome deve ter no mínimo 4 caracteres")
    .max(25, "Nome deve ter no máximo 25 caracteres")
    .required("Campo obrigatório"),
});
export default function AccessRoomPage() {
  return (
    <div className="bg-gray-950 h-screen w-screen">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="bg-gray-200 rounded-lg p-8">
          <HomeForm />
        </div>
      </div>
    </div>
  );
}

const HomeForm = () => {
  const navigate = useNavigate();
  const setLoggedUser = useSetRecoilState(loggedUserAtom);
  const handleBack = () => {
    navigate("/");
  };
  const handleJoinRoom = async (values: {
    idRoom: number | null;
    username: string;
  }) => {
    setLoggedUser(values.username)
    navigate(`/room/${values.idRoom}`)
  };

  return (
    <Formik
      initialValues={{
        idRoom: null,
        username: "",
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        handleJoinRoom(values);
        setSubmitting(false);
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
            <h4>
              Para acessar, você precisa informar o ID da sala e o seu nome:
            </h4>
          </div>
          <input
            id="idRoom"
            name="idRoom"
            value={values.idRoom || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="ID da sala"
            autoComplete="off"
            className={`
              ${
                errors.idRoom
                  ? "border-red-600 text-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 "
              }
              w-full px-4 py-2 my-2 border rounded-md shadow-sm focus:outline-none 
              focus:ring-2 
              focus:border-transparent`}
          />
          {errors.idRoom && (
            <p className="px-4 text-red-600 text-sm">{errors.idRoom}</p>
          )}

          <input
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
            type="text"
            placeholder="Qual o seu nome?"
            className={`
                ${
                  errors.username
                    ? "border-red-600 text-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500 "
                }
              w-full px-4 py-2 my-2 border rounded-md shadow-sm focus:outline-none 
              focus:ring-2 focus:border-transparent
              `}
          />
          {errors.username && (
            <p className="px-4 text-red-600 text-sm">{errors.username}</p>
          )}

          <button
            className="w-full px-4 mt-2 py-2 bg-emerald-500 text-white rounded-md shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-opacity-50 disabled:bg-gray-400 disabled:text-gray-300"
            type="submit"
            disabled={isSubmitting || !!errors.idRoom || !!errors.username}
          >
            Acessar
          </button>

          <button
            className="w-full mt-2 py-2 px-4 bg-cyan-600 text-white rounded-md "
            onClick={handleBack}
          >
            Voltar
          </button>
        </form>
      )}
    </Formik>
  );
};
