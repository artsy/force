import React from "react"

import { BorderBox, Flex, Serif } from "@artsy/palette"
import { ItemReview_lineItem } from "v2/__generated__/ItemReview_lineItem.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface ItemReviewProps {
  lineItem: ItemReview_lineItem
}

const ImageBox = styled.div`
  flex: 0 1 auto;

  img {
    max-width: 185px;
    max-height: 375px;
    display: block;
    margin: 0;
  }
`

const dimensionsDisplay = dimensions => (
  <Serif size="2" color="black60">
    {dimensions.in} ({dimensions.cm})
  </Serif>
)

export const ItemReview: React.SFC<ItemReviewProps> = ({
  lineItem: {
    artwork: {
      artist_names,
      title,
      date,
      medium,
      dimensions: artworkDimensions,
      attribution_class,
      image: {
        resized: { url },
      },
      edition_sets,
    },
    editionSetId,
  },
}) => (
    <BorderBox p={[2, 3]}>
      <Flex flexGrow={1} flexDirection="column">
        <Serif size="2" weight="semibold" color="black60">
          {artist_names}
        </Serif>
        <Serif italic size="2" color="black60">
          {title}
          {date && `, (${date})`}
        </Serif>
        {medium && (
          <Serif size="2" color="black60">
            {medium}
          </Serif>
        )}
        {editionSetId &&
          edition_sets &&
          dimensionsDisplay(
            edition_sets.find(e => e.internalID === editionSetId).dimensions
          )}
        {!editionSetId &&
          artworkDimensions &&
          dimensionsDisplay(artworkDimensions)}
        {attribution_class && (
          <Serif size="2" color="black60">
            {attribution_class.shortDescription}
          </Serif>
        )}
      </Flex>
      <ImageBox>
        <img alt={`${title} by ${artist_names}`} src={url} />
      </ImageBox>
    </BorderBox>
  )

export const ItemReviewFragmentContainer = createFragmentContainer(ItemReview, {
  lineItem: graphql`
    fragment ItemReview_lineItem on CommerceLineItem {
      artwork {
        artist_names: artistNames
        title
        date
        medium
        dimensions {
          in
          cm
        }
        attribution_class: attributionClass {
          shortDescription
        }
        image {
          resized(width: 185) {
            url
          }
        }
        edition_sets: editionSets {
          internalID
          dimensions {
            in
            cm
          }
        }
      }
      editionSetId
    }
  `,
})
