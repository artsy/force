import { Text } from "@artsy/palette"
import type { ArtworkSidebarArtworkTitle_artwork$data } from "__generated__/ArtworkSidebarArtworkTitle_artwork.graphql"
import { useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtworkSidebarArtworkTitleProps {
  artwork: ArtworkSidebarArtworkTitle_artwork$data
}

const ArtworkSidebarArtworkTitle: React.FC<
  React.PropsWithChildren<ArtworkSidebarArtworkTitleProps>
> = ({ artwork }) => {
  const date = useMemo(() => {
    const formattedDate = artwork.date?.replace(/\s+/g, "")

    if (!formattedDate) return null
    if (formattedDate.length > 0) {
      return `, ${artwork.date}`
    }

    return null
  }, [artwork.date])

  const title = useMemo(() => {
    return artwork.title?.trim()
  }, [artwork.title])

  if (!title) return null

  return (
    <Text color="mono60" variant="lg-display">
      <i>{title}</i>
      {date}
    </Text>
  )
}

export const ArtworkSidebarArtworkTitleFragmentContainer =
  createFragmentContainer(ArtworkSidebarArtworkTitle, {
    artwork: graphql`
      fragment ArtworkSidebarArtworkTitle_artwork on Artwork {
        date
        title
      }
    `,
  })
