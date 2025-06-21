import "../CSS/AuthPage.css";
import AuthForm from "../components/AuthForm";
import fundo1 from "../assets/fundo1.png";

const AuthPage = () => {
  return (
    <>
      <div className="auth-container">
        <div
          className="left-side"
          style={{ backgroundImage: `url(${fundo1})` }}
        ></div>
        <div className="right-side">
          <AuthForm />
        </div>
      </div>
    </>
  );
};

export default AuthPage;
