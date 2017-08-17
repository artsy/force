import React from 'react'
import PropTypes from 'prop-types'

import FeaturedGene from './FeaturedGene'

const propTypes = {
  featuredGenes: PropTypes.object
}

const FeaturedGenes = ({ featuredGenes }) => {
  return (
    <div>
      {featuredGenes
        ? featuredGenes.genes.length > 0
          ? featuredGenes.genes
              .map(featuredGene => <FeaturedGene key={featuredGene.id} {...featuredGene} />)
          : <p style={{ color: 'orange' }}>
              missing Featured Links?<br />(No featuredGenes.genes list)
            </p>
        : <p style={{ color: 'red' }}>
            missing Set?<br />(No featuredGenes object)
          </p>}
    </div>
  )
}

FeaturedGenes.propTypes = propTypes

export default FeaturedGenes
