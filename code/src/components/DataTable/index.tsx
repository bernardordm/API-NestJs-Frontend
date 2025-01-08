import { useNavigate } from 'react-router-dom';

interface DataTableProps {
  username: string;
  lastName: string;
  firstName: string;
  active: string;
  email: string;
  id: string;
  onUpdate: () => void;
  onDetails: (id: string) => void;
  onDelete: () => void;
}

export default function DataTable({ username, lastName, firstName, email, active, id, onUpdate, onDelete }: DataTableProps) {
  const navigate = useNavigate();

  const handleClickDetails = () => {
    navigate(`/details/${id}`);
  }

  return (
    <tr className='border-b border-gray-200 hover:bg-gray-100 m-2'>
      <td>{username}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{active}</td>
      <td>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2' onClick={onUpdate}>Update</button>
        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded mr-2' onClick={handleClickDetails}>Details</button>
        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded' onClick={onDelete}>Delete</button>
      </td>
    </tr>
  )
}