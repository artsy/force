import app, { initialState as appInitialState } from 'desktop/apps/auctions2/reducers/app'
import { combineReducers } from 'redux'
import { composeReducers, responsiveWindowReducer } from 'desktop/components/react/responsive_window'

export const initialState = {
  ...appInitialState
}

export default combineReducers({
  app: composeReducers(app, responsiveWindowReducer)
})
