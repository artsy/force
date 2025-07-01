import {
  Button,
  Column,
  FullBleed,
  GridColumns,
  Stack,
  Text,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"

export const AboutJoin = () => {
  return (
    <FullBleed
      bg="mono100"
      color="mono0"
      position="relative"
      textAlign={["left", "center"]}
      py={4}
    >
      <AppContainer>
        <HorizontalPadding py={[0, 4]}>
          <GridColumns>
            <Column span={10} start={2}>
              <Stack gap={[6, 4]}>
                <Stack gap={[2, 1]}>
                  <Text variant="xl" style={{ textWrap: "balance" }}>
                    Grow your gallery business with Artsy.
                  </Text>

                  <Text variant="sm-display" style={{ textWrap: "balance" }}>
                    Join the leading global platform for buying and selling art.
                  </Text>
                </Stack>

                <Button
                  variant="primaryWhite"
                  alignSelf="center"
                  width={["100%", "auto"]}
                >
                  Apply Here
                </Button>
              </Stack>
            </Column>
          </GridColumns>
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
