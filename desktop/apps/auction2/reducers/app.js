export const initialState = {
  articles: [],
  auction: {},
  footerItems: [],
  isLiveOpen: false,
  isMobile: false,
  liveAuctionUrl: x => x,
  me: {},
  sd: {}
}

export default function appReducer (state = initialState, action = {}) {
  return state
}
