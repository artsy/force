import { Image, Spacer, Stack, Text } from "@artsy/palette"
import { MarketingHeader } from "./MarketingHeader"
import { Device, useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import { useFeatureVariant } from "System/Hooks/useFeatureFlag"
import type { FC } from "react"

export const MarketingHeaderSplitTest: FC = () => {
  const { downloadAppUrl, device } = useDeviceDetection()

  const variants = {
    control: {
      title: "The art world online",
      subtitle:
        "Artsy is the world's leading platform to discover, buy, and manage the art you love",
      src: "https://files.artsy.net/images/01_Artsy_App-Download-Landing-Page.jpg",
    },
    experiment: {
      title: "Your guide to the art world",
      subtitle:
        "Artsy makes it easy to discover artists and artworks you'll love",
      src: "https://files.artsy.net/images/02_Artsy_App-Download-Landing-Page.jpg",
    },
  }

  const featureVariant = useFeatureVariant("diamond_hero-app-download")
  const variant = variants[featureVariant?.name || "control"]

  return (
    <MarketingHeader
      title={variant.title}
      subtitle={variant.subtitle}
      src={variant.src}
      accentColor={variant.accentColor}
    >
      <Spacer y={2} />

      <Stack
        as="a"
        href={downloadAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        gap={2}
        flexDirection="row"
        alignItems="center"
        style={{ textDecoration: "none" }}
      >
        {device === Device.Android && <Image src={ANDROID_QR_CODE} />}
        {(device === Device.iPhone || device === Device.Unknown) && (
          <Image src={APPLE_QR_CODE} width={66} height={66} />
        )}

        <Text variant={["sm", "sm", "md", "md"]}>Get the app</Text>
      </Stack>
    </MarketingHeader>
  )
}

const APPLE_QR_CODE = "https://files.artsy.net/images/Artsy_App-Store_Apple.svg"
const ANDROID_QR_CODE =
  "https://files.artsy.net/images/Artsy_App-Store_Andriod.svg"
