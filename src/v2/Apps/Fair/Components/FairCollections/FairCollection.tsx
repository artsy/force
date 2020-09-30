import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairCollection_collection } from "v2/__generated__/FairCollection_collection.graphql"
import { SmallCard } from "@artsy/palette"
import { crop } from "v2/Utils/resizer"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { compact } from "lodash"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ClickedCollectionGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"

const CARD_WIDTH = 263
const CARD_LARGE_IMAGE_SIZE = 170
const CARD_SMALL_IMAGE_SIZE = CARD_WIDTH - CARD_LARGE_IMAGE_SIZE

const CARD_IMAGE_SIZES = [
  CARD_LARGE_IMAGE_SIZE,
  CARD_SMALL_IMAGE_SIZE,
  CARD_SMALL_IMAGE_SIZE,
]

interface FairCollectionProps {
  collection: FairCollection_collection
  carouselIndex: number // needed for analytics
}

export const FairCollection: React.FC<FairCollectionProps> = ({
  collection,
  carouselIndex,
}) => {
  const tracking = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const collectionTrackingData: ClickedCollectionGroup = {
    context_module: ContextModule.curatedHighlightsRail,
    context_page_owner_type: contextPageOwnerType,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    destination_page_owner_type: OwnerType.collection,
    destination_page_owner_id: collection.id,
    destination_page_owner_slug: collection.slug,
    horizontal_slide_position: carouselIndex,
    type: "thumbnail",
    action: ActionType.clickedCollectionGroup,
  }

  const imageUrls = compact(
    collection.artworks.edges.map(({ node }) => node?.image?.url)
  )

  const images = imageUrls.map((url, i) => {
    const _1x = crop(url, {
      width: CARD_IMAGE_SIZES[i],
      height: CARD_IMAGE_SIZES[i],
    })

    const _2x = crop(url, {
      width: CARD_IMAGE_SIZES[i] * 2,
      height: CARD_IMAGE_SIZES[i] * 2,
    })

    return {
      src: _1x,
      srcSet: `${_1x} 1x, ${_2x} 2x`,
    }
  })

  const count = collection.artworks.counts.total

  return (
    <RouterLink
      to={`/collection/${collection.slug}`}
      noUnderline
      onClick={() => tracking.trackEvent(collectionTrackingData)}
    >
      <SmallCard
        width={CARD_WIDTH}
        title={collection.title}
        subtitle={`${count} work${count === 1 ? "" : "s"}`}
        images={images}
      />
    </RouterLink>
  )
}

export const FairCollectionFragmentContainer = createFragmentContainer(
  FairCollection,
  {
    collection: graphql`
      fragment FairCollection_collection on MarketingCollection {
        id
        slug
        title
        artworks: artworksConnection(first: 3) {
          counts {
            total
          }
          edges {
            node {
              image {
                url(version: "larger")
              }
            }
          }
        }
      }
    `,
  }
)
