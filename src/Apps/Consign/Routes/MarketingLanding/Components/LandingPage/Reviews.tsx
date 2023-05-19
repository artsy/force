import { Text, Box, Flex, Avatar } from "@artsy/palette"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import React from "react"

interface ReviewsData {
  reviewText: string
  image: string // TODO:
  reviewerName: string
  galery: string
}

const REVIEWS: ReviewsData[] = [
  {
    reviewText:
      "My specialist kept me transparently informed from our initial conversation throughout. They took care of everything smoothly - from finding the right buyer to taking care of shipping and final payment.",
    image: "image",
    reviewerName: "Joe Bloggs",
    galery: "White Cube Gallery",
  },
  {
    reviewText:
      "2 My specialist kept me transparently informed from our initial conversation throughout. They took care of everything smoothly - from finding the right buyer to taking care of shipping and final payment.",
    image: "image",
    reviewerName: "Joe Bloggs",
    galery: "White Cube Gallery",
  },
  {
    reviewText:
      "3 My specialist kept me transparently informed from our initial conversation throughout. They took care of everything smoothly - from finding the right buyer to taking care of shipping and final payment.",
    image: "image",
    reviewerName: "Joe Bloggs",
    galery: "White Cube Gallery",
  },
]

export const Reviews: React.FC = () => {
  return (
    <Box py={[0, 6, 12]}>
      <HeroCarousel progressbarVariant="dot" fullBleed={false}>
        {REVIEWS.map(i => {
          return <ListItem review={i} />
        })}
      </HeroCarousel>
    </Box>
  )
}

const ListItem: React.FC<{ review: ReviewsData }> = ({ review }) => {
  const { reviewText, image, reviewerName, galery } = review
  return (
    <Flex alignItems="center" flexDirection="column">
      <Text
        variant={["md", "lg", "xl"]}
        width={["100%", "80%"]}
        textAlign="center"
        mb={4}
      >
        "{reviewText}"
      </Text>
      <Avatar size="xs" initials={image} mb={1} />
      <Text variant={["xs", "xs", "sm"]}>{reviewerName}</Text>
      <Text variant={["xs", "xs", "sm"]} color="black60">
        {galery}
      </Text>
    </Flex>
  )
}
