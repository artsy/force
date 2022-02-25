import { ContextModule } from "@artsy/cohesion"
import { Box, Image, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { FollowArtistButtonQueryRenderer } from "v2/Components/FollowButton/FollowArtistButton"
import { ArtistsCarouselCell_featuredLink } from "v2/__generated__/ArtistsCarouselCell_featuredLink.graphql"

interface ArtistsCarouselCellProps {
  featuredLink: ArtistsCarouselCell_featuredLink
  index: number
}

const ArtistsCarouselCell: React.FC<ArtistsCarouselCellProps> = ({
  featuredLink,
}) => {
  const { image, entity } = featuredLink

  if (!image || !entity) return null

  return (
    <>
      <RouterLink to={featuredLink.href} display="block" textDecoration="none">
        {image.thumb ? (
          <Image
            src={image.thumb.src}
            srcSet={image.thumb.srcSet}
            width={image.thumb.width}
            height={image.thumb.height}
            alt=""
            lazyLoad
          />
        ) : (
          <Box width={600} height={450} bg="black10" />
        )}
      </RouterLink>

      <Box
        my={1}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <RouterLink
          to={featuredLink.href!}
          display="block"
          textDecoration="none"
          aria-label={featuredLink.title ?? entity.name ?? "Unknown Artist"}
        >
          <Text variant="lg">{featuredLink.title ?? entity.name}</Text>

          <Text variant="md" color="black60">
            {featuredLink.subtitle || entity.formattedNationalityAndBirthday}
          </Text>
        </RouterLink>

        <FollowArtistButtonQueryRenderer
          id={entity.internalID!}
          contextModule={ContextModule.featuredArtistsRail}
          buttonProps={{ variant: "secondaryOutline" }}
        />
      </Box>
    </>
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
        entity {
          ... on Artist {
            internalID
            name
            formattedNationalityAndBirthday
          }
        }
        image {
          thumb: cropped(width: 600, height: 450, version: "wide") {
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
