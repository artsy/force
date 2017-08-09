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
      const artistId = nextState.submissionFlow.inputs.artist_id
      analyticsHooks.trigger(
        'consignment:submitted',
        {
          artistId,
          submissionId: action.payload.submissionId
        }
      )
      return result
    }
    case actions.SUBMISSION_COMPLETED: {
      const artistId = nextState.submissionFlow.inputs.artist_id
      const submissionId = nextState.submissionFlow.inputs.submission.id
      analyticsHooks.trigger(
        'consignment:completed',
        {
          artist_id: artistId,
          submission_id: submissionId,
          asset_ids: ['TODO']
        }
      )
      return result
    }
    case actions.SUBMISSION_ERROR: {
      analyticsHooks.trigger(
        'consignment_failed_to_submit',
        {
          artist_id: 'TODO',
          submission_id: 'TODO',
          error: 'TODO'
        }
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
