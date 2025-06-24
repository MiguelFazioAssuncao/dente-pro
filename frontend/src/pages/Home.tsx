import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { logout, usuario, login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      login(token);
      params.delete("token");
      const newUrl = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
      window.history.replaceState({}, "", newUrl);
    }
  }, [login]);


    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div>
            <h1>🏠 Página Home (Privada)</h1>
            <p>Bem-vindo, {usuario?.email}!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;
