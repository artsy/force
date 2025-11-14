import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { ContextModule, clickedCollectionGroup } from "@artsy/cohesion"
import { Box, Image, ReadMore, Spacer, Text } from "@artsy/palette"
import type { FeaturedCollectionRailEntity_member$data } from "__generated__/FeaturedCollectionRailEntity_member.graphql"
import currency from "currency.js"
import { type FC, useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface FeaturedCollectionRailEntityProps {
  member: FeaturedCollectionRailEntity_member$data
  index: number
}

export const FeaturedCollectionRailEntity: FC<
  React.PropsWithChildren<FeaturedCollectionRailEntityProps>
> = ({ index, member }) => {
  const { description, priceGuidance, slug, id, thumbnailImage, title } = member

  const { trackEvent } = useTracking()

  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const handleClick = () => {
    trackEvent(
      clickedCollectionGroup({
        contextModule: ContextModule.featuredCollectionsRail,
        contextPageOwnerId,
        contextPageOwnerSlug,
        contextPageOwnerType: contextPageOwnerType!,
        destinationPageOwnerId: id,
        destinationPageOwnerSlug: slug,
        horizontalSlidePosition: index,
      }),
    )
  }

  const formattedPrice = useMemo(() => {
    if (!priceGuidance) return null

    return currency(priceGuidance, {
      separator: ",",
      precision: 0,
    }).format()
  }, [priceGuidance])

  const img = thumbnailImage?.cropped

  return (
    <>
      <RouterLink
        to={`/collection/${slug}`}
        onClick={handleClick}
        textDecoration="none"
      >
        {img ? (
          <Image
            src={img.src}
            srcSet={img.srcSet}
            width={img.width}
            height={img.height}
            lazyLoad
          />
        ) : (
          <Box width={325} height={244} bg="mono10" />
        )}

        <Spacer y={1} />

        <Box maxWidth={300}>
          <Text variant="sm-display" overflowEllipsis>
            {title}
          </Text>

          {formattedPrice && <Text variant="xs">From ${formattedPrice}</Text>}

          {description && (
            <Text variant="xs">
              <Spacer y={1} />

              <ReadMore maxLines={2} content={description} disabled />
            </Text>
          )}
        </Box>
      </RouterLink>
    </>
  )
}

export const FeaturedCollectionRailEntityFragmentContainer =
  createFragmentContainer(FeaturedCollectionRailEntity, {
    member: graphql`
      fragment FeaturedCollectionRailEntity_member on MarketingCollection {
        id
        slug
        title
        description
        priceGuidance
        thumbnailImage {
          cropped(width: 325, height: 244) {
            src
            srcSet
            width
            height
          }
        }
      }
    `,
  })
