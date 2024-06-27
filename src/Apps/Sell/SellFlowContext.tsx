import { useToasts } from "@artsy/palette"
import { CreateSubmissionMutationInput } from "__generated__/CreateConsignSubmissionMutation.graphql"
import { UpdateSubmissionMutationInput } from "__generated__/UpdateConsignSubmissionMutation.graphql"
import { useCreateSubmissionMutation$data } from "__generated__/useCreateSubmissionMutation.graphql"
import { useUpdateSubmissionMutation$data } from "__generated__/useUpdateSubmissionMutation.graphql"
import { useSubmissionTracking } from "Apps/Sell/Hooks/useSubmissionTracking"
import { useCreateSubmission } from "Apps/Sell/Mutations/useCreateSubmission"
import { useUpdateSubmission } from "Apps/Sell/Mutations/useUpdateSubmission"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "System/Hooks/useRouter"
import { useCursor } from "use-cursor"
import createLogger from "Utils/logger"

const logger = createLogger("SellFlowContext.tsx")

export const STEPS = [
  "artist",
  "title",
  "photos",
  "details",
  "purchase-history",
  "dimensions",
  "phone-number",
  "thank-you",
] as const

const INITIAL_STEP: SellFlowStep = "artist"
const SUBMIT_STEP: SellFlowStep = "dimensions"

export type SellFlowStep = typeof STEPS[number]

interface Actions {
  goToPreviousStep: () => void
  goToNextStep: () => void
  finishFlow: () => void
  createSubmission: (
    values: CreateSubmissionMutationInput
  ) => Promise<useCreateSubmissionMutation$data>
  updateSubmission: (
    values: UpdateSubmissionMutationInput
  ) => Promise<useUpdateSubmissionMutation$data>
  setLoading: (loading: boolean) => void
}

interface State {
  isFirstStep: boolean
  isLastStep: boolean
  isSubmitStep: boolean
  index: number
  step: SellFlowStep
  submissionID: string | undefined
  devMode: boolean
  // loading is used to show a loading spinner on the bottom form navigation
  // when images are being uploaded
  loading: boolean
}
interface SellFlowContextProps {
  actions: Actions
  state: State
}

export const SellFlowContext = createContext<SellFlowContextProps>({
  loading: false,
} as any)

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
    trackConsignmentSubmitted,
    trackTappedSubmissionBack,
  } = useSubmissionTracking()
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
  const [loading, setLoading] = useState(false)

  const isNewSubmission = !submissionID

  const stepFromURL = isNewSubmission
    ? INITIAL_STEP
    : (match.location.pathname.split("/").pop() as SellFlowStep)

  const initialIndex = STEPS.indexOf(stepFromURL || STEPS[0])

  const { index, handleNext, handlePrev } = useCursor({
    max: STEPS.length,
    initialCursor: initialIndex,
  })

  const goToNextStep = async () => {
    handleNext()
  }

  const goToPreviousStep = () => {
    trackTappedSubmissionBack(submissionID, state.step)

    handlePrev()
  }

  const finishFlow = async () => {
    trackConsignmentSubmitted(submissionID, state.step)

    await updateSubmission({
      state: state.isSubmitStep ? "SUBMITTED" : undefined,
    })

    push(`/sell2/submissions/${submissionID}/thank-you`)
  }

  useEffect(() => {
    if (isNewSubmission) return

    push(`/sell2/submissions/${submissionID}/${STEPS[index]}`)
  }, [push, index, isNewSubmission, submissionID])

  const createSubmission = (values: CreateSubmissionMutationInput) => {
    const response = submitCreateSubmissionMutation({
      variables: {
        input: values,
      },
    })

    response.catch(err => {
      logger.error("Error creating submission.", err)
      sendToast({
        variant: "error",
        message: err?.[0]?.message || "Something went wrong.",
      })
      throw err
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
      logger.error("Error updating submission.", err)
      sendToast({
        variant: "error",
        message: err?.[0]?.message || "Something went wrong.",
      })
      throw err
    })

    return response
  }

  const actions = {
    goToPreviousStep,
    goToNextStep,
    finishFlow,
    createSubmission,
    updateSubmission,
    setLoading,
  }

  const state = {
    isFirstStep: index === 0,
    isLastStep: index === STEPS.length - 1,
    isSubmitStep: index === STEPS.indexOf(SUBMIT_STEP),
    index,
    step: STEPS[index],
    submissionID,
    devMode,
    loading,
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
