import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { loggedUserAtom } from "../../atoms/rooms";

const schema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Nome deve ter no mínimo 4 caracteres")
    .max(25, "Nome deve ter no máximo 25 caracteres")
    .required("Campo obrigatório"),
});

export default function CreateRoomPage() {
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

  // useEffect(() => {
  //   const ws = io("ws://localhost:8081");

  //   console.log(ws);
  // }, []);

  return (
    <Formik
      initialValues={{
        username: "",
      }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await fetch("http://localhost:8000/v1/room", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const { roomId } = await response.json();

          toast.success("Uma sala foi criada para você")

          setLoggedUser(values.username);

          navigate(`/room/${roomId}`)
        } catch (err) {
          toast.error("Falha no servidor, tente mais tarde.");
          console.error(err);
        }
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
            <p>Vamos criar uma nova sala de bate-papo</p>
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
            <p className="px-4 text-red-600 text-sm">{errors.username}</p>
          )}

          <button
            className="w-full px-4 mt-2 py-2 bg-emerald-500 text-white rounded-md shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-opacity-50 disabled:bg-gray-400 disabled:text-gray-300"
            type="submit"
            disabled={isSubmitting || Boolean(errors.username)}
          >
            Criar
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
