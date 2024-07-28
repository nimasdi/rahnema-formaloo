// src/components/Home.tsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`home ${theme} flex items-center justify-center border-2 border-sky-500`}>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Hello, React with TypeScript!</h1>
        <button onClick={toggleTheme} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default Home;
