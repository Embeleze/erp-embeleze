import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Limpa o erro quando o usuário começa a digitar
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Tentando login com:', formData);
      const res = await axios.post('https://erp-embeleze-app.onrender.com/api/auth/login', formData);
      console.log('Resposta do servidor:', res.data);
      localStorage.setItem('token', res.data.token);
      setAuth(true);
    } catch (err) {
      console.error('Erro completo:', err);
      if (err.response) {
        console.log('Resposta de erro:', err.response.data);
        setError(err.response.data.msg || 'Credenciais inválidas. Verifique seu email e senha.');
      } else if (err.request) {
        setError('Erro de conexão com o servidor. Tente novamente.');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>ERP Embeleze</h1>
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className={error ? 'error' : ''}
            />
          </div>
          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              name="password"
              value={password}
              onChange={onChange}
              required
              className={error ? 'error' : ''}
            />
            <button 
              type="button" 
              className="toggle-password"
              onClick={toggleShowPassword}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p>
          Não tem uma conta? <Link to="/register">Registre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 