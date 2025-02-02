import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addUser } from '../../store/usersSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';

const SignupForm = () => {
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  });
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(addUser({ ...newUser, id: Date.now().toString(), active: true })).unwrap();
      navigate('/'); // Redireciona para a tela de login após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-grey-200">
      <div className="bg-white shadow-md rounded-lg p-8 border border-gray-200 w-full">
        <h2 className="text-2xl text-cyan-700 font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleCreateSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-cyan-500 focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:ring-cyan-500 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold focus:ring-cyan-500 mb-2" htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:ring-cyan-500 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:ring-cyan-500 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 focus:ring-cyan-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-sky-900 hover:bg-sky-950 text-white font-bold py-2 w-60 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Sign Up'}
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 w-60 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate('/')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;