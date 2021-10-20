import { Box, BoxProps } from "@artsy/palette"
import * as React from "react";
import { ArtistsLetterNav } from "./ArtistsLetterNav"

interface ArtistsTopNavProps extends BoxProps {}

export const ArtistsTopNav: React.FC<ArtistsTopNavProps> = ({
  children,
  ...rest
}) => {
  return (
    <>
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

        <ArtistsLetterNav />
      </Box>
    </>
  )
}
