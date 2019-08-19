import * as types from "desktop/apps/auction/actions/app"
import u from "updeep"

export const initialState = {
  articles: [],
  auction: {},
  footerItems: [],
  isEcommerceSale: undefined,
  isLiveOpen: undefined,
  isMobile: undefined,
  liveAuctionUrl: x => x,
  me: {},
  sd: {},
  showInfoWindow: false,
  modalType: undefined,
}

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SHOW_INFO_WINDOW: {
      return u(
        {
          showInfoWindow: action.payload.showInfoWindow,
        },
        state
      )
    }
    case types.SHOW_MODAL: {
      return u({ modalType: action.payload.modalType }, state)
    }
  }
  return state
}
