import { findDevice } from "@artsy/detect-responsive-traits"
import {
  MatchingMediaQueries,
  findBreakpointAtWidth,
  findBreakpointsForWidths,
} from "v2/Utils/Responsive"

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
    // @ts-expect-error STRICT_NULL_CHECK
    return undefined
  } else {
    const supportsHover = device.touch ? "notHover" : "hover"
    const onlyMatch: MatchingMediaQueries = device.resizable
      ? [
          supportsHover,
          // @ts-expect-error STRICT_NULL_CHECK
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
