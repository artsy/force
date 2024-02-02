import React from "react"
import {
  Text,
  Image,
  Box,
  Shelf,
  GridColumns,
  Column,
  FullBleed,
  Stack,
  ResponsiveBox,
} from "@artsy/palette"
import { resized } from "Utils/resized"
import { Media } from "Utils/Responsive"
import { AppContainer } from "Apps/Components/AppContainer"

interface ShelfItemProps {
  image: {
    src: string
    width: number
    height: number
  }
  text: string
  title: string
}

// FIXME: These images are far too small to be used!
const IMAGE_AUCTIONS = {
  src: "https://files.artsy.net/images/ways-we-sell-auctions.jpg",
  width: 633,
  height: 415,
}

const IMAGE_PRIVATE_SALES = {
  src: "https://files.artsy.net/images/ways-we-sell-private-sales.jpg",
  width: 622,
  height: 597,
}

const IMAGE_STOREFRONT = {
  src: "https://files.artsy.net/images/ways-we-sell-online-storefront.jpg",
  width: 420,
  height: 344,
}

const DATA: ShelfItemProps[] = [
  {
    image: IMAGE_AUCTIONS,
    text:
      "Our curated auctions provide you with multiple opportunities to reach the widest audience and successfully achieve your artwork’s full potential.",
    title: "Auctions",
  },
  {
    image: IMAGE_PRIVATE_SALES,
    text:
      "​​We offer tailored and discreet sales arrangements for our collectors’ highest value and most sensitive artworks.",
    title: "Private sales",
  },
  {
    image: IMAGE_STOREFRONT,
    text:
      "When your work is listed directly on Artsy.net—the world’s largest online art marketplace—it reaches over 3 million art lovers.",
    title: "Online marketplace",
  },
]

export const WaysWeSell = () => {
  return (
    <FullBleed bg="black100" color="white100">
      <AppContainer>
        <Box px={[2, 4]} py={[4, 12]}>
          <Text mb={[1, 2]} variant={["lg-display", "xl", "xxl"]}>
            A sales strategy tailored to your artwork
          </Text>

          <Text mb={[4, 4, 6]} variant={["xs", "sm"]}>
            A dedicated specialist works with you to select the best sales
            option for your artwork.
          </Text>

          <DesktopLayout />

          <MobileLayout />
        </Box>
      </AppContainer>
    </FullBleed>
  )
}

const ShelfItem: React.FC<ShelfItemProps> = ({ image, title, text }) => {
  return (
    <Stack gap={[1, 2]}>
      <ResponsiveBox
        aspectWidth={image.width}
        aspectHeight={image.height}
        maxWidth="100%"
      >
        <Image
          {...resized(image.src, { width: 500, height: 500 })}
          width="100%"
          height="100%"
          lazyLoad
          style={{ display: "block" }}
        />
      </ResponsiveBox>

      <Stack
        gap={[0.5, 1]}
        // Magic numbers to bottom align images
        minHeight={[100, 200, 140]}
      >
        {title && <Text variant={["md", "lg-display", "xl"]}>{title}</Text>}

        {text && <Text variant={["xs", "sm"]}>{text}</Text>}
      </Stack>
    </Stack>
  )
}

const DesktopLayout: React.FC = () => {
  return (
    <Media greaterThan="xs">
      <GridColumns gridColumnGap={[0, 2, 4]}>
        {DATA.map((step, index) => {
          return (
            <Column
              key={index}
              span={4}
              data-test="artworkShelfArtwork"
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
            >
              <ShelfItem {...step} />
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
      <Shelf>
        {DATA.map((step, index) => {
          return (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              data-test="artworkShelfArtwork"
              minWidth={300}
            >
              <ShelfItem {...step} />
            </Box>
          )
        })}
      </Shelf>
    </Media>
  )
}
