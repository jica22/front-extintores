import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function Register() {
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();
  const { atualizarSessao } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 h-[100vh] w-[100vw]">
      <div className="bg-white w-full h-full flex flex-row">

        {/* Formulário */}
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center mb-4 p-16 rounded-md shadow-blue-200 shadow-2xl">

            <h1 className="text-4xl font-bold text-center text-gray-900">
              CRIAR NOVA CONTA
            </h1>
            <p className="text-center text-sm text-gray-500 mt-1">
              JÁ REGISTRADO?{" "}
              <Link to="/login" className="text-blue-600 font-medium hover:underline hover:text-blue-700 duration-300 transition-all">
                LOGIN
              </Link>
            </p>

            <form className="mt-6 flex flex-col gap-4 w-80" onSubmit={async (e) => {
              e.preventDefault();
              // Handle form submission logic here
              const formData = {
                nome: (document.getElementById('name') as HTMLInputElement).value,
                email: (document.getElementById('email') as HTMLInputElement).value,
                senha: (document.getElementById('password') as HTMLInputElement).value,
              };

              try {
                const response = await fetch("http://localhost/extintores/register.php", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                  body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (data.error) {
                  setMensagem(data.error);
                } else {
                  setMensagem(`Bem-vindo, ${data.usuario}`);
                  await atualizarSessao();
                  navigate("/", { replace: true });
                }
              } catch (error) {
                setMensagem("Erro ao conectar ao servidor");
              }

            }
            }>
              <div>
                <InputField
                  label="NOME"
                  id="name"
                  placeholder="Nome"
                  type="text" />
              </div>

              <div>
                <InputField
                  type="email"
                  id="email"
                  label="EMAIL"
                  placeholder="exemplo@unesc.com"
                />
              </div>

              <div>
                <InputField
                  type="password"
                  id="password"
                  label="SENHA"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className="bg-blue-400 py-2 p-4 m-4 hover:bg-blue-500 hover:cursor-pointer transition-all duration-200 w-50 text-center"
                >
                  Registrar
                </button>
                {mensagem && <p className="text-red-500">{mensagem}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
