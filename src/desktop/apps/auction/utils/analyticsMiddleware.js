import * as actions from "desktop/apps/auction/actions/artworkBrowser"
import { isEqual } from "underscore"
import { data as sd } from "sharify"

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
      trackParamChange(
        {
          price: nextState.artworkBrowser.filterParams.estimate_range,
        },
        nextState
      )
      return result
    }
    default:
      return result
  }
}

function trackableArtistIds(changed, filterParams) {
  if (isEqual(changed, { artist: "artists-you-follow" })) {
    return ["artists-you-follow"]
  } else {
    return filterParams.artist_ids
  }
}

function trackParamChange(changed, newState) {
  const USER_ID = sd.CURRENT_USER ? sd.CURRENT_USER.id : null
  const AUCTION_ID = sd.AUCTION && sd.AUCTION.id

  const { filterParams } = newState.artworkBrowser
  const current = [
    { artists: trackableArtistIds(changed, filterParams) },
    { medium: filterParams.gene_ids },
    { sort: filterParams.sort },
    { price: filterParams.estimate_range },
  ]

  window.analytics.track("Commercial filter params changed", {
    sale_id: AUCTION_ID,
    auction_slug: sd.AUCTION.slug,
    user_id: USER_ID,
    current,
    changed,
  })
}

export default analyticsMiddleware
