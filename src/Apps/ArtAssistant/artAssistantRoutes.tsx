import loadable from "@loadable/component"
import { ART_ASSISTANT_FLAG } from "Apps/ArtAssistant/hooks/useEnableArtAssistant"
import type { RouteProps } from "System/Router/Route"
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
    layout: "FullBleed",
    getComponent: () => ArtAssistantApp,
    render: ({ Component, props, match }) => {
      if (
        !match.context.user?.id ||
        !match.context.user?.accessToken ||
        !match.context.featureFlags?.isEnabled(ART_ASSISTANT_FLAG)
      )
        throw new HttpError(404)
      if (!Component || !props) return null
      return <Component {...props} />
    },
  },
]
