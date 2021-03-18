import React from 'react'

function UserInput() {
  return (
    <div className="userInput">
      <input type="text" id="search" placeholder="search..."/>
      <select type="text" id="sortBy" placeholder="sort by..." list="sortByList">
        <option value="cost">sort by: cost</option>
        <option value="brand">sort by: brand</option>
        <option value="type">sort by: brand</option>
        <option value="colour">sort by: brand</option>
      </select>
    </div>
  )
}

export default UserInput
