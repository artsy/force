import { Box, Flex, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { State, Action } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { SuggestionPill } from "./SuggestionPill"

export const GOALS = [
  "Decorate my home",
  "Start collecting",
  "Expand my collection",
  "Buy some art",
  "Explore",
  "I’m not sure",
]

interface GoalsProps {
  state: State
  dispatch: React.Dispatch<Action>
}

export const Goals: FC<GoalsProps> = props => {
  const { state, dispatch } = props

  return (
    <Box>
      <Text as="h2" variant={"lg"}>
        What are you looking to do?
      </Text>

      <Spacer y={1} />

      <Flex gap={1} flexWrap={"wrap"}>
        {GOALS.map(suggestion => (
          <SuggestionPill
            key={suggestion}
            suggestion={suggestion}
            selected={state.goal === suggestion}
            onClick={() => dispatch({ type: "SET_GOAL", goal: suggestion })}
          />
        ))}
      </Flex>
    </Box>
  )
}
