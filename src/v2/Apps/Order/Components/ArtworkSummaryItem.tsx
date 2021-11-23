import { ArtworkSummaryItem_order } from "v2/__generated__/ArtworkSummaryItem_order.graphql"
import { Omit } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"

import {
  Box,
  Flex,
  FlexProps,
  Image,
  Text,
  StackableBorderBox,
} from "@artsy/palette"

export interface ArtworkSummaryItemProps extends Omit<FlexProps, "order"> {
  order: ArtworkSummaryItem_order
  className?: string
}

const ArtworkSummaryItem: React.FC<ArtworkSummaryItemProps> = ({
  order: {
    lineItems,
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    sellerDetails: { name },
  },
  ...others
}) => {
  const artwork = get({}, () => lineItems?.edges?.[0]?.node?.artwork)

  const { artistNames, title, date, shippingOrigin, image } = artwork!

  const imageURL =
    image &&
    image.resized_ArtworkSummaryItem &&
    image.resized_ArtworkSummaryItem.url

  const truncateTextStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } as any

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
          </Text>
          <Text variant="sm" color="black60" display="inline">
            {date && `, ${date}`}
          </Text>
        </Box>
        <Text variant="sm" overflowEllipsis color="black60">
          {name}
        </Text>
        <Text variant="sm" color="black60">
          {shippingOrigin}
        </Text>
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
        lineItems {
          edges {
            node {
              artwork {
                artistNames
                title
                date
                shippingOrigin
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
