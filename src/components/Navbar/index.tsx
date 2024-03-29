import React from 'react';
import './Navbar.scss';
import DarkModeToggle from '../DarkModeToggle';

const Navbar = () => {
  return (
    <nav>
      <ul className='navigations'>
        <li>
          <a href='/'>Home</a>
        </li>
      </ul>
      <DarkModeToggle />
    </nav>
  );
};

export default Navbar;
