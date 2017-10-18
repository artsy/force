import React from 'react'
import PropTypes from 'prop-types'

import GeneFamily from './GeneFamily'
import { featuredGenesForFamily } from '../utils.js'

const propTypes = {
  geneFamilies: PropTypes.array.isRequired,
  allFeaturedGenesByFamily: PropTypes.array.isRequired
}

const GeneFamilies = ({ geneFamilies, allFeaturedGenesByFamily }) => {
  return (
    <div>
      {geneFamilies.map(geneFamily => {
        const featuredGenes = featuredGenesForFamily(
          geneFamily.name,
          allFeaturedGenesByFamily
        )
        return <GeneFamily key={geneFamily.id} featuredGenes={featuredGenes} {...geneFamily} />
      })}
    </div>
  )
}

GeneFamilies.propTypes = propTypes

export default GeneFamilies
