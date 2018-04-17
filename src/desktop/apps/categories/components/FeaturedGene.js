import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { avantgarde } from 'reaction/Assets/Fonts'

const propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  image: PropTypes.object
}

const Container = styled.div`
  position: relative;
  width: 95%;
  overflow: hidden;
`

const GeneName = styled.span`
  position: absolute;
  left: 1em;
  bottom: 1em;
  text-decoration: none;

  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);

  ${avantgarde('s13')};
  line-height: 1.33em;
  font-weight: bold;
`

const GeneImage = styled.img`
  width: 100%;
`

const FeaturedGene = ({ title, href, image: { url: imageSrc } }) => {
  return (
    <a href={href}>
      <Container>
        <GeneName>{title}</GeneName>
        <GeneImage src={imageSrc} />
      </Container>
    </a>
  )
}

FeaturedGene.propTypes = propTypes

export default FeaturedGene
