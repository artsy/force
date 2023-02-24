import React from "react"
import {
  Text,
  Image,
  Box,
  Shelf,
  GridColumns,
  Column,
  FullBleed,
} from "@artsy/palette"
import { resized } from "Utils/resized"
import { Media } from "Utils/Responsive"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"

export type StepsWithImageBlackDataType = {
  src: string
  srcSet: string
  text?: string
  title?: string
  useBlackBackground?: boolean
  imageHeight?: number
}

const IMAGE_WIDTH = 600

const waysWeSellImage1 = resized(
  "https://files.artsy.net/images/ways-we-sell-auctions-swa-landing-page.jpg",
  { width: IMAGE_WIDTH, height: 392, quality: 100 }
)

const waysWeSellImage2 = resized(
  "https://files.artsy.net/images/ways-we-sell-privat-sales-swa-landing-page.jpg",
  { width: IMAGE_WIDTH, height: 317, quality: 100 }
)

const waysWeSellImage3 = resized(
  "https://files.artsy.net/images/ways-we-sell-online-storefront-swa-landing-page.jpg",
  { width: IMAGE_WIDTH, height: 358, quality: 100 }
)

const data: StepsWithImageBlackDataType[] = [
  {
    src: waysWeSellImage1.src,
    srcSet: waysWeSellImage1.srcSet,
    text:
      "We maximize your profitability by selecting the right auction partner for your work from our network in 190 countries.",
    title: "Auctions",
  },
  {
    src: waysWeSellImage2.src,
    srcSet: waysWeSellImage2.srcSet,
    text:
      "Our bespoke process will match your work to potential buyers through an exclusive network of collectors.",
    title: "Private Sales",
  },
  {
    src: waysWeSellImage3.src,
    srcSet: waysWeSellImage3.srcSet,
    text:
      "We list your work directly on Artsy.net, the world’s largest online art marketplace, reaching over 3 million art lovers daily.",
    title: "Online storefront",
  },
]

export const WaysWeSell = () => {
  return (
    <FullBleed background="black" position="relative">
      <AppContainer>
        <HorizontalPadding>
          <Box mx={[-2, -4]} px={[2, 4]} py={[4, 12]}>
            <Text
              mb={[1, 2]}
              variant={["lg-display", "xl", "xxl"]}
              color="white100"
            >
              Ways to sell with Artsy
            </Text>

            <Text mb={[4, 4, 6]} variant={["xs", "sm"]} color="white100">
              We create a tailored strategy to find the optimal sales method for
              your artwork.
            </Text>
            <DesctopLayout />
            <MobileLayout />
          </Box>
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}

const ShelfItem: React.FC<StepsWithImageBlackDataType> = ({
  src,
  title,
  text,
  srcSet,
}) => (
  <>
    <Box maxWidth="100%" bg="black10" mb={[1, 2]}>
      <Image
        src={src}
        srcSet={srcSet}
        width="100%"
        height="100%"
        lazyLoad
        alt={`${title} image`}
        style={{
          display: "block",
        }}
      />
    </Box>
    {title && (
      <Text mb={[0.5, 1]} variant={["md", "lg-display", "xl"]} color="white100">
        {title}
      </Text>
    )}

    {text && (
      <Text variant={["xs", "sm"]} color="white100">
        {text}
      </Text>
    )}
  </>
)

const DesctopLayout: React.FC = () => {
  return (
    <Media greaterThan="xs">
      <GridColumns gridColumnGap={[0, 2, 4]}>
        {data.map(step => {
          return (
            <Column
              span={4}
              mb={[2, 0]}
              data-test="artworkShelfArtwork"
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
            >
              <ShelfItem
                src={step.src}
                srcSet={step.srcSet}
                text={step.text}
                title={step.title}
              />
            </Column>
          )
        })}
      </GridColumns>
    </Media>
  )
}

const MobileLayout: React.FC = () => {
  return (
    <Media at="xs">
      <Shelf showProgress={false}>
        {data.map(step => {
          return (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              data-test="artworkShelfArtwork"
              minWidth={250}
            >
              <ShelfItem
                src={step.src}
                srcSet={step.srcSet}
                text={step.text}
                title={step.title}
              />
            </Box>
          )
        })}
      </Shelf>
    </Media>
  )
}
