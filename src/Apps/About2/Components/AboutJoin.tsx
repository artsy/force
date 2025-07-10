import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  Button,
  Column,
  FullBleed,
  GridColumns,
  Image,
  Stack,
  Text,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { cropped } from "Utils/resized"
import { useTracking } from "react-tracking"

export const AboutJoin = () => {
  const { trackEvent } = useTracking()

  return (
    <FullBleed
      bg="mono100"
      color="mono0"
      position="relative"
      textAlign={["left", "center"]}
      py={4}
    >
      <Image
        {...cropped("https://files.artsy.net/images/about2-join.jpg", {
          width: 2000,
          height: 781,
        })}
        width="100%"
        height="100%"
        alt=""
        loading="lazy"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={0}
        style={{
          objectFit: "cover",
        }}
      />

      <AppContainer position="relative" zIndex={1}>
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
                  // @ts-expect-error
                  as="a"
                  href="https://partners.artsy.net/gallery-partnerships"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent({
                      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
                      subject: "Apply Here",
                      destination_path:
                        "https://partners.artsy.net/gallery-partnerships",
                    })
                  }}
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
