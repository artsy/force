import {
  Device,
  DOWNLOAD_APP_URLS,
  useDeviceDetection,
} from "Utils/Hooks/useDeviceDetection"
import type { ContextModule } from "@artsy/cohesion"
import { Flex, type FlexProps } from "@artsy/palette"
import type React from "react"
import { DownloadAppBadge } from "./DownloadAppBadge"

interface DownloadAppBadgesProps extends FlexProps {
  contextModule: ContextModule
}

export const DownloadAppBadges: React.FC<
  React.PropsWithChildren<DownloadAppBadgesProps>
> = ({ contextModule, ...rest }) => {
  const { device, downloadAppUrl } = useDeviceDetection()

  if (device === Device.Unknown) {
    return (
      <Flex gap={1} {...rest}>
        <DownloadAppBadge
          contextModule={contextModule}
          device={Device.iPhone}
          downloadAppUrl={DOWNLOAD_APP_URLS[Device.iPhone]}
        />

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
