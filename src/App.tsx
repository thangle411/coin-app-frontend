import React, { useContext } from 'react';
import './App.scss';
import { Navbar } from './components';
import { Home } from './pages';
import { ThemeContext } from './contexts/ThemeContext/ThemeContext';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme} d-flex-col`}>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
