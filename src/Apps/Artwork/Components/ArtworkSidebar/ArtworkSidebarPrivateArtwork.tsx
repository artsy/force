import React from "react"
import { graphql, useFragment } from "react-relay"
import { ArtworkSidebarPrivateArtwork_artwork$key } from "__generated__/ArtworkSidebarPrivateArtwork_artwork.graphql"
import { useFeatureFlag } from "System/useFeatureFlag"

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
        }
        visibilityLevel
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
    <div>
      <h2>Private Artwork</h2>
      <p>
        Private artwork is only visible to the owner and the people who have
        been given access to it.
      </p>
    </div>
  )
}
