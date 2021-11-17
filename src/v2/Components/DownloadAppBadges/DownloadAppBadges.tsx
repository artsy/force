import { ContextModule } from "@artsy/cohesion"
import { Flex } from "@artsy/palette"
import React from "react"
import {
  Device,
  DOWNLOAD_APP_URLS,
  useDeviceDetection,
} from "v2/Utils/Hooks/useDeviceDetection"
import { DownloadAppBadge } from "./DownloadAppBadge"

interface DownloadAppBadgesProps {
  contextModule: ContextModule
}

export const DownloadAppBadges: React.FC<DownloadAppBadgesProps> = ({
  contextModule,
}) => {
  const { device, downloadAppUrl } = useDeviceDetection()

  if (device === Device.Unknown) {
    return (
      <Flex flexWrap="wrap" justifyContent="center">
        <DownloadAppBadge
          contextModule={contextModule}
          device={Device.iPhone}
          downloadAppUrl={DOWNLOAD_APP_URLS[Device.iPhone]}
          mx={0.5}
          mb={0.5}
        />

        <DownloadAppBadge
          contextModule={contextModule}
          device={Device.Android}
          downloadAppUrl={DOWNLOAD_APP_URLS[Device.Android]}
          mx={0.5}
        />
      </Flex>
    )
  } else {
    return (
      <DownloadAppBadge
        contextModule={contextModule}
        device={device}
        downloadAppUrl={downloadAppUrl}
      />
    )
  }
}
