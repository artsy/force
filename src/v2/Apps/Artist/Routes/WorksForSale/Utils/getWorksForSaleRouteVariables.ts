import { getInitialFilterState } from "v2/Components/ArtworkFilter/Utils/getInitialFilterState"

export function getWorksForSaleRouteVariables(
  { artistID },
  { location, context }
) {
  const { featureFlags = {} } = context

  // FIXME: The initial render includes `location` in props, but subsequent
  // renders (such as tabbing back to this route in your browser) will not.
  const initialFilterState = getInitialFilterState(location?.query ?? {})
  const newPriceFilterFlag = featureFlags["new_price_filter"]

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
  ]

  // Fetch histogram data for price filter
  if (newPriceFilterFlag?.flagEnabled) {
    aggregations.push("SIMPLE_PRICE_HISTOGRAM")
  }

  return {
    input: filterParams,
    aggregations,
    artistID,
  }
}
