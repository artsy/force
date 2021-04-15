import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"
import { paramsToCamelCase } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import { getENV } from "v2/Utils/getENV"
import { allowedFilters } from "v2/Components/v2/ArtworkFilter/Utils/allowedFilters"

const ArtistSeriesApp = loadable(() => import("./ArtistSeriesApp"), {
  resolveComponent: component => component.ArtistSeriesAppFragmentContainer,
})

export const artistSeriesRoutes: RouteConfig[] = [
  {
    path: "/artist-series/:slug",
    getComponent: () => ArtistSeriesApp,
    prepare: () => {
      ArtistSeriesApp.preload()
    },
    prepareVariables: initializeVariablesWithFilterState,
    query: graphql`
      query artistSeriesRoutes_ArtistSeriesQuery(
        $slug: ID!
        $input: FilterArtworksInput
        $aggregations: [ArtworkAggregation]
      ) {
        artistSeries(id: $slug) {
          ...ArtistSeriesApp_artistSeries
            @arguments(input: $input, aggregations: $aggregations)
        }
      }
    `,
  },
]

function initializeVariablesWithFilterState({ slug }, props) {
  const initialFilterState = props.location ? props.location.query : {}

  const aggregations = ["MEDIUM", "TOTAL", "MAJOR_PERIOD"]
  const additionalAggregations = getENV("ENABLE_NEW_ARTWORK_FILTERS")
    ? ["PARTNER", "LOCATION_CITY", "MATERIALS_TERMS"]
    : ["GALLERY", "INSTITUTION"]
  const allAggregations = aggregations.concat(additionalAggregations)

  const input = {
    sort: "-decayed_merch",
    ...allowedFilters(paramsToCamelCase(initialFilterState)),
    first: 30,
  }

  return { slug, input, aggregations: allAggregations }
}
