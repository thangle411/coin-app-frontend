import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext/ThemeContext';
import './DarkModeToggle.scss';

export default function DarkModeToggle() {
  const { toggleTheme } = useContext(ThemeContext);

  return <input className='toggle' type='checkbox' onClick={toggleTheme} />;
}
