import { combineReducers } from 'redux'

const initialState = {
  artworks: [],
  listView: false
}

function auctionArtworks(state = initialState, action) {
  switch (action.type) {
  case 'UPDATE_ARTWORKS':
    return {
      ...state,
      artworks: action.artworks
    }
  case 'TOGGLE_LIST_VIEW':
    return {
      ...state,
      listView: action.listView
    }
  default:
    return state
  }
}

const auctions = combineReducers({
  auctionArtworks
})

export default auctions
