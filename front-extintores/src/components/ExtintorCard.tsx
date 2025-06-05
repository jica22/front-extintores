import { useState } from "react";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface ExtintorProps {
    id: number;
    andar: string;
    localizacao: string;
    tipo: string;
    imagemUrl?: string;
}

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

export default function ExtintorCard({ id, andar, localizacao, tipo, imagemUrl }: ExtintorProps) {
    const [showOptions, setShowOptions] = useState(false);
    const [andarAtual, setAndarAtual] = useState(andar);
    const [localizacaoAtual, setLocalizacaoAtual] = useState(localizacao);
    const [tipoAtual, setTipoAtual] = useState(tipo);
    const [message, setMessage] = useState("");
    const [sucess, setSuccess] = useState(false);
    const { admin } = useAuth();

    const navigate = useNavigate();
    return (
        <div className="relative bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full">
            {admin && <button
                onClick={() => setShowOptions(true)}
                className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 p-1 rounded transition duration-200 focus:outline-none hover:cursor-pointer"
                title="Editar"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                </svg>
            </button>}

            <div className="h-40 bg-gray-100 flex items-center justify-center">
                {imagemUrl ? (
                    <img
                        src={imagemUrl}
                        alt={`Extintor ${id}`}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <span className="text-gray-400 text-sm">Imagem não disponível</span>
                )}
            </div>

            <div className="p-4 space-y-1">
                <h2 className="text-lg font-semibold text-blue-600">Extintor #{id}</h2>
                <p>
                    <span className="font-medium">Andar:</span> {andar}
                </p>
                <p>
                    <span className="font-medium">Localização:</span> {localizacao}
                </p>
                <p>
                    <span className="font-medium">Tipo:</span> {tipo}
                </p>
            </div>

            {showOptions && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 transition-all duration-200  hover:cursor-pointer"
                            onClick={() => setShowOptions(false)}
                        >
                            ✕
                        </button>
                        <h3 className="text-lg font-semibold mb-4">Editar</h3>
                        <form className="space-y-4" onSubmit={async (e) => {
                            e.preventDefault();

                            const form = e.target as HTMLFormElement;
                            const formData = new FormData(form);
                            formData.append("id", id.toString());

                            const imageInput = document.getElementById('imagemUrl') as HTMLInputElement;
                            if (imageInput.files?.[0]) {
                                formData.append("imagem", imageInput.files[0]);
                            }

                            try {
                                const response = await fetch("http://localhost/extintores/update.php", {
                                    method: "POST",
                                    body: formData,
                                    credentials: "include",
                                });

                                const result = await response.json();
                                console.log(result);
                                alert(result.message);
                                setShowOptions(false);
                                navigate(0);
                            } catch (err) {
                                console.error("Erro ao atualizar:", err);
                                alert("Erro ao atualizar o extintor.");
                            }
                        }}>
                            <div>
                                <label htmlFor="andar" className="block text-sm font-medium text-gray-700">
                                    Andar
                                </label>
                                <select
                                    name="andar"
                                    id="andarForm2"
                                    value={andarAtual}
                                    onChange={(e) => setAndarAtual(e.target.value)}
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
                                    value={localizacaoAtual}
                                    onChange={(e) => setLocalizacaoAtual(e.target.value)}
                                    name="localizacao"
                                    id="corredorForm2"
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
                                    value={tipoAtual}
                                    onChange={(e) => setTipoAtual(e.target.value)}
                                    name="tipo"
                                    id="tipoForm2"
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
                                id="imagemUrl"
                                name="imagem"
                                type="file"
                                accept="image/*"
                                className="cursor-pointer"
                            />
                            <div className="flex flex-row justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 duration-200 transition cursor-pointer"
                                >
                                    Salvar
                                </button>
                                <button className="bg-red-500 text-white px-4 py-2 hover:bg-red-600 duration-200 transition cursor-pointer"
                                    onClick={async () => {
                                        const confirm = window.confirm("Deseja realmente excluir este extintor?");
                                        if (!confirm) return;

                                        try {
                                            const res = await fetch(`http://localhost/extintores/delete.php?id=${id}`, {
                                                method: "GET",
                                                credentials: "include",
                                            });
                                            const data = await res.json();
                                            setShowOptions(false);
                                            navigate(0);
                                        } catch (error) {
                                            console.error("Erro ao excluir:", error);
                                            alert("Erro ao excluir o extintor.");
                                        }
                                    }}>
                                    Excluir
                                </button>
                                {message && <p className={sucess ? `text-green-500` : `text-red-500`}>{message}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}