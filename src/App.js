import './App.css';
import Header from './components/Header';
import FamilyTree from './familytree';
import {useRef, useEffect} from 'react';





function App() {
  useEffect(() => {
      var family = new FamilyTree(document.getElementById("tree"), {
          mouseScrool: FamilyTree.action.none,
          nodeBinding: {
              field_0: "name"
          },
          nodes: [
              { id: 1, pids: [2], name: "Amber McKenzie", gender: "female" },
              { id: 2, pids: [1], name: "Ava Field", gender: "male" },
              { id: 3, mid: 1, fid: 2, pids: [4], name: "Peter Stevens", gender: "male" },
              { id: 4, pids: [3], name: "Gertrude Boijour", gender: "female" }
          ]
      });
    }, []);
  return (
    <div>
      <Header/>
      <div id="tree"/>
    </div>
  );
}

export default App;
