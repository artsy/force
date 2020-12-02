import { Box, BoxProps } from "@artsy/palette"
import React from "react"
import { ArtistsLetterNav } from "./ArtistsLetterNav"

interface ArtistsTopNavProps extends BoxProps {}

export const ArtistsTopNav: React.FC<ArtistsTopNavProps> = ({
  children,
  ...rest
}) => {
  return (
    <Box
      // Compensate for vertical padding within ArtistsLetterNav items
      mt={-0.5}
    >
      <Box
        display="flex"
        flexDirection={["column", "row"]}
        alignItems="center"
        justifyContent="space-between"
        {...rest}
      >
        <Box mb={[1, 0]} pr={2} width={["100%", "auto"]}>
          {children}
        </Box>

        <ArtistsLetterNav
          // Compensate for first-item padding and align flush-left at mobile breakpoint
          ml={[-1, 0]}
        />
      </Box>
    </Box>
  )
}
