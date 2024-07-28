// src/App.tsx
import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Home from './components/Home'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app " >
        <Home />
      </div>
    </ThemeProvider>
  )
}

export default App
