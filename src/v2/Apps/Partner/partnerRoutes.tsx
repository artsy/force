import loadable from "@loadable/component"
import { RedirectException, RouteConfig } from "found"
import { graphql } from "react-relay"

const PartnerApp = loadable(() => import("./PartnerApp"), {
  resolveComponent: component => component.PartnerAppFragmentContainer,
})

const ArticlesRoute = loadable(() => import("./Routes/Articles"), {
  resolveComponent: component => component.ArticlesPaginationContainer,
})

const OverviewRoute = loadable(() => import("./Routes/Overview"), {
  resolveComponent: component => component.OverviewRoute,
})

const ShowsRoute = loadable(() => import("./Routes/Shows"), {
  resolveComponent: component => component.ShowsRoute,
})

const WorksRoute = loadable(() => import("./Routes/Works"), {
  resolveComponent: component => component.WorksRoute,
})

const ArtistsRoute = loadable(() => import("./Routes/Artists"), {
  resolveComponent: component => component.ArtistsRoute,
})

const ContactRoute = loadable(() => import("./Routes/Contact"), {
  resolveComponent: component => component.ContactRoute,
})

export const partnerRoutes: RouteConfig[] = [
  {
    getComponent: () => PartnerApp,
    path: "/partner2/:partnerId",
    prepare: () => {
      PartnerApp.preload()
    },
    query: graphql`
      query partnerRoutes_PartnerQuery($partnerId: String!) {
        partner(id: $partnerId) @principalField {
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
        path: "overview",
        render: props => {
          throw new RedirectException(
            `/partner2/${props.match.params.partnerId}`,
            302
          )
        },
      },
      {
        getComponent: () => ArticlesRoute,
        path: "articles",
        prepare: () => {
          ArticlesRoute.preload()
        },
        query: graphql`
          query partnerRoutes_ArticlesQuery($partnerId: String!) {
            partner(id: $partnerId) @principalField {
              ...Articles_partner
            }
          }
        `,
      },
      {
        getComponent: () => ShowsRoute,
        path: "shows",
        prepare: () => {
          ShowsRoute.preload()
        },
      },
      {
        getComponent: () => WorksRoute,
        path: "works",
        prepare: () => {
          WorksRoute.preload()
        },
      },
      {
        getComponent: () => ArtistsRoute,
        path: "artists",
        prepare: () => {
          ArtistsRoute.preload()
        },
      },
      {
        getComponent: () => ContactRoute,
        path: "contact",
        prepare: () => {
          ContactRoute.preload()
        },
      },
    ],
  },
]
