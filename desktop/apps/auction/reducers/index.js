import app, { initialState as appInitialState } from 'desktop/apps/auction/reducers/app'
import filter, { initialState as filterInitialState } from 'desktop/apps/auction/reducers/artworkBrowser'
import { combineReducers } from 'redux'
import { composeReducers, responsiveWindowReducer } from 'desktop/components/react/responsive_window'

export const initialState = {
  ...appInitialState,
  ...filterInitialState
}

export default combineReducers({
  app: composeReducers(app, responsiveWindowReducer),
  artworkBrowser: filter
})
