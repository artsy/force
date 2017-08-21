import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

const Gene = ({ id, name }) => {
  return (
    <li>
      {name}
    </li>
  )
}

Gene.propTypes = propTypes

export default Gene
