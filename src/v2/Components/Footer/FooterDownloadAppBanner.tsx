import { ContextModule } from "@artsy/cohesion"
import {
  Box,
  Column,
  GridColumns,
  Image,
  Spacer,
  Text,
  TextVariant,
  useThemeConfig,
} from "@artsy/palette"
import { resized } from "v2/Utils/resized"
import { Media } from "v2/Utils/Responsive"
import { DownloadAppBadges } from "../DownloadAppBadges/DownloadAppBadges"

const DESKTOP_COVER_IMAGE = resized(
  "https://files.artsy.net/images/footer-desktop.jpg",
  { width: 1220, quality: 50 }
)

const MOBILE_COVER_IMAGE = resized(
  "https://files.artsy.net/images/footer-mobile.jpg",
  { width: 725, quality: 50 }
)

const OVERLAY_IMAGE = resized(
  "https://files.artsy.net/images/footer-phone-8.png",
  { width: 289, height: 244, quality: 50 }
)

export const FooterDownloadAppBanner = () => {
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
        <DownloadAppBadges contextModule={ContextModule.footer} />
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

          <Box position="absolute" bottom={0} right={45}>
            <Image
              width={289}
              height={244}
              src={OVERLAY_IMAGE.src}
              srcSet={OVERLAY_IMAGE.srcSet}
              style={{ display: "block" }}
              // TODO: Unable to use lazyLoad due to forced bg color
            />
          </Box>
        </Media>
      </Column>
    </GridColumns>
  )
}
