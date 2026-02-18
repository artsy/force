import {
  Box,
  Flex,
  type FlexProps,
  Image,
  Link,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import { getOfferItemFromOrder } from "Apps/Order/Utils/offerUtils"
import { get } from "Utils/get"
import type { ArtworkSummaryItem_order$data } from "__generated__/ArtworkSummaryItem_order.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface ArtworkSummaryItemProps extends Omit<FlexProps, "order"> {
  order: ArtworkSummaryItem_order$data
  className?: string
}

const ArtworkSummaryItem: React.FC<
  React.PropsWithChildren<ArtworkSummaryItemProps>
> = ({
  order: { lineItems, currencyCode, mode, sellerDetails, source },
  ...others
}) => {
  const firstLineItem = get({}, () => lineItems?.edges?.[0]?.node)
  const { artwork, artworkVersion } = firstLineItem || {}
  const name = sellerDetails?.name

  const { artistNames, title, image, date } = artworkVersion || {}
  const { shippingOrigin, isUnlisted } = artwork || {}

  const imageURL = image && image.resized && image.resized.url

  const truncateTextStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } as any

  const artworkPrice = getOfferItemFromOrder(lineItems)

  const isPrivateSale = source === "private_sale"
  const isPartnerOffer = source === "partner_offer"

  const priceLabel = mode === "OFFER" || isPartnerOffer ? "List price" : "Price"

  return (
    <StackableBorderBox
      flexDirection="row"
      {...others}
      data-testid="artworkSummary"
    >
      <Box height="auto">
        {imageURL &&
          (isPrivateSale ? (
            <Image src={imageURL} alt={title || ""} width="55px" mr={1} />
          ) : (
            <Link href={`/artwork/${artwork?.slug}`} target="_blank">
              <Image src={imageURL} alt={title || ""} width="55px" mr={1} />
            </Link>
          ))}
      </Box>
      <Flex flexDirection="column" overflow="hidden">
        <Text variant="sm">{artistNames}</Text>
        <Box style={{ lineHeight: "1", ...truncateTextStyle }}>
          {isPrivateSale ? (
            <Text
              fontStyle="italic"
              variant="sm"
              color="mono60"
              display="inline"
            >
              {title}
              {date && `, ${date}`}
            </Text>
          ) : (
            <Link
              href={`/artwork/${artwork?.slug}`}
              target="_blank"
              textDecoration={"none"}
            >
              <Text
                fontStyle="italic"
                variant="sm"
                color="mono60"
                display="inline"
              >
                {title}
                {date && `, ${date}`}
              </Text>
            </Link>
          )}
        </Box>
        {!isPrivateSale && (
          <>
            {name && (
              <Text variant="sm" overflowEllipsis color="mono60">
                {name}
              </Text>
            )}
            <Text variant="sm" color="mono60">
              {shippingOrigin}
            </Text>
          </>
        )}
        {!isPrivateSale && artworkPrice?.price && (
          <Text variant="sm">
            {`${priceLabel}: ${appendCurrencySymbol(
              artworkPrice.price,
              currencyCode,
            )}`}
          </Text>
        )}
        {!artworkPrice?.price && (
          <Text variant="sm">{`${priceLabel}`}: Not publicly listed</Text>
        )}
        {isUnlisted && (
          <Text variant="sm" color="mono60">
            Exclusive Access
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
                slug
                shippingOrigin
                isUnlisted
              }
              artworkVersion {
                date
                artistNames
                title
                image {
                  resized(width: 185) {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
)
