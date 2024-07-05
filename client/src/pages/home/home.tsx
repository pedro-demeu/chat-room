import { Formik } from "formik";

function Home() {
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

          <div className="flex flex-col items-center gap-4">
            <h2 className="text-1xl text-gray-800 py-8 text-left w-full">
              O que você quer fazer hoje?
            </h2>

            <button className="w-full px-4 py-2 bg-sky-600 text-white rounded-md shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">CRIAR UMA SALA PARA MIM</button>

            <button className="w-full px-4 py-2 bg-cyan-600 text-white rounded-md shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">ENTRAR EM UMA SALA EXISTENTE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

const HomeForm = () => {
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
        <form className="flex flex-col justify-center items-center space-y-4 min-h-screen">
          <div className="flex justify-center items-center py-8">
            <h4>Para entrar em alguma sala, digite o ID dela ou</h4>
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
      )}
    </Formik>
  );
};
