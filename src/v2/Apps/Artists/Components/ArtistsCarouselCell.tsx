import { ContextModule } from "@artsy/cohesion"
import { Box, Image, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { FollowArtistButtonQueryRenderer } from "v2/Components/FollowButton/FollowArtistButton"
import { ArtistsCarouselCell_featuredLink } from "v2/__generated__/ArtistsCarouselCell_featuredLink.graphql"

interface ArtistsCarouselCellProps {
  featuredLink: ArtistsCarouselCell_featuredLink
  index: number
}

export const ArtistsCarouselCell: React.FC<ArtistsCarouselCellProps> = ({
  featuredLink,
  index,
}) => {
  const { image } = featuredLink

  if (!image) return null

  return (
    <RouterLink
      key={featuredLink.internalID}
      to={featuredLink.href}
      style={{ display: "block", textDecoration: "none" }}
      aria-label={featuredLink.title}
    >
      <Image
        src={image.thumb.src}
        srcSet={image.thumb.srcSet}
        width={image.thumb.width}
        height={image.thumb.height}
        alt={featuredLink.title}
        lazyLoad={index > 2}
      />

      <Box my={1} display="flex" justifyContent="space-between">
        <Box>
          <Text variant="mediumText">{featuredLink.title}</Text>
          <Text color="black60">{featuredLink.subtitle}</Text>
        </Box>

        <FollowArtistButtonQueryRenderer
          id={featuredLink.internalID}
          contextModule={ContextModule.featuredArtistsRail}
        />
      </Box>
    </RouterLink>
  )
}

export const ArtistsCarouselCellFragmentContainer = createFragmentContainer(
  ArtistsCarouselCell,
  {
    featuredLink: graphql`
      fragment ArtistsCarouselCell_featuredLink on FeaturedLink {
        internalID
        title
        subtitle
        href
        image {
          thumb: cropped(width: 546, height: 410, version: "wide") {
            width
            height
            src
            srcSet
          }
        }
      }
    `,
  }
)
