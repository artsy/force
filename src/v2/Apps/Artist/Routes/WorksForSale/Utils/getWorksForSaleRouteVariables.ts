import { paramsToCamelCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { getENV } from "v2/Utils/getENV"
import { initialArtworkFilterState } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { allowedFilters } from "v2/Components/ArtworkFilter/Utils/allowedFilters"

export function getWorksForSaleRouteVariables({ artistID }, props) {
  // FIXME: The initial render includes `location` in props, but subsequent
  // renders (such as tabbing back to this route in your browser) will not.
  const filterStateFromUrl = props.location ? props.location.query : {}

  const filterParams = {
    ...initialArtworkFilterState,
    ...paramsToCamelCase(filterStateFromUrl),
  }

  const aggregations = ["MEDIUM", "TOTAL", "MAJOR_PERIOD"]
  const additionalAggregations = getENV("ENABLE_NEW_ARTWORK_FILTERS")
    ? ["PARTNER", "LOCATION_CITY", "MATERIALS_TERMS"]
    : ["GALLERY", "INSTITUTION"]
  const allAggregations = aggregations.concat(additionalAggregations)

  return {
    input: allowedFilters(filterParams),
    aggregations: allAggregations,
    artistID,
  }
}
