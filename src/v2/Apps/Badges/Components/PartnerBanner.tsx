import { Box, Text } from "@artsy/palette"
import * as React from "react"
interface PartnerBannerProps {
  galleries: any,
  partnerName: any
}

const renderCulturalBadge = (galleries, name) => {
  if (galleries['blackOwnedGalleries']) {
    console.log("BLACK")
    return (
      <Text variant="md" color="black100" textAlign={"center"}>
        Black Owned
      </Text>
    )
  }
  
}

export const PartnerBanner: React.FC<PartnerBannerProps> = ({
  galleries,
  partnerName
}) => {
  return (
    <>
      <Box backgroundColor={"black10"} width={100} mb={1}>
          {renderCulturalBadge(galleries, partnerName)}
      </Box>
    </>
  )
}