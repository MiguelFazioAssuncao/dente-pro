import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      login(token).then(() => {
        navigate("/home");
      });
    } else {
      navigate("/");
    }
  }, [login, navigate]);

  return (
    <div>
      <h1>Autenticando...</h1>
      <p>Por favor, aguarde...</p>
    </div>
  );
};

export default AuthCallback;