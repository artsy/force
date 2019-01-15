import styled, { keyframes } from "styled-components"
import PropTypes from "prop-types"
import React from "react"
import { color, Flex, Sans } from "@artsy/palette"

interface SectionsNavProps {
  animated?: boolean
  activeSection: number
  sections: any[]
  onClick: (index: number) => void
}

export const SectionsNav: React.SFC<SectionsNavProps> = props => {
  const { animated, activeSection, sections, onClick } = props

  return (
    <SectionsNavContainer
      isAnimated={animated}
      mx="auto"
      mt={[4, 6]}
      mb={[2, 5]}
      px={[0, 2]}
      maxWidth="1240px"
      justifyContent={["space-evenly", "space-between"]}
      flexWrap={["wrap", "wrap", "nowrap", "nowrap"]}
    >
      {sections.map((section, index) => (
        <div onClick={() => onClick(index)}>
          <Title
            mt={animated && [4, 6]}
            mb={animated && [2, 5]}
            key={"nav-" + index}
            size={["10", "10", "10", "14"]}
            mx={animated && [3]}
            color={activeSection === index ? "black" : color("black10")}
          >
            {section.title}
          </Title>
        </div>
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
const SectionsNavContainer =
  styled(Flex) <
  { isAnimated: boolean } >
  `
  ${props =>
    props.isAnimated &&
    `
    animation-name: ${navKeyframes};
    animation-duration: 1s;
    animation-timing-function: ease;
  `};
`

const Title = styled(Sans)`
  cursor: pointer;
`
