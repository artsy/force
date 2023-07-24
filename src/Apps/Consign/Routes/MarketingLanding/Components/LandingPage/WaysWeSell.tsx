import React from "react"
import {
  Text,
  Image,
  Box,
  Shelf,
  GridColumns,
  Column,
  FullBleed,
  Flex,
} from "@artsy/palette"
import { resized } from "Utils/resized"
import { Media } from "Utils/Responsive"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useWindowSize } from "Utils/Hooks/useWindowSize"

export type StepsWithImageBlackDataType = {
  src: string
  srcSet: string
  text?: string
  title?: string
  useBlackBackground?: boolean
  imageHeight?: number
}

const IMAGE_WIDTH = 600
const BIG_IMAGE_HEIGHT = 575

const waysWeSellImage1 = resized(
  "https://files.artsy.net/images/ways-we-sell-auctions.jpg",
  { width: IMAGE_WIDTH, height: 415, quality: 100 }
)

const waysWeSellImage2 = resized(
  "https://files.artsy.net/images/ways-we-sell-private-sales.jpg",
  { width: IMAGE_WIDTH, height: BIG_IMAGE_HEIGHT, quality: 100 }
)

const waysWeSellImage3 = resized(
  "https://files.artsy.net/images/ways-we-sell-online-storefront.jpg",
  { width: IMAGE_WIDTH, height: 344, quality: 100 }
)

const data: StepsWithImageBlackDataType[] = [
  {
    src: waysWeSellImage1.src,
    srcSet: waysWeSellImage1.srcSet,
    text:
      "Our curated auctions provide you with multiple opportunities to reach the widest audience and successfully achieve your artwork’s full potential.",
    title: "Auctions",
  },
  {
    src: waysWeSellImage2.src,
    srcSet: waysWeSellImage2.srcSet,
    text:
      "​​We offer tailored and discreet sales arrangements for our collectors’ highest value and most sensitive artworks.",
    title: "Private sales",
  },
  {
    src: waysWeSellImage3.src,
    srcSet: waysWeSellImage3.srcSet,
    text:
      "When your work is listed directly on Artsy.net—the world’s largest online art marketplace—it reaches over 3 million art lovers.",
    title: "Online marketplace",
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
              A sales strategy tailored to your artwork
            </Text>

            <Text mb={[4, 4, 6]} variant={["xs", "sm"]} color="white100">
              A dedicated specialist works with you to select the best sales
              option for your artwork.
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
}) => {
  const { width } = useWindowSize()

  const aspectRatio = BIG_IMAGE_HEIGHT / IMAGE_WIDTH

  // calculating the width of the image contailer
  // (screen width - HorizontalPadding - px of the parent - gridColumnGap) / 3
  const collumnHeightMediumcreen =
    ((width - 20 * 2 - 20 * 2 - 20 * 2) / 3) * aspectRatio
  const collumnHeightBigScreen =
    ((width - 40 * 2 - 40 * 2 - 40 * 2) / 3) * aspectRatio

  return (
    <>
      <Box
        maxWidth="100%"
        bg="black100"
        mb={[1, 2]}
        height={["auto", collumnHeightMediumcreen, collumnHeightBigScreen]}
        maxHeight={BIG_IMAGE_HEIGHT}
      >
        <Flex height="100%" alignItems="flex-end">
          <Image
            src={src}
            srcSet={srcSet}
            width="100%"
            height="auto"
            lazyLoad
            alt={`${title} image`}
            style={{
              display: "flex",
              alignSelf: "flex-end",
            }}
          />
        </Flex>
      </Box>

      {title && (
        <Text
          mb={[0.5, 1]}
          variant={["md", "lg-display", "xl"]}
          color="white100"
        >
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
}

const DesctopLayout: React.FC = () => {
  return (
    <Media greaterThan="xs">
      <GridColumns gridColumnGap={[0, 2, 4]}>
        {data.map((step, index) => {
          return (
            <Column
              key={index}
              span={4}
              mb={[2, 0]}
              data-test="artworkShelfArtwork"
              display="flex"
              flexDirection="column"
              justifyContent={["flex-end", "flex-start", "flex-start"]}
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
        {data.map((step, index) => {
          return (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              data-test="artworkShelfArtwork"
              minWidth={305}
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
