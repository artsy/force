export const initialState = {
  articles: [],
  auction: {},
  footerItems: [],
  isLiveOpen: undefined,
  isMobile: undefined,
  liveAuctionUrl: x => x,
  me: {},
  sd: {}
}

export default function appReducer (state = initialState, action = {}) {
  return state
}
