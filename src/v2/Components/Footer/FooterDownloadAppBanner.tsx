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

const BANNER_IMAGE_SRC = "https://files.artsy.net/consign/banner-large.jpg"
const QR_CODE_SRC = "https://files.artsy.net/images/artsy-qr-code.svg"

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
          <Text variant={tokens.title} mb={1}>
            Get the Artsy iOS app
          </Text>

          <Text variant={tokens.subtitle} color="black60">
            Discover, buy, and sell art by the world’s leading artists
          </Text>
        </Box>

        <Flex alignItems="center">
          <Flex flexShrink={0}>
            <Image
              src={QR_CODE_SRC}
              lazyLoad
              width={100}
              height={100}
              mr={2}
              alt="QR code link to download Artsy app on App Store"
            />
          </Flex>

          <Text variant={tokens.body} color="black60" maxWidth={200}>
            To download, scan this code with your phone’s camera
          </Text>
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
