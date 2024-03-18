import React from "react"
import { graphql, useFragment } from "react-relay"
import { ArtworkSidebarPrivateArtwork_artwork$key } from "__generated__/ArtworkSidebarPrivateArtwork_artwork.graphql"
import { useFeatureFlag } from "System/useFeatureFlag"
import { RouterLink } from "System/Router/RouterLink"
import { Box, Text } from "@artsy/palette"

interface ArtworkSidebarPrivateArtworkProps {
  artwork: ArtworkSidebarPrivateArtwork_artwork$key
}

export const ArtworkSidebarPrivateArtwork: React.FC<ArtworkSidebarPrivateArtworkProps> = ({
  artwork,
}) => {
  const privateArtworksEnabled = useFeatureFlag(
    "amber_artwork_visibility_unlisted"
  )

  const data = useFragment(
    graphql`
      fragment ArtworkSidebarPrivateArtwork_artwork on Artwork {
        partner {
          name
          slug
        }
        visibilityLevel
        additionalInformation
      }
    `,
    artwork
  )

  const isPrivateArtwork =
    privateArtworksEnabled && data.visibilityLevel === "UNLISTED"

  if (!isPrivateArtwork) {
    return null
  }

  return (
    <Box
      border="1px solid"
      borderColor="black100"
      borderRadius={2}
      p={2}
      textAlign="center"
    >
      <Text variant="sm">
        <b>Exclusive access.</b> This work was privately shared by{" "}
        <RouterLink to={`/partner/${data.partner?.slug}`}>
          {data.partner?.name}
        </RouterLink>
      </Text>
    </Box>
  )
}
