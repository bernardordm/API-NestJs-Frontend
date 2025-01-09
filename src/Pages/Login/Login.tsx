import React from 'react'
import logo from '../../assets/logo-1.png'

function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="flex items-center">
        <img
          src={logo}
          alt="M2C Digital Logo"
          style={{ width: '300px'}}
        />
      </div>
      <h2 
          className='text-xl font-semibold text-gray-700'
        >
          Acesse sua Conta
        </h2>
      <form
        action=""
        className="flex p-3 flex-col bg-white shadow-lg rounded-lg">

        <label
          htmlFor="email"
          className='text-sm font-medium text-gray-600'
        >
          E-Mail
        </label>
        <input
          className='mt-1 mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          placeholder="Digite o seu email"
          id='email'
          type="text" />
        <label
          htmlFor="password"
          className='text-sm font-medium text-gray-600'
        >
          Senha
        </label>
        <input
          className='mt-1 mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          placeholder="Senha"
          id='password'
          type="password" />
        <button
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
          onClick={(e) => {}}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login