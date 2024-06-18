import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"
import { getInitialFilterState } from "Components/ArtworkFilter/Utils/getInitialFilterState"

const ArtistSeriesApp = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./ArtistSeriesApp"),
  {
    resolveComponent: component => component.ArtistSeriesAppFragmentContainer,
  }
)

export const artistSeriesRoutes: RouteProps[] = [
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

function initializeVariablesWithFilterState({ slug }, { location }) {
  const initialFilterState = getInitialFilterState(location?.query ?? {})

  const aggregations = [
    "MEDIUM",
    "TOTAL",
    "MAJOR_PERIOD",
    "PARTNER",
    "LOCATION_CITY",
    "MATERIALS_TERMS",
    "SIMPLE_PRICE_HISTOGRAM",
  ]

  const input = {
    sort: "-decayed_merch",
    ...initialFilterState,
    first: 30,
  }

  return { slug, input, aggregations }
}
