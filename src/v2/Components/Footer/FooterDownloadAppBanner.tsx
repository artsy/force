import React from "react"
import {
  Box,
  Column,
  ColumnSpan,
  Flex,
  GridColumns,
  Image,
  Text,
  TextVariant,
  useThemeConfig,
} from "@artsy/palette"
import { resized } from "v2/Utils/resized"
import { DownloadAppBadge } from "../DownloadAppBadge"
import { ContextModule } from "@artsy/cohesion"
import { Device } from "v2/Utils/Hooks/useDeviceDetection"

const BANNER_IMAGE_SRC = "https://files.artsy.net/consign/banner-large.jpg"

export const FooterDownloadAppBanner = () => {
  const resizedImg = resized(BANNER_IMAGE_SRC, {
    height: 320,
    quality: 85,
  })

  const tokens = useThemeConfig({
    v2: {
      title: "largeTitle" as TextVariant,
      subtitle: "subtitle" as TextVariant,
      body: "text" as TextVariant,
      textSpan: 4 as ColumnSpan,
      imageSpan: 8 as ColumnSpan,
    },
    v3: {
      title: "xl" as TextVariant,
      subtitle: "md" as TextVariant,
      body: "xs" as TextVariant,
      textSpan: 6 as ColumnSpan,
      imageSpan: 6 as ColumnSpan,
    },
  })

  return (
    <GridColumns borderBottom="1px solid" borderColor="black10">
      <Column
        span={tokens.textSpan}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Box mb={2}>
          <Text variant={tokens.title} textAlign="center" mb={1}>
            Get the App
          </Text>

          <Text variant={tokens.subtitle} textAlign="center" color="black60">
            Discover, buy, and sell art by the world’s leading artists
          </Text>
        </Box>

        <Flex justifyContent="center">
          <DownloadAppBadge
            mr={1}
            contextModule={ContextModule.footer}
            device={Device.iPhone}
            downloadAppUrl={
              "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"
            }
          />
          <DownloadAppBadge
            contextModule={ContextModule.footer}
            device={Device.Android}
            downloadAppUrl={
              "https://play.google.com/store/apps/details?id=net.artsy.app"
            }
          />
        </Flex>
      </Column>

      <Column span={tokens.imageSpan}>
        <Image
          mr={2}
          height={320}
          width="100%"
          src={resizedImg.src}
          srcSet={resizedImg.srcSet}
          lazyLoad
          alt=""
          style={{ objectFit: "cover" }}
        />
      </Column>
    </GridColumns>
  )
}
