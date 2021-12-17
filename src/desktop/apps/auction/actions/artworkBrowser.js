// @ts-check
import { metaphysics2 } from "lib/metaphysics2"
import { filterQuery } from "desktop/apps/auction/queries/filter"
import { worksByFollowedArtists } from "desktop/apps/auction/queries/worksByFollowedArtists"

// Action types
export const GET_ARTWORKS_FAILURE = "GET_ARTWORKS_FAILURE"
export const GET_ARTWORKS_REQUEST = "GET_ARTWORKS_REQUEST"
export const GET_ARTWORKS_SUCCESS = "GET_ARTWORKS_SUCCESS"
export const SHOW_FOLLOWED_ARTISTS_RAIL = "SHOW_FOLLOWED_ARTISTS_RAIL"
export const TOGGLE_LIST_VIEW = "TOGGLE_LIST_VIEW"
export const UPDATE_AGGREGATED_ARTISTS = "UPDATE_AGGREGATED_ARTISTS"
export const UPDATE_AGGREGATED_MEDIUMS = "UPDATE_AGGREGATED_MEDIUMS"
export const UPDATE_ALL_FETCHED = "UPDATE_ALL_FETCHED"
export const UPDATE_ARTIST_ID = "UPDATE_ARTIST_ID"
export const UPDATE_ESTIMATE_DISPLAY = "UPDATE_ESTIMATE_DISPLAY"
export const UPDATE_ESTIMATE_RANGE = "UPDATE_ESTIMATE_RANGE"
export const UPDATE_INITIAL_MEDIUM_MAP = "UPDATE_INITIAL_MEDIUM_MAP"
export const UPDATE_MEDIUM_ID = "UPDATE_MEDIUM_ID"
export const UPDATE_NUM_ARTISTS_YOU_FOLLOW = "UPDATE_NUM_ARTISTS_YOU_FOLLOW"
export const UPDATE_PAGE = "UPDATE_PAGE"
export const UPDATE_SALE_ARTWORKS = "UPDATE_SALE_ARTWORKS"
export const UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS =
  "UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS"
export const UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS_TOTAL =
  "UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS_TOTAL"
export const UPDATE_SORT = "UPDATE_SORT"
export const UPDATE_TOTAL = "UPDATE_TOTAL"

// Action creators
export function getArtworksFailure() {
  return {
    type: GET_ARTWORKS_FAILURE,
  }
}

export function getArtworksRequest() {
  return {
    type: GET_ARTWORKS_REQUEST,
  }
}

export function getArtworksSuccess() {
  return {
    type: GET_ARTWORKS_SUCCESS,
  }
}

export function fetchArtworks() {
  return async (dispatch, getState) => {
    const {
      artworkBrowser: { filterParams, requestID, user },
    } = getState()

    try {
      dispatch(getArtworksRequest())

      let { saleArtworksConnection } = await metaphysics2({
        query: filterQuery,
        req: {
          id: requestID,
          user,
        },
        variables: filterParams,
      })

      saleArtworksConnection = formatDataForMPv2(saleArtworksConnection)

      const aggregations = saleArtworksConnection.aggregations
      const artistAggregation = aggregations.filter(
        agg => agg.slice === "ARTIST"
      )
      const mediumAggregation = aggregations.filter(
        agg => agg.slice === "MEDIUM"
      )

      dispatch(updateAggregatedArtists(artistAggregation[0].counts))
      dispatch(updateAggregatedMediums(mediumAggregation[0].counts))
      dispatch(updateInitialMediumMap(mediumAggregation[0].counts))
      dispatch(updateTotal(saleArtworksConnection.counts.total))
      dispatch(
        updateNumArtistsYouFollow(
          saleArtworksConnection.counts.followed_artists
        )
      )
      dispatch(updateSaleArtworks(saleArtworksConnection.hits))
      dispatch(updateAllFetched())
      dispatch(getArtworksSuccess())
    } catch (error) {
      dispatch(getArtworksFailure())
      console.error("error!", error)
    }
  }
}

export function fetchArtworksByFollowedArtists() {
  return async (dispatch, getState) => {
    const {
      artworkBrowser: {
        followedArtistRailMax,
        followedArtistRailPage,
        filterParams,
        requestID,
        user,
      },
    } = getState()

    const inputVars = {
      page: followedArtistRailPage,
      sale_id: filterParams.sale_id,
      size: followedArtistRailMax,
    }

    try {
      let { saleArtworksConnection } = await metaphysics2({
        query: worksByFollowedArtists,
        req: {
          id: requestID,
          user,
        },
        variables: inputVars,
      })

      saleArtworksConnection = formatDataForMPv2(saleArtworksConnection)

      if (saleArtworksConnection.hits.length > 0) {
        dispatch(
          updateSaleArtworksByFollowedArtists(saleArtworksConnection.hits)
        )
        dispatch(
          updateSaleArtworksByFollowedArtistsTotal(
            saleArtworksConnection.counts.total
          )
        )
        dispatch(showFollowedArtistsRail())
      }
    } catch (error) {
      console.error("error!", error)
    }
  }
}

export function fetchMoreArtworks() {
  return async (dispatch, getState) => {
    const {
      artworkBrowser: { filterParams, user },
    } = getState()

    try {
      dispatch(getArtworksRequest())
      let { saleArtworksConnection } = await metaphysics2({
        query: filterQuery,
        req: {
          user,
        },
        variables: filterParams,
      })
      saleArtworksConnection = formatDataForMPv2(saleArtworksConnection)

      dispatch(updateSaleArtworks(saleArtworksConnection.hits))
      dispatch(updateAllFetched())
      dispatch(getArtworksSuccess())
    } catch (error) {
      dispatch(getArtworksFailure())
      console.error("error!", error)
    }
  }
}

export function infiniteScroll() {
  return (dispatch, getState) => {
    const {
      artworkBrowser: { allFetched, isFetchingArtworks },
    } = getState()
    if (!isFetchingArtworks && !allFetched) {
      dispatch(updatePage(false))
      dispatch(fetchMoreArtworks())
    }
  }
}

export function resetArtworks() {
  return (dispatch, getState) => {
    const {
      artworkBrowser: { isFetchingArtworks },
    } = getState()
    if (!isFetchingArtworks) {
      dispatch(updatePage(true))
      dispatch(fetchArtworks())
    }
  }
}

export function toggleListView(isListView) {
  return {
    payload: {
      isListView,
    },
    type: TOGGLE_LIST_VIEW,
  }
}

export function updateAggregatedArtists(aggregatedArtists) {
  return {
    payload: {
      aggregatedArtists,
    },
    type: UPDATE_AGGREGATED_ARTISTS,
  }
}

export function updateAggregatedMediums(aggregatedMediums) {
  return {
    payload: {
      aggregatedMediums,
    },
    type: UPDATE_AGGREGATED_MEDIUMS,
  }
}

export function updateAllFetched() {
  return {
    type: UPDATE_ALL_FETCHED,
  }
}

export function updateArtistId(artistId) {
  return {
    payload: {
      artistId,
    },
    type: UPDATE_ARTIST_ID,
  }
}

export function updateArtistParams(artistId) {
  return dispatch => {
    dispatch(updateArtistId(artistId))
    dispatch(resetArtworks())
  }
}

export function showFollowedArtistsRail() {
  return {
    type: SHOW_FOLLOWED_ARTISTS_RAIL,
  }
}

export function updateEstimateDisplay(min, max) {
  return {
    payload: {
      max,
      min,
    },
    type: UPDATE_ESTIMATE_DISPLAY,
  }
}

export function updateEstimateRange(min, max) {
  return dispatch => {
    dispatch(updateEstimateRangeParams(min, max))
    dispatch(resetArtworks())
  }
}

export function updateEstimateRangeParams(min, max) {
  return {
    payload: {
      max,
      min,
    },
    type: UPDATE_ESTIMATE_RANGE,
  }
}

export function updateInitialMediumMap(initialMediumMap) {
  return {
    payload: {
      initialMediumMap,
    },
    type: UPDATE_INITIAL_MEDIUM_MAP,
  }
}

export function updateMediumId(mediumId) {
  return {
    payload: {
      mediumId,
    },
    type: UPDATE_MEDIUM_ID,
  }
}

export function updateMediumParams(mediumId) {
  return dispatch => {
    dispatch(updateMediumId(mediumId))
    dispatch(resetArtworks())
  }
}

export function updateNumArtistsYouFollow(numArtistsYouFollow) {
  return {
    payload: {
      numArtistsYouFollow,
    },
    type: UPDATE_NUM_ARTISTS_YOU_FOLLOW,
  }
}

export function updatePage(reset) {
  return {
    payload: {
      reset,
    },
    type: UPDATE_PAGE,
  }
}

export function updateSaleArtworks(saleArtworks) {
  return {
    payload: {
      saleArtworks,
    },
    type: UPDATE_SALE_ARTWORKS,
  }
}

export function updateSaleArtworksByFollowedArtists(saleArtworks) {
  return {
    payload: {
      saleArtworks,
    },
    type: UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS,
  }
}

export function updateSaleArtworksByFollowedArtistsTotal(total) {
  return {
    payload: {
      total,
    },
    type: UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS_TOTAL,
  }
}

export function updateSort(sort) {
  return dispatch => {
    dispatch(updateSortParam(sort))
    dispatch(resetArtworks())
  }
}

export function updateSortParam(sort) {
  return {
    payload: {
      sort,
    },
    type: UPDATE_SORT,
  }
}

export function updateTotal(total) {
  return {
    payload: {
      total,
    },
    type: UPDATE_TOTAL,
  }
}

function formatDataForMPv2(saleArtworksConnection) {
  saleArtworksConnection.hits = saleArtworksConnection.edges
    .map(({ node }) => node)
    .map(saleArtwork => {
      const props = {
        ...saleArtwork,
        ...saleArtwork.sale_artwork,
      }
      return {
        ...props,
        artwork: props,
      }
    })
  return saleArtworksConnection
}
