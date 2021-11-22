import {
  Column,
  Flex,
  GridColumns,
  Image,
  Spacer,
  Text,
  TextVariant,
  useThemeConfig,
} from "@artsy/palette"
import { resized } from "v2/Utils/resized"
import { DownloadAppBadge } from "../DownloadAppBadge"
import { ContextModule } from "@artsy/cohesion"
import {
  Device,
  DOWNLOAD_APP_URLS,
  useDeviceDetection,
} from "v2/Utils/Hooks/useDeviceDetection"
import { Media } from "v2/Utils/Responsive"

const DESKTOP_COVER_IMAGE = resized(
  "https://files.artsy.net/images/artsy_app-download-footer_2x_max.jpg",
  { width: 1220, quality: 50 }
)

const MOBILE_COVER_IMAGE = resized(
  "https://files.artsy.net/images/artsy_app-download-footer_2x_max.jpg",
  { width: 725, quality: 50 }
)

export const FooterDownloadAppBanner = () => {
  const { device, downloadAppUrl } = useDeviceDetection()

  const tokens = useThemeConfig({
    v2: { title: "largeTitle" as TextVariant },
    v3: { title: "xl" as TextVariant },
  })

  return (
    <GridColumns borderBottom="1px solid" borderColor="black10">
      <Column
        span={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        order={[2, 1]}
        px={2}
        py={[6, 2]}
      >
        <Text variant={tokens.title} textAlign="center" mb={1}>
          Get More from Artsy—on the App
        </Text>

        <Spacer mt={2} />

        {device === Device.Unknown ? (
          <Flex flexWrap="wrap" justifyContent="center">
            <DownloadAppBadge
              contextModule={ContextModule.footer}
              device={Device.iPhone}
              downloadAppUrl={DOWNLOAD_APP_URLS[Device.iPhone]}
              mx={0.5}
              mb={0.5}
            />

            <DownloadAppBadge
              contextModule={ContextModule.footer}
              device={Device.Android}
              downloadAppUrl={DOWNLOAD_APP_URLS[Device.Android]}
              mx={0.5}
            />
          </Flex>
        ) : (
          <DownloadAppBadge
            contextModule={ContextModule.footer}
            device={device}
            downloadAppUrl={downloadAppUrl}
          />
        )}
      </Column>

      <Column span={8} position="relative" order={[1, 2]}>
        <Media at="xs">
          <Image
            src={MOBILE_COVER_IMAGE.src}
            srcSet={MOBILE_COVER_IMAGE.srcSet}
            height={320}
            width="100%"
            lazyLoad
            alt=""
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </Media>

        <Media greaterThan="xs">
          <Image
            src={DESKTOP_COVER_IMAGE.src}
            srcSet={DESKTOP_COVER_IMAGE.srcSet}
            height={320}
            width="100%"
            lazyLoad
            alt=""
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </Media>
      </Column>
    </GridColumns>
  )
}
