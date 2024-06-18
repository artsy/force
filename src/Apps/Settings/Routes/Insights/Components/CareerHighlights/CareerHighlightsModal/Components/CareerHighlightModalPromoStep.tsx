import {
  Flex,
  Text,
  Spacer,
  Button,
  ResponsiveBox,
  Image,
} from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { cropped } from "Utils/resized"
import { Media } from "Utils/Responsive"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"

const CareerHighlightModalPromoStepDesktop = () => {
  const { src: dSrc, srcSet: dSrcSet } = cropped(
    "https://files.artsy.net/images/CareerHighlightModalPromoImage.png",
    {
      height: 550,
      width: 380,
    }
  )

  return (
    <Flex flex={1} flexDirection="column">
      <ArtsyLogoIcon />

      <Flex mt={2}>
        <ResponsiveBox
          aspectWidth={380}
          aspectHeight={550}
          maxWidth="100%"
          bg="black10"
        >
          <Image
            lazyLoad
            src={dSrc}
            srcSet={dSrcSet}
            alt="Artwork called '25 Cats Name Sam and One Blue Pussy' by Andy Warhol"
          />
        </ResponsiveBox>

        <Spacer x={4} />

        <Flex minWidth="45%" flexDirection="column">
          <Text variant="lg-display">
            Discover career highlights for artists you collect.
          </Text>

          <Spacer y={2} />

          <Text variant="sm-display">
            Add artworks to reveal career highlights for your artists.
          </Text>

          <Spacer y={4} />

          <Button
            // @ts-ignore
            as={RouterLink}
            width="100%"
            variant="primaryBlack"
            size="large"
            to={"/collector-profile/my-collection/artworks/new"}
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
  const { src: mSrc, srcSet: mSrcSet } = cropped(
    "https://files.artsy.net/images/CareerHighlightModalPromoImageMobile.png",
    {
      height: 900,
      width: 750,
    }
  )

  return (
    <Flex flex={1} flexDirection="column">
      <Text variant="lg-display">
        Discover career highlights for artists you collect.
      </Text>

      <Spacer y={6} />

      <Button
        // @ts-ignore
        as={RouterLink}
        width="100%"
        variant="primaryBlack"
        size="large"
        to={"/collector-profile/my-collection/artworks/new"}
        py={1}
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
