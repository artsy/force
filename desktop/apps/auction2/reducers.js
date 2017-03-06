import { combineReducers } from 'redux'
import u from 'updeep'
import { contains } from 'underscore'
import { data as sd } from 'sharify'
import * as actions from './actions'

const initialState = {
  artworks: [],
  total: 0,
  isListView: false,
  isFetchingArtworks: false,
  sortMap: {
    "lot_number": "Lot Number (asc.)",
    "-lot_number": "Lot Number (desc.)",
    "-searchable_estimate": "Most Expensive",
    "searchable_estimate": "Least Expensive"
  },
  aggregatedArtists: [],
  aggregatedMediums: [],
  filterParams: {
    size: 50,
    page: 1,
    sale_id: sd.AUCTION.id,
    aggregations: ['TOTAL', 'MEDIUM', 'FOLLOWED_ARTISTS', 'ARTIST'],
    sort: '-lot_number',
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
  case actions.UPDATE_ARTWORKS:
    return u({
      artworks: action.payload.artworks
    }, state)
  case actions.TOGGLE_LIST_VIEW:
    return u({
      isListView: action.payload.isListView
    }, state)
  case actions.UPDATE_TOTAL:
    return u({
      total: action.payload.total
    }, state)
  case actions.UPDATE_SORT:
    return u({
      filterParams: {
        sort: action.payload.sort
      }
    }, state)
  case actions.UPDATE_AGGREGATED_ARTISTS:
    return u({
      aggregatedArtists: action.payload.aggregatedArtists
    }, state)
  case actions.UPDATE_AGGREGATED_MEDIUMS:
    return u({
      aggregatedMediums: action.payload.aggregatedMediums
    }, state)
  case actions.UPDATE_ARTIST_ID:
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
  case actions.UPDATE_MEDIUM_ID:
    const mediumId = action.payload.mediumId
    if (mediumId == 'mediums-all') {
      return u({
        filterParams: {
          gene_ids: []
        }
      }, state)
    } else if (contains(state.filterParams.gene_ids, mediumId)) {
      return u({
        filterParams: {
          gene_ids: u.reject((mm) => { return mm == mediumId })
        }
      }, state)
    } else {
      return u({
        filterParams: {
          gene_ids: state.filterParams.gene_ids.concat(mediumId)
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
