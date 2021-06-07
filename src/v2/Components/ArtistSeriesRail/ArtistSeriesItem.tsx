import { Box, Image, Text } from "@artsy/palette"
import { ArtistSeriesItem_artistSeries } from "v2/__generated__/ArtistSeriesItem_artistSeries.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextModule, clickedArtistSeriesGroup } from "@artsy/cohesion"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import {
  AnalyticsContextProps,
  useAnalyticsContext,
} from "v2/Artsy/Analytics/AnalyticsContext"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

interface ArtistSeriesItemProps extends AnalyticsContextProps {
  artistSeries: ArtistSeriesItem_artistSeries
  contextModule: ContextModule
  index: number
}

export const ArtistSeriesItem: React.FC<ArtistSeriesItemProps> = ({
  contextModule,
  index,
  artistSeries: {
    internalID,
    slug,
    title,
    image,
    artworksCountMessage,
    featured,
  },
}) => {
  const { trackEvent } = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const onClick = () => {
    trackEvent(
      clickedArtistSeriesGroup({
        contextModule,
        // @ts-expect-error STRICT_NULL_CHECK
        contextPageOwnerType,
        destinationPageOwnerId: internalID,
        destinationPageOwnerSlug: slug,
        contextPageOwnerId,
        contextPageOwnerSlug,
        horizontalSlidePosition: index,
        curationBoost: featured,
      })
    )
  }
  return (
    <RouterLink
      onClick={onClick}
      to={`/artist-series/${slug}`}
      noUnderline
      style={{ display: "block" }}
    >
      {image?.cropped?.src ? (
        <Image
          src={image.cropped.src}
          srcSet={image.cropped.srcSet}
          width={image.cropped.width}
          height={image.cropped.height}
          // FIXME: Reenable once we've figured out the router transition
          // image load flash when clicking between routes. As this rail
          // occupies an above-the-fold place on artist/id its too glaring.
          // lazyLoad
          alt=""
        />
      ) : (
        <Box width={325} height={244} bg="black10" />
      )}

      <Text variant="md" mt={1} overflowEllipsis maxWidth={300}>
        {title}
      </Text>

      <Text variant="md" color="black60">
        {artworksCountMessage}
      </Text>
    </RouterLink>
  )
}

export const ArtistSeriesItemFragmentContainer = createFragmentContainer(
  ArtistSeriesItem,
  {
    artistSeries: graphql`
      fragment ArtistSeriesItem_artistSeries on ArtistSeries {
        title
        slug
        featured
        internalID
        artworksCountMessage
        image {
          cropped(width: 325, height: 244) {
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
