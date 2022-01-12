import { Box, Text } from "@artsy/palette"
import * as React from "react"

interface PartnerBannerProps {
  
}

export const PartnerBanner: React.FC<PartnerBannerProps> = () => {
  return (
    <>
      <Box backgroundColor={"black100"} width={100} mb={1}>
        <Text variant="caption" color="white100" textAlign={"center"}>
          Black owned
        </Text>
      </Box>
      <Box backgroundColor={"black100"} width={100}>
        <Text variant="caption" color="white100" textAlign={"center"}>
          Woman owned
        </Text>
      </Box>
    </>
  )
}