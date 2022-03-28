import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"
import { getInitialFilterState } from "v2/Components/ArtworkFilter/Utils/getInitialFilterState"

const ArtistSeriesApp = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./ArtistSeriesApp"),
  {
    resolveComponent: component => component.ArtistSeriesAppFragmentContainer,
  }
)

export const artistSeriesRoutes: AppRouteConfig[] = [
  {
    path: "/artist-series/:slug",
    getComponent: () => ArtistSeriesApp,
    onClientSideRender: () => {
      ArtistSeriesApp.preload()
    },
    prepareVariables: initializeVariablesWithFilterState,
    query: graphql`
      query artistSeriesRoutes_ArtistSeriesQuery(
        $slug: ID!
        $input: FilterArtworksInput
        $aggregations: [ArtworkAggregation]
      ) {
        artistSeries(id: $slug) @principalField {
          ...ArtistSeriesApp_artistSeries
            @arguments(input: $input, aggregations: $aggregations)
        }
      }
    `,
  },
]

function initializeVariablesWithFilterState({ slug }, { context, location }) {
  const initialFilterState = getInitialFilterState(location?.query ?? {})
  const { featureFlags = {} } = context
  const newPriceFilterFlag = featureFlags["new_price_filter"]

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

  const input = {
    sort: "-decayed_merch",
    ...initialFilterState,
    first: 30,
  }

  return { slug, input, aggregations }
}
