import { ContextModule } from "@artsy/cohesion"
import { Flex, FlexProps, Spacer } from "@artsy/palette"
import React from "react"
import {
  Device,
  DOWNLOAD_APP_URLS,
  useDeviceDetection,
} from "Utils/Hooks/useDeviceDetection"
import { DownloadAppBadge } from "./DownloadAppBadge"

interface DownloadAppBadgesProps extends FlexProps {
  contextModule: ContextModule
}

export const DownloadAppBadges: React.FC<DownloadAppBadgesProps> = ({
  contextModule,
  ...rest
}) => {
  const { device, downloadAppUrl } = useDeviceDetection()

  if (device === Device.Unknown) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection={["column", "column", "row"]}
        {...rest}
      >
        <DownloadAppBadge
          contextModule={contextModule}
          device={Device.iPhone}
          downloadAppUrl={DOWNLOAD_APP_URLS[Device.iPhone]}
        />

        <Spacer x={1} y={1} />

        <DownloadAppBadge
          contextModule={contextModule}
          device={Device.Android}
          downloadAppUrl={DOWNLOAD_APP_URLS[Device.Android]}
        />
      </Flex>
    )
  }

  return (
    <DownloadAppBadge
      contextModule={contextModule}
      device={device}
      downloadAppUrl={downloadAppUrl}
    />
  )
}
