import React, { useState } from 'react';
import "./App.css"
import Child from './components/Child';

const initialTree = {
  name: 'root',
  children: [
    {
      name: 'child1',
      children: [
        { name: 'child1-child1', data: "c1-c1 Hello" },
        { name: 'child1-child2', data: "c1-c2 JS" }
      ]
    },
    { name: 'child2', data: "c2 World" }
  ]
};

const App = () => {
  const [root, setRoot] = useState(initialTree);
  const [exportedData, setExportedData] = useState('');

  const nameFun = (tagName, newName) => {
    const newRoot = newTag(root, tagName, newName);
    setRoot(newRoot);
  };

  const textFun = (tagName, newText) => {
    const newRoot = updateTagData(root, tagName, newText);
    setRoot(newRoot);
  };

  const addFun = (tagName) => {
    const newRoot = addChildToTag(root, tagName);
    setRoot(newRoot);
  };

  const toggleFun = (tagName) => {
    const newRoot = toggleColl(root, tagName);
    setRoot(newRoot);
  };

  const exportFun = () => {
    const exportedData = JSON.stringify(root, null, 2);
    console.log(exportedData);
    setExportedData(exportedData);
  };

  const newTag = (node, tagName, newName) => {
    if (node.name === tagName) {
      return { ...node, name: newName };
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map(child => newTag(child, tagName, newName))
      };
    }
    return node;
  };

  const updateTagData = (node, tagName, newData) => {
    if (node.name === tagName) {
      return { ...node, data: newData };
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map(child => updateTagData(child, tagName, newData))
      };
    }
    return node;
  };

  const addChildToTag = (node, parentTagName) => {
    if (node.name === parentTagName) {
      const newChild = { name: 'New Child', data: 'Data' };
      if (!node.children) {
        node.children = [];
      }
      node.children.push(newChild);
      return { ...node };
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map(child => addChildToTag(child, parentTagName))
      };
    }
    return node;
  };

  const toggleColl = (node, tagName) => {
    if (node.name === tagName) {
      return { ...node, collapsed: !node.collapsed };
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map(child => toggleColl(child, tagName))
      };
    }
    return node;
  };

  return (
    <div className="App">
    <Child
      tag={root}
      onNameChange={nameFun}
      onAddChild={addFun}
      onToggleCollapse={toggleFun}
      onTextChange={textFun}
    />
    <button className="export-button" onClick={exportFun}>
      Export
    </button>
    <pre className="exported-data">{exportedData}</pre>
  </div>
  
  );
};

export default App;
