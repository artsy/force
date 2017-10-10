import React from 'react'
import styled from 'styled-components'

import { secondary } from '@artsy/reaction-force/dist/Assets/Fonts'

const Headline = styled.h1`
  font-size: 50px;
  line-height 1em;
`

const Description = styled.p`
  ${secondary.style}
  font-size: 25px;
  line-height: 1.4em;
  margin: 35px 0;
`

const TAGPIntro = () => {
  return (
    <div>
      <Headline>The Art Genome Project</Headline>
      <Description>
        The Art Genome Project is the classification system and technological
        framework that powers Artsy. It maps the characteristics (we call them
        &ldquo;genes&rdquo;) that connect artists, artworks, architecture, and
        design objects across history. There are currently over 1,000
        characteristics in The Art Genome Project, including art historical
        movements, subject matter, and formal qualities.
      </Description>
    </div>
  )
}

export default TAGPIntro
