import React from 'react';
import AuthForm from '../components/AuthForm';
import backgroundImage from '../images/figma/background-image.png';
import '../CSS/AuthPage.css';

const AuthPage: React.FC = () => {
  return (
    <div className="auth-container">
      <div
        className="auth-left"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="auth-right">
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;