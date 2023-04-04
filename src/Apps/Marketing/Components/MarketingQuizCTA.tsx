import {
  Column,
  FullBleed,
  GridColumns,
  Text,
  Image,
  Spacer,
  Button,
  ResponsiveBox,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { cropped } from "Utils/resized"
import { FC } from "react"

export const MarketingQuizCTA: FC = () => {
  const image = cropped("https://picsum.photos/seed/ae/2000/2000", {
    width: 400,
    height: 300,
  })

  return (
    <FullBleed bg="#6798DD">
      <AppContainer>
        <HorizontalPadding>
          <GridColumns>
            <Column
              span={8}
              order={[1, 0]}
              py={[6, 12]}
              textAlign={["center", "left"]}
            >
              <Text variant={["xl", "xxl", "xxxl"]}>
                Don’t know your taste yet?
              </Text>

              <Spacer y={[2, 4]} />

              <Text variant="lg" maxWidth={["100%", "50%"]}>
                Rate artworks and get recommendations tailored to you.
              </Text>

              <Spacer y={[2, 4]} />

              <Button>Get Started</Button>
            </Column>

            <Column
              span={4}
              order={[0, 1]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ResponsiveBox
                aspectWidth={3}
                aspectHeight={4}
                maxWidth="100%"
                bg="black10"
              >
                <Image
                  {...image}
                  width="100%"
                  height="100%"
                  style={{ display: "block" }}
                  alt=""
                  lazyLoad
                />
              </ResponsiveBox>
            </Column>
          </GridColumns>
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
