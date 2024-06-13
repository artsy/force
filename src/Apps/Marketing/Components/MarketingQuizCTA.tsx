import {
  Column,
  FullBleed,
  GridColumns,
  Text,
  Image,
  Spacer,
  Button,
  Box,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { BRAND_PALETTE } from "Apps/Marketing/Utils/brandPalette"
import { RouterLink } from "System/Components/RouterLink"
import { useSizeAndPosition } from "Utils/Hooks/useSizeAndPosition"
import { resized } from "Utils/resized"
import { FC } from "react"

export const MarketingQuizCTA: FC = () => {
  const image = resized(
    "https://files.artsy.net/images/marketing_meet_recs.png",
    { width: 1445, height: 882 }
  )

  const { ref, height } = useSizeAndPosition()

  return (
    <FullBleed bg={BRAND_PALETTE.blue}>
      <AppContainer py={6}>
        <HorizontalPadding>
          <GridColumns gridRowGap={2}>
            <Column
              span={[12, 6, 7]}
              order={[1, 0]}
              textAlign={["center", "left"]}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box ref={ref as any}>
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
              </Box>
            </Column>

            <Column
              span={[12, 6, 5]}
              order={[0, 1]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {height > 0 && (
                <Image
                  {...image}
                  width="100%"
                  height={["auto", height]}
                  style={{
                    display: "block",
                    objectFit: "contain",
                  }}
                  alt=""
                />
              )}
            </Column>
          </GridColumns>
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
