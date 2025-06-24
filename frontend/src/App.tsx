import AuthPage from './pages/AuthPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import { AuthProvider } from './AuthContext';
import AuthCallback from './pages/AuthCallback';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/auth/callback" element={<AuthCallback/>} 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
