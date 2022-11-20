import FamilyTree from '../familytree';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react'


export default function Tree() {
  const [tree, setTree] = useState();

  const onConfirm = () => {
    var seen = [];
    let jsonTree = JSON.stringify(ayo, function(key, val) {
       if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
        }
        return val;
    });
  }

  const createTree = () => {
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
    setTree(family);
  }

  useEffect(() => {
    createTree();
    console.log(tree);
    }, []);

  return (
    <div>
      <div id="tree"/>
      <Button onClick={onConfirm} borderWidth={3} h={'60px'} w={'170px'} variant={'outline'}>Confirm</Button>
    </div>
  );
}
