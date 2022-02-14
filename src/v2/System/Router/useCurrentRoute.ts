import { Match } from "found"
import { AppRouteConfig } from "./Route"
import { findCurrentRoute } from "v2/System/Router/Utils/findCurrentRoute"

export const useCurrentRoute = (match: Match): AppRouteConfig => {
  const route = findCurrentRoute(match)
  return route
}
