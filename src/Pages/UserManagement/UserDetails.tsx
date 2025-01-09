import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditUserModal from '../../components/NewUserModal/EditUserModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, removeUser, editUser as editUserAction } from '../../store/usersSlice';
import { AppDispatch, RootState } from '../../store/store';

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
}

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.user.users);
  const [user, setUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      const foundUser = users.find((user) => user.id === id);
      setUser(foundUser || null);
    }
  }, [id, users]);

  const handleDelete = async () => {
    try {
      if (id) {
        await dispatch(removeUser(id)).unwrap();
        navigate('/'); // Redireciona para a lista de usuários após a exclusão
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  const handleClickBack = () => {
    navigate('/usermanagement');
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <ul className="text-lg list-disc list-inside p-4 bg-gray-100 rounded-lg shadow-md w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <li className='py-3'>Username: {user.username}</li>
        <li className='py-3'>First Name: {user.firstName}</li>
        <li className='py-3'>Last Name: {user.lastName}</li>
        <li className='py-3'>Email: {user.email}</li>
        <li className='py-3'>Status: {user.active ? 'Active' : 'Inactive'}</li>
        <li className='py-3'>ID: {user.id}</li>

        <div className='flex justify-center mt-4'>
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded mx-4'
            onClick={() => setIsEditModalOpen(true)}
          >
            Update
          </button>
          <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mx-4' onClick={handleDelete}>Delete</button>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mx-4' onClick={handleClickBack}>Voltar</button>
        </div>
      </ul>
      {isEditModalOpen && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
          onUpdate={async () => {
            await dispatch(fetchUsers()).unwrap();
            const updatedUser = users.find((u) => u.id === user.id);
            if (updatedUser) {
              setUser(updatedUser);
            }
          }}
        />
      )}
    </div>
  );
}