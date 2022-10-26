import {
  Flex,
  Text,
  Spacer,
  Button,
  ResponsiveBox,
  Image,
} from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { cropped } from "Utils/resized"

const { src, srcSet } = cropped(
  "https://files.artsy.net/images/CareerHighlightModalPromoImageMobile.png",
  {
    height: 900,
    width: 750,
  }
)

export const CareerHighlightModalPromoStep = () => {
  return (
    <Flex flex={1} flexDirection="column" mx={1}>
      <Text variant="lg">Discover Career Highlights for Your Artists</Text>

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
      >
        Upload Artwork
      </Button>

      <Flex mt={2} overflowY="auto">
        <ResponsiveBox
          aspectWidth={750}
          aspectHeight={900}
          maxWidth="100%"
          bg="black10"
        >
          <Image
            lazyLoad
            src={src}
            srcSet={srcSet}
            alt="Artwork called '25 Cats Name Sam and One Blue Pussy' by Andy Warhol"
          />
        </ResponsiveBox>
      </Flex>
    </Flex>
  )
}
