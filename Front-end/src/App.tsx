// src/App.tsx
import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Home from './Pages/Home'
import Form from './Pages/ShowForms/ShowForms'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app " >
        <Home />
        <Form/>
      </div>
    </ThemeProvider>
  )
}

export default App
