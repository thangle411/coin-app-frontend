import React, { useContext } from 'react';
import './App.scss';
import { Navbar } from './components';
import { Home } from './pages';
import { ThemeContext } from './contexts/ThemeContext/ThemeContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme} d-flex-col`}>
      <Toaster />
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
