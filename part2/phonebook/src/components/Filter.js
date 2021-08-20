import React from 'react'

const Filter = ({showName, handleShowChange}) => {
    return (
    <p>
      Filter shown with <input value={showName} onChange={handleShowChange}/>
    </p>
    )
  }

export default Filter