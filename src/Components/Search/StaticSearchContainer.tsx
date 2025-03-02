import { Box, type BoxProps } from "@artsy/palette"
import type { FC } from "react"

import { NavBarSearchInputContainer } from "./NavBarSearchInputContainer"

/**
 * Displays during SSR render.
 */
export const StaticSearchContainer: FC<
  React.PropsWithChildren<{ searchQuery: string } & BoxProps>
> = ({ searchQuery, ...rest }) => {
  return (
    <>
      <Box display={["block", "none"]} {...rest}>
        <NavBarSearchInputContainer
          placeholder={searchQuery || "Search Artsy"}
          defaultValue={searchQuery}
        />
      </Box>

      <Box display={["none", "block"]} {...rest}>
        <NavBarSearchInputContainer
          placeholder={
            searchQuery || "Search by artist, gallery, style, theme, tag, etc."
          }
          defaultValue={searchQuery}
        />
      </Box>
    </>
  )
}
