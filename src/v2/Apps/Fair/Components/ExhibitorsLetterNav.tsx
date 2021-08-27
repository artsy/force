import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Text, Flex, Swiper, themeProps } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { ExhibitorsLetterNav_fair } from "v2/__generated__/ExhibitorsLetterNav_fair.graphql"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").concat(["0-9"])

interface ExhibitorsLetterNavProps {
  fair: ExhibitorsLetterNav_fair
}

export const ExhibitorsLetterNav: React.FC<ExhibitorsLetterNavProps> = ({
  fair,
}) => {
  const letters = fair?.exhibitorsGroupedByName?.map(group => group?.letter)
  const {
    height: [mobileNavBarHeight, desktopNavBarHeight],
  } = useNavBarHeight()

  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)
  const stickyTabsHeight = 150

  const offset =
    (isMobile ? mobileNavBarHeight : desktopNavBarHeight) + stickyTabsHeight

  const Letters = ({ withSwiper = false }) => {
    return (
      <Flex justifyContent="space-between" py={2} pl={withSwiper ? 2 : 0}>
        {LETTERS.map((letter, i) => {
          const isEnabled = letters?.includes(letter)
          const isLast = i === LETTERS.length - 1
          return (
            <Letter
              key={letter}
              color={isEnabled ? "black100" : "black10"}
              title={
                isEnabled ? `View exhibitors starting with “${letter}”` : ""
              }
              mr={!withSwiper || isLast ? 0 : 4}
              onClick={() => {
                if (isEnabled) {
                  scrollIntoView({
                    selector: `#jump--letter${letter}`,
                    offset,
                    behavior: "smooth",
                  })
                }
              }}
            >
              {letter}
            </Letter>
          )
        })}
      </Flex>
    )
  }

  return (
    <>
      <Media lessThan="md">
        <Swiper snap="start">
          <Letters withSwiper />
        </Swiper>
      </Media>

      <Media greaterThanOrEqual="md">
        <Letters />
      </Media>
    </>
  )
}

const Letter = styled(Text).attrs({ variant: "md" })`
  display: inline-block;
  cursor: pointer;
  white-space: nowrap;
`
Letter.displayName = "Letter"

export const ExhibitorsLetterNavFragmentContainer = createFragmentContainer(
  ExhibitorsLetterNav,
  {
    fair: graphql`
      fragment ExhibitorsLetterNav_fair on Fair {
        exhibitorsGroupedByName {
          letter
        }
      }
    `,
  }
)
