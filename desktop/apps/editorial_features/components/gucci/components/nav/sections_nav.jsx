import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import Colors from '@artsy/reaction-force/dist/Assets/Colors'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'

export const SectionsNav = (props) => {
  const { activeSection, sections, onClick } = props

  return (
    <SectionsNavContainer className='SectionsNav'>
      {sections.map((section, index) =>
        <Title
          className='SectionsNav__item'
          key={'nav-' + index}
          onClick={() => onClick(index)}
          isActive={activeSection === index}>
          {section.title}
        </Title>
      )}
    </SectionsNavContainer>
  )
}

SectionsNav.propTypes = {
  activeSection: PropTypes.number,
  sections: PropTypes.array,
  onClick: PropTypes.func
}

const SectionsNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width 1240px;
  margin: 60px auto 50px auto;
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
