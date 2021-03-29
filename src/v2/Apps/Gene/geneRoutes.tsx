import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"

const GeneApp = loadable(() => import("./GeneApp"), {
  resolveComponent: component => component.GeneApp,
})

const GeneShowRoute = loadable(() => import("./Routes/GeneShow"), {
  resolveComponent: component => component.GeneShowFragmentContainer,
})

export const geneRoutes: RouteConfig[] = [
  {
    path: "/gene2/:slug",
    getComponent: () => GeneApp,
    prepare: () => {
      return GeneApp.preload()
    },
    children: [
      {
        path: "",
        getComponent: () => GeneShowRoute,
        prepare: () => {
          return GeneShowRoute.preload()
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
