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
      window.analytics.track("consignment_submitted", {
        contextPath: nextState.submissionFlow.contextPath,
        subject: nextState.submissionFlow.subject,
        submissionId: action.payload.submissionId,
        userEmail: sd.CURRENT_USER.email,
        userId: sd.CURRENT_USER.id,
      })
      return result
    }

    case actions.SUBMISSION_COMPLETED: {
      const submissionId = nextState.submissionFlow.submission.id
      const assetIds = nextState.submissionFlow.assetIds
      window.analytics.track("consignment_asset_uploaded", {
        assetIds,
        submissionId,
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

      window.analytics.track("consignment_failed_to_submit", {
        errors,
        type: errorType,
      })
      return result
    }
    case actions.SUBMIT_ARTIST: {
      const artistId = nextState.submissionFlow.inputs.artist_id
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
