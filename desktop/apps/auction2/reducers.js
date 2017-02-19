import { combineReducers } from 'redux'

const initialState = {
  artworks: [],
  isListView: false
}

function auctionArtworks(state = initialState, action) {
  switch (action.type) {
  case 'UPDATE_ARTWORKS':
    return {
      ...state,
      artworks: action.payload.artworks
    }
  case 'TOGGLE_LIST_VIEW':
    return {
      ...state,
      isListView: action.payload.isListView
    }
  default:
    return state
  }
}

const auctions = combineReducers({
  auctionArtworks
})

export default auctions
