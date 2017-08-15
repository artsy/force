import * as types from 'desktop/apps/auctions2/actions/appActions'
import u from 'updeep'
import { filter, reject } from 'underscore'

export const initialState = {
  isMobile: false,
  auctions: {
    live: [],
    timed: []
  },
  isFetchingAuctions: false
}

export default function appReducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_AUCTIONS_FAILURE: {
      return u({
        isFetchingAuctions: false
      }, state)
    }
    case types.GET_AUCTIONS_REQUEST: {
      return u({
        isFetchingAuctions: true
      }, state)
    }
    case types.GET_AUCTIONS_SUCCESS: {
      const auctions = action.payload.auctions
      const isLive = function(auction){return auction.live_start_at ? true : false}
      const live = filter(auctions, isLive)
      const timed = reject(auctions, isLive)
      return u({
        isFetchingAuctions: false,
        auctions: {
          live: state.auctions.live.concat(live),
          timed: state.auctions.timed.concat(timed)
        }
      }, state)
    }
  }
  return state
}
