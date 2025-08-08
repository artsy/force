import { ContextModule } from "@artsy/cohesion"
import { Box, Image, Text } from "@artsy/palette"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { RouterLink } from "System/Components/RouterLink"
import { getInternalHref } from "Utils/url"
import type { ArtistsCarouselCell_featuredLink$data } from "__generated__/ArtistsCarouselCell_featuredLink.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistsCarouselCellProps {
  featuredLink: ArtistsCarouselCell_featuredLink$data
  index: number
  lazyLoad?: boolean
}

const ArtistsCarouselCell: React.FC<
  React.PropsWithChildren<ArtistsCarouselCellProps>
> = ({ featuredLink, lazyLoad = true }) => {
  const { image, entity } = featuredLink

  if (!image || !entity || !featuredLink.href) return null

  const href = getInternalHref(featuredLink.href)

  return (
    <>
      <RouterLink to={href} display="block" textDecoration="none">
        {image.thumb ? (
          <Image
            src={image.thumb.src}
            srcSet={image.thumb.srcSet}
            width={image.thumb.width}
            height={image.thumb.height}
            lazyLoad={lazyLoad}
            fetchPriority={lazyLoad ? "auto" : "high"}
            alt=""
          />
        ) : (
          <Box width={600} height={450} bg="mono10" />
        )}
      </RouterLink>

      <Box
        my={1}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <RouterLink
          to={href}
          display="block"
          textDecoration="none"
          aria-label={featuredLink.title ?? entity.name ?? "Unknown Artist"}
        >
          <Text variant="lg-display">{featuredLink.title ?? entity.name}</Text>

          <Text variant="sm-display" color="mono60">
            {featuredLink.subtitle || entity.formattedNationalityAndBirthday}
          </Text>
        </RouterLink>

        <FollowArtistButtonQueryRenderer
          id={entity.internalID as string}
          contextModule={ContextModule.featuredArtistsRail}
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
  },
)
