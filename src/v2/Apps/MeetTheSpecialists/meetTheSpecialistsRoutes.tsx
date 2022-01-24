import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"

const MeetTheSpecialistsApp = loadable(
  () => import(/* webpackChunkName: "buyerBundle" */ "./MeetTheSpecialistsApp"),
  {
    resolveComponent: component => component.MeetTheSpecialistsApp,
  }
)

const MeetTheSpecialistsIndexRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "meetTheSpecialistsBundle" */ "./Routes/MeetTheSpecialistsIndex"
    ),
  {
    resolveComponent: component => component.MeetTheSpecialistsIndex,
  }
)

export const meetTheSpecialistsRoutes: AppRouteConfig[] = [
  {
    path: "/meet-the-specialists",
    getComponent: () => MeetTheSpecialistsApp,
    onClientSideRender: () => {
      MeetTheSpecialistsApp.preload()
    },
    children: [
      {
        path: "",
        getComponent: () => MeetTheSpecialistsIndexRoute,
        onClientSideRender: () => {
          return MeetTheSpecialistsIndexRoute.preload()
        },
      },
    ],
  },
]
