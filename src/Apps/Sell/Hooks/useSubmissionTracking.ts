import {
  ActionType,
  ContextModule,
  OwnerType,
  PageOwnerType,
} from "@artsy/cohesion"
import { SellFlowStep } from "Apps/Sell/SellFlowContext"
import { useTracking } from "react-tracking"

export const useSubmissionTracking = () => {
  const { trackEvent } = useTracking()

  const trackTappedContinueSubmission = (
    submission_id: string | null | undefined,
    destination_step: string
  ) => {
    trackEvent({
      action: "tappedContinueSubmission",
      context_module: ContextModule.sell,
      context_owner_type: OwnerType.sell,
      submission_id,
      destination_step,
    })
  }

  const trackTappedNewSubmission = () => {
    trackEvent({
      action: "tappedNewSubmission",
      context_module: ContextModule.sell,
      context_owner_type: OwnerType.submitArtworkStepStart,
    })
  }

  const trackTappedStartMyCollection = () => {
    trackEvent({
      action: "tappedStartMyCollection",
      context_module: ContextModule.sell,
      context_owner_type: OwnerType.submitArtworkStepStart,
    })
  }

  const trackTappedSubmissionSaveExit = (
    submission_id: string | null | undefined,
    currentStep: SellFlowStep
  ) => {
    trackEvent({
      action: "tappedSubmissionSaveExit",
      context_module: ContextModule.sell,
      context_owner_type: getOwnerType(currentStep),
      submission_id,
      submission_step: currentStep,
    })
  }

  const trackTappedSubmissionBack = (
    submission_id: string | null | undefined,
    currentStep: SellFlowStep
  ) => {
    trackEvent({
      action: "tappedSubmissionBack",
      context_module: ContextModule.sell,
      context_owner_type: getOwnerType(currentStep),
      submission_id,
      submission_step: currentStep,
    })
  }

  const trackConsignmentSubmitted = (
    submission_id: string | null | undefined,
    currentStep: SellFlowStep
  ) => {
    trackEvent({
      action: "consignmentSubmitted",
      context_module: ContextModule.sell,
      context_owner_type: getOwnerType(currentStep),
      submission_id,
      fieldsProvided: [],
    })
  }

  const trackTappedSubmitAnotherWork = (
    submission_id: string | null | undefined
  ) => {
    trackEvent({
      action: "tappedSubmitAnotherWork",
      context_module: ContextModule.sell,
      context_owner_type: getOwnerType("thank-you"),
      submission_id,
    })
  }

  const trackTappedViewArtworkInMyCollection = (
    submission_id: string | null | undefined
  ) => {
    trackEvent({
      action: "tappedViewArtworkInMyCollection",
      context_module: ContextModule.sell,
      context_owner_type: getOwnerType("thank-you"),
      submission_id,
    })
  }

  const trackTappedContactAdvisor = (
    userId: string | undefined,
    userEmail: string | undefined
  ) => {
    trackEvent({
      action: ActionType.tappedConsignmentInquiry,
      context_module: ContextModule.sell,
      context_owner_type: OwnerType.submitArtworkStepArtistRejected,
      label: "contact an advisor",
      user_id: userId,
      user_email: userEmail,
    })
  }

  return {
    trackTappedContinueSubmission,
    trackTappedNewSubmission,
    trackTappedStartMyCollection,
    trackTappedSubmissionSaveExit,
    trackTappedSubmissionBack,
    trackConsignmentSubmitted,
    trackTappedSubmitAnotherWork,
    trackTappedViewArtworkInMyCollection,
    trackTappedContactAdvisor,
  }
}

const getOwnerType = (currentStep: SellFlowStep): PageOwnerType | null => {
  switch (currentStep) {
    case "artist":
      return OwnerType.submitArtworkStepSelectArtist
    case "title":
      return OwnerType.submitArtworkStepAddTitle
    case "photos":
      return OwnerType.submitArtworkStepAddPhotos
    case "details":
      return OwnerType.submitArtworkStepAddDetails
    case "purchase-history":
      return OwnerType.submitArtworkStepPurchaseHistory
    case "dimensions":
      return OwnerType.submitArtworkStepAddDimensions
    case "phone-number":
      return OwnerType.submitArtworkStepAddPhoneNumber
    case "thank-you":
      return OwnerType.submitArtworkStepCompleteYourSubmission
    default:
      return null
  }
}
