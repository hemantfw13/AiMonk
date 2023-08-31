import React, { useState } from 'react';
import "../App.css"


const Child = ({ tag, onNameChange, onAddChild, onToggleCollapse, onTextChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [editable, setEditable] = useState(false);
  const [newName, setNewName] = useState(tag.name);

  const handleNameChange = (newName) => {
    onNameChange(tag.name, newName);
  };

  const handleTextChange = (event) => {
    onTextChange(tag.name, event.target.value);
  };

  const handleAddChild = () => {
    onAddChild(tag.name);
  };

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    onToggleCollapse(tag.name);
  };

  const handleNameClick = () => {
    setEditable(true);
  };

  const handleNameEdit = (event) => {
    if (event.key === 'Enter') {
      setEditable(false);
      handleNameChange(newName);
    }
  };

  return (
    <div className="tag">
    <div className="tag-header">
      <button
        className={`collapse-button ${collapsed ? 'collapsed' : ''}`}
        onClick={handleToggleCollapse}
      >
        {collapsed ? '>' : 'v'}
      </button>
      
      {editable ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyPress={handleNameEdit}
          onBlur={() => setEditable(false)}
          autoFocus
          className="tag-name editable"
        />
      ) : (
        <span className="tag-name" onClick={handleNameClick}>
          {tag.name}
        </span>
      )}
      <button style={{marginLeft:"60%"}} className="add-child-button" onClick={handleAddChild}>
          Add Child
        </button>
    </div>
    {!collapsed && (
      <div className="tag-content">
        {tag.data !== undefined && (
          <input
            type="text"
            value={tag.data}
            onChange={handleTextChange}
            className="tag-input"
          />
        )}
        {tag.children &&
          tag.children.map((child) => (
            <Child
              key={child.name}
              tag={child}
              onNameChange={onNameChange}
              onAddChild={onAddChild}
              onToggleCollapse={onToggleCollapse}
              onTextChange={onTextChange}
            />
          ))}
        
      </div>
    )}
  </div>
  );
};

export default Child;
