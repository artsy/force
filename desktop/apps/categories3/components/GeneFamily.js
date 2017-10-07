import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Gene from './Gene'
import { alphabetizeGenes } from '../utils.js'
import FeaturedGenes from './FeaturedGenes'

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  genes: PropTypes.array.isRequired,
  featuredGenes: PropTypes.object
}

const GeneFamilyName = styled.h2`
  font-size: 37px;
  line-height: 1.2em;
`

const GeneList = styled.ul`
  margin: 1.5em 0;
  column-count: 1;

  @media (min-width: 768px) {
    column-count: 3;
    column-gap: 2em;
  }
`

const GeneFamily = ({ id, name, genes, featuredGenes }) => {
  const publishedGenes = genes.filter(g => g.is_published)
  const sortedGenes = alphabetizeGenes(publishedGenes)
  return (
    <div id={id}>
      <GeneFamilyName>
        {name}
      </GeneFamilyName>
      <FeaturedGenes featuredGenes={featuredGenes} />
      <GeneList>
        {sortedGenes.map(gene => <Gene key={gene.id} {...gene} />)}
      </GeneList>
    </div>
  )
}

GeneFamily.propTypes = propTypes

export default GeneFamily
