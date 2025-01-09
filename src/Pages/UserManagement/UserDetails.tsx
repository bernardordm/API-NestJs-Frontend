import { useEffect, useState } from 'react';
import { fetchById, deleteUser } from '../../Utils/API';
import { useParams, useNavigate } from 'react-router-dom';
import EditUserModal from '../../components/NewUserModal/EditUserModal';

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
  const [user, setUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const userData = await fetchById(id);
          setUser(userData);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      if (id) {
        await deleteUser(id);
        navigate('/'); // Redireciona para a lista de usuários após a exclusão
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  const handleClickBack = () => {
    navigate('/');
  }

  return (
    <div>
      <ul className=" text-lg list-disc list-inside p-4 bg-gray-100 rounded-lg shadow-md w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
            const updatedUser = await fetchById(id!);
            setUser(updatedUser);
          }}
        />
      )}
    </div>
  );
}