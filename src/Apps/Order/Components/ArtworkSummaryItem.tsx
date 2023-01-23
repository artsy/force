import { ArtworkSummaryItem_order$data } from "__generated__/ArtworkSummaryItem_order.graphql"
import { Omit } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"
import { getOfferItemFromOrder } from "Apps/Order/Utils/offerItemExtractor"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import {
  Box,
  Flex,
  FlexProps,
  Image,
  Text,
  StackableBorderBox,
} from "@artsy/palette"

export interface ArtworkSummaryItemProps extends Omit<FlexProps, "order"> {
  order: ArtworkSummaryItem_order$data
  className?: string
}

const ArtworkSummaryItem: React.FC<ArtworkSummaryItemProps> = ({
  order: {
    lineItems,
    currencyCode,
    mode,
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    sellerDetails: { name },
    source,
  },
  ...others
}) => {
  const firstLineItem = get({}, () => lineItems?.edges?.[0]?.node!)
  const { artwork, artworkVersion } = firstLineItem!

  const { artistNames, title, image } = artworkVersion || {}
  const { date, shippingOrigin } = artwork || {}

  const imageURL =
    image &&
    image.resized_ArtworkSummaryItem &&
    image.resized_ArtworkSummaryItem.url

  const truncateTextStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } as any

  const artworkPrice = getOfferItemFromOrder(lineItems)

  const priceLabel = mode === "OFFER" ? "List price" : "Price"

  const isPrivateSale = source === "private_sale"

  return (
    <StackableBorderBox flexDirection="row" {...others}>
      <Box height="auto">
        {imageURL && <Image src={imageURL} alt={title!} width="55px" mr={1} />}
      </Box>
      <Flex flexDirection="column" overflow="hidden">
        <Text variant="sm">{artistNames}</Text>
        <Box style={{ lineHeight: "1", ...truncateTextStyle }}>
          <Text
            fontStyle="italic"
            variant="sm"
            color="black60"
            display="inline"
          >
            {title}
            {!isPrivateSale && date && `, ${date}`}
          </Text>
        </Box>
        {!isPrivateSale && (
          <>
            <Text variant="sm" overflowEllipsis color="black60">
              {name}
            </Text>
            <Text variant="sm" color="black60">
              {shippingOrigin}
            </Text>
          </>
        )}
        {!isPrivateSale && artworkPrice && (
          <Text variant="sm">
            {`${priceLabel} ${appendCurrencySymbol(
              artworkPrice.price,
              currencyCode
            )}`}
          </Text>
        )}
      </Flex>
    </StackableBorderBox>
  )
}

export const ArtworkSummaryItemFragmentContainer = createFragmentContainer(
  ArtworkSummaryItem,
  {
    order: graphql`
      fragment ArtworkSummaryItem_order on CommerceOrder {
        sellerDetails {
          ... on Partner {
            name
          }
        }
        currencyCode
        mode
        source
        lineItems {
          edges {
            node {
              artworkOrEditionSet {
                __typename
                ... on Artwork {
                  price
                }
                ... on EditionSet {
                  price
                }
              }
              artwork {
                date
                shippingOrigin
              }
              artworkVersion {
                artistNames
                title
                image {
                  resized_ArtworkSummaryItem: resized(width: 55) {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
  }
)
