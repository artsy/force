import React from "react"
import { graphql, useFragment } from "react-relay"
import { ArtworkSidebarPrivateArtwork_artwork$key } from "__generated__/ArtworkSidebarPrivateArtwork_artwork.graphql"
import { RouterLink } from "System/Components/RouterLink"
import { Box, Text } from "@artsy/palette"
import { useTracking } from "react-tracking"

interface ArtworkSidebarPrivateArtworkProps {
  artwork: ArtworkSidebarPrivateArtwork_artwork$key
}

export const ArtworkSidebarPrivateArtwork: React.FC<ArtworkSidebarPrivateArtworkProps> = ({
  artwork,
}) => {
  const { trackEvent } = useTracking()

  const data = useFragment(
    graphql`
      fragment ArtworkSidebarPrivateArtwork_artwork on Artwork {
        partner {
          name
          slug
          profile {
            isPubliclyVisible
          }
        }
        isUnlisted
        additionalInformation
      }
    `,
    artwork
  )

  const isPrivateArtwork = data.isUnlisted

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
        {data.partner?.profile?.isPubliclyVisible ? (
          <RouterLink
            to={`/partner/${data.partner?.slug}`}
            onClick={() => {
              const payload = {
                action: "Click",
                context_module: "Sidebar",
                subject: "Gallery Name",
                type: "Link",
                flow: "Exclusive Access",
              }

              trackEvent(payload)
            }}
          >
            {data.partner?.name}
          </RouterLink>
        ) : (
          data.partner?.name
        )}
      </Text>
    </Box>
  )
}
