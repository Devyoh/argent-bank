import React, { useState } from "react";
import "./editableName.css"

/**
 * Component allowing the user to edit their full name.
 * Properties passed to the component.
 * Current full name of the user.
 * Function called when the user saves the changes made to their name.
 * Rendering the EditableName component.
 */

const EditableName = ({ fullName, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [inputFirstName, setInputFirstName] = useState(
    fullName ? fullName.split(" ")[0] : ""
  );
  const [inputLastName, setInputLastName] = useState(
    fullName ? fullName.split(" ")[1] : ""
  );

  const handleSave = () => {
    const newName = `${inputFirstName} ${inputLastName}`;
    onSave(newName);
    setEditing(false);
  };

  const handleCancel = () => {
    setInputFirstName(fullName ? fullName.split(" ")[0] : "");
    setInputLastName(fullName ? fullName.split(" ")[1] : "");
    // setEditing(false);
  };

  //Management of the display of the name by pressing "enter"
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  if (!editing) {
    return (
      <div className="header">
        <button className="edit-button" onClick={() => setEditing(true)}>Edit Name</button>
      </div>
    );
  }

  return (
    <div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Tony"
          value={inputFirstName}
          onChange={(e) => setInputFirstName(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <input
          type="text"
          placeholder="Jarvis"
          value={inputLastName}
          onChange={(e) => setInputLastName(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className="button-container">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditableName;
