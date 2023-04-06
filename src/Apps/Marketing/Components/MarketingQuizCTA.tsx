import {
  Column,
  FullBleed,
  GridColumns,
  Text,
  Image,
  Spacer,
  Button,
  ResponsiveBox,
  Box,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { BRAND_PALETTE } from "Apps/Marketing/Utils/brandPalette"
import { RouterLink } from "System/Router/RouterLink"
import { resized } from "Utils/resized"
import { FC } from "react"

export const MarketingQuizCTA: FC = () => {
  const image = resized(
    "https://files.artsy.net/images/marketing_find_art-quiz.png",
    { width: 688, height: 1109 }
  )

  return (
    <FullBleed bg={BRAND_PALETTE.blue}>
      <AppContainer>
        <HorizontalPadding>
          <GridColumns>
            <Column
              span={[12, 8, 9]}
              order={[1, 0]}
              pt={[0, 6]}
              pb={[6, 6]}
              textAlign={["center", "left"]}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Text variant={["xl", "xxl", "xxl"]}>
                Don’t know your taste yet?
              </Text>

              <Spacer y={[2, 4]} />

              <Text variant="lg" maxWidth={["100%", "75%"]}>
                Rate artworks and get recommendations tailored to you.
              </Text>

              <Spacer y={[2, 4]} />

              <Box>
                <Button
                  // @ts-ignore
                  as={RouterLink}
                  to="/art-quiz"
                >
                  Get Started
                </Button>
              </Box>
            </Column>

            <Column
              span={[12, 4, 3]}
              order={[0, 1]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ResponsiveBox
                aspectWidth={688}
                aspectHeight={1109}
                maxWidth="100%"
              >
                <Image
                  {...image}
                  width="100%"
                  height="100%"
                  style={{ display: "block" }}
                  alt=""
                />
              </ResponsiveBox>
            </Column>
          </GridColumns>
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
