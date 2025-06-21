import React from 'react';
import '../CSS/AuthForm.css';
import googleLogo from '../images/figma/google-logo.png';

const AuthForm: React.FC = () => {
    return (
        <div className="form-container">
            <div className="logo">
                <img src="/logo.svg" alt="DentePro Logo" />
            </div>

            <form className="auth-form">
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password"/>

                <div className="forgot-password">
                    <a href="#">Forgot password?</a>
                </div>

                <button type="submit" className="login-button">Login</button>
            </form>

            <div className="divider">
                <span>Have account? <a href="#">Sign in</a></span>
            </div>
            
            <button type="button" className="google-button">
                <img src={googleLogo} alt="Google Logo"/>
            </button>
        </div>
    );
};

export default AuthForm;