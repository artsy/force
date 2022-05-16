import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Flex, Image, Link, Text } from "@artsy/palette"
import { Item_item } from "v2/__generated__/Item_item.graphql"

interface ItemProps {
  item: Item_item
}

export type ItemType = "Artwork" | "Show"

export const Item: React.FC<ItemProps> = props => {
  const { item } = props

  if (item.__typename === "%other") return null
  const itemType = item.__typename as ItemType

  const getImage = item => {
    if (itemType === "Artwork") {
      return item.image?.url
    } else if (itemType === "Show") {
      return item.coverImage?.url
    } else {
      return null
    }
  }

  const itemDetails = item => {
    if (item.__typename === "Artwork") {
      return [
        <Text key={1} variant="sm-display" color="white100">
          {item.artistNames}
        </Text>,
        <Text key={2} variant="xs" color="white100">
          {item.title} / {item.date}
        </Text>,
        item.listPrice?.display && (
          <Text key={3} variant="xs" color="white100">
            {item.listPrice?.display}
          </Text>
        ),
      ]
    } else if (item.__typename === "Show") {
      const itemLocation = item.fair?.location?.city
      return [
        <Text key={1} variant="sm-display" color="white100">
          {item.fair.name}
        </Text>,
        <Text key={2} variant="xs" color="white100">
          {itemLocation && `${itemLocation}, `}
          {item?.fair?.exhibitionPeriod}
        </Text>,
      ]
    }
  }

  if (itemType === "Artwork" || itemType === "Show") {
    const imageName =
      (item.__typename === "Artwork" ? item.title : item.name) || undefined
    return (
      <Link
        href={item.href || undefined}
        underlineBehavior="none"
        style={{ alignSelf: "flex-end", maxWidth: "100%" }}
        mb={1}
      >
        <Flex flexDirection="column">
          <Image
            src={getImage(item)}
            alt={imageName}
            style={{ maxWidth: "350px" }}
            borderRadius="15px 15px 0 0"
          />

          <Flex
            p={1}
            flexDirection="column"
            justifyContent="center"
            backgroundColor="black100"
            borderRadius="0 0 15px 15px"
          >
            {itemDetails(item)}
          </Flex>
        </Flex>
      </Link>
    )
  } else {
    return null
  }
}

export const ItemFragmentContainer = createFragmentContainer(Item, {
  item: graphql`
    fragment Item_item on ConversationItemType {
      __typename
      ... on Artwork {
        internalID
        id
        date
        title
        artistNames
        href
        isOfferableFromInquiry
        image {
          url(version: ["large"])
        }
        listPrice {
          __typename
          ... on Money {
            display
          }
          ... on PriceRange {
            display
          }
        }
      }
      ... on Show {
        id
        fair {
          name
          exhibitionPeriod
          location {
            city
          }
        }
        href
        name
        coverImage {
          url
        }
      }
    }
  `,
})
