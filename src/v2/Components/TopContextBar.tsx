import React from "react"
import { Box, FullBleed, Separator } from "@artsy/palette"

export const TopContextBar: React.FC = ({ children }) => {
  return (
    <>
      <Box py={1}>{children}</Box>

      <FullBleed>
        <Separator as="hr" color="black15" />
      </FullBleed>
    </>
  )
}
