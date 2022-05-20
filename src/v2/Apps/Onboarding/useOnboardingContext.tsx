import {
  FC,
  createContext,
  createRef,
  useCallback,
  useRef,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react"
import { WorkflowEngine } from "v2/Utils/WorkflowEngine"
import { useEngine } from "./config"

export type Context = {
  answer: string | null
}

export const DEFAULT_CONTEXT: Context = {
  answer: null,
}

type AnswersState = [] | [string] | [string, string]

const OnboardingContext = createContext<{
  answers: AnswersState
  context: React.RefObject<Context>
  current: string
  engine: WorkflowEngine
  next(): void
  onDone(): void
  progress: number
  setAnswers: Dispatch<SetStateAction<AnswersState>>
  setContext: (updatedContext: Partial<Context>) => React.RefObject<Context>
}>({
  answers: [],
  context: createRef<Context>(),
  current: "",
  engine: new WorkflowEngine({ workflow: [] }),
  next: () => {},
  onDone: () => {},
  progress: 0,
  setContext: () => createRef<Context>(),
  setAnswers: () => {},
})

interface OnboardingProviderProps {
  onDone(): void
}

export const OnboardingProvider: FC<OnboardingProviderProps> = ({
  children,
  onDone,
}) => {
  const context = useRef<Context>(DEFAULT_CONTEXT)

  const { engine, current, next } = useEngine({ context, onDone })

  const setContext = useCallback((updatedContext: Partial<Context>) => {
    context.current = { ...context.current, ...updatedContext }
    return context
  }, [])

  const progress = ((engine.position() - 1) / engine.total()) * 100

  const [answers, setAnswers] = useState<AnswersState>([])

  return (
    <OnboardingContext.Provider
      value={{
        answers,
        context,
        current,
        engine,
        next,
        onDone,
        progress,
        setAnswers,
        setContext,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboardingContext = () => {
  return useContext(OnboardingContext)
}
