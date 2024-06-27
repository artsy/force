import { Image, ResponsiveBox, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer } from "react-relay"
import { useTracking } from "react-tracking"
import { graphql } from "react-relay"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { RouterLink } from "System/Components/RouterLink"
import { ViewingRoomWorksArtwork_artwork$data } from "__generated__/ViewingRoomWorksArtwork_artwork.graphql"
import { useJump } from "Utils/Hooks/useJump"

interface ViewingRoomWorksArtworkProps {
  to: string
  artwork: ViewingRoomWorksArtwork_artwork$data
}

const ViewingRoomWorksArtwork: React.FC<ViewingRoomWorksArtworkProps> = ({
  to,
  artwork,
}) => {
  const tracking = useTracking()

  const { jumpTo } = useJump({ offset: 20 })

  const image = artwork.image?.resized

  return (
    <RouterLink
      to={to}
      textDecoration="none"
      display="block"
      width="100%"
      onClick={() => {
        jumpTo("ViewingRoomTabBar")

        tracking.trackEvent({
          action_type: DeprecatedAnalyticsSchema.ActionType.ClickedArtworkGroup,
          context_module:
            DeprecatedAnalyticsSchema.ContextModule.ViewingRoomArtworkRail,
          subject: DeprecatedAnalyticsSchema.Subject.ArtworkThumbnail,
          destination_path: to,
        })
      }}
    >
      {image && (
        <ResponsiveBox
          aspectWidth={image.width || 1}
          aspectHeight={image.height || 1}
          maxWidth="100%"
        >
          <Image
            width="100%"
            height="100%"
            src={image.src}
            srcSet={image.srcSet}
            alt=""
            lazyLoad
            style={{ display: "block" }}
          />
        </ResponsiveBox>
      )}

      <Text variant="sm-display" mt={1}>
        {artwork.artistNames}
      </Text>

      <Text variant="sm-display" color="black60" overflowEllipsis>
        {[artwork.title, artwork.date].filter(s => s).join(", ")}
      </Text>

      {artwork.saleMessage && (
        <Text variant="sm-display" color="black60">
          {artwork.saleMessage}
        </Text>
      )}
    </RouterLink>
  )
}

export const ViewingRoomWorksArtworkFragmentContainer = createFragmentContainer(
  ViewingRoomWorksArtwork,
  {
    artwork: graphql`
      fragment ViewingRoomWorksArtwork_artwork on Artwork {
        artistNames
        date
        saleMessage
        title
        image {
          resized(
            quality: 85
            width: 445
            version: ["main", "normalized", "larger", "large"]
          ) {
            src
            srcSet
            width
            height
          }
        }
      }
    `,
  }
)
