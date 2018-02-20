import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import Colors from '@artsy/reaction-force/dist/Assets/Colors'
import { pMedia } from '@artsy/reaction-force/dist/Components/Helpers'
import { Fonts } from '@artsy/reaction-force/dist/Components/Publishing/Fonts'

export const SectionsNav = (props) => {
  const { animated, activeSection, sections, onClick } = props

  return (
    <SectionsNavContainer className="SectionsNav" animated={animated}>
      {sections.map((section, index) => (
        <Title
          className="SectionsNav__item"
          key={'nav-' + index}
          onClick={() => onClick(index)}
          isActive={activeSection === index}
        >
          {section.title}
        </Title>
      ))}
    </SectionsNavContainer>
  )
}

SectionsNav.propTypes = {
  activeSection: PropTypes.number,
  animated: PropTypes.bool,
  sections: PropTypes.array,
  onClick: PropTypes.func,
}

const navKeyframes = keyframes`
  from {
    max-height: 0px;
    opacity: 0;
  }
  to {
    max-height: 500px;
    opacity: 1;
  }
`
const SectionsNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width 1240px;
  margin: 60px auto 50px auto;
  padding: 0 20px;

  ${(props) =>
    props.animated &&
    `
    margin: 0;
    animation-name: ${navKeyframes};
    animation-duration: 1s;
    animation-timing-function: ease;
    ${Title} {
      margin: 60px auto 50px auto;
    }
  `}

  ${pMedia.lg`
    padding: 0;
    justify-content: space-evenly;
    flex-wrap: wrap;
  `}

  ${pMedia.sm`
    margin: 40px auto 20px auto;
  `}
`
const Title = styled.div`
  cursor: pointer;
  ${Fonts.unica('s80')} color: ${(props) =>
      props.isActive ? 'black' : Colors.grayRegular};

  ${pMedia.lg`
    margin: 0 30px;
    ${Fonts.unica('s40')}
  `} ${pMedia.sm`
    margin: 0;
    &:nth-child(2) {
      margin: 0;
    }
  `};
`
