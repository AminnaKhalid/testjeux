import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div className="flex justify-center items-center bg-gray-300 space-x-8 text-xl font-medium p-4">
        <Link className='cursor-pointer' to="/manager">Simple Task Manager </Link>
        <Link className='cursor-pointer' to="/grade"> Grade Calculator Grade Calculator</Link>
        <Link className='cursor-pointer' to="/"> Cart System</Link>
      </div>
    </>
  );
}

export default Navbar