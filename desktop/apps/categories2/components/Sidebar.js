import React from 'react'

const Sidebar = (props) => {
  return (
    <div className="categories2-sidebar">
      <ul>
        {
          props.data.map((value) => {
            return (
              <li key={`gene-${value.id}`}>
                {value.name}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Sidebar
