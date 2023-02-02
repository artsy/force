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
  lineItem: { artwork, artworkVersion, editionSetId },
  orderSource,
}) => {
  const isPrivateSale = orderSource === "private_sale"
  const { artistNames, title, medium, attributionClass, image } =
    artworkVersion || {}
  const { date, dimensions: artworkDimensions, edition_sets } = artwork || {}

  return (
    <BorderBox p={[2, 4]}>
      <Flex flexGrow={1} flexDirection="column">
        <Text variant="sm" color="black60">
          {artistNames}
        </Text>
        <Text fontStyle="italic" variant="sm" color="black60">
          {title}
          {!isPrivateSale && date && `, (${date})`}
        </Text>
        <Text variant="sm" color="black60">
          {medium}
        </Text>
        {!isPrivateSale && (
          <Text>
            {editionSetId &&
              edition_sets &&
              dimensionsDisplay(
                edition_sets.find(e => e?.internalID === editionSetId)
                  ?.dimensions
              )}
            {!editionSetId &&
              artworkDimensions &&
              dimensionsDisplay(artworkDimensions)}
          </Text>
        )}
        {attributionClass && attributionClass.shortDescription && (
          <Text variant="sm" color="black60">
            {attributionClass.shortDescription}
          </Text>
        )}
      </Flex>
      {image && image.resized && title && (
        <Image
          maxHeight={375}
          width={185}
          src={image.resized.url}
          alt={title}
        />
      )}
    </BorderBox>
  )
}

export const ItemReviewFragmentContainer = createFragmentContainer(ItemReview, {
  lineItem: graphql`
    fragment ItemReview_lineItem on CommerceLineItem {
      artwork {
        date
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
