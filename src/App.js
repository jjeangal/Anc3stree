import './App.css';
import Header from './components/Header';
import FamilyTree from './familytree';
import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import About from './pages/About';
import Tree from './components/Tree';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Tree/>
        <Routes>
          <Route path="/about" element={<About />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
