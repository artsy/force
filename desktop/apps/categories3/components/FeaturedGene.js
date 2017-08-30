import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { primary } from '@artsy/reaction-force/dist/assets/fonts'

const propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  image: PropTypes.object
}

const Container = styled.div`
  position: relative;
  overflow: hidden;
`

const GeneLink = styled.a`
  position: absolute;
  left: 1em;
  bottom: 1em;
  text-decoration: none;

  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);

  ${primary.style} font-size: 13px;
  line-height: 1.33em;
  font-weight: bold;
`

const GeneImage = styled.img`width: 90%;`

const FeaturedGene = ({ title, href, image: { url: imageSrc } }) => {
  return (
    <Container>
      <GeneLink href={href}>{title}</GeneLink>
      <GeneImage src={imageSrc} />
    </Container>
  )
}

FeaturedGene.propTypes = propTypes

export default FeaturedGene
