import React from 'react'
import PropTypes from 'prop-types'
import GeneFamily from './GeneFamily'

const propTypes = {
  geneFamilies: PropTypes.array.isRequired
}

const GeneFamilies = ({ geneFamilies }) => {
  return (
    <div>
      {geneFamilies.map(geneFamily =>
        <GeneFamily key={geneFamily.id} {...geneFamily} />
      )}
    </div>
  )
}

GeneFamilies.propTypes = propTypes

export default GeneFamilies
