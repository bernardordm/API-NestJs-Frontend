import { useEffect, useState } from "react";
import DataTable from '../DataTable'
import Modal from '../NewUserModal/Modal';
import EditUserModal from '../NewUserModal/EditUserModal';
import { getAll, createUser, updateUser, deleteUser } from '../../Utils/API'
import { useNavigate } from "react-router-dom";

export default function UserSearchbar() {
    interface User {
      id: string;
      username: string;
      firstName: string;
      password?: string;
      lastName: string;
      email: string;
      active: boolean;
    }

    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [newUser, setNewUser] = useState<User>({
      id: '',
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      active: true
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const allUsers = await getAll();
          setUsers(allUsers);
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
        }
      };
  
      fetchData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (editUser) {
        setEditUser({ ...editUser, [name]: value });
      } else {
        setNewUser({ ...newUser, [name]: value });
      }
    };

    const handleCreateSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await createUser(newUser);
        setIsCreateModalOpen(false);
        const allUsers = await getAll();
        setUsers(allUsers);
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
      }
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (editUser) {
          await updateUser(editUser);
          setIsEditModalOpen(false);
          const allUsers = await getAll();
          setUsers(allUsers);
        }
      } catch (error) {
        console.error("Erro ao editar usuário:", error);
      }
    };

    const handleEditButtonClick = (user: User) => {
      setEditUser(user);
      setIsEditModalOpen(true);
    };

    const handleDelete = async (id: string) => {
      try {
        await deleteUser(id);
        const allUsers = await getAll();
        setUsers(allUsers);
        navigate('/');
      } catch (error) {
        console.error("Erro ao deletar usuário:", error);
      }

    };

    return (
        <div className="flex flex-col items-center p-4">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Buscar"
              className="h-10 bg-white w-72 text-black mr-2 p-2 border border-gray-300 rounded"
            />
            <button
              className="flex items-center justify-center bg-primary text-white border-none p-2 rounded cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
            <button
              className="flex items-center justify-center bg-primary text-white border-none p-2 rounded cursor-pointer ml-2"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Username</th>
                <th className="py-2">First Name</th>
                <th className="py-2">Last Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => 
                <DataTable
                  key={ user.id }
                  id={ user.id }
                  username={ user.username }
                  firstName={ user.firstName }
                  lastName={user.lastName}
                  email={user.email}
                  active={user.active ? "Active" : "Inactive"}
                  onUpdate={() => handleEditButtonClick(user)}
                  onDetails={() => console.log(`Details ${user.id}`)}
                  onDelete={() => handleDelete(user.id)}
                />
              )}
            </tbody>
          </table>
          {isCreateModalOpen && (
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
              <h2 className="text-xl font-bold mb-4">Cadastrar Novo Usuário</h2>
              <form onSubmit={handleCreateSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={newUser.username}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={newUser.firstName}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cadastrar
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setIsCreateModalOpen(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </Modal>
          )}
          {isEditModalOpen && editUser && (
            <EditUserModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              user={editUser}
              onUpdate={async () => {
                const allUsers = await getAll();
                setUsers(allUsers);
              }}
            />
          )}
        </div>
    );
}