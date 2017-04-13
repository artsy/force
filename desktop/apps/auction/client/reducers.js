import * as actions from './actions'
import { combineReducers } from 'redux'
import { data as sd } from 'sharify'
import { contains } from 'underscore'
import u from 'updeep'

const initialState = {
  aggregatedArtists: [],
  aggregatedMediums: [],
  allFetched: false,
  displayFollowedArtistsRail: false,
  filterParams: {
    aggregations: ['ARTIST', 'FOLLOWED_ARTISTS', 'MEDIUM', 'TOTAL'],
    artist_ids: [],
    estimate_range: '',
    gene_ids: [],
    include_artworks_by_followed_artists: false,
    page: 1,
    sale_id: sd.AUCTION && sd.AUCTION.id,
    size: 50,
    ranges: {
      estimate_range: {
        min: 0,
        max: 50000
      }
    },
    sort: 'position'
  },
  followedArtistRailMax: 50,
  followedArtistRailPage: 1,
  followedArtistRailSize: 4,
  initialMediumMap: [],
  isOpen: sd.AUCTION && sd.AUCTION.is_open,
  isFetchingArtworks: false,
  isLastFollowedArtistsPage: false,
  isListView: false,
  maxEstimateRangeDisplay: 50000,
  minEstimateRangeDisplay: 0,
  numArtistsYouFollow: 0,
  saleArtworks: [],
  saleArtworksByFollowedArtists: [],
  saleArtworksByFollowedArtistsTotal: 0,
  sortMap: {
    "bidder_positions_count": "Number of Bids (asc.)",
    "-bidder_positions_count": "Number of Bids (desc.)",
    "position": "Lot Number (asc.)",
    "-position": "Lot Number (desc.)",
    "-searchable_estimate": "Most Expensive",
    "searchable_estimate": "Least Expensive"
  },
  symbol: sd.AUCTION && sd.AUCTION.symbol,
  total: 0,
  user: sd.CURRENT_USER
}

function auctionArtworks(state = initialState, action) {
  switch (action.type) {
    case actions.DECREMENT_FOLLOWED_ARTISTS_PAGE: {
      const currentPage = state.followedArtistRailPage
      if (currentPage !== 1) {
        return u({
          followedArtistRailPage: currentPage - 1
        }, state)
      }
    }
    case actions.GET_ARTWORKS_FAILURE: {
      return u({
        isFetchingArtworks: false
      }, state)
    }
    case actions.GET_ARTWORKS_REQUEST: {
      return u({
        isFetchingArtworks: true
      }, state)
    }
    case actions.GET_ARTWORKS_SUCCESS: {
      return u({
        isFetchingArtworks: false
      }, state)
    }
    case actions.INCREMENT_FOLLOWED_ARTISTS_PAGE: {
      const currentPage = state.followedArtistRailPage
      if (state.isLastFollowedArtistsPage) {
        return u({
          followedArtistRailPage: 1
        }, state)
      } else {
        return u({
          followedArtistRailPage: currentPage + 1
        }, state)
      }
    }
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
    case actions.UPDATE_ALL_FETCHED: {
      if (state.saleArtworks.length === state.total) {
        return u({
          allFetched: true
        }, state)
      } else {
        return u({
          allFetched: false
        }, state)
      }
    }
    case actions.UPDATE_ARTIST_ID: {
      const artistId = action.payload.artistId
      if (artistId === 'artists-all') {
        return u({
          filterParams: {
            artist_ids: [],
            include_artworks_by_followed_artists: false
          }
        }, state)
      } else if (artistId === 'artists-you-follow') {
        const newState = !state.filterParams.include_artworks_by_followed_artists
        return u({
          filterParams: {
            artist_ids: [],
            include_artworks_by_followed_artists: newState
          }
        }, state)
      } else if (contains(state.filterParams.artist_ids, artistId)) {
        return u({
          filterParams: {
            artist_ids: u.reject((aa) => aa === artistId),
            include_artworks_by_followed_artists: false
          }
        }, state)
      } else {
        return u({
          filterParams: {
            artist_ids: state.filterParams.artist_ids.concat(artistId),
            include_artworks_by_followed_artists: false
          }
        }, state)
      }
    }
    case actions.SHOW_FOLLOWED_ARTISTS_RAIL: {
      return u({
        displayFollowedArtistsRail: true
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
    case actions.UPDATE_INITIAL_MEDIUM_MAP: {
      if (state.initialMediumMap.length === 0) {
        return u({
          initialMediumMap: action.payload.initialMediumMap
        }, state)
      } else {
        return state
      }
    }
    case actions.UPDATE_IS_LAST_FOLLOWED_ARTISTS_PAGE: {
      if (state.followedArtistRailPage >=
        (state.saleArtworksByFollowedArtistsTotal / state.followedArtistRailSize)) {
        return u({
          isLastFollowedArtistsPage: true
        }, state)
      } else {
        return u({
          isLastFollowedArtistsPage: false
        }, state)
      }
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
    case actions.UPDATE_NUM_ARTISTS_YOU_FOLLOW: {
      return u({
        numArtistsYouFollow: action.payload.numArtistsYouFollow
      }, state)
    }
    case actions.UPDATE_PAGE: {
      const reset = action.payload.reset
      if (reset === true) {
        return u({
          filterParams: {
            page: 1
          }
        }, state)
      } else {
        const currentPage = state.filterParams.page
        return u({
          filterParams: {
            page: currentPage + 1
          }
        }, state)
      }
    }
    case actions.UPDATE_SALE_ARTWORKS: {
      if (state.filterParams.page > 1) {
        return u({
          saleArtworks: state.saleArtworks.concat(action.payload.saleArtworks)
        }, state)
      } else {
        return u({
          saleArtworks: action.payload.saleArtworks
        }, state)
      }
    }
    case actions.UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS: {
      return u({
        saleArtworksByFollowedArtists: action.payload.saleArtworks
      }, state)
    }
    case actions.UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS_TOTAL: {
      return u({
        saleArtworksByFollowedArtistsTotal: action.payload.total
      }, state)
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

export default combineReducers({
  auctionArtworks
})
