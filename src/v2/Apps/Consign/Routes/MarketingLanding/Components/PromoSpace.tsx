import React from "react"
import { Text, Box } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"

export const PromoSpace: React.FC = () => {
  return (
    <SectionContainer>
      <Box borderBottom="1px solid" borderColor="black60" width="100%">
        <Text
          width="60%"
          textAlign={"center"}
          pb={3}
          variant="largeTitle"
          margin="0 auto"
        >
          We connect the world's most innovative art collectors and sellers in
          one place.
        </Text>
      </Box>
    </SectionContainer>
  )
}
