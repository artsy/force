import { useToasts } from "@artsy/palette"
import { CreateSubmissionMutationInput } from "__generated__/CreateConsignSubmissionMutation.graphql"
import { UpdateSubmissionMutationInput } from "__generated__/UpdateConsignSubmissionMutation.graphql"
import { useCreateSubmissionMutation$data } from "__generated__/useCreateSubmissionMutation.graphql"
import { useUpdateSubmissionMutation$data } from "__generated__/useUpdateSubmissionMutation.graphql"
import { useCreateSubmission } from "Apps/Sell/Mutations/useCreateSubmission"
import { useUpdateSubmission } from "Apps/Sell/Mutations/useUpdateSubmission"
import { createContext, useContext, useEffect } from "react"
import { useRouter } from "System/Hooks/useRouter"
import { useCursor } from "use-cursor"

export const STEPS = [
  "artist",
  "title",
  "photos",
  "details",
  "purchase-history",
  "dimensions",
]

interface Actions {
  goToPreviousStep: () => void
  goToNextStep: () => void
  createSubmission: (
    values: CreateSubmissionMutationInput
  ) => Promise<useCreateSubmissionMutation$data>
  updateSubmission: (
    values: UpdateSubmissionMutationInput
  ) => Promise<useUpdateSubmissionMutation$data>
}

interface State {
  isFirstStep: boolean
  isLastStep: boolean
  index: number
  step: string
  submissionID: string | undefined
  devMode: boolean
}
interface SellFlowContextProps {
  actions: Actions
  state: State
}

export const SellFlowContext = createContext<SellFlowContextProps>({} as any)

interface SellFlowContextProviderProps {
  children: React.ReactNode
  submissionID?: string
  devMode?: boolean
}

export const SellFlowContextProvider: React.FC<SellFlowContextProviderProps> = ({
  children,
  submissionID,
  devMode = false,
}) => {
  const {
    match,
    router: { push },
  } = useRouter()
  const {
    submitMutation: submitUpdateSubmissionMutation,
  } = useUpdateSubmission()
  const {
    submitMutation: submitCreateSubmissionMutation,
  } = useCreateSubmission()
  const { sendToast } = useToasts()

  const stepFromURL = match.location.pathname.split("/").pop()
  const initialIndex = STEPS.indexOf(stepFromURL || STEPS[0])

  const { index, handleNext, handlePrev } = useCursor({
    max: STEPS.length,
    initialCursor: initialIndex,
  })

  const goToNextStep = async () => {
    handleNext()
  }

  const goToPreviousStep = () => {
    handlePrev()
  }

  useEffect(() => {
    if (!submissionID) return

    push(`/sell2/submissions/${submissionID}/${STEPS[index]}`)
  }, [push, submissionID, index])

  const createSubmission = (values: CreateSubmissionMutationInput) => {
    const response = submitCreateSubmissionMutation({
      variables: {
        input: values,
      },
    })

    response.catch(err => {
      sendToast({
        variant: "error",
        message: err.message ?? "Something went wrong.",
      })
    })

    return response
  }

  const updateSubmission = (
    values: UpdateSubmissionMutationInput
  ): Promise<useUpdateSubmissionMutation$data> => {
    const response = submitUpdateSubmissionMutation({
      variables: {
        input: {
          externalId: submissionID,
          ...values,
        } as UpdateSubmissionMutationInput,
      },
    })

    response.catch(err => {
      sendToast({
        variant: "error",
        message: err.message ?? "Something went wrong.",
      })
    })

    return response
  }

  const actions = {
    goToPreviousStep,
    goToNextStep,
    createSubmission,
    updateSubmission,
  }

  const state = {
    isFirstStep: index === 0,
    isLastStep: index === STEPS.length - 1,
    index,
    step: STEPS[index],
    submissionID,
    devMode,
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
