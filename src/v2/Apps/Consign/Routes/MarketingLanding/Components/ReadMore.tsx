import * as React from "react"
import { Box, Column, GridColumns, Image, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ClickedArticleGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { cropped } from "v2/Utils/resized"

export const ReadMore: React.FC = () => {
  const tracking = useTracking()

  const trackClick = ({ slug, internalID }) => {
    const clickedArticleGroup: ClickedArticleGroup = {
      action: ActionType.clickedArticleGroup,
      context_module: ContextModule.relatedArticles,
      context_page_owner_type: OwnerType.consign,
      destination_page_owner_id: internalID,
      destination_page_owner_slug: slug,
      destination_page_owner_type: OwnerType.article,
      type: "thumbnail",
    }

    tracking.trackEvent(clickedArticleGroup)
  }

  return (
    <>
      <Text variant="xl" mb={4}>
        Read more about selling your artwork
      </Text>

      <GridColumns>
        <Column span={6}>
          <Article
            title="How to Decide Where to Consign Your Art"
            author="Justin Kamp"
            imageSrc="https://artsy-media-uploads.s3.amazonaws.com/HAMtiYOX9hWvXb2y_iMGyw%2Fcustom-Custom_Size___GettyImages-1033066540.jpg"
            href="https://www.artsy.net/series/artsy-editorial-decide-consign-art"
            onClick={() => {
              trackClick({
                internalID: "5e6fc79cb77f450020738595",
                slug: "artsy-editorial-decide-consign-art",
              })
            }}
          />
        </Column>

        <Column span={6}>
          <Article
            title="A Beginner’s Guide to Consigning Your Art for Sale"
            author="Alina Cohen"
            imageSrc="https://artsy-media-uploads.s3.amazonaws.com/sNFRzEScjeBz5wzLHGtwxA%2FGettyImages-154384470.jpg"
            href="https://www.artsy.net/series/artsy-editorial-beginners-guide-consigning-art-sale"
            onClick={() => {
              trackClick({
                internalID: "5e458e6c4c9c6b00211fb7f4",
                slug: "artsy-editorial-beginners-guide-consigning-art-sale",
              })
            }}
          />
        </Column>

        <Column span={6}>
          <Article
            title="How to Get an Artwork Appraised during a Pandemic"
            author="Alina Cohen"
            imageSrc="https://artsy-media-uploads.s3.amazonaws.com/Yj8M5Ov9QifLFseYDeco5w%2FGettyImages-1169762037+copy.jpg"
            href="https://www.artsy.net/article/artsy-editorial-artwork-appraised-pandemic"
            onClick={() => {
              trackClick({
                internalID: "5f1afb54b24a600020d60a19",
                slug: "artsy-editorial-artwork-appraised-pandemic",
              })
            }}
          />
        </Column>

        <Column span={6}>
          <Article
            title="What to Do If You Inherit an Art Collection"
            author="Christy Kuesel"
            imageSrc="https://d32dm0rphc51dk.cloudfront.net/V2owpy_ugXbFQWXfboACHw/larger.jpg"
            href="https://www.artsy.net/series/guide-consigning-art/artsy-editorial-inherit-art-collection"
            onClick={() => {
              trackClick({
                internalID: "5d8e276b1eecc00021ea1a2d",
                slug: "artsy-editorial-inherit-art-collection",
              })
            }}
          />
        </Column>

        <Column span={6}>
          <Article
            title="How to Resell Art (without Hurting Anyone's Feelings)"
            author="Anna Louie Sussman"
            imageSrc="https://d32dm0rphc51dk.cloudfront.net/ZyFeioILjrX00uOPaKAkMQ/larger.jpg"
            href="https://www.artsy.net/series/artsy-editorial-resell-art-hurting-anyones-feelings"
            onClick={() => {
              trackClick({
                internalID: "5938691a4e9b7a0017bfe070",
                slug: "artsy-editorial-resell-art-hurting-anyones-feelings",
              })
            }}
          />
        </Column>

        <Column span={6}>
          <Article
            title="5 Questions to Ask an Auction House before Consigning a Work"
            author="Isaac Kaplan"
            imageSrc="https://artsy-media-uploads.s3.amazonaws.com/MIJntHZMBYOt94ayvz88Mw%2FGettyImages-157885454.jpg"
            href="https://www.artsy.net/series/guide-consigning-art/artsy-editorial-5-questions-auction-house-consigning-work"
            onClick={() => {
              trackClick({
                internalID: "597f71d5749d600077dd288e",
                slug:
                  "artsy-editorial-5-questions-auction-house-consigning-work",
              })
            }}
          />
        </Column>
      </GridColumns>
    </>
  )
}

const Article: React.FC<{
  href: string
  title: string
  author: string
  imageSrc: string
  onClick: () => void
}> = ({ href, title, author, imageSrc, onClick }) => {
  const img = cropped(imageSrc, { width: 200, height: 113 })

  return (
    <RouterLink
      to={href}
      target="_blank"
      onClick={onClick}
      display="flex"
      textDecoration="none"
    >
      <Box flex={1} pr={2}>
        <Text variant="md">{title}</Text>
        <Text variant={["xs", "md"]} color="black60">
          {author}
        </Text>
      </Box>

      <Image
        width={[125, 200]}
        height={[71, 113]}
        src={img.src}
        srcSet={img.srcSet}
        alt=""
        lazyLoad
      />
    </RouterLink>
  )
}
