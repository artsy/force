import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import FeaturedGene from "./FeaturedGene"

const propTypes = {
  featuredGeneLinks: PropTypes.array,
}

const Layout = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    padding-top: 1em;
    column-count: 3;
    column-gap: 2em;
  }
`

const FeaturedGenes = ({ featuredGeneLinks }) => {
  return (
    <Layout>
      {featuredGeneLinks &&
        featuredGeneLinks.length > 0 &&
        featuredGeneLinks
          .map(featuredGene => (
            <FeaturedGene key={featuredGene.href} {...featuredGene} />
          ))
          .slice(0, 3)}
    </Layout>
  )
}

FeaturedGenes.propTypes = propTypes

export default FeaturedGenes
