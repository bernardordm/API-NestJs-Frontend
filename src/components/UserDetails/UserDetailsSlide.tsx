import React from 'react';
import { useDispatch } from 'react-redux';
import { closeSlide, removeUser } from '../../store/usersSlice';
import { motion, AnimatePresence } from 'framer-motion';
import EditUserModal from '../NewUserModal/EditUserModal';
import { useState } from 'react';
import { AppDispatch } from '../../store/store';

interface detailsProps {
  username: string;
  lastName: string;
  firstName: string;
  active: string;
  email: string;
  id: string;
}

const UserDetailsSlide = ({ username, lastName, firstName, email, active, id }: detailsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleClose = () => {
    dispatch(closeSlide());
  };

  const handleDelete = async () => {
    try {
      await dispatch(removeUser(id)).unwrap();
      handleClose();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-1/3 bg-gray-100 shadow-lg transform transition-transform duration-300 ease-in-out"
      >
        <div className="flex bg-gray-300 justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold">Detalhes do Usuário</h3>
          <button onClick={handleClose} className="text-gray-600">&times;</button>
        </div>
        <div className="p-4 flex flex-col gap-4 text-xl text-gray-800 bg-gray-100">
          <span className=''>Username: {username}</span>
          <span>First Name: {firstName}</span>
          <span className=''>Last Name: {lastName}</span>
          <span className=''>Email: {email}</span>
          <span className=''>Status: {active}</span>
          <span>ID: {id}</span>
          <div className='flex justify-center mt-4'>
            <button
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded mx-4'
              onClick={() => setIsEditModalOpen(true)}
            >
              Update
            </button>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mx-4' onClick={handleDelete}>Delete</button>
          </div>
        </div>
        {isEditModalOpen && (
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            user={{ username, lastName, firstName, email, active: active === 'Active', id }}
            onUpdate={() => setIsEditModalOpen(false)}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default UserDetailsSlide;