import { ReadMore, Text, Image, Box } from "@artsy/palette"
import { FeaturedCollectionsRails_collectionGroup } from "v2/__generated__/FeaturedCollectionsRails_collectionGroup.graphql"
import { useTracking } from "v2/System/Analytics/useTracking"
import { RouterLink } from "v2/System/Router/RouterLink"
import currency from "currency.js"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextModule, clickedCollectionGroup } from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"
import { cropped } from "v2/Utils/resized"
import { Rail } from "v2/Components/Rail"

interface Props {
  collectionGroup: FeaturedCollectionsRails_collectionGroup
}

export const FeaturedCollectionsRails: React.FC<Props> = ({
  collectionGroup: { members, name },
}) => {
  return (
    <Rail
      title={name}
      alignItems="flex-start"
      getItems={() => {
        return members.map((slide, slideIndex) => {
          return (
            <FeaturedCollectionEntity
              key={slide.slug}
              member={slide}
              itemNumber={slideIndex}
            />
          )
        })
      }}
    />
  )
}

interface FeaturedCollectionEntityProps {
  member: any // TODO
  itemNumber: number
}

export const FeaturedCollectionEntity: React.FC<FeaturedCollectionEntityProps> = ({
  itemNumber,
  member,
}) => {
  const { description, priceGuidance, slug, id, thumbnail, title } = member

  const formattedPrice = currency(priceGuidance, {
    separator: ",",
    precision: 0,
  }).format()

  const { trackEvent } = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const handleClick = () => {
    trackEvent(
      clickedCollectionGroup({
        contextModule: ContextModule.featuredCollectionsRail,
        contextPageOwnerId,
        contextPageOwnerSlug,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        contextPageOwnerType,
        destinationPageOwnerId: id,
        destinationPageOwnerSlug: slug,
        horizontalSlidePosition: itemNumber,
      })
    )
  }

  const { src, srcSet } = cropped(thumbnail, {
    // 4:3
    width: 325,
    height: 244,
    quality: 75,
    convert_to: "jpg",
  })

  return (
    <>
      <RouterLink to={`/collection/${slug}`} onClick={handleClick} noUnderline>
        <Image
          src={src}
          srcSet={srcSet}
          width={325}
          height={244}
          lazyLoad
          mb={1}
        />

        <Box maxWidth={300}>
          <Text variant="md" overflowEllipsis>
            {title}
          </Text>

          {priceGuidance && (
            <Text variant="xs" color="black100" mb={1}>
              {`From $${formattedPrice}`}
            </Text>
          )}

          <Text variant="sm" mt={1}>
            <ReadMore maxChars={100} content={description} disabled />
          </Text>
        </Box>
      </RouterLink>
    </>
  )
}

export const FeaturedCollectionsRailsContainer = createFragmentContainer(
  FeaturedCollectionsRails as React.FC<Props>,
  {
    collectionGroup: graphql`
      fragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {
        groupType
        name
        members {
          id
          slug
          title
          description
          priceGuidance
          thumbnail
        }
      }
    `,
  }
)
