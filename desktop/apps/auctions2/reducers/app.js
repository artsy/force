import * as types from 'desktop/apps/auction/actions/app'
import u from 'updeep'

export const initialState = {
  isMobile: undefined
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
