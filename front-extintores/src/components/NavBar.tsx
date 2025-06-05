import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../context/AuthProvider";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const { atualizarSessao } = useAuth();
    const navigate = useNavigate();

    // Controla exibição após animação
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        } else {
            // espera a animação de 300ms antes de esconder
            const timeout = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);
    return (
        <nav className="bg-white border-b-2 border-blue-300 shadow-md fixed w-full z-10">
            <div className="mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-800 hover:text-blue-600 focus:outline-none cursor-pointer transition-all duration-200"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                    <img
                        src="/logo-unesc.png"
                        alt="Logo UNESC"
                        className="w-20 h-20 object-contain p-4"
                    />
                    <button className="text-gray-800 hover:text-blue-600 focus:outline-none transition-all duration-200 cursor-pointer" onClick={async () => {
                        try {
                            const response = await fetch("http://localhost/extintores/logout.php", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                credentials: "include",
                            });

                            const data = await response.json();

                            if (!data.error) {
                                await atualizarSessao();
                                navigate("/", { replace: true });
                            }
                        } catch (error) {
                            console.error("Erro ao fazer logout:", error);
                        }
                    }}>
                        <MdLogout className=" text-2xl" />
                    </button>

                </div>
            </div>

            {shouldRender && (
                <div
                    className={`
                 fixed border-r-2 border-t-2 border-blue-300 h-full w-64 bg-white shadow-lg z-50
                  transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
                  transition-transform duration-300 ease-in-out animate-fade-in
                  flex flex-col justify-between
                `}
                
                >
                    <nav className="flex flex-col p-4 space-y-2">
                        <Link to="/" className="text-gray-800 hover:text-blue-600 transition-all duration-200">Extintores</Link>
                        <Link to="/grupo" className="text-gray-800 hover:text-blue-600 transition-all duration-200">Grupo</Link>
                    </nav>
                    <div className="border-t-2 border-blue-300 p-4">
                        <Link to="/intimos-do-allan" className="absolute bottom-20 text-white hover:text-blue-600 transition-all duration-200">Íntimos do Allan</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}