import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 h-[100vh] w-[100vw]">
      <div className="bg-white shadow-md rounded-lg flex flex-col md:flex-row items-center p-8 gap-10 w-full max-w-4xl">
        {/* Logo */}
        <img
          src="/logo-unesc.png"
          alt="Logo UNESC"
          className="w-40 h-40 object-contain"
        />

        {/* Formulário */}
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            CRIAR NOVA CONTA
          </h1>
          <p className="text-center text-sm text-gray-500 mt-1">
            JÁ REGISTRADO?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              LOGIN
            </Link>
          </p>

          <form className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                NOME
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-blue-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-400"
                placeholder="João Roberto"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-blue-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-400"
                placeholder="joaoroberto@unesc.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                SENHA
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-blue-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition-all"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
