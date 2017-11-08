import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import Colors from '@artsy/reaction-force/dist/Assets/Colors'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'

export const SeriesNav = (props) => {
  const { activeSection, curation, onClick } = props

  return (
    <SeriesNavContainer className='SeriesNav'>
      {curation.sections.map((section, index) =>
        <Title
          className='SeriesNav__item'
          key={'nav-' + index}
          onClick={() => onClick(index)}
          isActive={activeSection === index}>
          {section.title}
        </Title>
      )}
    </SeriesNavContainer>
  )
}

SeriesNav.propTypes = {
  activeSection: PropTypes.number,
  curation: PropTypes.object,
  onClick: PropTypes.func
}

const SeriesNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width 1240px;
  margin: 60px auto;
  padding: 0 20px;
  ${pMedia.lg`
    padding: 0;
    justify-content: space-evenly;
    flex-wrap: wrap;
  `}
`
const Title = styled.div`
  cursor: pointer;
  ${Fonts.unica('s80', 'medium')}
  color: ${props => props.isActive ? 'black' : Colors.grayRegular};
  ${pMedia.lg`
    margin: 0 30px;
    ${Fonts.unica('s40', 'medium')}
  `}
  ${pMedia.xs`
    margin: 0;
  `}
`
