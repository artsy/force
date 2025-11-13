import {
  findBreakpointAtWidth,
  findBreakpointsForWidths,
  type MatchingMediaQueries,
} from "Utils/Responsive"
import { findDevice } from "@artsy/detect-responsive-traits"

/**
 * Find the breakpoints and interactions that the server should render
 */
export function matchingMediaQueriesForUserAgent(
  userAgent: string
): MatchingMediaQueries {
  // Only return xs breakpoint for mobile googlebot
  const ua = userAgent.toLowerCase()
  if (ua.includes("googlebot") && ua.includes("mobile")) {
    return ["notHover", "xs"]
  }

  const device = findDevice(userAgent)
  if (!device) {
    // @ts-expect-error
    return undefined
  } else {
    const supportsHover = device.touch ? "notHover" : "hover"
    const onlyMatch: MatchingMediaQueries = device.resizable
      ? [
          supportsHover,
          // @ts-expect-error
          ...findBreakpointsForWidths(device.minWidth, device.maxWidth),
        ]
      : [
          supportsHover,
          findBreakpointAtWidth(device.minWidth),
          findBreakpointAtWidth(device.maxWidth),
        ]
    return onlyMatch
  }
}
