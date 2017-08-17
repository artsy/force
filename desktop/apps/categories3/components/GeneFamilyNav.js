import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  geneFamilies: PropTypes.array.isRequired
}

const GeneFamilyNav = ({ geneFamilies }) => {
  return (
    <ul>
      {geneFamilies.map(geneFamily => <li key={geneFamily.id}>TK</li>)}
    </ul>
  )
}

GeneFamilyNav.propTypes = propTypes

export default GeneFamilyNav
