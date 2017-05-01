import * as actions from './actions'
import analyticsHooks from '../../../lib/analytics_hooks.coffee'
import { isEqual } from 'underscore'

const analyticsMiddleware = store => next => action => {
  const result = next(action)
  const nextState = store.getState()

  // track certain types of actions
  switch (action.type) {
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

function trackableArtistIds (changed, filterParams) {
  if (isEqual(changed, { artist: 'artists-you-follow' })) {
    return ['artists-you-follow']
  } else {
    return filterParams.artist_ids
  }
}

function trackParamChange (changed, newState) {
  const { filterParams } = newState.auctionArtworks
  analyticsHooks.trigger(
    'auction:artworks:params:change',
    {
      current: [
        { artists: trackableArtistIds(changed, filterParams) },
        { medium: filterParams.gene_ids },
        { sort: filterParams.sort },
        { price: filterParams.estimate_range }
      ],
      changed
    }
  )
}

export default analyticsMiddleware
