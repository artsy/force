import React, { useEffect, useState } from "react"
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
import { Device, useDeviceDetection } from "v2/Utils/Hooks/useDeviceDetection"
import { Media } from "v2/Utils/Responsive"
import { getRandomElement } from "v2/Utils/getRandom"

interface Tokens {
  title: TextVariant
  subtitle: TextVariant
  body: TextVariant
  textSpan: ColumnSpan
  imageSpan: ColumnSpan
}

interface ImageKit {
  small: string
  large: string
  phone: string
  title: string
  text: string
}

interface ResizedImage {
  src: string
  srcSet: string
}

const TITLE_1 = "Get the App"
const TITLE_2 = "Get more from Artsy—on the app"
const SMALL_IMG_URL = "https://files.artsy.net/consign/banner-small-"
const LARGE_IMG_URL = "https://files.artsy.net/consign/banner-large-"
const PHONE_IMG_URL = "https://files.artsy.net/consign/banner-phone-"

const images: ImageKit[] = [
  {
    small: `${SMALL_IMG_URL}1.jpg`,
    large: `${LARGE_IMG_URL}1.jpg`,
    phone: `${PHONE_IMG_URL}1.png`,
    title: TITLE_2,
    text: "",
  },
  {
    small: `${SMALL_IMG_URL}2.jpg`,
    large: `${LARGE_IMG_URL}2.jpg`,
    phone: `${PHONE_IMG_URL}2.png`,
    title: TITLE_1,
    text: "Discover, buy, and sell art by the world’s leading artists",
  },
  {
    small: `${SMALL_IMG_URL}3.jpg`,
    large: `${LARGE_IMG_URL}3.jpg`,
    phone: `${PHONE_IMG_URL}3.png`,
    title: TITLE_2,
    text: "",
  },
]

const imageProps = {
  mr: 2,
  height: 320,
  width: "100%",
  lazyLoad: true,
  alt: "",
  style: { objectFit: "cover" },
}

const imageParams = {
  height: 320,
  quality: 85,
}

const borderParams = {
  borderBottom: "1px solid",
  borderColor: "black10",
}

export const FooterDownloadAppBanner = () => {
  const [imageKit, setImageKit] = useState<ImageKit>({} as ImageKit)
  const [resizedLargeImg, setResizedLargeImg] = useState<ResizedImage>(
    {} as ResizedImage
  )
  const [resizedSmallImg, setResizedSmallImg] = useState<ResizedImage>(
    {} as ResizedImage
  )

  useEffect(() => {
    setImageKit(getRandomElement(images))
  }, [])

  useEffect(() => {
    setResizedLargeImg(resized(imageKit.large, imageParams))
    setResizedSmallImg(resized(imageKit.small, imageParams))
  }, [imageKit])

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
    <>
      <Media at="xs">
        <GridColumns {...borderParams}>
          <Column span={tokens.imageSpan}>
            <Image
              {...imageProps}
              src={resizedSmallImg.src}
              srcSet={resizedSmallImg.srcSet}
            />
          </Column>
          <BannerTextBlock
            xs
            title={imageKit.title}
            text={imageKit.text}
            tokens={tokens}
          />
        </GridColumns>
      </Media>

      <Media greaterThan="xs">
        <GridColumns {...borderParams}>
          <BannerTextBlock
            title={imageKit.title}
            text={imageKit.text}
            tokens={tokens}
          />
          <Column span={tokens.imageSpan}>
            <Box position="relative">
              <Image
                {...imageProps}
                src={resizedLargeImg.src}
                srcSet={resizedLargeImg.srcSet}
              />
              <Flex position="absolute" bottom={0} right={45}>
                <Image src={imageKit.phone} />
              </Flex>
            </Box>
          </Column>
        </GridColumns>
      </Media>
    </>
  )
}

const BannerTextBlock = ({
  xs,
  title,
  text,
  tokens,
}: {
  xs?: boolean
  title: string
  text: string
  tokens: Tokens
}) => {
  const { device, downloadAppUrl } = useDeviceDetection()

  return (
    <Column
      span={tokens.textSpan}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      height={xs ? 320 : "auto"}
    >
      <Box mb={2}>
        <Text variant={tokens.title} textAlign="center" mb={1}>
          {title}
        </Text>

        <Text variant={tokens.subtitle} textAlign="center" color="black60">
          {text}
        </Text>
      </Box>

      <Flex justifyContent="center">
        {xs ? (
          <DownloadAppBadge
            contextModule={ContextModule.footer}
            device={device}
            downloadAppUrl={downloadAppUrl}
          />
        ) : (
          <>
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
          </>
        )}
      </Flex>
    </Column>
  )
}
