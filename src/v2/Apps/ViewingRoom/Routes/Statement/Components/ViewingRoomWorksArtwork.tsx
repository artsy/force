import { Image, ResponsiveBox, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer } from "react-relay"
import { useTracking } from "v2/System/Analytics/useTracking"
import { graphql } from "relay-runtime"
import { AnalyticsSchema } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useScrollToElement } from "v2/Utils/Hooks/useScrollTo"
import { ViewingRoomWorksArtwork_artwork } from "v2/__generated__/ViewingRoomWorksArtwork_artwork.graphql"

interface ViewingRoomWorksArtworkProps {
  to: string
  artwork: ViewingRoomWorksArtwork_artwork
}

const ViewingRoomWorksArtwork: React.FC<ViewingRoomWorksArtworkProps> = ({
  to,
  artwork,
}) => {
  const tracking = useTracking()

  const { scrollTo } = useScrollToElement({
    selectorOrRef: "#scrollTo--ViewingRoomTabBar",
    offset: 20,
    behavior: "smooth",
  })

  const image = artwork.image?.resized

  return (
    <RouterLink
      to={to}
      textDecoration="none"
      display="block"
      width="100%"
      onClick={() => {
        scrollTo()

        tracking.trackEvent({
          action_type: AnalyticsSchema.ActionType.ClickedArtworkGroup,
          context_module: AnalyticsSchema.ContextModule.ViewingRoomArtworkRail,
          subject: AnalyticsSchema.Subject.ArtworkThumbnail,
          destination_path: to,
        })
      }}
    >
      {image && (
        <ResponsiveBox
          aspectWidth={image.width ?? 1}
          aspectHeight={image.height ?? 1}
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

      <Text variant="md" mt={1}>
        {artwork.artistNames}
      </Text>

      <Text variant="md" color="black60" overflowEllipsis>
        {[artwork.title, artwork.date].filter(s => s).join(", ")}
      </Text>

      {artwork.saleMessage && (
        <Text variant="md" color="black60">
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
          resized(width: 445) {
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
