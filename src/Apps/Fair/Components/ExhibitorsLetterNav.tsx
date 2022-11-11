import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  Text,
  Flex,
  HorizontalOverflow,
  Clickable,
  BoxProps,
} from "@artsy/palette"
import { ExhibitorsLetterNav_fair$data } from "__generated__/ExhibitorsLetterNav_fair.graphql"
import { getExhibitorSectionId } from "Apps/Fair/Utils/getExhibitorSectionId"
import { useJump } from "Utils/Hooks/useJump"
import { Media } from "Utils/Responsive"

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("")

interface ExhibitorsLetterNavProps {
  fair: ExhibitorsLetterNav_fair$data
}

export const ExhibitorsLetterNav: React.FC<ExhibitorsLetterNavProps> = ({
  fair,
}) => {
  const letters = fair?.exhibitorsGroupedByName?.map(group => group?.letter)

  return (
    <>
      <Media lessThan="md">
        <HorizontalOverflow py={2}>
          {LETTERS.map((letter, i) => {
            return (
              <Letter
                key={letter}
                letter={letter}
                isEnabled={!!letters?.includes(letter)}
                pl={i === 0 ? 0 : 1}
                pr={i === LETTERS.length - 1 ? 0 : 1}
              />
            )
          })}
        </HorizontalOverflow>
      </Media>

      <Media greaterThanOrEqual="md">
        <Flex justifyContent="space-between" py={2}>
          {LETTERS.map(letter => {
            return (
              <Letter
                key={letter}
                letter={letter}
                isEnabled={!!letters?.includes(letter)}
              />
            )
          })}
        </Flex>
      </Media>
    </>
  )
}

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

interface LetterProps extends BoxProps {
  letter: string
  isEnabled: boolean
}

const Letter: React.FC<LetterProps> = ({ letter, isEnabled, ...rest }) => {
  const { jumpTo } = useJump({ offset: 10 })

  const sectionLabel =
    letter === "#" ? "special character or number" : `“${letter}”`

  const handleClick = () => {
    if (!isEnabled) return

    jumpTo(getExhibitorSectionId(letter))
  }

  if (isEnabled) {
    return (
      <Clickable
        onClick={handleClick}
        title={`View exhibitors starting with ${sectionLabel}`}
        {...rest}
      >
        <Text variant="sm-display">{letter}</Text>
      </Clickable>
    )
  }

  return (
    <Text variant="sm-display" color="black10" {...rest}>
      {letter}
    </Text>
  )
}

Letter.displayName = "Letter"
