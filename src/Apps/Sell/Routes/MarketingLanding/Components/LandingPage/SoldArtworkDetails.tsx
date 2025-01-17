import type { AuthContextModule } from "@artsy/cohesion"
import { Box, Text } from "@artsy/palette"
import type { SoldArtworkDetails_artwork$data } from "__generated__/SoldArtworkDetails_artwork.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface SoldArtworkDetailsProps {
  artwork: SoldArtworkDetails_artwork$data
  contextModule?: AuthContextModule
}

const ArtistLine: React.FC<
  React.PropsWithChildren<SoldArtworkDetailsProps>
> = ({ artwork: { cultural_maker, artists } }) => {
  if (cultural_maker) {
    return (
      <Text variant={["sm-display", "lg-display"]} overflowEllipsis>
        {cultural_maker}
      </Text>
    )
  }

  if (!artists?.length) {
    return null
  }

  return (
    <Text variant={["sm-display", "lg-display"]} overflowEllipsis>
      {artists.map((artist, i) => {
        if (!artist || !artist.href || !artist.name) return null

        return (
          <>
            {artist.name}
            {i !== artists.length - 1 && ", "}
          </>
        )
      })}
    </Text>
  )
}

const TitleLine: React.FC<React.PropsWithChildren<SoldArtworkDetailsProps>> = ({
  artwork: { title, date },
}) => {
  return (
    <Text variant={["xs", "sm-display"]} overflowEllipsis>
      {title}
      {date && `, ${date}`}
    </Text>
  )
}

const SoldArtworkDetails: React.FC<
  React.PropsWithChildren<SoldArtworkDetailsProps>
> = ({ artwork }) => {
  return (
    <Box maxWidth="100%" my={1}>
      <ArtistLine artwork={artwork} />
      <Box position="relative">
        <TitleLine artwork={artwork} />
      </Box>
    </Box>
  )
}

export const SoldArtworkDetailsFragmentContainer = createFragmentContainer(
  SoldArtworkDetails,
  {
    artwork: graphql`
      fragment SoldArtworkDetails_artwork on Artwork {
        href
        title
        date
        cultural_maker: culturalMaker
        artists(shallow: true) {
          id
          href
          name
        }
      }
    `,
  },
)
