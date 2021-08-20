import React from 'react'

const PersonForm = ({onSubmit, newName, onChangeName, newNumber, onChangeNumber}) => {
    return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input value={newName} onChange={onChangeName}/>
      </div>
      <div>
        Number: <input value={newNumber} onChange={onChangeNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }

export default PersonForm