import { AboutDownloadQRCode } from "Apps/About/Components/AboutDownloadQRCode"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import { cropped } from "Utils/resized"
import {
  ActionType,
  type ClickedAppDownload,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import {
  Box,
  Button,
  Column,
  FullBleed,
  GridColumns,
  Image,
  Stack,
  Text,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { useTracking } from "react-tracking"
import styled from "styled-components"

const ABOUT_DOWNLOAD_BACKDROP_IMAGE =
  "https://files.artsy.net/images/about2-download-backdrop-cropped.jpg"
const ABOUT_DOWNLOAD_FOREGROUND_IMAGE =
  "https://files.artsy.net/images/about2-new-works-for-you-phone-trimmed.png"

export const AboutDownload = () => {
  const { downloadAppUrl } = useDeviceDetection()

  const { trackEvent } = useTracking()

  return (
    <FullBleed bg="mono100" color="mono0" position="relative">
      <Image
        {...cropped(ABOUT_DOWNLOAD_BACKDROP_IMAGE, {
          width: 1800,
          height: 1080,
        })}
        width="100%"
        height="100%"
        alt="Download the Artsy app"
        lazyLoad
        position="absolute"
        top={0}
        left={0}
        zIndex={0}
        style={{
          objectFit: "cover",
          objectPosition: "top center",
        }}
      />

      <AboutDownloadOverlay>
        <AppContainer>
          <HorizontalPadding>
            <GridColumns>
              <Column
                span={[12, 6, 4]}
                start={[1, 1, 2]}
                display="flex"
                justifyContent="flex-end"
                order={[1, 0, 0]}
              >
                <Box
                  width="100%"
                  maxWidth="100%"
                  position="relative"
                  style={{
                    aspectRatio: "1389 / 1493",
                  }}
                >
                  <Image
                    src={ABOUT_DOWNLOAD_FOREGROUND_IMAGE}
                    width="100%"
                    height="auto"
                    alt="Download the Artsy app"
                    loading="lazy"
                    position="absolute"
                    bottom={0}
                    left={0}
                    style={{
                      objectFit: "contain",
                      objectPosition: "bottom",
                    }}
                  />
                </Box>
              </Column>

              <Column span={4} start={8} py={6}>
                <Stack gap={[4, 6]}>
                  <Stack gap={0.5}>
                    <Text variant={["xl", "xxl"]}>
                      Get the App,
                      <br />
                      Get the Art.
                    </Text>

                    <Text variant="md">
                      The Artsy app is the best way to discover and buy art that
                      moves you.
                    </Text>
                  </Stack>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    gap={2}
                  >
                    <Box
                      bg="mono0"
                      width="auto"
                      height="auto"
                      maxWidth={125}
                      borderRadius={8}
                      display={["none", "flex"]}
                      p={[1, 1, 2]}
                      style={{
                        aspectRatio: "1 / 1",
                        minWidth: "80px",
                      }}
                    >
                      <AboutDownloadQRCode />
                    </Box>

                    <Button
                      variant="primaryWhite"
                      // @ts-expect-error
                      as="a"
                      href={downloadAppUrl}
                      target="_blank"
                      rel="noopener"
                      width={["100%", "auto"]}
                      onClick={() => {
                        const payload: ClickedAppDownload = {
                          action: ActionType.clickedAppDownload,
                          context_module: ContextModule.about,
                          destination_path: downloadAppUrl,
                          subject: "Download Now",
                          context_page_owner_type: OwnerType.about,
                        }

                        trackEvent(payload)
                      }}
                    >
                      Download Now
                    </Button>
                  </Box>
                </Stack>
              </Column>
            </GridColumns>
          </HorizontalPadding>
        </AppContainer>
      </AboutDownloadOverlay>
    </FullBleed>
  )
}

const AboutDownloadOverlay = styled(Box)`
  background: ${themeGet("effects.overlayGradient")};
  z-index: 1;
  position: relative;
`
