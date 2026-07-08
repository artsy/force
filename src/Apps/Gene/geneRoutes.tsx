import loadable from "@loadable/component"
import { initialArtworkFilterState } from "Components/ArtworkFilter/ArtworkFilterContext"
import { allowedFilters } from "Components/ArtworkFilter/Utils/allowedFilters"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import type { RouteProps } from "System/Router/Route"
import { canonicalSlugRedirect } from "System/Router/Utils/canonicalSlugRedirect"
import { RedirectException } from "found"
import { graphql } from "react-relay"
import { redirectGeneToCollection } from "./Server/redirectGeneToCollection"

const geneWithCanonicalSlugRedirect = canonicalSlugRedirect({
  entityName: "gene",
  paramName: "slug",
  basePath: "/gene",
})

const GENE_ARTWORK_AGGREGATIONS = [
  "TOTAL",
  "ARTIST",
  "MEDIUM",
  "LOCATION_CITY",
  "MATERIALS_TERMS",
  "PARTNER",
  "ARTIST_NATIONALITY",
]

/**
 * Derives artwork-filter variables from the URL so that the artwork grid
 * is fetched as part of the route-level query and server-side rendered.
 */
const prepareGeneArtworkFilterVariables = (params, props) => {
  const urlFilterState = props.location?.query ?? {}

  const filters = {
    ...initialArtworkFilterState,
    ...paramsToCamelCase(urlFilterState),
  }

  return {
    slug: params.slug,
    input: allowedFilters(filters),
    aggregations: GENE_ARTWORK_AGGREGATIONS,
  }
}

const GeneApp = loadable(
  () => import(/* webpackChunkName: "geneBundle" */ "./GeneApp"),
  {
    resolveComponent: component => component.GeneApp,
  },
)

const GeneShowRoute = loadable(
  () => import(/* webpackChunkName: "geneBundle" */ "./Routes/GeneShow"),
  {
    resolveComponent: component => component.GeneShowFragmentContainer,
  },
)

export const geneRoutes: RouteProps[] = [
  {
    path: "/gene/:slug",
    getComponent: () => GeneApp,
    onServerSideRender: redirectGeneToCollection,
    onPreloadJS: () => {
      GeneApp.preload()
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
        onPreloadJS: () => {
          GeneShowRoute.preload()
        },
        render: geneWithCanonicalSlugRedirect,
        prepareVariables: prepareGeneArtworkFilterVariables,
        query: graphql`
          query geneRoutes_GeneShowQuery(
            $slug: String!
            $input: FilterArtworksInput
            $aggregations: [ArtworkAggregation]
          ) @cacheable {
            gene(id: $slug) @principalField {
              slug
              ...GeneShow_gene
                @arguments(input: $input, aggregations: $aggregations)
            }
          }
        `,
      },
    ],
  },
]
