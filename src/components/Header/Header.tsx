import React from "react";
import logo from '../../assets/logo-2.png';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../store/usersSlice";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.user.token);

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="flex flex-row items-center bg-sky-800 text-white">
      <ul className="flex flex-row items-center justify-between w-full">
        <li className="flex items-center justify-center p-4">
          <img src={logo} alt="logo" className="w-auto h-12" />
        </li>
        {token && (
          <li className="p-4">
            <button onClick={handleLogoutClick} className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
              </svg>
              Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;