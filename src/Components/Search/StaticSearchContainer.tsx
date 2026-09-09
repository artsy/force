import { Box, type BoxProps } from "@artsy/palette"
import type { FC } from "react"

import { NavBarSearchInputContainer } from "./NavBarSearchInputContainer"
import { SEARCH_PLACEHOLDER } from "./constants"

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
          placeholder={searchQuery || SEARCH_PLACEHOLDER}
          defaultValue={searchQuery}
        />
      </Box>
    </>
  )
}
