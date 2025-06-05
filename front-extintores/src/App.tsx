import { useEffect, useState } from "react";
import ExtintorCard from "./components/ExtintorCard";
import MultipleSelect from "./components/MultipleSelect";
import InputField from "./components/InputField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

const andarOptions = [
  { value: "1º Andar", label: "1º Andar" },
  { value: "2º Andar", label: "2º Andar" },
  { value: "3º Andar", label: "3º Andar" },
];

const corredorOptions = [
  { value: "Corredor A", label: "Corredor A" },
  { value: "Corredor B", label: "Corredor B" },
  { value: "Corredor C", label: "Corredor C" },
];

const tipoExtintorOptions = [
  { value: "CO2", label: "CO2" },
  { value: "Agua", label: "Água" },
  { value: "Quimico", label: "Pó Químico" },
]

// Tipo auxiliar para tipar os dados
interface Extintor {
  id: number;
  andar: string;
  localizacao: string;
  tipo: string;
  imagem: string;
}

export default function App() {
  const [andares, setAndares] = useState<string[]>([]);
  const [corredores, setCorredores] = useState<string[]>([]);
  const [tipoExtintores, setTipoExtintores] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [sucess, setSuccess] = useState(false);
  const {admin} = useAuth();

  const [extintores, setExtintores] = useState<Extintor[]>([]);

  let extintoresFiltrados = extintores.filter((extintor) => {
    const andarMatch =
      andares.length === 0 || andares.includes(extintor.andar);

    const corredorMatch =
      corredores.length === 0 || corredores.includes(extintor.localizacao);

    const tipoMatch =
      tipoExtintores.length === 0 || tipoExtintores.includes(extintor.tipo);

    return andarMatch && corredorMatch && tipoMatch;
  });

  const fetchExtintores = async () => {
    try {
      const res = await fetch("http://localhost/extintores/list.php", {
        credentials: "include",
      });
      const data = await res.json();
      setExtintores(data);
    } catch (err) {
      console.error("Erro ao buscar extintores:", err);
    }
  };
  useEffect(() => {
  fetchExtintores();
}, []);

  return (
    <div className="flex flex-col items-center justify-center bg-white p-20">
      <div className="flex flex-row justify-center space-x-4 w-full">
        <MultipleSelect value={andares} onChange={setAndares} options={andarOptions} label="Andares" placeholder="Selecione um ou mais andares" />
        <MultipleSelect value={corredores} onChange={setCorredores} options={corredorOptions} label="Corredores" placeholder="Selecione um ou mais corredores" />
        <MultipleSelect value={tipoExtintores} onChange={setTipoExtintores} options={tipoExtintorOptions} label="Tipos de Extintores" placeholder="Selecione um ou mais tipos" />
        { admin && <button className="bg-blue-500 text-white m-4 pl-4 pr-4 hover:bg-blue-600 duration-200 transition cursor-pointer" onClick={() => setShowForm(!showForm)}>
          <span className="text-white">+</span>
        </button> }
      </div>
      {admin && showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl relative w-full max-w-md">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 transition-all duration-200 hover:cursor-pointer"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4">Adicionar Extintor</h3>
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();

              const formElement = e.target as HTMLFormElement;
              const formData = new FormData(formElement);

              try {
                const response = await fetch('http://localhost/extintores/insert.php', {
                  method: 'POST',
                  credentials: 'include',
                  body: formData,
                });

                if (!response.ok) {
                  throw new Error('Erro ao enviar os dados para o servidor.');
                }

                setMessage('Extintor adicionado com sucesso!');
                setSuccess(true);
                await fetchExtintores();

              } catch (error) {
                setMessage(error as string);
                setSuccess(false);
              }
            }}>
              <div>
                <label htmlFor="andar" className="block text-sm font-medium text-gray-700">
                  Andar
                </label>
                <select
                  name="andar"
                  id="andarForm"
                  className="`w-full border cursor-pointer border-blue-300 min-w-full p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-400 transition-all duration-200 hover:border-blue-500 focus:border-blue-500"
                >
                  {andarOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="corredor" className="block text-sm font-medium text-gray-700">
                  Corredor
                </label>
                <select
                  name="localizacao"
                  id="corredorForm"
                  className="`w-full border cursor-pointer border-blue-300 p-2 min-w-full mt-1 focus:outline-none focus:ring focus:ring-blue-400 transition-all duration-200 hover:border-blue-500 focus:border-blue-500"
                >
                  {corredorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="tipoExtintor" className="block text-sm font-medium text-gray-700">
                  Tipo de Extintor
                </label>
                <select
                  name="tipo"
                  id="tipoForm"
                  className="`w-full border cursor-pointer border-blue-300 p-2 mt-1 min-w-full focus:outline-none focus:ring focus:ring-blue-400 transition-all duration-200 hover:border-blue-500 focus:border-blue-500"
                >
                  {tipoExtintorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <InputField
                label="Imagem"
                name="imagem"
                id="imagemUrl"
                type="file"
                accept="image/*"
                className="cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 transition duration-200 cursor-pointer"
                >
                  Adicionar Extintor
                </button>
                {message && <p className={sucess ? `text-green-500` : `text-red-500`}>{message}</p>}
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 overflow-hidden">
        {extintoresFiltrados.map((extintor) => (
          <ExtintorCard
            key={extintor.id}
            id={extintor.id}
            andar={extintor.andar}
            localizacao={extintor.localizacao}
            tipo={extintor.tipo}
            imagemUrl={`http://localhost/extintores/${extintor.imagem}`}
          />
        ))}
      </div>
    </div >
  );
}
