import styled, { css, keyframes } from "styled-components"
import * as React from "react"
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
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            mt={animated && [4, 6]}
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            mb={animated && [2, 5]}
            size={["10", "10", "10", "14"]}
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
