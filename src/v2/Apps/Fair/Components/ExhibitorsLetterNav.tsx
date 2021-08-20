import { BoxProps, Flex, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ExhibitorsLetterNav_fair } from "v2/__generated__/ExhibitorsLetterNav_fair.graphql"

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").concat(["0-9"])

interface ExhibitorsLetterNavProps extends BoxProps {
  fair: ExhibitorsLetterNav_fair
}

export const ExhibitorsLetterNav: React.FC<ExhibitorsLetterNavProps> = ({
  fair,
  ...rest
}) => {
  const letters = fair?.exhibitorsGroupedByName?.map(group => group?.letter)

  return (
    <Flex justifyContent="space-between" {...rest}>
      {LETTERS.map(letter => {
        const isLetter = letters?.includes(letter)
        return (
          <Letter
            key={letter}
            color={isLetter ? "black100" : "black10"}
            title={isLetter ? `View exhibitors starting with “${letter}”` : ""}
          >
            {letter}
          </Letter>
        )
      })}
    </Flex>
  )
}

const Letter = styled(Text).attrs({ p: 1, variant: "md" })`
  display: inline-block;
  cursor: pointer;
`

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
