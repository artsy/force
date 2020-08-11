import { Flex, Image, Link, Sans, color } from "@artsy/palette"
import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"
import React from "react"

interface ItemProps {
  item: Conversation_conversation["items"][0]["item"]
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
    return (
      <Link
        href={item.href}
        underlineBehavior="none"
        style={{ alignSelf: "flex-end" }}
        mb={1}
      >
        <Flex flexDirection="column">
          <Image
            src={getImage(item)}
            alt={item.__typename === "Artwork" ? item.title : item.name}
            width="350px"
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
