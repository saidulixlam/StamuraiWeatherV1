import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Menubar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center bg-gray-300 bg-opacity-75 backdrop-blur-lg py-4 px-6 w-full">
      <div>
        <div>
          <Link to="/company" className="text-black mx-1">Company Info</Link>
        </div>
      </div>
      <div>
        <button onClick={handleLogout} className="text-black">Logout</button>
      </div>
    </nav>
  );
};

export default Menubar;
