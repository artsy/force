import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RedirectException } from "found"
import { allowedFilters } from "v2/Components/ArtworkFilter/Utils/allowedFilters"
import { paramsToCamelCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { initialArtworkFilterState } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { AppRouteConfig } from "v2/System/Router/Route"

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

export const geneRoutes: AppRouteConfig[] = [
  {
    path: "/gene/:slug",
    getComponent: () => GeneApp,
    prepare: () => {
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
        theme: "v3",
        path: "",
        getComponent: () => GeneShowRoute,
        prepare: () => {
          return GeneShowRoute.preload()
        },
        prepareVariables: ({ slug }, props) => {
          const urlFilterState = props.location ? props.location.query : {}

          const filters = {
            ...initialArtworkFilterState,
            ...paramsToCamelCase(urlFilterState),
          }

          return {
            input: allowedFilters(filters),
            slug,
          }
        },
        query: graphql`
          query geneRoutes_GeneShowQuery(
            $slug: String!
            $input: FilterArtworksInput
          ) {
            gene(id: $slug) @principalField {
              ...GeneShow_gene @arguments(input: $input)
            }
          }
        `,
      },
    ],
  },
]
