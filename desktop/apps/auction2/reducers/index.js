import { combineReducers } from 'redux'
import app, { initialState as appInitialState } from 'desktop/apps/auction2/reducers/app'
import filter, { initialState as filterInitialState } from 'desktop/apps/auction2/reducers/filter'

// State
export const initialState = {
  ...appInitialState,
  ...filterInitialState
}

// Reducers
export default combineReducers({
  app,
  auctionArtworks: filter
})
