import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import Colors from '@artsy/reaction-force/dist/Assets/Colors'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'

export const SectionsNav = (props) => {
  const { animated, activeSection, sections, onClick } = props

  return (
    <SectionsNavContainer className='SectionsNav' animated={animated}>
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
  animated: PropTypes.bool,
  sections: PropTypes.array,
  onClick: PropTypes.func
}

const navKeyframes = keyframes`
  0% {
    height: 0px;
    opacity: 0;
  }
  50% {
    height: auto;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const SectionsNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width 1240px;
  margin: 60px auto 50px auto;
  padding: 0 20px;
  ${props => props.animated && `
    margin: 0;
    animation-name: ${navKeyframes};
    animation-duration: .5s;
    animation-timing-function: linear;
    ${Title} {
      margin-top: 60px;
      margin-bottom: 50px;
    }
  `}
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
  ${pMedia.sm`
    margin: 0;
    &:nth-child(2) {
      margin: 0 20px;
    }
  `}
`
