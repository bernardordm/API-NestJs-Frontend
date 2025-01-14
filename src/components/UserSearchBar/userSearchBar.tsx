import { useEffect, useState } from "react";
import DataTable from '../DataTable'
import Modal from '../NewUserModal/Modal';
import EditUserModal from '../NewUserModal/EditUserModal';
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUsers, editUser as editUserAction, removeUser } from "../../store/usersSlice";
import { AppDispatch, RootState } from "../../store/store";
import UserDetailsSlide from "../UserDetails/UserDetailsSlide";
import { searchUsers } from "../../Utils/API";

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

  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<User[]>([]);
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
  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(fetchUsers(pageIndex)).unwrap();
      setUsers(response.data);
      setTotalPages(response.totalPages);
    };
    fetchData();
  }, [dispatch, pageIndex]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (isSearching) {
        const response = await searchUsers(searchTerm, pageIndex);
        setUsers(response.data);
        setTotalPages(response.totalPages);
        setIsSearching(false);
      } else {
        const response = await dispatch(fetchUsers(pageIndex)).unwrap();
        setUsers(response.data);
        setTotalPages(response.totalPages);
      }
    };
    fetchSearchResults();
  }, [isSearching, searchTerm, pageIndex, dispatch]);

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
      await dispatch(addUser(newUser)).unwrap();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  const handleEditButtonClick = (user: User) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(removeUser(id)).unwrap();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  const handleSearch = () => {
    setIsSearching(true);
  };

  const isSlideOpen = useSelector((state: RootState) => state.user.isSlideOpen);
  const selectedUser = useSelector((state: RootState) => state.user.selectedUser);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="flex items-center justify-center bg-cyan-700 text-white border-none p-2 rounded cursor-pointer"
          onClick={handleSearch}
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
          className="flex items-center justify-center bg-cyan-700 text-white border-none p-2 rounded cursor-pointer ml-2"
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
            <th className="py-2 px-4">Username</th>
            <th className="py-2 px-4">First Name</th>
            <th className="py-2 px-4">Last Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
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
      <div className="flex justify-between mt-4">
        <button
          className="bg-cyan-700 text-white py- px-4 rounded"
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
          disabled={pageIndex === 1}
        >
          Anterior
        </button>
        <span className="m-4 ">Página {pageIndex} de {totalPages}</span>
        <button
          className="bg-cyan-700 text-white py-1 px-4 rounded"
          onClick={() => setPageIndex((prev) => Math.min(prev + 1, totalPages))}
          disabled={pageIndex === totalPages}
        >
          Próxima
        </button>
      </div>
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
                className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
            await dispatch(fetchUsers(pageIndex)).unwrap();
          }}
        />
      )}
      {isSlideOpen && selectedUser && (
        <UserDetailsSlide
          username={selectedUser.username}
          lastName={selectedUser.lastName}
          firstName={selectedUser.firstName}
          email={selectedUser.email}
          active={selectedUser.active ? 'Active' : 'Inactive'}
          id={selectedUser.id}
        />
      )}
    </div>
  );
}