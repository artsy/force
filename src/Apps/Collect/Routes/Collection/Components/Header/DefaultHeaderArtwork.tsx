import { Image } from "@artsy/palette"
import { DefaultHeaderArtwork_artwork$data } from "__generated__/DefaultHeaderArtwork_artwork.graphql"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Components/RouterLink"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface DefaultHeaderArtworkProps {
  artwork: DefaultHeaderArtwork_artwork$data
  collectionId: string
  collectionSlug: string
}

export const DefaultHeaderArtwork: React.FC<DefaultHeaderArtworkProps> = ({
  artwork,
  collectionId,
  collectionSlug,
}) => {
  const { trackEvent } = useTracking()

  if (!artwork.image?.resized) return null

  const handleClick = () => {
    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      context_module: DeprecatedAnalyticsSchema.ContextModule.ArtworkBanner,
      context_page_owner_type: DeprecatedAnalyticsSchema.OwnerType.Collection,
      context_page: DeprecatedAnalyticsSchema.PageName.CollectionPage,
      context_page_owner_id: collectionId,
      context_page_owner_slug: collectionSlug,
      destination_path: artwork.href,
    })
  }

  return (
    <RouterLink
      to={artwork.href!}
      key={artwork.href!}
      onClick={handleClick}
      style={{ display: "block" }}
    >
      <Image
        width={artwork.image.resized.width}
        height={artwork.image.resized.height}
        src={artwork.image.resized.src}
        srcSet={artwork.image.resized.srcSet}
        alt={artwork.title ?? ""}
        lazyLoad
      />
    </RouterLink>
  )
}

export const DefaultHeaderArtworkFragmentContainer = createFragmentContainer(
  DefaultHeaderArtwork,
  {
    artwork: graphql`
      fragment DefaultHeaderArtwork_artwork on Artwork {
        id
        title
        href
        slug
        image {
          resized(
            width: 300
            height: 450
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
