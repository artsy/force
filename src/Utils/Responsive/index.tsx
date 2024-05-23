import { createMedia } from "@artsy/fresnel"
import { unitlessBreakpoints } from "@artsy/palette"
export { Breakpoint } from "@artsy/palette"

export const BREAKPOINTS = {
  xs: 0,
  sm: unitlessBreakpoints.sm, // 768px
  md: unitlessBreakpoints.md, // 1280px
  lg: unitlessBreakpoints.lg, // 1920px
}

const ReactionMedia = createMedia({
  breakpoints: BREAKPOINTS,
  interactions: {
    // TODO: These should go into palette
    hover: "(pointer: coarse), (-moz-touch-enabled: 1)",
    notHover:
      "not all and (pointer: coarse), not all and (-moz-touch-enabled: 1)",
  },
})

export const Media = ReactionMedia.Media
export const MediaContextProvider = ReactionMedia.MediaContextProvider
export const createMediaStyle = ReactionMedia.createMediaStyle
export const SortedBreakpoints = ReactionMedia.SortedBreakpoints
export const findBreakpointsForWidths = ReactionMedia.findBreakpointsForWidths
export const findBreakpointAtWidth = ReactionMedia.findBreakpointAtWidth
export const valuesWithBreakpointProps = ReactionMedia.valuesWithBreakpointProps

// TODO: Simplify this hideous typing.
export type MatchingMediaQueries = Array<
  "hover" | "notHover" | typeof SortedBreakpoints[0]
>
