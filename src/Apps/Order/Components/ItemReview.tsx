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
  const {
    artistNames,
    title,
    medium,
    attributionClass,
    image,
    date,
    dimensions: artworkDimensions,
  } = artworkVersion || {}
  const { editionSets } = artwork || {}

  return (
    <BorderBox p={[2, 4]}>
      <Flex flexGrow={1} flexDirection="column">
        <Text variant="sm" color="black60">
          {artistNames}
        </Text>
        <Text fontStyle="italic" variant="sm" color="black60">
          {title}
          {date && `, (${date})`}
        </Text>
        <Text variant="sm" color="black60">
          {medium}
        </Text>
        <Text>
          {!isPrivateSale &&
            editionSetId &&
            editionSets &&
            dimensionsDisplay(
              editionSets.find(e => e?.internalID === editionSetId)?.dimensions
            )}
          {!editionSetId &&
            artworkDimensions &&
            dimensionsDisplay(artworkDimensions)}
        </Text>
        {attributionClass?.shortDescription && (
          <Text variant="sm" color="black60">
            {attributionClass.shortDescription}
          </Text>
        )}
      </Flex>
      {image?.resized && title && (
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
        editionSets {
          internalID
          dimensions {
            in
            cm
          }
        }
      }
      artworkVersion {
        date
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
        dimensions {
          in
          cm
        }
      }
      editionSetId
    }
  `,
})
