import styled, { css, keyframes } from "styled-components"
import React from "react"
import { Flex, Sans, color } from "@artsy/palette"

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
      // @ts-expect-error STRICT_NULL_CHECK
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
        <SectionItem onClick={() => onClick(index)} key={"nav-" + index}>
          <Title
            // @ts-expect-error STRICT_NULL_CHECK
            mt={animated && [4, 6]}
            // @ts-expect-error STRICT_NULL_CHECK
            mb={animated && [2, 5]}
            size={["10", "10", "10", "14"]}
            // @ts-expect-error STRICT_NULL_CHECK
            mx={animated && [3]}
            color={activeSection === index ? "black" : color("black10")}
          >
            {section.title}
          </Title>
        </SectionItem>
      ))}
    </SectionsNavContainer>
  )
}

export const SectionItem = styled.div``

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

const SectionsNavContainer = styled(Flex)<{ isAnimated: boolean }>`
  ${props =>
    props.isAnimated &&
    css`
      animation-name: ${navKeyframes};
      animation-duration: 1s;
      animation-timing-function: ease;
    `};
`

const Title = styled(Sans)`
  cursor: pointer;
`
