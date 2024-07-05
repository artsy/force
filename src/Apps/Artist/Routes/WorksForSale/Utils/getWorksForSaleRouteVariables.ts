import { getInitialFilterState } from "Components/ArtworkFilter/Utils/getInitialFilterState"
import { getFeatureFlag } from "System/Hooks/useFeatureFlag"

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

  const includeBlurHash = !!getFeatureFlag("diamond_blurhash-on-artist-pages")

  return {
    input: filterParams,
    aggregations,
    artistID,
    includeBlurHash,
  }
}
