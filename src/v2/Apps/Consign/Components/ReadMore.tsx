import React from "react"
import { Box, ChevronIcon, Flex, Image, Text } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"

export const ReadMore: React.FC = () => {
  return (
    <SectionContainer>
      <Text width="100%" textAlign="left" mb={4} variant="largeTitle">
        Read more about selling your artwork
      </Text>

      <Flex justifyContent="space-between" flexWrap="wrap">
        <Article
          title="How to Decide Where to Consign Your Art"
          author="Justin Kamp"
          // FIXME: massive images, grabbed from editorial articles
          imageSrc="https://d7hftxdivxxvm.cloudfront.net/?resize_to=fill&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FHAMtiYOX9hWvXb2y_iMGyw%252Fcustom-Custom_Size___GettyImages-1033066540.jpg&width=680&height=450&quality=80"
          href="https://www.artsy.net/series/artsy-editorial-decide-consign-art"
        />
        <Article
          title="A Beginner’s Guide to Consigning Your Art for Sale"
          author="Alina Cohen"
          imageSrc="https://d7hftxdivxxvm.cloudfront.net/?resize_to=fill&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FsNFRzEScjeBz5wzLHGtwxA%252FGettyImages-154384470.jpg&width=680&height=450&quality=80"
          href="https://www.artsy.net/series/artsy-editorial-beginners-guide-consigning-art-sale"
        />
        <Article
          title="How to Get an Artwork Appraised during a Pandemic"
          author="Alina Cohen"
          imageSrc="https://d7hftxdivxxvm.cloudfront.net/?resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FYj8M5Ov9QifLFseYDeco5w%252FGettyImages-1169762037%2Bcopy.jpg&width=1200&quality=80"
          href="https://www.artsy.net/article/artsy-editorial-artwork-appraised-pandemic"
        />

        <Media greaterThan="md">
          <Article
            title="What to Do If You Inherit an Art Collection"
            author="Christy Kuesel"
            imageSrc="https://d7hftxdivxxvm.cloudfront.net/?resize_to=width&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FV2owpy_ugXbFQWXfboACHw%2Flarger.jpg&width=1200&quality=80"
            href="https://www.artsy.net/series/guide-consigning-art/artsy-editorial-inherit-art-collection"
          />
        </Media>
        <Media greaterThan="md">
          <Article
            title="How to Resell Art (without Hurting Anyone's Feelings)"
            author="Anna Louie Sussman"
            imageSrc="https://d7hftxdivxxvm.cloudfront.net/?resize_to=width&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FZyFeioILjrX00uOPaKAkMQ%2Flarger.jpg&width=1200&quality=80"
            href="https://www.artsy.net/series/artsy-editorial-resell-art-hurting-anyones-feelings"
          />
        </Media>
        <Media greaterThan="md">
          <Article
            title="5 Questions to Ask an Auction House before Consigning a Work"
            author="Isaac Kaplan"
            imageSrc="https://d7hftxdivxxvm.cloudfront.net/?resize_to=fill&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FMIJntHZMBYOt94ayvz88Mw%252FGettyImages-157885454.jpg&width=680&height=450&quality=80"
            href="https://www.artsy.net/series/guide-consigning-art/artsy-editorial-5-questions-auction-house-consigning-work"
          />
        </Media>
      </Flex>

      <Media lessThan="md">
        <RouterLink
          to="/series/guide-consigning-art"
          style={{ textDecoration: "none" }}
        >
          <Flex>
            <Text variant="text" fontWeight="medium">
              View all Articles
            </Text>
            <ChevronIcon direction="right" />
          </Flex>
        </RouterLink>
      </Media>
    </SectionContainer>
  )
}

const Article: React.FC<{
  href: string
  title: string
  author: string
  imageSrc: string
}> = ({ href, title, author, imageSrc }) => {
  return (
    <RouterLink to={href} target="_blank" style={{ textDecoration: "none" }}>
      <Flex maxWidth={450}>
        <Box pr={2} pb={4}>
          <Text variant="subtitle">{title}</Text>
          <Text variant="text" color="black60">
            {author}
          </Text>
        </Box>
        <Box>
          <Image
            width={137}
            height={80}
            style={{ objectFit: "fill" }}
            src={imageSrc}
          />
        </Box>
      </Flex>
    </RouterLink>
  )
}
