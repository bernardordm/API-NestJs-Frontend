import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openSlide } from '../../store/usersSlice';

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
  const dispatch = useDispatch();

  const handleClickDetails = () => {
    dispatch(openSlide({ username, lastName, firstName, email, active, id }));
  };

  return (
    <tr className='border-b border-gray-200 hover:bg-gray-100 m-2'>
      <td className="py-2 px-4">{username}</td>
      <td className="py-2 px-4">{firstName}</td>
      <td className="py-2 px-4">{lastName}</td>
      <td className="py-2 px-4">{email}</td>
      <td className="py-2 px-4">{active}</td>
      <td className="py-2 px-4">
        <button className='bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-1 px-4 rounded mr-2' onClick={onUpdate}>Update</button>
        <button className='bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-4 rounded mr-2' onClick={handleClickDetails}>Details</button>
        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded' onClick={onDelete}>Delete</button>
      </td>
    </tr>
  )
}