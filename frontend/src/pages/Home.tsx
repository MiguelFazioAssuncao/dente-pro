import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { logout, usuario } = useContext(AuthContext);
    const navigate = useNavigate();

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
