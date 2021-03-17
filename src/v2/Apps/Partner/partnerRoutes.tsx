import loadable from "@loadable/component"
import { RouteConfig } from "found"
import { graphql } from "react-relay"

const PartnerApp = loadable(() => import("./PartnerApp"), {
  resolveComponent: component => component.PartnerAppFragmentContainer,
})

const ArticlesRoute = loadable(() => import("./Routes/Articles"), {
  resolveComponent: component => component.ArticlesRoute,
})

const OverviewRoute = loadable(() => import("./Routes/Overview"), {
  resolveComponent: component => component.OverviewRoute,
})

export const partnerRoutes: RouteConfig[] = [
  {
    getComponent: () => PartnerApp,
    path: "/partner/:partnerId",
    prepare: () => {
      PartnerApp.preload()
    },
    query: graphql`
      query partnerRoutes_PartnerQuery($partnerId: String!) {
        partner(id: $partnerId) {
          ...PartnerApp_partner
        }
      }
    `,
    children: [
      {
        getComponent: () => OverviewRoute,
        path: "",
        prepare: () => {
          OverviewRoute.preload()
        },
      },
      {
        getComponent: () => ArticlesRoute,
        path: "articles",
        prepare: () => {
          ArticlesRoute.preload()
        },
      },
    ],
  },
]
