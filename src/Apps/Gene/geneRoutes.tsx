import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RedirectException } from "found"
import { allowedFilters } from "Components/ArtworkFilter/Utils/allowedFilters"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/urlBuilder"
import { initialArtworkFilterState } from "Components/ArtworkFilter/ArtworkFilterContext"
import { RouteProps } from "System/Router/Route"
import { redirectGeneToCollection } from "./Server/redirectGeneToCollection"

const GeneApp = loadable(
  () => import(/* webpackChunkName: "geneBundle" */ "./GeneApp"),
  {
    resolveComponent: component => component.GeneApp,
  }
)

const GeneShowRoute = loadable(
  () => import(/* webpackChunkName: "geneBundle" */ "./Routes/GeneShow"),
  {
    resolveComponent: component => component.GeneShowFragmentContainer,
  }
)

export const geneRoutes: RouteProps[] = [
  {
    path: "/gene/:slug",
    getComponent: () => GeneApp,
    onServerSideRender: redirectGeneToCollection,
    onClientSideRender: () => {
      return GeneApp.preload()
    },
    children: [
      {
        path: "artists",
        render: ({
          match: {
            params: { slug },
          },
        }) => {
          throw new RedirectException(`/gene/${slug}`, 301)
        },
      },
      {
        path: "",
        getComponent: () => GeneShowRoute,
        onClientSideRender: () => {
          return GeneShowRoute.preload()
        },
        prepareVariables: ({ slug }, props) => {
          const aggregations = [
            "TOTAL",
            "ARTIST",
            "MEDIUM",
            "LOCATION_CITY",
            "MATERIALS_TERMS",
            "PARTNER",
            "ARTIST_NATIONALITY",
          ]

          if (!!props.context.user) {
            aggregations.push("FOLLOWED_ARTISTS")
          }

          const urlFilterState = props.location ? props.location.query : {}

          const filters = {
            ...initialArtworkFilterState,
            ...paramsToCamelCase(urlFilterState),
          }

          return {
            aggregations,
            input: allowedFilters(filters),
            shouldFetchCounts: !!props.context.user,
            slug,
          }
        },
        query: graphql`
          query geneRoutes_GeneShowQuery(
            $slug: String!
            $input: FilterArtworksInput
            $aggregations: [ArtworkAggregation]
            $shouldFetchCounts: Boolean!
          ) {
            gene(id: $slug) @principalField {
              ...GeneShow_gene
                @arguments(
                  input: $input
                  aggregations: $aggregations
                  shouldFetchCounts: $shouldFetchCounts
                )
            }
          }
        `,
      },
    ],
  },
]
