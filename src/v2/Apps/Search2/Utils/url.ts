import qs from "qs"
import { omit } from "lodash"
import { DENIED_SEACH_STATE_KEYS } from "../constants"

export const createURL = state => `?${qs.stringify(state)}`

export const urlToSearchState = (search: string) => qs.parse(search.slice(1))

export const searchStateToUrl = searchState => {
  const clearedSearchState = omit(searchState, DENIED_SEACH_STATE_KEYS)
  return createURL(clearedSearchState)
}
