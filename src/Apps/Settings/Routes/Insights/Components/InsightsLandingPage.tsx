import {
  Button,
  Column,
  GridColumns,
  Image,
  ResponsiveBox,
  Text,
} from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { resized } from "Utils/resized"

export const InsightsLandingPage = () => {
  const { src, srcSet } = resized(
    "https://files.artsy.net/images/InsightsEmptyStateImage.png",
    {
      height: 800,
      width: 1360,
    }
  )

  return (
    <GridColumns mb={12} gridRowGap={4} alignItems="center">
      <Column span={6} order={[2, 1]}>
        <Text variant={["xl", "xl", "xxl"]}>
          Gain Deeper Knowledge of Your Collection
        </Text>

        <Text variant="sm" mt={[0, 2]} mb={[2, 4, 6]}>
          Get free market insights about the artists you collect.
        </Text>

        <Button
          // @ts-ignore
          as={RouterLink}
          variant="primaryBlack"
          to={"/collector-profile/my-collection/artworks/new"}
          width={["100%", "auto"]}
        >
          Upload Artwork
        </Button>
      </Column>

      <Column span={6} order={[1, 2]}>
        <ResponsiveBox aspectHeight={800} aspectWidth={1360} maxWidth="100%">
          <Image
            src={src}
            width="100%"
            height="100%"
            srcSet={srcSet}
            lazyLoad
            alt="Screenshot of Recently Sold at Auctions sample screen on the app with a graph on a laptop against an insights graph background"
          />
        </ResponsiveBox>
      </Column>
    </GridColumns>
  )
}
