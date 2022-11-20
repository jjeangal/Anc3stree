import './App.css';
import Header from './components/Header';
import FamilyTree from './familytree';
import FamilyTreePage from './pages/FamilyTree';
import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import About from './pages/About';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/about" element={<About />}/>
          <Route path="/tree" element={<FamilyTreePage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
