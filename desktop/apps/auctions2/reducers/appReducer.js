import * as types from 'desktop/apps/auctions2/actions/appActions'
import u from 'updeep'

export const initialState = {
  isMobile: false
}

export default function appReducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.TEST_ACTION: {
      console.log('Hello test action!')

      return u({
        foo: 'bar!'
      }, state)
    }
  }
  return state
}
