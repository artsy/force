import { ContextModule } from "@artsy/cohesion"
import { Column, GridColumns, Image, Spacer, Text } from "@artsy/palette"
import { resized } from "Utils/resized"
import { Media } from "Utils/Responsive"
import { DownloadAppBadges } from "../DownloadAppBadges/DownloadAppBadges"

const DESKTOP_COVER_IMAGE = resized(
  "https://files.artsy.net/images/App Download Banner_1200x2440_2x-1656078840527.png",
  { width: 1220, quality: 50 }
)

const MOBILE_COVER_IMAGE = resized(
  "https://files.artsy.net/images/App Download Banner_1200x2440_2x-1656078840527.png",
  { width: 725, quality: 50 }
)

export const FooterDownloadAppBanner = () => {
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
        <Text variant="xl" textAlign="center" mb={1}>
          Get the Artsy app
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
        </Media>
      </Column>
    </GridColumns>
  )
}
