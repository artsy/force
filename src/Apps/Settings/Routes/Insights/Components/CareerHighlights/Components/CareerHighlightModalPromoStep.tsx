import {
  Flex,
  Text,
  Spacer,
  Button,
  ResponsiveBox,
  Image,
  ArtsyLogoBlackIcon,
  Box,
} from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { cropped } from "Utils/resized"
import { Media } from "Utils/Responsive"

const { src: mSrc, srcSet: mSrcSet } = cropped(
  "https://files.artsy.net/images/CareerHighlightModalPromoImageMobile.png",
  {
    height: 900,
    width: 750,
  }
)

const { src: dSrc, srcSet: dSrcSet } = cropped(
  "https://files.artsy.net/images/CareerHighlightModalPromoImage.png",
  {
    height: 1238,
    width: 798,
  }
)

const CareerHighlightModalPromoStepDesktop = () => {
  return (
    <Flex flex={1} flexDirection="column" flexGrow={1}>
      <Box mb={2}>
        <ArtsyLogoBlackIcon />
      </Box>

      <Flex overflowY="auto">
        <ResponsiveBox
          aspectWidth={798}
          aspectHeight={1238}
          maxWidth="100%"
          bg="black10"
          mr={1}
        >
          <Image
            lazyLoad
            src={dSrc}
            srcSet={dSrcSet}
            alt="Artwork called '25 Cats Name Sam and One Blue Pussy' by Andy Warhol"
          />
        </ResponsiveBox>

        <Spacer mr={4} />

        <Flex flexDirection="column">
          <Text variant={"lg-display"}>
            Discover Career Highlights for Your Artists
          </Text>

          <Spacer mt={2} />

          <Text variant="sm-display">
            Add artworks to reveal career highlights for your artists.
          </Text>

          <Spacer mt={4} />

          <Button
            // @ts-ignore
            as={RouterLink}
            width="100%"
            variant="primaryBlack"
            size="large"
            to="/my-collection/artworks/new"
            py={1}
          >
            Upload Artwork
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

const CareerHighlightModalPromoStepMobile = () => {
  return (
    <Flex flex={1} flexDirection="column">
      <Text variant="lg-display">
        Discover Career Highlights for Your Artists
      </Text>

      <Spacer mt={2} />

      <Text variant="sm" color="black60">
        Add artworks to reveal career highlights for your artists.
      </Text>

      <Spacer mt={4} />

      <Button
        // @ts-ignore
        as={RouterLink}
        width="100%"
        variant="primaryBlack"
        size="large"
        to="/my-collection/artworks/new"
        py={1}
        mx={2}
      >
        Upload Artwork
      </Button>

      <Flex flexGrow={1} mt={4} overflowY="auto">
        <ResponsiveBox
          aspectWidth={750}
          aspectHeight={900}
          maxWidth="100%"
          bg="black10"
        >
          <Image
            lazyLoad
            src={mSrc}
            srcSet={mSrcSet}
            alt="Artwork called '25 Cats Name Sam and One Blue Pussy' by Andy Warhol"
          />
        </ResponsiveBox>
      </Flex>
    </Flex>
  )
}

export const CareerHighlightModalPromoStep = () => {
  return (
    <>
      <Media greaterThanOrEqual="sm">
        <CareerHighlightModalPromoStepDesktop />
      </Media>

      <Media lessThan="sm">
        <CareerHighlightModalPromoStepMobile />
      </Media>
    </>
  )
}
