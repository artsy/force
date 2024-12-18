import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RedirectException } from "found"
import type { RouteProps } from "System/Router/Route"
import { redirectGeneToCollection } from "./Server/redirectGeneToCollection"
import { serverCacheTTLs } from "Apps/serverCacheTTLs"

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
    serverCacheTTL: serverCacheTTLs.gene,
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
        serverCacheTTL: serverCacheTTLs.gene,
        getComponent: () => GeneShowRoute,
        onPreloadJS: () => {
          GeneShowRoute.preload()
        },
        query: graphql`
          query geneRoutes_GeneShowQuery($slug: String!) {
            gene(id: $slug) @principalField {
              ...GeneShow_gene
            }
          }
        `,
      },
    ],
  },
]
