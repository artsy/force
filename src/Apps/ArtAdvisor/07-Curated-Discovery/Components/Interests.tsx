import { Box, Flex, Spacer, Text, TextArea } from "@artsy/palette"
import { FC } from "react"
import { State, Action } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { SuggestionPill } from "./SuggestionPill"

export const INTERESTS = [
  "Abstract Art",
  "Minimalist Art",
  "Figurative Art",
  "Pop Art",
  "Street Art",
]

interface InterestsProps {
  state: State
  dispatch: React.Dispatch<Action>
}

export const Interests: FC<InterestsProps> = props => {
  const { state, dispatch } = props

  return (
    <Box>
      <Text as="h2" variant={"lg"}>
        What are you interested in?
      </Text>

      <Spacer y={1} />

      <Flex gap={1} flexWrap={"wrap"}>
        {INTERESTS.map(suggestion => (
          <SuggestionPill
            key={suggestion}
            suggestion={suggestion}
            selected={state.interests.includes(suggestion)}
            onClick={() =>
              dispatch({ type: "TOGGLE_INTEREST", interest: suggestion })
            }
          />
        ))}
        <SuggestionPill
          suggestion={"Not sure"}
          selected={state.interests.includes("Not sure")}
          onClick={() => dispatch({ type: "CLEAR_INTERESTS" })}
        />
      </Flex>

      <Spacer y={1} />

      <TextArea
        placeholder="Choose from above, or tell us more…"
        onChange={e => {
          const text = e.value
          dispatch({ type: "SET_FREETEXT_INTEREST", text })
        }}
      />
    </Box>
  )
}
