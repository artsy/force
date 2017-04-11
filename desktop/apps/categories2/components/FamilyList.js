import React from 'react'

FamilyList.propTypes = {
  data: React.PropTypes.array
}

function FamilyList ({className, data}) {
  return (
    <ul className={className}>
      {
          data.map((value) => {
            return (
              <li key={value.id}>
                <a href={`#${value.id}`}>{value.name}</a>
              </li>
            )
          })
        }
    </ul>
  )
}

export default FamilyList
