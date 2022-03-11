import { getDefaultSortValueByVariant } from "v2/Utils/merchandisingTrial"
import { getInitialFilterState } from "v2/Components/ArtworkFilter/Utils/getInitialFilterState"

export function getWorksForSaleRouteVariables({ artistID }, props) {
  // FIXME: The initial render includes `location` in props, but subsequent
  // renders (such as tabbing back to this route in your browser) will not.
  const initialFilterState = getInitialFilterState(props.location?.query ?? {})
  const defaultSort = getDefaultSortValueByVariant(artistID)

  const filterParams = {
    sort: defaultSort,
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

  return {
    input: filterParams,
    aggregations,
    artistID,
  }
}
