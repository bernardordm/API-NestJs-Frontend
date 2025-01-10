import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo-1.png';
import { login } from '../../store/usersSlice';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { success, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (success) {
      navigate('/home');
    }
  }, [success, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        'A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas e minúsculas, um caractere especial e um número.'
      );
      return;
    }

    setError('');
    dispatch(login({ email, password }));
  };

  const handleCloseError = () => {
    setError('');
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-200">
      {error && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
          <span className="text-sm">{error}</span>
          <button
            onClick={handleCloseError}
            className="ml-4 text-white hover:text-gray-200 focus:outline-none"
          >
            &times;
          </button>
        </div>
      )}
      <div className="flex items-center">
        <img src={logo} alt="M2C Digital Logo" style={{ width: '300px' }} />
      </div>
      <h2 className="text-xl font-semibold text-gray-700 pt-5 pb-3">Acesse sua Conta</h2>
      <form
        className="flex p-10 flex-col bg-white shadow-lg rounded-lg"
        onSubmit={handleLogin}
      >
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-600"
        >
          E-Mail
        </label>
        <input
          className="mt-1 mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Digite o seu email"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-600"
        >
          Senha
        </label>
        <input
          className="mt-1 mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Senha"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default Login;