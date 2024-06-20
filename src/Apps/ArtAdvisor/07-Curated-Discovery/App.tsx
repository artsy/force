import { FC, useReducer } from "react"
import { Form } from "./Components/Form/Form"
import { Result } from "./Components/Result/Result"

type Step = "form" | "result"

export type State = {
  currentStep: Step
  goal: string
  goalFreeText: string
  budget: string
  interests: string[]
  interestsFreeText: string
}

const initialState: State = {
  currentStep: "form",
  goal: "",
  goalFreeText: "",
  budget: "",
  interests: [],
  interestsFreeText: "",
}

export type Action =
  | { type: "RESET" }
  | { type: "SET_STEP"; step: Step }
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

    case "SET_STEP":
      return { ...state, currentStep: action.step }

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
  const { currentStep } = state

  if (currentStep === "form") {
    return <Form state={state} dispatch={dispatch} />
  }

  if (currentStep === "result") {
    return <Result state={state} dispatch={dispatch} />
  }

  return null
}
