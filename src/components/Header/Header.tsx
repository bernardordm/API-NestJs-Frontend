import React from "react";
import logo from '../../assets/logo-2.png';

const Header: React.FC = () => {
  return (
    <header className="flex flex-row items-center bg-sky-800 text-white">
      <ul>
        <li className="flex items-center justify-center p-4">
          <img src={logo} alt="logo" className="w-auto h-12" />
        </li>
      </ul>
    </header>
  );
};

export default Header;