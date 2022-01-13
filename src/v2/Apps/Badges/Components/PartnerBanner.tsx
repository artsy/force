import { Box, Text } from "@artsy/palette"
import * as React from "react"

interface PartnerBannerProps {
  
}

export const PartnerBanner: React.FC<PartnerBannerProps> = () => {
  return (
    <>
      <Box backgroundColor={"black60"} width={100} mb={1}>
        <Text variant="md" color="black100" textAlign={"center"}>
          Black owned
        </Text>
      </Box>
    </>
  )
}