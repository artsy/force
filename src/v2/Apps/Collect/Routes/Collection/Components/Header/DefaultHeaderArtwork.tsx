import { Image } from "@artsy/palette"
import { DefaultHeaderArtwork_artwork } from "v2/__generated__/DefaultHeaderArtwork_artwork.graphql"
import { AnalyticsSchema } from "v2/Artsy/Analytics"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

const Link = styled(RouterLink)`
  display: flex;
  align-items: flex-end;
`

export type DefaultHeaderArtworkProps = React.HTMLAttributes<
  HTMLAnchorElement
> & {
  artwork: DefaultHeaderArtwork_artwork
  small?: boolean
  collectionId: string
  collectionSlug: string
}

export const DefaultHeaderArtwork: React.FC<DefaultHeaderArtworkProps> = ({
  artwork,
  small = false,
  collectionId,
  collectionSlug,
  ...rest
}) => {
  const { trackEvent } = useTracking()

  // @ts-expect-error STRICT_NULL_CHECK
  if (!artwork.node.image) return null

  const handleClick = () => {
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      // @ts-expect-error STRICT_NULL_CHECK
      context_module: AnalyticsSchema.ContextModule.ArtworkBanner,
      // @ts-expect-error STRICT_NULL_CHECK
      context_page_owner_type: AnalyticsSchema.OwnerType.Collection,
      context_page: AnalyticsSchema.PageName.CollectionPage,
      context_page_owner_id: collectionId,
      context_page_owner_slug: collectionSlug,
      // @ts-expect-error STRICT_NULL_CHECK
      destination_path: artwork.node.href,
    })
  }

  return (
    <Link
      // @ts-expect-error STRICT_NULL_CHECK
      to={artwork.node.href}
      // @ts-expect-error STRICT_NULL_CHECK
      key={artwork.node.href}
      onClick={handleClick}
      {...rest}
    >
      <Image
        // @ts-expect-error STRICT_NULL_CHECK
        width={artwork.node.image[small ? "small" : "large"].width}
        // @ts-expect-error STRICT_NULL_CHECK
        height={artwork.node.image[small ? "small" : "large"].height}
        // @ts-expect-error STRICT_NULL_CHECK
        src={artwork.node.image[small ? "small" : "large"].url}
        // @ts-expect-error STRICT_NULL_CHECK
        alt={artwork.node.title}
        preventRightClick
        mr={1}
      />
    </Link>
  )
}

export const DefaultHeaderArtworkFragmentContainer = createFragmentContainer(
  DefaultHeaderArtwork,
  {
    artwork: graphql`
      fragment DefaultHeaderArtwork_artwork on FilterArtworksEdge {
        node {
          id
          title
          href
          slug
          image {
            large: resized(height: 230) {
              url
              width
              height
            }
            small: resized(height: 160) {
              url
              width
              height
            }
          }
        }
      }
    `,
  }
)
