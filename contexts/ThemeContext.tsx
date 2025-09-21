import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('cinematic-theme');
    return savedTheme ? JSON.parse(savedTheme) : { mode: 'dark' };
  });

  const toggleTheme = () => {
    const newTheme: Theme = { mode: theme.mode === 'light' ? 'dark' : 'light' };
    setTheme(newTheme);
    localStorage.setItem('cinematic-theme', JSON.stringify(newTheme));
    document.documentElement.classList.toggle('dark', newTheme.mode === 'dark');
  };

  // Apply theme on mount
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme.mode === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};