import { combineReducers } from 'redux'

const initialState = {
  artworks: [],
  listView: false
}

function auctionsReducer(state = initialState, action) {
  switch (action.type) {
  case 'UPDATE_ARTWORKS':
    return {
      ...state,
      artworks: action.artworks
    }
  default:
    return state
  }
}

const auctions = combineReducers({
  auctions: auctionsReducer
})

export default auctions
