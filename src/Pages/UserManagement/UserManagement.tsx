import React, { useEffect, useState } from 'react';
import UserSearchBar from '../../components/UserSearchBar/userSearchBar';
import Aside from '../../components/Aside/Aside';
import Header from '../../components/Header/Header';

export default function UserManagement() {
  const [search, setSearch] = useState(() => {
    const savedSearch = localStorage.getItem('search');
    return savedSearch ? JSON.parse(savedSearch) : false;
  });

  const handleSearchButton = () => {
    const newSearchState = !search;
    setSearch(newSearchState);
    localStorage.setItem('search', JSON.stringify(newSearchState));
  };

  useEffect(() => {
    localStorage.setItem('search', JSON.stringify(search));
  }, [search]);

  return (
    <div className="bg-gray-200">
      <Header />
      <div className="flex w-full h-screen">
        <Aside />
        <div className="flex-grow flex flex-col items-center p-4">
          <h1 className='text-2xl font-bold mb-10'>
            Gerenciamento de Usuários
          </h1>
          <button
            className="bg-cyan-700 text-white py-2 px-4 rounded mb-4"
            onClick={handleSearchButton}
          >
            Visualizar Usuários
          </button>
          <div className="w-full">
            {search && <UserSearchBar />}
          </div>
        </div>
      </div>
    </div>
  );
}