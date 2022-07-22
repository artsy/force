import { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterContext"
import {
  paramsToSnakeCase,
  removeDefaultValues,
} from "Components/ArtworkFilter/Utils/urlBuilder"
import qs from "qs"

export const buildUrlForCollectApp = (state: ArtworkFilters): string => {
  const fragment = buildCollectUrlFragmentFromState(state)
  const url = fragment ? `/collect${fragment}` : "/collect"
  return url
}

const buildCollectUrlFragmentFromState = (state: ArtworkFilters): string => {
  const { medium, ...params } = removeDefaultValues(state) as ArtworkFilters
  const emptyOrSpecificMedium = medium ? `/${medium}` : ""

  if (Object.keys(params).length === 0) {
    return emptyOrSpecificMedium
  }

  return `${emptyOrSpecificMedium}?${qs.stringify(paramsToSnakeCase(params))}`
}
