import React, { useState } from 'react'
import UserSearchBar from '../../components/UserSearchBar/userSearchBar'

export default function UserManagement() {
  const [search, setSearch] = useState(false);

  const handleSearchButton = () => {
    setSearch(!search)
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className='text-2xl font-bold mb-10'>
        Gerenciamento de Usuários
      </h1>
      <button
        className="bg-primary text-white py-2 px-4 rounded mb-4"
        onClick={handleSearchButton}
      >
        Visualizar Usuários
      </button>
      <div className="w-full">
        {search && <UserSearchBar />}
      </div>
    </div>
  )
}