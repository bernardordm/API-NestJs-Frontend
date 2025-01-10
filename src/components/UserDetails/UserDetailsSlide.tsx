import React from 'react';
import { useDispatch } from 'react-redux';
import { closeSlide } from '../../store/usersSlice';

interface detailsProps {
  username: string;
  lastName: string;
  firstName: string;
  active: string;
  email: string;
  id: string;
}

const UserDetailsSlide = ({ username, lastName, firstName, email, active, id }: detailsProps) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeSlide());
  };

  return (
    <div className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-bold">Detalhes do Usuário</h3>
        <button onClick={handleClose} className="text-gray-600">&times;</button>
      </div>
      <div className="p-4">
        <span>{username}</span>
        <span>{lastName}</span>
        <span>{firstName}</span>
        <span>{email}</span>
        <span>{active}</span>
        <span>{id}</span>
      </div>
    </div>
  );
};

export default UserDetailsSlide;