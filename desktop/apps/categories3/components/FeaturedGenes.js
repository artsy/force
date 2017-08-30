import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import FeaturedGene from './FeaturedGene'

const propTypes = {
  featuredGenes: PropTypes.object
}

const Layout = styled.div`
  padding-top: 1em;
  column-count: 3;
  column-gap: 2em;
`

const FeaturedGenes = ({ featuredGenes }) => {
  return (
    <Layout>
      {featuredGenes
        ? featuredGenes.genes.length > 0
          ? featuredGenes.genes
              .map(featuredGene => <FeaturedGene key={featuredGene.id} {...featuredGene} />)
              .slice(0, 3)
          : <p style={{ color: 'orange' }}>
              missing Featured Links?<br />(No featuredGenes.genes list)
            </p>
        : <p style={{ color: 'red' }}>
            missing Set?<br />(No featuredGenes object)
          </p>}
    </Layout>
  )
}

FeaturedGenes.propTypes = propTypes

export default FeaturedGenes
