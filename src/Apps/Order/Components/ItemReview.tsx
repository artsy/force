import * as React from "react"

import { BorderBox, Flex, Text, Image } from "@artsy/palette"
import { ItemReview_lineItem$data } from "__generated__/ItemReview_lineItem.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { CommerceOrderSourceEnum } from "__generated__/orderRoutes_OrderQuery.graphql"

interface ItemReviewProps {
  lineItem: ItemReview_lineItem$data
  orderSource: CommerceOrderSourceEnum
}

const dimensionsDisplay = dimensions => (
  <Text variant="sm" color="black60">
    {dimensions.in} ({dimensions.cm})
  </Text>
)

export const ItemReview: React.FC<ItemReviewProps> = ({
  lineItem: {
    artwork: {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      date,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      dimensions: artworkDimensions,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      edition_sets,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      attribution_class,
    },
    artworkVersion: {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      artistNames,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      title,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      medium,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      image: {
        resized: { url },
      },
    },
    editionSetId,
  },
  orderSource,
}) => {
  const privateSale = orderSource === "private_sale"

  return (
    <BorderBox p={[2, 4]}>
      <Flex flexGrow={1} flexDirection="column">
        <Text variant="sm" color="black60">
          {artistNames}
        </Text>
        <Text fontStyle="italic" variant="sm" color="black60">
          {title}
          {!privateSale && date && `, (${date})`}
        </Text>
        <Text variant="sm" color="black60">
          {medium}
        </Text>
        {!privateSale && (
          <Text>
            {editionSetId &&
              edition_sets &&
              dimensionsDisplay(
                edition_sets.find(e => e.internalID === editionSetId).dimensions
              )}
            {!editionSetId &&
              artworkDimensions &&
              dimensionsDisplay(artworkDimensions)}
          </Text>
        )}
        <Text variant="sm" color="black60">
          {attribution_class.shortDescription}
        </Text>
      </Flex>
      <Image maxHeight={375} width={185} src={url} alt={title} />
    </BorderBox>
  )
}

export const ItemReviewFragmentContainer = createFragmentContainer(ItemReview, {
  lineItem: graphql`
    fragment ItemReview_lineItem on CommerceLineItem {
      artwork {
        date
        attribution_class: attributionClass {
          shortDescription
        }
        dimensions {
          in
          cm
        }
        edition_sets: editionSets {
          internalID
          dimensions {
            in
            cm
          }
        }
      }
      artworkVersion {
        artistNames
        title
        medium
        attributionClass {
          shortDescription
        }
        image {
          resized(width: 185) {
            url
          }
        }
      }
      editionSetId
    }
  `,
})
