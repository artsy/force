import { Box, Flex, Spacer, Text, TextArea } from "@artsy/palette"
import { FC } from "react"
import { State, Action } from "Apps/ArtAdvisor/07-Curated-Discovery/App"
import { SuggestionPill } from "./SuggestionPill"

export const ARTISTS = [
  "Andy Warhol",
  "Yayoi Kusama",
  "Pablo Picasso",
  "Frank Stella",
  "…",
]

interface ArtistsProps {
  state: State
  dispatch: React.Dispatch<Action>
}
export const Artists: FC<ArtistsProps> = props => {
  const { state, dispatch } = props

  return (
    <Box>
      <Text as="h2" variant={"lg"}>
        Any favorite artists?
      </Text>

      <Spacer y={1} />

      <Flex gap={1} flexWrap={"wrap"}>
        {ARTISTS.map(suggestion => (
          <SuggestionPill
            key={suggestion}
            suggestion={suggestion}
            selected={state.artists.includes(suggestion)}
            onClick={() =>
              dispatch({ type: "TOGGLE_ARTIST", artist: suggestion })
            }
          />
        ))}
        <SuggestionPill
          suggestion={"Not sure"}
          selected={state.artists.includes("Not sure")}
          onClick={() => dispatch({ type: "CLEAR_ARTISTS" })}
        />
      </Flex>

      <Spacer y={1} />

      <TextArea
        placeholder="Choose from above, or tell us more…"
        onChange={e => {
          const text = e.value
          dispatch({ type: "SET_FREETEXT_ARTISTS", text })
        }}
      />
    </Box>
  )
}
