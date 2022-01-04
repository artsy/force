import React from "react"
import { Box, Flex, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { Device, DOWNLOAD_APP_URLS } from "v2/Utils/Hooks/useDeviceDetection"

export const DownloadAppBanner: React.FC = () => {
  return (
    <Box p={2} backgroundColor="black5">
      <Text variant="md" mb={2} textAlign="center">
        Download the app to stay current as new artworks are available on Artsy.
      </Text>
      <Flex justifyContent="center" flexWrap="wrap">
        <RouterLink
          to={DOWNLOAD_APP_URLS[Device.iPhone]}
          mx={2}
          textDecoration="none"
        >
          <img
            src="https://files.artsy.net/images/download-ios-app.svg"
            width={120}
            height={40}
            alt="Download on the App Store"
            loading="lazy"
          />
        </RouterLink>

        <RouterLink
          to={DOWNLOAD_APP_URLS[Device.Android]}
          mx={2}
          textDecoration="none"
        >
          <img
            src="https://files.artsy.net/images/download-android-app.svg"
            width={136}
            height={40}
            alt="Get it on Google Play"
            loading="lazy"
          />
        </RouterLink>
      </Flex>
    </Box>
  )
}
