import type * as React from "react"

import { BorderBox, Flex, Image, Text } from "@artsy/palette"
import { useArtworkDimensions } from "Apps/Artwork/useArtworkDimensions"
import type { ItemReview_lineItem$data } from "__generated__/ItemReview_lineItem.graphql"
import type { CommerceOrderSourceEnum } from "__generated__/orderRoutes_OrderQuery.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface ItemReviewProps {
  lineItem: ItemReview_lineItem$data
  orderSource: CommerceOrderSourceEnum
}

export const ItemReview: React.FC<React.PropsWithChildren<ItemReviewProps>> = ({
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

  // Get dimensions for edition set or artwork
  const editionSet =
    editionSetId && editionSets
      ? editionSets.find(e => e?.internalID === editionSetId)
      : null
  const dimensions = editionSet?.dimensions || artworkDimensions
  const framedDimensions = editionSet?.framedDimensions

  const { dimensionsLabelWithoutFrameText: dimensionsLabel } =
    useArtworkDimensions({
      dimensions,
      framedDimensions,
    })

  return (
    <BorderBox p={[2, 4]}>
      <Flex flexGrow={1} flexDirection="column">
        <Text variant="sm" color="mono60">
          {artistNames}
        </Text>
        <Text fontStyle="italic" variant="sm" color="mono60">
          {title}
          {date && `, (${date})`}
        </Text>
        <Text variant="sm" color="mono60">
          {medium}
        </Text>
        {!isPrivateSale && dimensionsLabel && (
          <Text variant="sm" color="mono60">
            {dimensionsLabel}
          </Text>
        )}
        {attributionClass?.shortDescription && (
          <Text variant="sm" color="mono60">
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
          framedDimensions {
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
