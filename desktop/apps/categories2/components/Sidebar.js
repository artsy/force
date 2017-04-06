import React from 'react'

const Sidebar = (props) => {
  return (
    <div className="categories2-sidebar">
      <ul>
        {
          props.data.map((value) => {
            return (
              <li key={`gene-${value.id}`}>
                <a href={`#${value.id}`}>{value.name}</a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

Sidebar.propTypes = {
  data: React.PropTypes.array
}

export default Sidebar
