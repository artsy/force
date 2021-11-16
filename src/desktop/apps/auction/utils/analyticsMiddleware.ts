import * as actions from "desktop/apps/auction/actions/artworkBrowser"
import { isEqual } from "underscore"
import { data as sd } from "sharify"

export const analyticsMiddleware = store => next => action => {
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
  const { _id, id } = sd.AUCTION

  const { filterParams } = newState.artworkBrowser
  const current = [
    { artists: trackableArtistIds(changed, filterParams) },
    { medium: filterParams.gene_ids },
    { sort: filterParams.sort },
    { price: filterParams.estimate_range },
  ]

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  window.analytics.track("Commercial filter params changed", {
    sale_id: _id,
    auction_slug: id,
    user_id: USER_ID,
    current: JSON.stringify(current),
    changed: JSON.stringify(changed),
  })
}
