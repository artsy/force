import React from 'react'
import styled from 'styled-components'

const StyledIntro = styled.div`
  padding: 2em 1em
`

const StyledH2 = styled.div`
  font-size: 32px
  line-height: 64px
`

const Intro = (props) => {
  return (
    <StyledIntro className='categories2-intro'>
      <StyledH2>The Art Genome Project</StyledH2>
      <p>The Art Genome Project is the classification system and technological framework that powers Artsy.</p>
      <p>It maps the characteristics (we call them “genes”) that connect artists, artworks, architecture, and design objects across history.</p>
      <p>There are currently over 1,000 characteristics in The Art Genome Project, including art historical movements, subject matter, and formal qualities.</p>
    </StyledIntro>
  )
}

export default Intro
