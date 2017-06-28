import * as types from 'desktop/apps/auction2/actions/app'
import u from 'updeep'

export const initialState = {
  articles: [],
  auction: {},
  footerItems: [],
  isLiveOpen: undefined,
  isMobile: undefined,
  liveAuctionUrl: x => x,
  me: {},
  sd: {},
  showInfoWindow: true
}

export default function appReducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.SHOW_INFO_WINDOW: {
      return u({
        showInfoWindow: action.payload.showInfoWindow
      }, state)
    }
  }
  return state
}
