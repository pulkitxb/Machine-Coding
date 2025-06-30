import { useState } from 'react';
import './App.css'
import data from "./data.json"
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";
import { FaFileCirclePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const FileComponent = function ({ files, addNewFile, deleteFile }) {
  const [showContent, setShowContext] = useState({});

  const clickHandler = (fileName) => {
    setShowContext(prevState => {
      if (prevState[fileName]) {
        const { [fileName]: removed, ...rest } = prevState;
        return rest;
      } else {
        return { ...prevState, [fileName]: true };
      }
    });
  }

  return (
    <div>
      {files.map(file => (
        <div className='file-wrapper' key={file.id}>
          {file.isFolder && (
            showContent[file.name]
              ? <RiArrowDropDownLine onClick={() => clickHandler(file.name)} className='fileName' />
              : <RiArrowDropRightLine onClick={() => clickHandler(file.name)} className='fileName' />
          )}
          <span className='fileName' onClick={() => clickHandler(file.name)}>
            {file.name}
          </span>
          {file.isFolder && <FaFileCirclePlus className='fileName' onClick={() => addNewFile(file.id)} />}
          <MdDelete className='fileName' onClick={() => deleteFile(file.id)} />
          {showContent[file.name] && file.isFolder && (
            <FileComponent files={file.children} addNewFile={addNewFile} deleteFile={deleteFile} />
          )}
        </div>
      ))}
    </div>
  )
}


function App() {
  const [fileData, setFileData] = useState(data);

  const addNewFile = (fileId) => {
    const fileName = prompt('Enter the filename');
    const updateTree = (list) => {
      return list.map(node => {
        if (node.id === fileId) {
          return {
            ...node,
            children: [...node.children, { id: Date.now().toString(), name: fileName, isFolder: true, children: [] }]
          }
        }
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children)
          }
        }
        return node;
      })
    }

    setFileData(prevTree => updateTree(prevTree));
  }

  const deleteFile = (fileId) => {
    const updateTree = (list) => {
      return list.filter(node => node.id !== fileId).map(node => {
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children)
          }
        }
        return node;
      })
    }
    setFileData(prevTree => updateTree(prevTree));
  }

  return (
    <div className='container'>
      <FileComponent files={fileData} addNewFile={addNewFile} deleteFile={deleteFile} />
    </div>
  )
}

export default App
