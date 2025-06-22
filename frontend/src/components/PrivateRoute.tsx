import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { usuario, loading } = useContext(AuthContext);

  if (loading) return <div>Carregando autenticação...</div>;

  return usuario ? children : <Navigate to="/" />;
};

export default PrivateRoute;
