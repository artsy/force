import * as React from "react"
import { ConversationMessageArtwork_item$key } from "__generated__/ConversationMessageArtwork_item.graphql"
import { graphql, useFragment } from "react-relay"
import { FlexProps, Flex, Image, Text } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"

interface ConversationMessageArtworkProps extends FlexProps {
  item: ConversationMessageArtwork_item$key
}

export const ConversationMessageArtwork: React.FC<ConversationMessageArtworkProps> = ({
  item,
  ...flexProps
}) => {
  const data = useFragment(FRAGMENT, item)

  if (data.__typename !== "Artwork") {
    return null
  }

  if (!data.image?.imageURL) {
    return null
  }

  const displayPrice =
    (data.listPrice?.__typename === "Money" ||
      data.listPrice?.__typename === "PriceRange") &&
    data.listPrice?.display

  return (
    <RouterLink
      to={data.href}
      textDecoration="none"
      style={{ alignSelf: "flex-end", maxWidth: "100%" }}
    >
      <Flex flexDirection="column" {...flexProps}>
        <Image
          src={data.image.imageURL}
          alt={data.title as string}
          style={{ maxWidth: "350px" }}
          borderRadius="15px 15px 0 0"
        />

        <Flex
          p={1}
          flexDirection="column"
          justifyContent="center"
          backgroundColor="black100"
          borderRadius="0 0 10px 10px"
        >
          <Text key={1} variant="sm-display" color="white100">
            {data.artistNames}
          </Text>

          <Text key={2} variant="xs" color="white100">
            {data.title} / {data.date}
          </Text>

          {displayPrice && (
            <Text key={3} variant="xs" color="white100">
              {data.listPrice?.display}
            </Text>
          )}
        </Flex>
      </Flex>
    </RouterLink>
  )
}

const FRAGMENT = graphql`
  fragment ConversationMessageArtwork_item on ConversationItemType {
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
        imageURL: url(version: ["large"])
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
  }
`
