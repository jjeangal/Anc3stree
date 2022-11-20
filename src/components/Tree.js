import FamilyTree from '../familytree';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react'
import { Buffer } from 'buffer';



import { Web3Storage } from 'web3.storage'

function getAccessToken () {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJhZERjQWMwOEYwMzM4MWRkM2M3MGJjMENkMWI3N0RmYUI4MDBDRkIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njg5NTgxODQxNTMsIm5hbWUiOiJ0ZXN0VG9rZW4ifQ.zAST9Br9coLcEODeM0AM4pFh6IZqZF704_xe882Ccco'
}

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}

function makeFileObjects (jsonTree) {
  const buffer = Buffer.from(jsonTree)

  const files = [
    new File(['contents-of-file-1'], 'plain-utf8.txt'),
    new File([buffer], 'jsonTree.json')
  ]
  return files
}

async function storeFiles (jsonTree) {
  const client = makeStorageClient()
  const files = makeFileObjects(jsonTree)
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}



export default function Tree() {
  const [tree, setTree] = useState();

  const onConfirm = async () => {
    var seen = [];
    let jsonTree = JSON.stringify(tree, function(key, val) {
       if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
        }
        return val;
    });
    let cid = await storeFiles(jsonTree)
    console.log(cid)
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
