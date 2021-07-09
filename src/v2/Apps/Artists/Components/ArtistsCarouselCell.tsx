import { ContextModule } from "@artsy/cohesion"
import { Box, Image, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { FollowArtistButtonQueryRenderer } from "v2/Components/FollowButton/FollowArtistButton"
import { ArtistsCarouselCell_featuredLink } from "v2/__generated__/ArtistsCarouselCell_featuredLink.graphql"

const getSlug = (href: string) => {
  const components = href.split("/")
  return components[components.indexOf("artist") + 1]
}

interface ArtistsCarouselCellProps {
  featuredLink: ArtistsCarouselCell_featuredLink
  index: number
}

const ArtistsCarouselCell: React.FC<ArtistsCarouselCellProps> = ({
  featuredLink,
  index,
}) => {
  const { image } = featuredLink

  if (!image) return null

  // @ts-expect-error STRICT_NULL_CHECK
  const slug = getSlug(featuredLink.href)

  return (
    <>
      <RouterLink
        // @ts-expect-error STRICT_NULL_CHECK
        key={featuredLink.internalID}
        to={featuredLink.href}
        display="block"
        textDecoration="none"
      >
        <Image
          // @ts-expect-error STRICT_NULL_CHECK
          src={image.thumb.src}
          // @ts-expect-error STRICT_NULL_CHECK
          srcSet={image.thumb.srcSet}
          // @ts-expect-error STRICT_NULL_CHECK
          width={image.thumb.width}
          // @ts-expect-error STRICT_NULL_CHECK
          height={image.thumb.height}
          // @ts-expect-error STRICT_NULL_CHECK
          alt={featuredLink.title}
          lazyLoad
        />
      </RouterLink>

      <Box
        my={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        // TODO: Figure out why the button isn't displaying partially during loading.
        // Set height to height of button for now to prevent layout-shift.
        height={50}
      >
        <RouterLink
          // @ts-expect-error STRICT_NULL_CHECK
          key={featuredLink.internalID}
          to={featuredLink.href}
          dispaly="block"
          textDecoration="none"
          // @ts-expect-error STRICT_NULL_CHECK
          aria-label={featuredLink.title}
        >
          <Text variant="lg">{featuredLink.title}</Text>

          {featuredLink.subtitle && (
            <Text variant="md" color="black60">
              {featuredLink.subtitle}
            </Text>
          )}
        </RouterLink>

        <FollowArtistButtonQueryRenderer
          id={slug}
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
