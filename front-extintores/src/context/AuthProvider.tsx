import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextProps {
    logado: boolean;
    usuario: string | null;
    admin: boolean
    atualizarSessao: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
    logado: false,
    usuario: null,
    admin: false,
    atualizarSessao: async () => { },
    loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [logado, setLogado] = useState(false);
    const [usuario, setUsuario] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);

    const atualizarSessao = async () => {
        try {
            const res = await fetch("http://localhost/extintores/checkSession.php", {
                credentials: "include",
            });
            const data = await res.json();
            if (data.logado) {
                setLogado(true);
                setUsuario(data.usuario ?? null);
                setAdmin(data.admin ?? false);
            } else {
                setLogado(false);
                setUsuario(null);
            }
        } catch (error) {
            setLogado(false);
            setUsuario(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        atualizarSessao();
    }, []);

    return (
        <AuthContext.Provider value={{ logado, usuario, atualizarSessao, loading, admin }}>
            {children}
        </AuthContext.Provider>
    );
}