import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'

export const SeriesNav = (props) => {
  const { curation } = props

  return (
    <SeriesNavContainer className='SeriesNav'>
      {curation.sections.map((section, index) =>
        <Title>{section.title}</Title>
      )}
    </SeriesNavContainer>
  )
}

SeriesNav.propTypes = {
  curation: PropTypes.object
}

const SeriesNavContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  max-width 1240px;
  margin: 60px auto;
  padding: 0 20px;
  ${pMedia.sm`
    padding: 0;
  `}
`
const Title = styled.div`
  ${Fonts.unica('s80', 'medium')}
  ${pMedia.sm`
    ${Fonts.unica('s40', 'medium')}
  `}
`
