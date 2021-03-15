import loadable from "@loadable/component"
import { RouteConfig } from "found"

const PartnerApp = loadable(() => import("./PartnerApp"), {
  resolveComponent: component => component.PartnerApp,
})

export const partnerRoutes: RouteConfig[] = [
  {
    getComponent: () => PartnerApp,
    path: "/partner/:partnerId",
    prepare: () => {
      PartnerApp.preload()
    },
  },
]
