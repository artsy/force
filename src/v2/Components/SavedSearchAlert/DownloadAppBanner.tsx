import React from "react"
import { Box, Flex, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import {
  Device,
  DOWNLOAD_APP_URLS,
  useDeviceDetection,
} from "v2/Utils/Hooks/useDeviceDetection"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ClickedAppDownload,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { SavedSearchAttributes } from "../ArtworkFilter/SavedSearch/types"

interface DownloadAppBannerProps {
  savedSearchAttributes: SavedSearchAttributes
}

export const DownloadAppBanner: React.FC<DownloadAppBannerProps> = ({
  savedSearchAttributes,
}) => {
  const tracking = useTracking()
  const { device } = useDeviceDetection()

  const handleClick = (platform: "iOS" | "Android") => {
    let destinationPath
    let subject

    if (platform === "iOS") {
      destinationPath = DOWNLOAD_APP_URLS[Device.iPhone]
      subject = "Download on the App Store"
    }

    if (platform === "Android") {
      destinationPath = DOWNLOAD_APP_URLS[Device.Android]
      subject = "Download on the Google Play"
    }

    const clickedAppDownload: ClickedAppDownload = {
      action: ActionType.clickedAppDownload,
      context_module: "createAlert" as ContextModule, // TODO: Use ContextModule.createAlert
      context_page_owner_type: OwnerType.artist,
      context_page_owner_slug: savedSearchAttributes.slug,
      context_page_owner_id: savedSearchAttributes.id,
      destination_path: destinationPath,
      subject,
    }

    tracking.trackEvent(clickedAppDownload)
  }

  return (
    <Box p={2} backgroundColor="black5">
      <Text variant="md" mb={2} textAlign="center">
        Download the app to stay current as new artworks are available on Artsy.
      </Text>
      <Flex justifyContent="center" flexWrap="wrap">
        {(device === Device.iPhone || device === Device.Unknown) && (
          <RouterLink
            to={DOWNLOAD_APP_URLS[Device.iPhone]}
            mx={2}
            textDecoration="none"
            onClick={() => handleClick("iOS")}
          >
            <img
              src="https://files.artsy.net/images/download-ios-app-transparent.svg"
              width={120}
              height={40}
              alt="Download on the App Store"
              loading="lazy"
            />
          </RouterLink>
        )}

        {(device === Device.Android || device === Device.Unknown) && (
          <RouterLink
            to={DOWNLOAD_APP_URLS[Device.Android]}
            mx={2}
            textDecoration="none"
            onClick={() => handleClick("Android")}
          >
            <img
              src="https://files.artsy.net/images/download-android-app-transparent.svg"
              width={136}
              height={40}
              alt="Get it on Google Play"
              loading="lazy"
            />
          </RouterLink>
        )}
      </Flex>
    </Box>
  )
}
