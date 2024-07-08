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

export const INITIAL_STEP: SellFlowStep = "artist"
const SUBMIT_STEP: SellFlowStep = "phone-number"

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
  nextStep: SellFlowStep
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
    state.isSubmitStep ? await finishFlow() : await handleNext()
  }

  const goToPreviousStep = () => {
    trackTappedSubmissionBack(submissionID, state.step)

    handlePrev()
  }

  const finishFlow = async () => {
    trackConsignmentSubmitted(submissionID, state.step)

    // When the user clicks on "Submit Artwork" and the Sell flow is finished, we set the state to "SUBMITTED".
    await updateSubmission({
      state: "SUBMITTED",
    })

    push(`/sell/submissions/${submissionID}/thank-you`)
  }

  useEffect(() => {
    const newStep = STEPS[index]

    if (isNewSubmission || !newStep) return

    push(`/sell/submissions/${submissionID}/${newStep}`)
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
        message: "Something went wrong." + ` ${err?.[0]?.message} || ""`,
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
        message: "Something went wrong." + ` ${err?.[0]?.message || ""}`,
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
    nextStep: STEPS[index + 1],
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
