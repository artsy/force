import * as actions from './actions'
import { combineReducers } from 'redux'
import { data as sd } from 'sharify'
import { contains } from 'underscore'
import u from 'updeep'

const initialState = {
  aggregatedArtists: [],
  aggregatedMediums: [],
  artworks: [],
  filterParams: {
    aggregations: ['ARTIST', 'FOLLOWED_ARTISTS', 'MEDIUM', 'TOTAL'],
    artist_ids: [],
    estimate_range: '',
    gene_ids: [],
    page: 1,
    sale_id: sd.AUCTION.id,
    size: 50,
    ranges: {
      estimate_range: {
        min: 50,
        max: 50000
      }
    },
    sort: 'lot_number'
  },
  isFetchingArtworks: false,
  isListView: false,
  maxEstimateRangeDisplay: 50000,
  minEstimateRangeDisplay: 50,
  sortMap: {
    "lot_number": "Lot Number (asc.)",
    "-lot_number": "Lot Number (desc.)",
    "-searchable_estimate": "Most Expensive",
    "searchable_estimate": "Least Expensive"
  },
  total: 0
}

function auctionArtworks(state = initialState, action) {
  switch (action.type) {
    case actions.TOGGLE_LIST_VIEW: {
      return u({
        isListView: action.payload.isListView
      }, state)
    }
    case actions.UPDATE_AGGREGATED_ARTISTS: {
      return u({
        aggregatedArtists: action.payload.aggregatedArtists
      }, state)
    }
    case actions.UPDATE_AGGREGATED_MEDIUMS: {
      return u({
        aggregatedMediums: action.payload.aggregatedMediums
      }, state)
    }
    case actions.UPDATE_ARTIST_ID: {
      const artistId = action.payload.artistId
      if (artistId === 'artists-all') {
        return u({
          filterParams: {
            artist_ids: []
          }
        }, state)
      } else if (contains(state.filterParams.artist_ids, artistId)) {
        return u({
          filterParams: {
            artist_ids: u.reject((aa) => aa === artistId)
          }
        }, state)
      } else {
        return u({
          filterParams: {
            artist_ids: state.filterParams.artist_ids.concat(artistId)
          }
        }, state)
      }
    }
    case actions.UPDATE_ARTWORKS: {
      return u({
        artworks: action.payload.artworks
      }, state)
    }
    case actions.UPDATE_ESTIMATE_DISPLAY: {
      return u({
        minEstimateRangeDisplay: action.payload.min,
        maxEstimateRangeDisplay: action.payload.max
      }, state)
    }
    case actions.UPDATE_ESTIMATE_RANGE: {
      return u({
        filterParams: {
          estimate_range: `${action.payload.min * 100}-${action.payload.max * 100}`
        }
      }, state)
    }
    case actions.UPDATE_MEDIUM_ID: {
      const mediumId = action.payload.mediumId
      if (mediumId === 'mediums-all') {
        return u({
          filterParams: {
            gene_ids: []
          }
        }, state)
      } else if (contains(state.filterParams.gene_ids, mediumId)) {
        return u({
          filterParams: {
            gene_ids: u.reject((mm) => mm === mediumId)
          }
        }, state)
      } else {
        return u({
          filterParams: {
            gene_ids: state.filterParams.gene_ids.concat(mediumId)
          }
        }, state)
      }
    }
    case actions.UPDATE_SORT: {
      return u({
        filterParams: {
          sort: action.payload.sort
        }
      }, state)
    }
    case actions.UPDATE_TOTAL: {
      return u({
        total: action.payload.total
      }, state)
    }
    default: return state
  }
}

const auctions = combineReducers({
  auctionArtworks
})

export default auctions
