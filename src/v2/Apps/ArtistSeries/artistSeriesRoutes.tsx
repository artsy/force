import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"
import { paramsToCamelCase } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"

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
        $acquireable: Boolean
        $aggregations: [ArtworkAggregation] = [
          MEDIUM
          TOTAL
          GALLERY
          INSTITUTION
          MAJOR_PERIOD
        ]
        $atAuction: Boolean
        $attributionClass: [String]
        $colors: [String]
        $forSale: Boolean
        $height: String
        $inquireableOnly: Boolean
        $keyword: String
        $majorPeriods: [String]
        $medium: String
        $offerable: Boolean
        $page: Int
        $partnerID: ID
        $priceRange: String
        $sizes: [ArtworkSizes]
        $sort: String
        $width: String
      ) {
        artistSeries(id: $slug) {
          ...ArtistSeriesApp_artistSeries
            @arguments(
              acquireable: $acquireable
              aggregations: $aggregations
              atAuction: $atAuction
              attributionClass: $attributionClass
              colors: $colors
              forSale: $forSale
              height: $height
              inquireableOnly: $inquireableOnly
              keyword: $keyword
              majorPeriods: $majorPeriods
              medium: $medium
              offerable: $offerable
              page: $page
              partnerID: $partnerID
              priceRange: $priceRange
              sizes: $sizes
              sort: $sort
              width: $width
            )
        }
      }
    `,
  },
]

function initializeVariablesWithFilterState(params, props) {
  const initialFilterState = props.location ? props.location.query : {}

  const state = {
    sort: "-decayed_merch",
    ...paramsToCamelCase(initialFilterState),
    ...params,
  }

  return state
}
