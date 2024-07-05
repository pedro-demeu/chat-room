import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

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
  const handleBack = () => {
    navigate("/");
  };
  const handleCreate = () => {};
  return (
    <Formik
      initialValues={{
        idRoom: null,
        username: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 2000);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className="flex flex-col h-full justify-between">
          <div className="text-center py-8">
            <h4>Criando uma nova sala de bate-papo ...</h4>
          </div>
          <input
            type="text"
            placeholder="Qual o seu nome?"
            className="w-full px-4 py-2 my-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <button
            className="w-full px-4 mt-2 py-2 bg-emerald-500 text-white rounded-md shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-opacity-50"
            onClick={handleCreate}
            type="submit"
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
