import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import CreatePage from './Pages/CreatePage';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path = '/' element={<HomePage />} />
        <Route path = '/Create' element={<CreatePage />} />
      </Routes>
    </div>
  )
}

export default App
