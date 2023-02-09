import {
  Button,
  Column,
  GridColumns,
  ResponsiveBox,
  Spacer,
  Text,
  Image,
  Box,
} from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"

import { resized } from "Utils/resized"

export const FAWSWA: React.FC = () => {
  const image = resized(
    "https://files.artsy.net/images/SWA-landing-FAQ-section.png",
    { width: 950, height: 419 } // TODO: Source image should be 4:3, ideally
  )

  return (
    <Box mx={[-2, -4]} pt={[4, 12]} pb={[0, 12]} backgroundColor="black100">
      <GridColumns gridRowGap={2} alignItems="center">
        <Column span={6} py={[0, 2]} pr={[2, 2]} pl={[2, 4]}>
          <Text variant={["md", "xxl"]} mb={4} textColor="white100">
            No upfront fees, clear pricing estimates and commission structures.
          </Text>
          <Text variant={["xs", "sm"]} mb={[2, 4]} textColor="white100">
            Have more questions?
          </Text>
          <GridColumns>
            <Column span={5}>
              <Button // @ts-ignore
                as={RouterLink}
                variant="secondaryWhite"
                width="100%"
              >
                Read FAQs
              </Button>
            </Column>
          </GridColumns>
        </Column>

        <Column span={6} order={[1, 0]}>
          <ResponsiveBox aspectWidth={950} aspectHeight={419} maxWidth="100%">
            <Image
              width="100%"
              height="100%"
              src={image.src}
              srcSet={image.srcSet}
              lazyLoad
              style={{ backgroundColor: "black" }}
              alt="Collage of four artworks on a black background"
            />
          </ResponsiveBox>
        </Column>
      </GridColumns>
    </Box>
  )
}
