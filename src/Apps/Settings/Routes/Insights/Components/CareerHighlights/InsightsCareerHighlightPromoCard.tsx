import { Button, Flex, Image, ResponsiveBox, Text } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { resized } from "Utils/resized"

const { src, srcSet } = resized(
  "https://files.artsy.net/images/CareerHighlightPromoImage.png",
  {
    height: 712,
    width: 428,
  }
)

export const InsightsCareerHighlightPromoCard: React.FC = () => {
  return (
    <Flex
      width={313}
      height={178}
      background="white"
      border="1px solid"
      borderColor="black10"
    >
      <Flex
        p={2}
        pr={0}
        alignItems="flex-start"
        justifyContent="flex-end"
        flexDirection="column"
      >
        <Text variant="sm-display" mb={2}>
          Discover career highlights for your artists.
        </Text>

        <Button
          // @ts-ignore
          as={RouterLink}
          variant="primaryBlack"
          size="small"
          to="/my-collection/artworks/new"
        >
          Upload Artwork
        </Button>
      </Flex>

      <ResponsiveBox
        aspectHeight={712}
        aspectWidth={428}
        maxHeight={176}
        maxWidth={106}
      >
        <Image
          src={src}
          width="100%"
          height="100%"
          srcSet={srcSet}
          alt="Artwork called '25 Cats Name Sam and One Blue Pussy' by Andy Warhol"
          lazyLoad
        />
      </ResponsiveBox>
    </Flex>
  )
}
