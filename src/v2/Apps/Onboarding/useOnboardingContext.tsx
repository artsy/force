import {
  FC,
  createContext,
  createRef,
  useRef,
  useContext,
  useReducer,
  useEffect,
} from "react"
import { WorkflowEngine } from "v2/Utils/WorkflowEngine"
import { useConfig } from "./config"

type State = {
  questionOne: string | null
  questionTwo: string[]
  questionThree: string | null
}

export const DEFAULT_STATE: State = {
  questionOne: null,
  questionTwo: [],
  questionThree: null,
}

type Action =
  | { type: "RESET" }
  | { type: "SET_ANSWER_ONE"; payload: string }
  | { type: "SET_ANSWER_TWO"; payload: string }
  | { type: "SET_ANSWER_THREE"; payload: string }

const reducer = (onReset: () => void) => (state: State, action: Action) => {
  switch (action.type) {
    case "RESET":
      onReset()
      return DEFAULT_STATE

    case "SET_ANSWER_ONE":
      return {
        ...state,
        questionOne: action.payload,
      }

    case "SET_ANSWER_TWO":
      return {
        ...state,
        questionTwo: state.questionTwo.includes(action.payload)
          ? state.questionTwo.filter(answer => answer !== action.payload)
          : [...state.questionTwo, action.payload],
      }

    case "SET_ANSWER_THREE":
      return {
        ...state,
        questionThree: action.payload,
      }

    default:
      return state
  }
}

/**
 * Basis is just State stored in a ref.
 * It is used to make decisions in the workflow.
 */
export type Basis = State

const OnboardingContext = createContext<{
  basis: React.RefObject<Basis>
  current: string
  dispatch: React.Dispatch<Action>
  next(): void
  onDone(): void
  progress: number
  state: State
  workflowEngine: WorkflowEngine
}>({
  basis: createRef<Basis>(),
  current: "",
  dispatch: () => {},
  next: () => {},
  onDone: () => {},
  progress: 0,
  state: DEFAULT_STATE,
  workflowEngine: new WorkflowEngine({ workflow: [] }),
})

interface OnboardingProviderProps {
  onDone(): void
}

export const OnboardingProvider: FC<OnboardingProviderProps> = ({
  children,
  onDone,
}) => {
  const basis = useRef<Basis>(DEFAULT_STATE)

  const { workflowEngine, current, next, reset: __reset__ } = useConfig({
    basis,
    onDone,
  })

  const progress =
    ((workflowEngine.position() - 1) / workflowEngine.total()) * 100

  const [state, dispatch] = useReducer(reducer(__reset__), DEFAULT_STATE)

  useEffect(() => {
    basis.current = state
  }, [state])

  return (
    <OnboardingContext.Provider
      value={{
        basis,
        current,
        dispatch,
        next,
        onDone,
        progress,
        state,
        workflowEngine,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboardingContext = () => {
  return useContext(OnboardingContext)
}
