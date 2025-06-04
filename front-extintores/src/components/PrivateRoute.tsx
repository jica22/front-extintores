import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import type { JSX } from "react";

interface PrivateRouteProps {
    element: JSX.Element;
}

export default function PrivateRoute({ element }: PrivateRouteProps) {
    const { logado, loading } = useAuth();

    if (loading) {
        return <div className="text-center mt-10 text-gray-500">Verificando sessão...</div>;
    }

    return logado ? element : <Navigate to="/login" replace />;
}