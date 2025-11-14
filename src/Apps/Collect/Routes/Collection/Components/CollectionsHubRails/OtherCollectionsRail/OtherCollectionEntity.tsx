import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { cropped } from "Utils/resized"
import { ContextModule, clickedCollectionGroup } from "@artsy/cohesion"
import { Image, Text } from "@artsy/palette"
import type { OtherCollectionEntity_member$data } from "__generated__/OtherCollectionEntity_member.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

export interface CollectionProps {
  member: OtherCollectionEntity_member$data
  itemNumber: number
}

export const OtherCollectionEntity: React.FC<
  React.PropsWithChildren<CollectionProps>
> = ({ itemNumber, member: { id, slug, thumbnail, title } }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const handleClick = () => {
    trackEvent(
      clickedCollectionGroup({
        contextModule: ContextModule.otherCollectionsRail,
        contextPageOwnerId,
        contextPageOwnerSlug,
        contextPageOwnerType,
        destinationPageOwnerId: id,
        destinationPageOwnerSlug: slug,
        horizontalSlidePosition: itemNumber,
      }),
    )
  }

  if (!thumbnail) return null

  const { src, srcSet } = cropped(thumbnail, {
    width: 325,
    height: 244,
    quality: 75,
  })

  return (
    <RouterLink
      to={`/collection/${slug}`}
      onClick={handleClick}
      textDecoration="none"
    >
      <Image
        src={src}
        srcSet={srcSet}
        width={325}
        height={244}
        alt=""
        lazyLoad
      />

      <Text variant="sm-display" overflowEllipsis maxWidth={300} mt={1}>
        {title}
      </Text>
    </RouterLink>
  )
}

export const OtherCollectionsRailsContainer = createFragmentContainer(
  OtherCollectionEntity as React.FC<React.PropsWithChildren<CollectionProps>>,
  {
    member: graphql`
      fragment OtherCollectionEntity_member on MarketingCollection {
        id
        slug
        thumbnail
        title
      }
    `,
  },
)
