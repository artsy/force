import { Box, Flex, Spacer, Text, TextArea } from "@artsy/palette"
import { FC } from "react"
import { State, Action } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { SuggestionPill } from "./SuggestionPill"

export const INTERESTS = [
  // movements
  "Contemporary Art",
  "Post-War Art",
  "Abstract Art",
  "Figurative Art",
  "Minimalist Art",
  "Pop Art",
  "Impressionist and Modern Art",
  "Street Art",
  // mediums
  "Painting",
  "Prints",
  "Works on Paper",
  "Photography",
  "Sculpture",
  "Ceramics",
  "Textile Art",
  "Design Objects and Furniture",
  // artist segments
  "Emerging artists",
  "Blue chip artists",
  // passions
  "Social issues",
  "Supporting local galleries",
  "Investment",
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

      <Text variant={"sm"} color="black60">
        Choose a few:
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
      </Flex>

      <Spacer y={1} />

      <TextArea
        placeholder="Choose from above, or tell us more…"
        value={state.interestsFreeText}
        onChange={e => {
          const text = e.value
          dispatch({ type: "SET_FREETEXT_INTEREST", text })
        }}
      />
    </Box>
  )
}
