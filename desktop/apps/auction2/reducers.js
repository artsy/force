import { combineReducers } from 'redux'
import u from 'updeep'

const initialState = {
  artworks: [],
  isListView: false
}

function auctionArtworks(state = initialState, action) {
  switch (action.type) {
  case 'UPDATE_ARTWORKS':
    return u({
      artworks: action.payload.artworks
    }, state)
  case 'TOGGLE_LIST_VIEW':
    return u({
      isListView: action.payload.isListView
    }, state)
  default:
    return state
  }
}

const auctions = combineReducers({
  auctionArtworks
})

export default auctions
