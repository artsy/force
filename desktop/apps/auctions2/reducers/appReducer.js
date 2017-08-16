import * as types from 'desktop/apps/auctions2/actions/appActions'
import u from 'updeep'
import { filter, reject } from 'underscore'

export const initialState = {
  isMobile: false,
  auctions: {
    liveIntegration: [],
    timed: []
  },
  isFetchingAuctions: false
}

export default function appReducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_AUCTIONS_REQUEST: {
      return u({
        isFetchingAuctions: true
      }, state)
    }
    case types.GET_AUCTIONS_FAILURE: {
      return u({
        isFetchingAuctions: false
      }, state)
    }
    case types.GET_AUCTIONS_SUCCESS: {
      const auctions = action.payload.auctions
      const isLiveIntegration = (auction) => auction.live_start_at
      const liveIntegration = filter(auctions, isLiveIntegration)
      const timed = reject(auctions, isLiveIntegration)
      return u({
        isFetchingAuctions: false,
        auctions: {
          liveIntegration: state.auctions.liveIntegration.concat(liveIntegration),
          timed: state.auctions.timed.concat(timed)
        }
      }, state)
    }
  }
  return state
}
