import { Flex, Image, Link, Sans, color } from "@artsy/palette"
import { Item_item } from "v2/__generated__/Item_item.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

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
        <Sans key={1} size="4" weight="medium" color="white100">
          {item.artistNames}
        </Sans>,
        <Sans key={2} size="2" color="white100">
          {item.title} / {item.date}
        </Sans>,
        item.listPrice?.display && (
          <Sans key={3} size="2" color="white100">
            {item.listPrice?.display}
          </Sans>
        ),
      ]
    } else if (item.__typename === "Show") {
      const itemLocation = item.fair?.location?.city
      return [
        <Sans key={1} size="4" weight="medium" color="white100">
          {item.fair.name}
        </Sans>,
        <Sans key={2} size="2" color="white100">
          {itemLocation && `${itemLocation}, `}
          {item?.fair?.exhibitionPeriod}
        </Sans>,
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
            background={color("black100")}
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
