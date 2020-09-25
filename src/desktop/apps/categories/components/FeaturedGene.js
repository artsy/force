import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Text } from "@artsy/palette"

const propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  image: PropTypes.object,
}

const Container = styled.div`
  position: relative;
  width: 95%;
  overflow: hidden;
`

const GeneName = styled(Text).attrs({ variant: "mediumText" })`
  position: absolute;
  left: 1em;
  bottom: 0.85em;
  text-decoration: none;

  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
`

const GeneImage = styled.img`
  width: 100%;
`

const FeaturedGene = ({ title, href, image: { url: imageSrc } }) => {
  return (
    <a href={href}>
      <Container>
        <GeneName>{title}</GeneName>
        <GeneImage src={imageSrc} alt={title} />
      </Container>
    </a>
  )
}

FeaturedGene.propTypes = propTypes

export default FeaturedGene
