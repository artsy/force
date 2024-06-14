import * as React from "react"
import { ConversationMessageArtwork_item$key } from "__generated__/ConversationMessageArtwork_item.graphql"
import { graphql, useFragment } from "react-relay"
import { FlexProps, Flex, Image, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"

const MAX_IMAGE_WIDTH = 335

interface ConversationMessageArtworkProps extends FlexProps {
  item: ConversationMessageArtwork_item$key
}

export const ConversationMessageArtwork: React.FC<ConversationMessageArtworkProps> = ({
  item,
  ...flexProps
}) => {
  const data = useFragment(FRAGMENT, item)

  if (!data) {
    return null
  }

  if (data.__typename !== "Artwork" || !data.image?.resized?.url) {
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
      <Flex
        flexDirection="column"
        backgroundColor="black10"
        borderRadius="15px 15px 0 0"
        maxWidth={MAX_IMAGE_WIDTH}
        {...flexProps}
      >
        {data.image.resized.width && (
          <Image
            src={data.image.resized.url}
            alt={data.title as string}
            width={data.image.resized.width}
            height={MAX_IMAGE_WIDTH / data.image.aspectRatio}
            style={{ maxWidth: MAX_IMAGE_WIDTH }}
            borderRadius="10px 10px 0 0"
          />
        )}

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
        resized(width: 1350) {
          url
          width
          height
        }
        aspectRatio
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
