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
  workflowEngine: WorkflowEngine
  next(): void
  onDone(): void
  progress: number
  setAnswerOne: Dispatch<SetStateAction<Answer>>
  setAnswerTwo: Dispatch<SetStateAction<Answer>>
  setBasis: (updatedBasis: Partial<Basis>) => React.RefObject<Basis>
}>({
  answers: [null, null],
  basis: createRef<Basis>(),
  current: "",
  workflowEngine: new WorkflowEngine({ workflow: [] }),
  next: () => {},
  onDone: () => {},
  progress: 0,
  setBasis: () => createRef<Basis>(),
  setAnswerOne: () => {},
  setAnswerTwo: () => {},
})

interface OnboardingProviderProps {
  onDone(): void
}

export const OnboardingProvider: FC<OnboardingProviderProps> = ({
  children,
  onDone,
}) => {
  const basis = useRef<Basis>(DEFAULT_BASIS)

  const { workflowEngine, current, next } = useConfig({ basis, onDone })

  const setBasis = useCallback((updatedBasis: Partial<Basis>) => {
    basis.current = { ...basis.current, ...updatedBasis }
    return basis
  }, [])

  const progress =
    ((workflowEngine.position() - 1) / workflowEngine.total()) * 100

  const [answerOne, setAnswerOne] = useState<null | string>(null)
  const [answerTwo, setAnswerTwo] = useState<null | string>(null)

  return (
    <OnboardingContext.Provider
      value={{
        answers: [answerOne, answerTwo],
        basis,
        current,
        workflowEngine,
        next,
        onDone,
        progress,
        setAnswerOne,
        setAnswerTwo,
        setBasis,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboardingContext = () => {
  return useContext(OnboardingContext)
}
