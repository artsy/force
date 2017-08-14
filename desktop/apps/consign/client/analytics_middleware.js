import * as actions from './actions'
import analyticsHooks from '../../../lib/analytics_hooks.coffee'
import { data as sd } from 'sharify'

const analyticsMiddleware = store => next => action => {
  const result = next(action)
  const nextState = store.getState()

  // track certain types of actions
  switch (action.type) {
    case actions.UPDATE_USER: {
      const {
        user,
        accountCreated
      } = action.payload
      analyticsHooks.trigger('consignment:account:created', {
        id: user.id,
        email: user.email,
        accountCreated: accountCreated
      })
      return result
    }
    case actions.SUBMISSION_CREATED: {
      analyticsHooks.trigger(
        'consignment:submitted',
        {
          submissionId: action.payload.submissionId
        }
      )
      return result
    }
    case actions.SUBMISSION_COMPLETED: {
      const submissionId = nextState.submissionFlow.submission.id
      const assetIds = nextState.submissionFlow.assetIds
      analyticsHooks.trigger(
        'consignment:completed',
        {
          submissionId,
          assetIds
        }
      )
      return result
    }
    case actions.SUBMISSION_ERROR: {
      let errors

      const { errorType } = action.payload
      if (errorType === 'validation') {
        errors = nextState.form.describeWork.syncErrors
      } else if (errorType === 'convection_create') {
        errors = 'Error creating submission'
      } else if (errorType === 'convection_complete_submission') {
        errors = 'Error completing submission'
      }

      analyticsHooks.trigger(
        'consignment:submission:error',
        { type: errorType, errors }
      )
      return result
    }
    case actions.SUBMIT_ARTIST: {
      const artistId = nextState.submissionFlow.inputs.artist_id
      analyticsHooks.trigger(
        'consignment:artist:confirmed',
        { artistId }
      )
      return result
    }
    default: return result
  }
}

export default analyticsMiddleware
