import loadable from "@loadable/component"
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
        query: graphql`
          query geneRoutes_GeneShowQuery($slug: String!) @cacheable {
            gene(id: $slug) @principalField {
              slug
              ...GeneShow_gene
            }
          }
        `,
      },
    ],
  },
]
