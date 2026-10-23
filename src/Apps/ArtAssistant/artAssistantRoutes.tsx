import loadable from "@loadable/component"
import { ART_ASSISTANT_FLAG } from "Apps/ArtAssistant/hooks/useEnableArtAssistant"
import type { RouteProps } from "System/Router/Route"
import { getOrInitUnleashClient } from "System/FeatureFlags/unleashClient"
import { HttpError } from "found"

const ArtAssistantApp = loadable(
  () =>
    import(
      /* webpackChunkName: "artAssistantBundle" */ "Apps/ArtAssistant/ArtAssistantApp"
    ),
  {
    resolveComponent: component => component.ArtAssistantApp,
  },
)

export const artAssistantRoutes: RouteProps[] = [
  {
    path: "/art-assistant",
    layout: "Blank",
    getComponent: async () => {
      if (typeof window !== "undefined") {
        const client = getOrInitUnleashClient()
        if (!client.isReady()) {
          await new Promise<void>(resolve => {
            const finish = () => {
              clearTimeout(timeout)
              client.off("ready", finish)
              resolve()
            }
            const timeout = setTimeout(finish, 3000)
            client.once("ready", finish)
          })
        }
      }
      return ArtAssistantApp
    },
    render: ({ Component, props, match }) => {
      if (!match.context.user?.id || !match.context.user?.accessToken)
        throw new HttpError(404)
      if (!Component || !props) return null
      if (!match.context.featureFlags?.isEnabled(ART_ASSISTANT_FLAG))
        throw new HttpError(404)
      return <Component {...props} />
    },
  },
]
