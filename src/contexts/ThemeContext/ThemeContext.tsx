import React, { ReactNode, useState } from 'react';

const ThemeContext = React.createContext({ theme: 'darkTheme', toggleTheme: () => {} });

interface Props {
  children: ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState('darkTheme');

  const toggleTheme = () => {
    setTheme(theme === 'darkTheme' ? 'lightTheme' : 'darkTheme');
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
