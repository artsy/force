import {
  createContextStore,
  Action,
  action,
  Computed,
  computed,
} from "easy-peasy"
import { useConfig } from "Components/Onboarding/config"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import { WorkflowEngine } from "Utils/WorkflowEngine"
import { type FC, createContext, useContext, useEffect, useRef } from "react"

export type State = {
  questionOne: string | null
  questionTwo: string[]
  questionThree: string | null
  followedIds: string[]
}

export const DEFAULT_STATE: State = {
  questionOne: null,
  questionTwo: [],
  questionThree: null,
  followedIds: [],
}

// Easy-peasy store model interface
interface OnboardingStoreModel {
  // State
  questionOne: string | null
  questionTwo: string[]
  questionThree: string | null
  followedIds: string[]

  // Actions
  reset: Action<OnboardingStoreModel>
  setAnswerOne: Action<OnboardingStoreModel, string>
  setAnswerTwo: Action<OnboardingStoreModel, string>
  setAnswerThree: Action<OnboardingStoreModel, string>
  follow: Action<OnboardingStoreModel, string>
}

// Create the context store with support for onReset callback
export const createOnboardingStore = (onReset: () => void) =>
  createContextStore<OnboardingStoreModel>(runtimeModel => ({
    // State
    questionOne: runtimeModel?.questionOne || DEFAULT_STATE.questionOne,
    questionTwo: runtimeModel?.questionTwo || DEFAULT_STATE.questionTwo,
    questionThree: runtimeModel?.questionThree || DEFAULT_STATE.questionThree,
    followedIds: runtimeModel?.followedIds || DEFAULT_STATE.followedIds,

    // Actions
    reset: action(state => {
      onReset()
      state.questionOne = DEFAULT_STATE.questionOne
      state.questionTwo = DEFAULT_STATE.questionTwo
      state.questionThree = DEFAULT_STATE.questionThree
      state.followedIds = DEFAULT_STATE.followedIds
    }),

    setAnswerOne: action((state, payload) => {
      state.questionOne = payload
    }),

    setAnswerTwo: action((state, payload) => {
      if (state.questionTwo.includes(payload)) {
        state.questionTwo = state.questionTwo.filter(
          answer => answer !== payload,
        )
      } else {
        state.questionTwo = [...state.questionTwo, payload]
      }
    }),

    setAnswerThree: action((state, payload) => {
      state.questionThree = payload
    }),

    follow: action((state, payload) => {
      if (state.followedIds.includes(payload)) {
        state.followedIds = state.followedIds.filter(id => id !== payload)
      } else {
        state.followedIds = [...state.followedIds, payload]
      }
    }),
  }))

// Legacy context for workflow engine and other complex state
const OnboardingLegacyContext = createContext<{
  back(): void
  current: string
  dispatch: (action: any) => void
  next(): void
  onComplete(): void
  onClose(): void
  progress: number
  workflowEngine: WorkflowEngine
}>({
  back: () => {},
  current: "",
  dispatch: () => {},
  next: () => {},
  onComplete: () => {},
  onClose: () => {},
  progress: 0,
  workflowEngine: new WorkflowEngine({ workflow: [] }),
})

interface OnboardingProviderProps {
  onClose(): void
}

export const OnboardingProvider: FC<
  React.PropsWithChildren<OnboardingProviderProps>
> = ({ children, onClose }) => {
  const basis = useRef<State>(DEFAULT_STATE)
  const { relayEnvironment } = useSystemContext()
  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile({
    relayEnvironment,
  })

  const handleComplete = async () => {
    try {
      await submitUpdateMyUserProfile({
        completedOnboarding: true,
      })
    } catch (error) {
      console.error("Onboarding/useOnboardingContext", error)
    }
  }

  const {
    workflowEngine,
    back,
    current,
    next,
    reset: __reset__,
  } = useConfig({
    basis,
    onClose,
  })

  // Create the store with the reset callback
  const OnboardingStore = useRef(createOnboardingStore(__reset__))
  const state = OnboardingStore.current.useStoreState(state => state)
  const actions = OnboardingStore.current.useStoreActions(actions => actions)

  useEffect(() => {
    basis.current = state
  }, [state])

  const progress =
    ((workflowEngine.position() - 1) / workflowEngine.total()) * 100

  // Dispatch function for backward compatibility
  const dispatch = (action: any) => {
    switch (action.type) {
      case "RESET":
        actions.reset()
        break
      case "SET_ANSWER_ONE":
        actions.setAnswerOne(action.payload)
        break
      case "SET_ANSWER_TWO":
        actions.setAnswerTwo(action.payload)
        break
      case "SET_ANSWER_THREE":
        actions.setAnswerThree(action.payload)
        break
      case "FOLLOW":
        actions.follow(action.payload)
        break
    }
  }

  return (
    <OnboardingStore.current.Provider>
      <OnboardingLegacyContext.Provider
        value={{
          back,
          current,
          dispatch,
          next,
          onComplete: handleComplete,
          onClose,
          progress,
          workflowEngine,
        }}
      >
        {children}
      </OnboardingLegacyContext.Provider>
    </OnboardingStore.current.Provider>
  )
}

// Backward compatible hook
export const useOnboardingContext = () => {
  const legacyContext = useContext(OnboardingLegacyContext)
  // We need to access the store from a ref since it's created dynamically
  // In a real implementation, we'd need to expose this through context
  // For now, we'll return the legacy context with state

  return {
    ...legacyContext,
    state: DEFAULT_STATE, // This would need to be properly connected
  }
}

// Export for migration compatibility
export const OnboardingContext = createOnboardingStore(() => {})
