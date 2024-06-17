import { Box, Button, Join, Spacer, Text } from "@artsy/palette"
import { FC, useReducer } from "react"
import { Artists } from "./Components/Artists"
import { Interests } from "./Components/Interests"
import { Goals } from "./Components/Goals"

export type State = {
  goals: string[]
  goalsFreeText: string
  interests: string[]
  interestsFreeText: string
  artists: string[]
  artistsFreeText: string
}

const initialState: State = {
  goals: [],
  goalsFreeText: "",
  interests: [],
  interestsFreeText: "",
  artists: [],
  artistsFreeText: "",
}

export type Action =
  | { type: "RESET" }
  // goals
  | { type: "TOGGLE_GOAL"; goal: string }
  | { type: "CLEAR_GOALS" }
  | { type: "SET_FREETEXT_GOALS"; text: string }
  // interests
  | { type: "TOGGLE_INTEREST"; interest: string }
  | { type: "CLEAR_INTERESTS" }
  | { type: "SET_FREETEXT_INTEREST"; text: string }
  // artists
  | { type: "TOGGLE_ARTIST"; artist: string }
  | { type: "CLEAR_ARTISTS" }
  | { type: "SET_FREETEXT_ARTISTS"; text: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return initialState

    case "TOGGLE_GOAL":
      const goals = state.goals.includes(action.goal)
        ? state.goals.filter(goal => goal !== action.goal)
        : [...state.goals, action.goal]
      return { ...state, goals }
    case "CLEAR_GOALS":
      return { ...state, goals: [] }
    case "SET_FREETEXT_GOALS":
      return { ...state, goalsFreeText: action.text }

    case "TOGGLE_INTEREST":
      const interests = state.interests.includes(action.interest)
        ? state.interests.filter(interest => interest !== action.interest)
        : [...state.interests, action.interest]
      return { ...state, interests }
    case "CLEAR_INTERESTS":
      return { ...state, interests: [] }
    case "SET_FREETEXT_INTEREST":
      return { ...state, interestsFreeText: action.text }

    case "TOGGLE_ARTIST":
      const artists = state.artists.includes(action.artist)
        ? state.artists.filter(artist => artist !== action.artist)
        : [...state.artists, action.artist]
      return { ...state, artists }
    case "CLEAR_ARTISTS":
      return { ...state, artists: [] }
    case "SET_FREETEXT_ARTISTS":
      return { ...state, artistsFreeText: action.text }

    default:
      return state
  }
}

export const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Box>
      <PreviewState state={state} />

      <Spacer y={4} />

      <Text as="h1" variant={"xl"}>
        Discover Blah
      </Text>

      <Spacer y={2} />

      <Join separator={<Spacer y={2} />}>
        <Goals state={state} dispatch={dispatch} />
        <Interests state={state} dispatch={dispatch} />
        <Artists state={state} dispatch={dispatch} />

        <Button
          variant={"secondaryBlack"}
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset
        </Button>
      </Join>
    </Box>
  )
}

const PreviewState: FC<{
  state: State
}> = props => {
  const { state } = props
  return (
    <pre
      style={{
        background: "#eeee",
        padding: "1em",
        border: "solid 1px #ccc",
        position: "fixed",
        width: "24em",
        top: "6rem",
        right: "1rem",
        zIndex: 1000,
        whiteSpace: "pre-wrap",
      }}
    >
      {JSON.stringify(state, null, 2)}
    </pre>
  )
}
