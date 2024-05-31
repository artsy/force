import { UpdateSubmissionMutationInput } from "__generated__/UpdateConsignSubmissionMutation.graphql"
import { createOrUpdateConsignSubmission } from "Apps/Consign/Routes/SubmissionFlow/Utils/createOrUpdateConsignSubmission"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "System/Router/useRouter"
import { useSystemContext } from "System/SystemContext"

interface Actions {
  goToPreviousStep: () => void
  goToNextStep: () => void
  updateSubmission: (values: UpdateSubmissionMutationInput) => void
}

interface State {
  isFirstStep: boolean
  isLastStep: boolean
  currentStep: string
  submissionID: string | undefined
}
interface SellFlowContextProps {
  actions: Actions
  state: State
}

export const SellFlowContext = createContext<SellFlowContextProps>({} as any)

export const STEPS = [
  "title",
  "photos",
  "details",
  "purchase-history",
  "dimensions",
]

interface SellFlowContextProviderProps {
  children: React.ReactNode
  submissionID?: string
}

export const SellFlowContextProvider: React.FC<SellFlowContextProviderProps> = ({
  children,
  submissionID,
}) => {
  const { match, router } = useRouter()
  const { relayEnvironment } = useSystemContext()
  const [currentStep, setCurrentStep] = useState<string>(
    match.location.pathname.split("/").pop() ?? ""
  )
  const [isFirstStep, setAtFirstStep] = useState<boolean>(false)
  const [isLastStep, setAtLastStep] = useState<boolean>(false)

  useEffect(() => {
    const step = match.location.pathname.split("/").pop() ?? ""
    setCurrentStep(step)
    setAtFirstStep(step === STEPS[0])
    setAtLastStep(step === STEPS[STEPS.length - 1])
  }, [match.location])

  const goToPreviousStep = () => {
    if (!currentStep) return

    const previousStep = STEPS[STEPS.indexOf(currentStep) - 1]

    if (previousStep) {
      navigateToStep(previousStep)
    }
  }

  const goToNextStep = () => {
    if (!currentStep) return

    const nextStep = STEPS[STEPS.indexOf(currentStep) + 1]

    if (nextStep) {
      navigateToStep(nextStep)
    }
  }

  const navigateToStep = (step: string) => {
    if (step) {
      router.push(`/sell2/submissions/${submissionID}/${step}`)
    }
  }

  const updateSubmission = (values: UpdateSubmissionMutationInput) => {
    return createOrUpdateConsignSubmission(relayEnvironment, {
      externalId: submissionID,
      ...values,
    })
  }

  const actions = {
    goToPreviousStep,
    goToNextStep,
    updateSubmission,
  }

  const state = {
    isFirstStep,
    isLastStep,
    currentStep,
    submissionID,
  }

  return (
    <SellFlowContext.Provider value={{ actions, state }}>
      {children}
    </SellFlowContext.Provider>
  )
}

export const useSellFlowContext = () => {
  return useContext(SellFlowContext)
}
