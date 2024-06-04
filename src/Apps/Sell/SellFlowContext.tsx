import { UpdateSubmissionMutationInput } from "__generated__/UpdateConsignSubmissionMutation.graphql"
import { useUpdateSubmissionMutation$data } from "__generated__/useUpdateSubmissionMutation.graphql"
import { useUpdateSubmission } from "Apps/Sell/Mutations/useUpdateSubmission"
import { createContext, useContext, useEffect } from "react"
import { useRouter } from "System/Router/useRouter"
import { useCursor } from "use-cursor"

export const STEPS = [
  "title",
  "photos",
  "details",
  "purchase-history",
  "dimensions",
]

interface Actions {
  goToPreviousStep: () => void
  goToNextStep: () => void
  updateSubmission: (values: UpdateSubmissionMutationInput) => Promise<useUpdateSubmissionMutation$data>
}

interface State {
  isFirstStep: boolean
  isLastStep: boolean
  index: number
  step: string
  submissionID: string | undefined
}
interface SellFlowContextProps {
  actions: Actions
  state: State
}

export const SellFlowContext = createContext<SellFlowContextProps>({} as any)

interface SellFlowContextProviderProps {
  children: React.ReactNode
  submissionID?: string
}

export const SellFlowContextProvider: React.FC<SellFlowContextProviderProps> = ({
  children,
  submissionID,
}) => {
  const { match, router } = useRouter()

  const { submitMutation: submitUpdateSubmissionMutation } = useUpdateSubmission()

  const stepFromURL = match.location.pathname.split("/").pop()
  const initialIndex = STEPS.indexOf(stepFromURL || STEPS[0])

  const { index, handleNext, handlePrev } = useCursor({ max: STEPS.length, initialCursor: initialIndex })

  useEffect(() => {
    router.push(`/sell2/submissions/${submissionID}/${STEPS[index]}`)
  }, [router, submissionID, index])

  const updateSubmission = async (values: UpdateSubmissionMutationInput): Promise<useUpdateSubmissionMutation$data> => {
    return submitUpdateSubmissionMutation({
      variables: {
        input: {
          externalId: submissionID,
          ...values
        } as UpdateSubmissionMutationInput
      }
    })
  }

  const actions = {
    goToPreviousStep: handlePrev,
    goToNextStep: handleNext,
    updateSubmission,
  }

  const state = {
    isFirstStep: index === 0,
    isLastStep: index === STEPS.length - 1,
    index,
    step: STEPS[index],
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
