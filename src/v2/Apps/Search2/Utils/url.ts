import qs from "qs"
import { omit } from "lodash"
import { DENIED_SEARCH_STATE_KEYS } from "../constants"

export const createURL = state => `?${qs.stringify(state)}`

export const searchStateToUrl = searchState => {
  const clearedSearchState = omit(searchState, DENIED_SEARCH_STATE_KEYS)
  return createURL(clearedSearchState)
}
