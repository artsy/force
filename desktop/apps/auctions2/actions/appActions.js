import metaphysics from 'lib/metaphysics.coffee'
import { currentAuctions } from 'desktop/apps/auctions2/utils/queries'

export const GET_AUCTIONS_FAILURE = 'GET_AUCTIONS_FAILURE'
export const GET_AUCTIONS_REQUEST = 'GET_AUCTIONS_REQUEST'
export const GET_AUCTIONS_SUCCESS = 'GET_AUCTIONS_SUCCESS'

export function getAuctionsFailure () {
  return {
    type: GET_AUCTIONS_FAILURE
  }
}

export function getAuctionsRequest () {
  return {
    type: GET_AUCTIONS_REQUEST
  }
}

export function getAuctionsSuccess (auctions) {
  return {
    type: GET_AUCTIONS_SUCCESS,
    payload: {
      auctions
    }
  }
}

export function fetchLiveAuctions() {
  return async (dispatch) => {
    try {
      dispatch(getAuctionsRequest())
      const fetchedAuctions = await metaphysics({
        query: currentAuctions()
      })
      dispatch(getAuctionsSuccess(fetchedAuctions.sales))
    } catch (error) {
      dispatch(getAuctionsFailure())
      console.error('error!', error)
    }
  }
}
