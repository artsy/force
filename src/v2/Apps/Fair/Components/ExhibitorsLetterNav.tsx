import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Text, Flex, Swiper } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { ExhibitorsLetterNav_fair } from "v2/__generated__/ExhibitorsLetterNav_fair.graphql"

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").concat(["0-9"])

interface ExhibitorsLetterNavProps {
  fair: ExhibitorsLetterNav_fair
}

export const ExhibitorsLetterNav: React.FC<ExhibitorsLetterNavProps> = ({
  fair,
}) => {
  const letters = fair?.exhibitorsGroupedByName?.map(group => group?.letter)

  const Letters = props => {
    return (
      <Flex justifyContent="space-between" {...props}>
        {LETTERS.map(letter => {
          const isEnabled = letters?.includes(letter)
          return (
            <Letter
              key={letter}
              color={isEnabled ? "black100" : "black10"}
              title={
                isEnabled ? `View exhibitors starting with “${letter}”` : ""
              }
              onClick={() => {
                if (isEnabled) {
                  scrollIntoView({
                    selector: `#jump--letter${letter}`,
                    offset: 120,
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
          <Letters width={1300} />
        </Swiper>
      </Media>

      <Media greaterThanOrEqual="md">
        <Letters />
      </Media>
    </>
  )
}

const Letter = styled(Text).attrs({ p: 1, variant: "md" })`
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
