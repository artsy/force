import { Box, Button, Join, Spacer, Text } from "@artsy/palette"
import { FC, useReducer } from "react"
import { Interests } from "./Components/Interests"
import { Goals } from "./Components/Goals"

export type State = {
  goal: string
  goalFreeText: string
  interests: string[]
  interestsFreeText: string
}

const initialState: State = {
  goal: "",
  goalFreeText: "",
  interests: [],
  interestsFreeText: "",
}

export type Action =
  | { type: "RESET" }
  // goal
  | { type: "SET_GOAL"; goal: string }
  | { type: "CLEAR_GOAL" }
  | { type: "SET_FREETEXT_GOAL"; text: string }
  // interests
  | { type: "TOGGLE_INTEREST"; interest: string }
  | { type: "CLEAR_INTERESTS" }
  | { type: "SET_FREETEXT_INTEREST"; text: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return initialState

    case "SET_GOAL":
      return { ...state, goal: action.goal }
    case "CLEAR_GOAL":
      return { ...state, goal: "" }
    case "SET_FREETEXT_GOAL":
      return { ...state, goalFreeText: action.text }

    case "TOGGLE_INTEREST":
      const interests = state.interests.includes(action.interest)
        ? state.interests.filter(interest => interest !== action.interest)
        : [...state.interests, action.interest]
      return { ...state, interests }
    case "CLEAR_INTERESTS":
      return { ...state, interests: [] }
    case "SET_FREETEXT_INTEREST":
      return { ...state, interestsFreeText: action.text }

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
