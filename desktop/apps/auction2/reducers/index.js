import app, { initialState as appInitialState } from 'desktop/apps/auction2/reducers/app'
import filter, { initialState as filterInitialState } from 'desktop/apps/auction2/reducers/filter'
import { combineReducers } from 'redux'
import { composeReducers, responsiveWindowReducer } from 'desktop/components/react/responsive_window'

export const initialState = {
  ...appInitialState,
  ...filterInitialState
}

export default combineReducers({
  app: composeReducers(app, responsiveWindowReducer),
  auctionArtworks: filter
})
