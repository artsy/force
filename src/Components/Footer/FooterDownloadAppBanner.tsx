import { ContextModule } from "@artsy/cohesion"
import { Column, GridColumns, Image, Spacer, Text } from "@artsy/palette"
import { resized } from "Utils/resized"
import { Media } from "Utils/Responsive"
import { DownloadAppBadges } from "Components/DownloadAppBadges/DownloadAppBadges"

const APP_BANNER_SRC =
  "https://files.artsy.net/images/App_Download_Banner_1200x2440_2x-1656078840527.jpg"

export const FooterDownloadAppBanner = () => {
  const desktopCoverImage = resized(APP_BANNER_SRC, {
    width: 1220,
    quality: 50,
  })

  const mobileCoverImage = resized(APP_BANNER_SRC, { width: 725, quality: 50 })

  return (
    <GridColumns
      gridRowGap={1}
      borderBottom="1px solid"
      borderColor="black10"
      pb={1}
    >
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

        <Spacer y={2} />

        <DownloadAppBadges contextModule={ContextModule.footer} />
      </Column>

      <Column span={8} position="relative" order={[1, 2]}>
        <Media at="xs">
          <Image
            src={mobileCoverImage.src}
            srcSet={mobileCoverImage.srcSet}
            height={320}
            width="100%"
            lazyLoad
            alt=""
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </Media>

        <Media greaterThan="xs">
          <Image
            src={desktopCoverImage.src}
            srcSet={desktopCoverImage.srcSet}
            height={320}
            width="100%"
            lazyLoad
            alt=""
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </Media>
      </Column>
      <Column span={12} order={[1, 2]}>
        <Text variant="xs" fontStyle="italic" textAlign="right">
          Jenna Gribbon, Luncheon on the grass, a recurring dream, 2020. Jenna
          Gribbon, April studio, parting glance, 2021. Jenna Gribbon, Silver
          Tongue, 2019
        </Text>
      </Column>
    </GridColumns>
  )
}
