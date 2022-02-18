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
  entity: SavedSearchAttributes
}

export const DownloadAppBanner: React.FC<DownloadAppBannerProps> = ({
  entity,
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
      subject = "Get it on Google Play"
    }

    const clickedAppDownload: ClickedAppDownload = {
      action: ActionType.clickedAppDownload,
      context_module: ContextModule.createAlert,
      context_page_owner_type: OwnerType.artist,
      context_page_owner_slug: entity.slug,
      context_page_owner_id: entity.id,
      destination_path: destinationPath,
      subject,
    }

    tracking.trackEvent(clickedAppDownload)
  }

  return (
    <Box p={2} pb={1} backgroundColor="black5">
      <Text variant="md" mb={1} textAlign="center">
        Get alerts direct to your mobile when you download the Artsy app.
      </Text>
      <Flex justifyContent="center" flexWrap="wrap">
        {(device === Device.iPhone || device === Device.Unknown) && (
          <RouterLink
            to={DOWNLOAD_APP_URLS[Device.iPhone]}
            mx={2}
            my={1}
            textDecoration="none"
            onClick={() => handleClick("iOS")}
          >
            <img
              src="https://files.artsy.net/images/download-ios-app.svg"
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
            my={1}
            textDecoration="none"
            onClick={() => handleClick("Android")}
          >
            <img
              src="https://files.artsy.net/images/download-android-app.svg"
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
