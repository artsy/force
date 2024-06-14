import { Box, Flex, FlexProps, Image, Spacer } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import {
  useDeviceDetection,
  Device,
  DOWNLOAD_APP_URLS,
} from "Utils/Hooks/useDeviceDetection"

export const DownloadAppBadgesDark: React.FC<FlexProps> = ({
  justifyContent,
}) => {
  const { device: deviceOS } = useDeviceDetection()

  if (deviceOS === Device.Unknown) {
    return (
      <Flex justifyContent={justifyContent}>
        <AppStoreBadge />

        <Spacer x={2} />

        <PlayStoreBadge />
      </Flex>
    )
  }

  return (
    <Flex justifyContent={justifyContent}>
      {deviceOS === Device.Android && <PlayStoreBadge />}

      {deviceOS === Device.iPhone && <AppStoreBadge />}
    </Flex>
  )
}

const PlayStoreBadge: React.FC = () => {
  return (
    <RouterLink to={DOWNLOAD_APP_URLS[Device.Android]} target="_blank">
      <Box width={136} height={40}>
        <Image
          src="https://files.artsy.net/images/download-android-app.svg"
          width="100%"
          height="100%"
          alt="android play store button"
          loading="lazy"
        />
      </Box>
    </RouterLink>
  )
}

const AppStoreBadge: React.FC = () => {
  return (
    <RouterLink to={DOWNLOAD_APP_URLS[Device.iPhone]} target="_blank">
      <Box width={120} height={40}>
        <Image
          src="https://files.artsy.net/images/download-ios-app.svg"
          width="100%"
          height="100%"
          alt="ios app store button"
          loading="lazy"
        />
      </Box>
    </RouterLink>
  )
}
