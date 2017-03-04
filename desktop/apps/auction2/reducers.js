import { combineReducers } from 'redux'
import u from 'updeep'
import { contains } from 'underscore'
import { data as sd } from 'sharify'

// Reducer saves the default params
// When a checkbox is clicked, the default params change
// On change of params... it refetches the artworks

const initialState = {
  artworks: [],
  total: 0,
  isListView: false,
  isFetchingArtworks: false,
  aggregatedArtists: [],
  aggregatedMediums: [],
  filterParams: {
    size: 50,
    page: 1,
    sale_id: sd.AUCTION.id,
    aggregations: ['TOTAL', 'MEDIUM', 'FOLLOWED_ARTISTS', 'ARTIST'],
    sort: 'lot_number',
    gene_ids: [],
    artist_ids: [],
    ranges: {
      estimate_range: {
        min: 50,
        max: 50000
      }
    }
  }
}

function addItem(list, item) {
  return [].concat(list, [item])
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
  case 'UPDATE_TOTAL':
    return u({
      total: action.payload.total
    }, state)
  case 'UPDATE_AGGREGATED_ARTISTS':
    return u({
      aggregatedArtists: action.payload.aggregatedArtists
    }, state)
  case 'UPDATE_AGGREGATED_MEDIUMS':
    return u({
      aggregatedMediums: action.payload.aggregatedMediums
    }, state)
  case 'UPDATE_ARTIST_ID':
    const artistId = action.payload.artistId
    if (artistId == 'artists-all') {
      return u({
        filterParams: {
          artist_ids: []
        }
      }, state)
    } else if (contains(state.filterParams.artist_ids, artistId)) {
      return u({
        filterParams: {
          artist_ids: u.reject((aa) => { return aa == artistId })
        }
      }, state)
    } else {
      return u({
        filterParams: {
          artist_ids: state.filterParams.artist_ids.concat(artistId)
        }
      }, state)
    }
  default:
    return state
  }
}

const auctions = combineReducers({
  auctionArtworks
})

export default auctions
