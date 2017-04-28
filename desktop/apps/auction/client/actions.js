import analyticsHooks from '../../../lib/analytics_hooks.coffee'
import metaphysics from '../../../../lib/metaphysics.coffee'
import { filterQuery } from '../queries/filter'
import { worksByFollowedArtists } from '../queries/works_by_followed_artists'

// Action types
export const DECREMENT_FOLLOWED_ARTISTS_PAGE = 'DECREMENT_FOLLOWED_ARTISTS_PAGE'
export const GET_ARTWORKS_FAILURE = 'GET_ARTWORKS_FAILURE'
export const GET_ARTWORKS_REQUEST = 'GET_ARTWORKS_REQUEST'
export const GET_ARTWORKS_SUCCESS = 'GET_ARTWORKS_SUCCESS'
export const INCREMENT_FOLLOWED_ARTISTS_PAGE = 'INCREMENT_FOLLOWED_ARTISTS_PAGE'
export const SHOW_FOLLOWED_ARTISTS_RAIL = 'SHOW_FOLLOWED_ARTISTS_RAIL'
export const TOGGLE_LIST_VIEW = 'TOGGLE_LIST_VIEW'
export const UPDATE_AGGREGATED_ARTISTS = 'UPDATE_AGGREGATED_ARTISTS'
export const UPDATE_AGGREGATED_MEDIUMS = 'UPDATE_AGGREGATED_MEDIUMS'
export const UPDATE_ALL_FETCHED = 'UPDATE_ALL_FETCHED'
export const UPDATE_ARTIST_ID = 'UPDATE_ARTIST_ID'
export const UPDATE_ESTIMATE_DISPLAY = 'UPDATE_ESTIMATE_DISPLAY'
export const UPDATE_ESTIMATE_RANGE = 'UPDATE_ESTIMATE_RANGE'
export const UPDATE_INITIAL_MEDIUM_MAP = 'UPDATE_INITIAL_MEDIUM_MAP'
export const UPDATE_IS_LAST_FOLLOWED_ARTISTS_PAGE = 'UPDATE_IS_LAST_FOLLOWED_ARTISTS_PAGE'
export const UPDATE_MEDIUM_ID = 'UPDATE_MEDIUM_ID'
export const UPDATE_NUM_ARTISTS_YOU_FOLLOW = 'UPDATE_NUM_ARTISTS_YOU_FOLLOW'
export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_SALE_ARTWORKS = 'UPDATE_SALE_ARTWORKS'
export const UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS = 'UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS'
export const UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS_TOTAL = 'UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS_TOTAL'
export const UPDATE_SORT = 'UPDATE_SORT'
export const UPDATE_TOTAL = 'UPDATE_TOTAL'

// Action creators
export function decrementFollowedArtistsPage() {
  return {
    type: DECREMENT_FOLLOWED_ARTISTS_PAGE
  }
}

export function getArtworksFailure() {
  return {
    type: GET_ARTWORKS_FAILURE
  }
}

export function getArtworksRequest() {
  return {
    type: GET_ARTWORKS_REQUEST
  }
}

export function getArtworksSuccess() {
  return {
    type: GET_ARTWORKS_SUCCESS
  }
}

export function fetchArtworks() {
  return async (dispatch, getState) => {
    const {
      auctionArtworks: {
        filterParams,
        user
      }
    } = getState()

    try {
      dispatch(getArtworksRequest())

      const { filter_sale_artworks } = await metaphysics({
        query: filterQuery,
        variables: filterParams,
        req: {
          user
        }
      })

      if (filter_sale_artworks.hits && filter_sale_artworks.hits.length) {
        analyticsHooks.trigger(
          'auction:artworks:loaded',
          { data: filter_sale_artworks.hits.map((sale_artwork) => sale_artwork.artwork._id) }
        )
      }

      const aggregations = filter_sale_artworks.aggregations
      const artistAggregation = aggregations.filter((agg) => agg.slice == 'ARTIST')
      const mediumAggregation = aggregations.filter((agg) => agg.slice == 'MEDIUM')

      dispatch(updateAggregatedArtists(artistAggregation[0].counts))
      dispatch(updateAggregatedMediums(mediumAggregation[0].counts))
      dispatch(updateInitialMediumMap(mediumAggregation[0].counts))
      dispatch(updateTotal(filter_sale_artworks.counts.total))
      dispatch(updateNumArtistsYouFollow(filter_sale_artworks.counts.followed_artists))
      dispatch(updateSaleArtworks(filter_sale_artworks.hits))
      dispatch(updateAllFetched())
      dispatch(getArtworksSuccess())
    } catch(error) {
      dispatch(getArtworksFailure())
      console.error('error!', error)
    }
  }
}

export function fetchArtworksByFollowedArtists() {
  return async (dispatch, getState) => {
    const {
      auctionArtworks: {
        followedArtistRailMax,
        followedArtistRailPage,
        filterParams,
        user
      }
    } = getState()

    const inputVars = {
      sale_id: filterParams.sale_id,
      page: followedArtistRailPage,
      size: followedArtistRailMax
    }

    try {
      const { filter_sale_artworks } = await metaphysics({
        query: worksByFollowedArtists,
        variables: inputVars,
        req: {
          user
        }
      })
      if (filter_sale_artworks.hits.length > 0) {
        dispatch(updateSaleArtworksByFollowedArtists(filter_sale_artworks.hits))
        dispatch(updateSaleArtworksByFollowedArtistsTotal(filter_sale_artworks.counts.total))
        dispatch(updateIsLastFollowedArtistsPage())
        dispatch(showFollowedArtistsRail())
      }
    } catch(error) {
      console.error('error!', error)
    }
  }
}

export function fetchMoreArtworks() {
  return async (dispatch, getState) => {
    const {
      auctionArtworks: {
        filterParams,
        user
      }
    } = getState()

    try {
      dispatch(getArtworksRequest())
      const { filter_sale_artworks } = await metaphysics({
        query: filterQuery,
        variables: filterParams,
        req: {
          user
        }
      })
      dispatch(updateSaleArtworks(filter_sale_artworks.hits))
      dispatch(updateAllFetched())
      dispatch(getArtworksSuccess())
    } catch(error) {
      dispatch(getArtworksFailure())
      console.error('error!', error)
    }
  }
}

export function infiniteScroll() {
  return (dispatch, getState) => {
    const {
      auctionArtworks: {
        allFetched,
        isFetchingArtworks
      }
    } = getState()
    if (!isFetchingArtworks && !allFetched) {
      dispatch(updatePage(false))
      dispatch(fetchMoreArtworks())
    }
  }
}

export function incrementFollowedArtistsPage() {
  return {
    type: INCREMENT_FOLLOWED_ARTISTS_PAGE
  }
}

export function nextPageOfFollowedArtistArtworks() {
  return (dispatch, getState) => {
    dispatch(incrementFollowedArtistsPage())
    dispatch(updateIsLastFollowedArtistsPage())
  }
}

export function previousPageOfFollowedArtistArtworks() {
  return (dispatch, getState) => {
    dispatch(decrementFollowedArtistsPage())
    dispatch(updateIsLastFollowedArtistsPage())
  }
}

export function resetArtworks() {
  return (dispatch, getState) => {
    const {
      auctionArtworks: {
        isFetchingArtworks
      }
    } = getState()
    if (!isFetchingArtworks) {
      dispatch(updatePage(true))
      dispatch(fetchArtworks())
    }
  }
}

export function toggleListView(isListView) {
  return {
    type: TOGGLE_LIST_VIEW,
    payload: {
      isListView
    }
  }
}

export function updateAggregatedArtists(aggregatedArtists) {
  return {
    type: UPDATE_AGGREGATED_ARTISTS,
    payload: {
      aggregatedArtists
    }
  }
}

export function updateAggregatedMediums(aggregatedMediums) {
  return {
    type: UPDATE_AGGREGATED_MEDIUMS,
    payload: {
      aggregatedMediums
    }
  }
}

export function updateAllFetched() {
  return {
    type: UPDATE_ALL_FETCHED
  }
}

export function updateArtistId(artistId) {
  return {
    type: UPDATE_ARTIST_ID,
    payload: {
      artistId
    }
  }
}

export function updateArtistParams(artistId) {
  return (dispatch) => {
    dispatch(updateArtistId(artistId))
    dispatch(resetArtworks())
  }
}

export function showFollowedArtistsRail() {
  return {
    type: SHOW_FOLLOWED_ARTISTS_RAIL
  }
}

export function updateEstimateDisplay(min, max) {
  return {
    type: UPDATE_ESTIMATE_DISPLAY,
    payload: {
      min,
      max
    }
  }
}

export function updateEstimateRange(min, max) {
  return (dispatch) => {
    dispatch(updateEstimateRangeParams(min, max))
    dispatch(resetArtworks())
  }
}

export function updateEstimateRangeParams(min, max) {
  return {
    type: UPDATE_ESTIMATE_RANGE,
    payload: {
      min,
      max
    }
  }
}

export function updateInitialMediumMap(initialMediumMap) {
  return {
    type: UPDATE_INITIAL_MEDIUM_MAP,
    payload: {
      initialMediumMap
    }
  }
}

export function updateIsLastFollowedArtistsPage() {
  return {
    type: UPDATE_IS_LAST_FOLLOWED_ARTISTS_PAGE
  }
}

export function updateMediumId(mediumId) {
  return {
    type: UPDATE_MEDIUM_ID,
    payload: {
      mediumId
    }
  }
}

export function updateMediumParams(mediumId) {
  return (dispatch) => {
    dispatch(updateMediumId(mediumId))
    dispatch(resetArtworks())
  }
}

export function updateNumArtistsYouFollow(numArtistsYouFollow) {
  return {
    type: UPDATE_NUM_ARTISTS_YOU_FOLLOW,
    payload: {
      numArtistsYouFollow
    }
  }
}

export function updatePage(reset) {
  return {
    type: UPDATE_PAGE,
    payload: {
      reset
    }
  }
}

export function updateSaleArtworks(saleArtworks) {
  return {
    type: UPDATE_SALE_ARTWORKS,
    payload: {
      saleArtworks
    }
  }
}

export function updateSaleArtworksByFollowedArtists(saleArtworks) {
  return {
    type: UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS,
    payload: {
      saleArtworks
    }
  }
}

export function updateSaleArtworksByFollowedArtistsTotal(total) {
  return {
    type: UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS_TOTAL,
    payload: {
      total
    }
  }
}

export function updateSort(sort) {
  return (dispatch) => {
    dispatch(updateSortParam(sort))
    dispatch(resetArtworks())
  }
}

export function updateSortParam(sort) {
  return {
    type: UPDATE_SORT,
    payload: {
      sort
    }
  }
}

export function updateTotal(total) {
  return {
    type: UPDATE_TOTAL,
    payload: {
      total
    }
  }
}
