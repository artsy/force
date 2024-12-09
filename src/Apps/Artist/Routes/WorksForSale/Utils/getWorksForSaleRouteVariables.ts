import { getInitialFilterState } from "Components/ArtworkFilter/Utils/getInitialFilterState"

export function getWorksForSaleRouteVariables({ artistID }, { location }) {
  // FIXME: The initial render includes `location` in props, but subsequent
  // renders (such as tabbing back to this route in your browser) will not.
  const initialFilterState = getInitialFilterState(location?.query ?? {})

  const filterParams = {
    sort: "-decayed_merch",
    ...initialFilterState,
  }

  const aggregations = [
    "MEDIUM",
    "TOTAL",
    "MAJOR_PERIOD",
    "PARTNER",
    "LOCATION_CITY",
    "MATERIALS_TERMS",
    "SIMPLE_PRICE_HISTOGRAM",
    "ARTIST_SERIES",
  ]

  return {
    input: filterParams,
    aggregations,
    artistID,
    includeBlurHash: false,
    // If the route was prefetched, we want `isPrefetching: true` so the query
    // can be resolved immediately.
    isPrefetching: !!location?.query?.is_prefetched,
  }
}
