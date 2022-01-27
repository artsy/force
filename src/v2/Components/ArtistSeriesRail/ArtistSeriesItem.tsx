import { Box, Image, Text } from "@artsy/palette"
import { ArtistSeriesItem_artistSeries } from "v2/__generated__/ArtistSeriesItem_artistSeries.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  ActionType,
  ClickedArtistSeriesGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useTracking } from "v2/System/Analytics/useTracking"
import {
  AnalyticsContextProps,
  useAnalyticsContext,
} from "v2/System/Analytics/AnalyticsContext"
import { RouterLink } from "v2/System/Router/RouterLink"

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
    const analyticsOptions: Partial<ClickedArtistSeriesGroup> = {
      context_module: contextModule,
      context_page_owner_type: contextPageOwnerType!,
      destination_page_owner_id: internalID,
      destination_page_owner_slug: slug,
      destination_page_owner_type: OwnerType.artistSeries,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      horizontal_slide_position: index,
      curation_boost: featured,
    }
    trackEvent(tracks.clickedArtistSeriesGroup(analyticsOptions))
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
          lazyLoad
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

const tracks = {
  clickedArtistSeriesGroup: (options): ClickedArtistSeriesGroup => ({
    action: ActionType.clickedArtistSeriesGroup,
    type: "thumbnail",
    ...options,
  }),
}
