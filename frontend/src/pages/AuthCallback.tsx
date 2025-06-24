import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      login(token).then(() => {
        navigate('/home');
      });
    } else {
      navigate('/');
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
