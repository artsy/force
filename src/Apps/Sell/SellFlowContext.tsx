import { useToasts } from "@artsy/palette"
import {
  ConsignmentSubmissionStateAggregation,
  CreateSubmissionMutationInput,
} from "__generated__/CreateConsignSubmissionMutation.graphql"
import { SubmissionRoute_submission$data } from "__generated__/SubmissionRoute_submission.graphql"
import { UpdateSubmissionMutationInput } from "__generated__/UpdateConsignSubmissionMutation.graphql"
import { useCreateSubmissionMutation$data } from "__generated__/useCreateSubmissionMutation.graphql"
import { MyCollectionUpdateArtworkInput } from "__generated__/useUpdateArtworkMutation.graphql"
import { useUpdateMyCollectionArtworkMutation$data } from "__generated__/useUpdateMyCollectionArtworkMutation.graphql"
import { useUpdateSubmissionMutation$data } from "__generated__/useUpdateSubmissionMutation.graphql"
import { useSubmissionTracking } from "Apps/Sell/Hooks/useSubmissionTracking"
import { useCreateSubmission } from "Apps/Sell/Mutations/useCreateSubmission"
import { useUpdateMyCollectionArtwork } from "Apps/Sell/Mutations/useUpdateMyCollectionArtwork"
import { useUpdateSubmission } from "Apps/Sell/Mutations/useUpdateSubmission"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { useRouter } from "System/Hooks/useRouter"
import { useCursor } from "use-cursor"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"

const logger = createLogger("SellFlowContext.tsx")

// If a submission is in one of these states, we will only show the basic steps.
const BASIC_FLOW_STATES: ConsignmentSubmissionStateAggregation[] = [
  "DRAFT",
  "SUBMITTED",
]
// If a submission is in one of these states, additional information is required.
export const PRE_SUBMITTED_STEPS: ConsignmentSubmissionStateAggregation[] = [
  "DRAFT",
  "APPROVED",
]

export const BASIC_STEPS = [
  "artist",
  "title",
  "photos",
  "details",
  "purchase-history",
  "dimensions",
  "phone-number",
] as const

const POST_APPROVAL_STEPS = [
  "shipping-location",
  "frame",
  "additional-documents",
  "condition",
] as const

const THANK_YOU_STEP = "thank-you"
const POST_APPROVAL_THANK_YOU_STEP = "thank-you-post-approval"

export const ALL_STEPS = [
  ...BASIC_STEPS,
  ...POST_APPROVAL_STEPS,
  THANK_YOU_STEP,
  POST_APPROVAL_THANK_YOU_STEP,
]

export const INITIAL_STEP: SellFlowStep = BASIC_STEPS[0]
export const INITIAL_EDIT_STEP: SellFlowStep = "title"
export const INITIAL_POST_APPROVAL_STEP: SellFlowStep = POST_APPROVAL_STEPS[0]
export type SellFlowStep =
  | typeof BASIC_STEPS[number]
  | typeof POST_APPROVAL_STEPS[number]
  | typeof THANK_YOU_STEP
  | typeof POST_APPROVAL_THANK_YOU_STEP

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
  updateMyCollectionArtwork: (
    values: MyCollectionUpdateArtworkInput
  ) => Promise<useUpdateMyCollectionArtworkMutation$data>
  setLoading: (loading: boolean) => void
}

interface State {
  isFirstStep: boolean
  isLastStep: boolean
  isSubmitStep: boolean
  isExtended: boolean
  step: SellFlowStep
  steps: SellFlowStep[]
  nextStep: SellFlowStep
  submission: SubmissionRoute_submission$data | undefined
  devMode: boolean
  // loading is used to show a loading spinner on the bottom form navigation when images are being uploaded
  loading: boolean
}
interface SellFlowContextProps {
  actions: Actions
  state: State
}

export const SellFlowContext = createContext<SellFlowContextProps>({} as any)

interface SellFlowContextProviderProps {
  children: React.ReactNode
  submission?: SubmissionRoute_submission$data
  devMode?: boolean
}

export const SellFlowContextProvider: React.FC<SellFlowContextProviderProps> = ({
  children,
  submission,
  devMode = false,
}) => {
  const enablePostApprovalSubmissionFlow = useFeatureFlag(
    "onyx_post_approval_submission_flow"
  )
  const {
    trackConsignmentSubmitted,
    trackTappedSubmissionBack,
  } = useSubmissionTracking()
  const { match, router } = useRouter()
  const {
    submitMutation: submitUpdateSubmissionMutation,
  } = useUpdateSubmission()
  const {
    submitMutation: submitUpdateMyCollectionArtworkMutation,
  } = useUpdateMyCollectionArtwork()
  const {
    submitMutation: submitCreateSubmissionMutation,
  } = useCreateSubmission()
  const { sendToast } = useToasts()
  const [loading, setLoading] = useState(false)

  const isNewSubmission = !submission?.externalId

  const stepFromURL = isNewSubmission
    ? INITIAL_STEP
    : (match.location.pathname.split("/").pop() as SellFlowStep)

  const isExtended =
    !!enablePostApprovalSubmissionFlow &&
    !!submission?.state &&
    !BASIC_FLOW_STATES.includes(submission?.state)

  const steps = useMemo(
    () => [
      ...BASIC_STEPS,
      ...(isExtended ? POST_APPROVAL_STEPS : []),
      isExtended ? POST_APPROVAL_THANK_YOU_STEP : THANK_YOU_STEP,
    ],
    [isExtended]
  )

  const initialIndex = steps.indexOf(stepFromURL || INITIAL_STEP)

  const { index, handleNext, handlePrev } = useCursor({
    max: steps.length,
    initialCursor: initialIndex,
  })

  const goToNextStep = async () => {
    state.isSubmitStep ? await finishFlow() : await handleNext()
  }

  const goToPreviousStep = () => {
    trackTappedSubmissionBack(submission?.internalID, state.step)

    handlePrev()
  }

  const finishFlow = async () => {
    trackConsignmentSubmitted(submission?.internalID, state.step)

    if (submission?.state === "DRAFT") {
      await updateSubmission({
        state: "SUBMITTED",
      })
    } else if (submission?.state === "APPROVED") {
      await updateSubmission({
        state: "RESUBMITTED",
      })
    }

    handleNext()
  }

  useEffect(() => {
    const newStep = steps[index]

    // If we are navigating away from the Sell flow, we don't want to redirect
    const isSellFlowRoute = match.location.pathname.includes(
      "/sell/submissions"
    )

    if (
      isNewSubmission ||
      !newStep ||
      !isSellFlowRoute ||
      // If we are already on the correct step, don't redirect
      match.location.pathname.includes(newStep)
    )
      return

    router.push(`/sell/submissions/${submission?.externalId}/${newStep}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isNewSubmission, submission, steps])

  const createSubmission = (values: CreateSubmissionMutationInput) => {
    const response = submitCreateSubmissionMutation({
      variables: {
        input: {
          sessionID: getENV("SESSION_ID"),
          ...values,
        },
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
          externalId: submission?.externalId,
          sessionID: getENV("SESSION_ID"),
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

  const updateMyCollectionArtwork = (
    values: MyCollectionUpdateArtworkInput
  ): Promise<useUpdateMyCollectionArtworkMutation$data> => {
    const response = submitUpdateMyCollectionArtworkMutation({
      variables: {
        input: {
          ...values,
        } as MyCollectionUpdateArtworkInput,
      },
    })

    response
      .then(res => {
        const error =
          res.myCollectionUpdateArtwork?.artworkOrError?.mutationError

        if (error) throw [error]
      })
      .catch(err => {
        logger.error("Error updating submission's my collection artwork..", err)
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
    updateMyCollectionArtwork,
    setLoading,
  }

  const state = {
    isFirstStep: index === 0,
    isLastStep: index === steps.length - 1,
    isSubmitStep: index === steps.length - 2,
    isExtended,
    step: steps[index] as SellFlowStep,
    steps: steps as SellFlowStep[],
    nextStep: steps[index + 1] as SellFlowStep,
    submission,
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
