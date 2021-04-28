import React from "react"
import { Box, SkeletonText } from "@artsy/palette"
import { PartnerArtistListPlaceholder } from "../../Components/PartnerArtists"
import { PartnerArtistDetailsPlaceholder } from "../../Components/PartnerArtists/PartnerArtistDetailsPlaceholder"

export const ArtistsRoutePlaceholder = () => {
  return (
    <Box mt={4}>
      <SkeletonText variant="title" mb={6}>
        Artists
      </SkeletonText>
      <PartnerArtistListPlaceholder />
      <PartnerArtistDetailsPlaceholder />
    </Box>
  )
}
