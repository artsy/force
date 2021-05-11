import * as actions from "./actions"
import { data as sd } from "sharify"

const analyticsMiddleware = store => next => action => {
  const result = next(action)
  const nextState = store.getState()

  // track certain types of actions
  switch (action.type) {
    case actions.UPDATE_USER: {
      return result
    }

    case actions.SUBMISSION_CREATED: {
      // @ts-expect-error STRICT_NULL_CHECK
      window.analytics.track("consignment_submitted", {
        contextPath: nextState.submissionFlow.contextPath,
        submissionId: action.payload.submissionId,
        subject: nextState.submissionFlow.subject,
        userId: sd.CURRENT_USER.id,
        userEmail: sd.CURRENT_USER.email,
      })
      return result
    }

    case actions.SUBMISSION_COMPLETED: {
      const submissionId = nextState.submissionFlow.submission.id
      const assetIds = nextState.submissionFlow.assetIds
      // @ts-expect-error STRICT_NULL_CHECK
      window.analytics.track("consignment_asset_uploaded", {
        submissionId,
        assetIds,
      })
      return result
    }
    case actions.SUBMISSION_ERROR: {
      let errors

      const { errorType } = action.payload
      if (errorType === "validation") {
        errors = nextState.form.describeWork.syncErrors
      } else if (errorType === "convection_create") {
        errors = "Error creating submission"
      } else if (errorType === "convection_complete_submission") {
        errors = "Error completing submission"
      }

      // @ts-expect-error STRICT_NULL_CHECK
      window.analytics.track("consignment_failed_to_submit", {
        type: errorType,
        errors,
      })
      return result
    }
    case actions.SUBMIT_ARTIST: {
      const artistId = nextState.submissionFlow.inputs.artist_id
      // @ts-expect-error STRICT_NULL_CHECK
      window.analytics.track("consignment_artist_confirmed", {
        artist_id: artistId,
      })
      return result
    }
    default:
      return result
  }
}

export default analyticsMiddleware
