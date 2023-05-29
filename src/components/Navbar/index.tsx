import React from 'react';
import './Navbar.scss';
import DarkModeToggle from '../DarkModeToggle';

export default function Navbar() {
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
}
