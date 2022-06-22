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
import { useConfig } from "./config"

type Answer = string | null

export type Basis = {
  answer: Answer
}

export const DEFAULT_BASIS: Basis = {
  answer: null,
}

const OnboardingContext = createContext<{
  answers: [Answer, Answer]
  basis: React.RefObject<Basis>
  current: string
  next(): void
  onDone(): void
  progress: number
  reset(): void
  setAnswerOne: Dispatch<SetStateAction<Answer>>
  setAnswerTwo: Dispatch<SetStateAction<Answer>>
  setBasis: (updatedBasis: Partial<Basis>) => React.RefObject<Basis>
  workflowEngine: WorkflowEngine
}>({
  answers: [null, null],
  basis: createRef<Basis>(),
  current: "",
  next: () => {},
  onDone: () => {},
  progress: 0,
  reset: () => {},
  setAnswerOne: () => {},
  setAnswerTwo: () => {},
  setBasis: () => createRef<Basis>(),
  workflowEngine: new WorkflowEngine({ workflow: [] }),
})

interface OnboardingProviderProps {
  onDone(): void
}

export const OnboardingProvider: FC<OnboardingProviderProps> = ({
  children,
  onDone,
}) => {
  const basis = useRef<Basis>(DEFAULT_BASIS)

  const { workflowEngine, current, next, reset: __reset__ } = useConfig({
    basis,
    onDone,
  })

  const setBasis = useCallback((updatedBasis: Partial<Basis>) => {
    basis.current = { ...basis.current, ...updatedBasis }
    return basis
  }, [])

  const progress =
    ((workflowEngine.position() - 1) / workflowEngine.total()) * 100

  const [answerOne, setAnswerOne] = useState<null | string>(null)
  const [answerTwo, setAnswerTwo] = useState<null | string>(null)

  const reset = () => {
    __reset__()
    setAnswerOne(null)
    setAnswerTwo(null)
  }

  return (
    <OnboardingContext.Provider
      value={{
        answers: [answerOne, answerTwo],
        basis,
        current,
        next,
        onDone,
        progress,
        reset,
        setAnswerOne,
        setAnswerTwo,
        setBasis,
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
