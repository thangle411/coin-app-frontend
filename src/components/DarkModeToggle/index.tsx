import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext/ThemeContext';

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  //update to uae some real toggle
  return <div onClick={toggleTheme}>{theme === 'darkTheme' ? 'light mode' : 'dark mode'}</div>;
}
