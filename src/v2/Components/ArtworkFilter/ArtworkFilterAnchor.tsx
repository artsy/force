/* tslint:disable */
/* eslint-disable */

import React from "react"
import { themeProps } from "@artsy/palette-tokens"
import { useNavBarHeight } from "../NavBar/useNavBarHeight"
import { __internal__useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { useSticky } from "../Sticky"

// Based on this answer https://stackoverflow.com/a/13184714
export const ArtworkFilterAnchor = () => {
  const isMobile = __internal__useMatchMedia(themeProps.mediaQueries.xs)
  const { mobile, desktop } = useNavBarHeight()
  const { offsetTop } = useSticky()
  const outerOffset = isMobile ? -5 : 20
  const offset = (isMobile ? mobile : desktop) + offsetTop + outerOffset

  return (
    <a
      id="jump--artworkFilter"
      style={{
        display: "block",
        position: "relative",
        visibility: "hidden",
        top: -offset,
      }}
    />
  )
}
