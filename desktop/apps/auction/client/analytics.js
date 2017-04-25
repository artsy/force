import * as actions from './actions'
import analyticsHooks from '../../../lib/analytics_hooks.coffee'
import { contains } from 'underscore'

export const analyticsMiddleware = store => next => action => {
  const result = next(action)
  const nextState = store.getState()

  // track certain types of actions
  switch(action.type) {
    case actions.UPDATE_MEDIUM_ID: {
      trackParamChange({ medium: action.payload.mediumId }, nextState)
      return result
    }
    case actions.UPDATE_ARTIST_ID: {
      trackParamChange({ artist: action.payload.artistId }, nextState)
      return result
    }
    case actions.UPDATE_SORT: {
      trackParamChange({ sort: action.payload.sort }, nextState)
      return result
    }
    case actions.UPDATE_ESTIMATE_RANGE: {
      trackParamChange({
        price: nextState.auctionArtworks.filterParams.estimate_range
      }, nextState)
      return result
    }
    default: return result
  }
}

function trackParamChange(changed, newState) {
  const { filterParams } = newState.auctionArtworks
  analyticsHooks.trigger(
    'auction:artworks:params:change',
    {
      current: [
        { artists: filterParams.artist_ids },
        { medium: filterParams.gene_ids },
        { sort: filterParams.sort },
        { price: filterParams.estimate_range }
      ],
      changed
    }
  )
}
