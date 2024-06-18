import { Box, Flex, Spacer, Text, TextArea } from "@artsy/palette"
import { FC } from "react"
import { State, Action } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { SuggestionPill } from "./SuggestionPill"

export const GOALS = [
  "Decorate my home",
  "Start collecting",
  "Expand my collection",
  "Buy some art",
  "Explore",
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
        <SuggestionPill
          suggestion={"Not sure"}
          selected={state.goal.includes("Not sure")}
          onClick={() => dispatch({ type: "CLEAR_GOAL" })}
        />
      </Flex>

      <Spacer y={1} />

      <TextArea
        placeholder="Choose from above, or tell us more…"
        onChange={e => {
          const text = e.value
          dispatch({ type: "SET_FREETEXT_GOAL", text })
        }}
      />
    </Box>
  )
}
