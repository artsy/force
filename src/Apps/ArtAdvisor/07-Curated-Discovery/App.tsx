import { FC, useReducer } from "react"
import { Form } from "./Components/Form/Form"

export type State = {
  goal: string
  goalFreeText: string
  budget: string
  interests: string[]
  interestsFreeText: string
}

const initialState: State = {
  goal: "",
  goalFreeText: "",
  budget: "",
  interests: [],
  interestsFreeText: "",
}

export type Action =
  | { type: "RESET" }
  // goal
  | { type: "SET_GOAL"; goal: string }
  // budget
  | { type: "SET_BUDGET"; text: string }
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

    case "SET_BUDGET":
      return { ...state, budget: action.text }

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

  return <Form state={state} dispatch={dispatch} />
}
