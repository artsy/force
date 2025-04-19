import { Image, Spacer, Stack, Text } from "@artsy/palette"
import { Device, useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import type { FC } from "react"
import { MarketingHeader } from "./MarketingHeader"

export const MarketingHeaderPrimary: FC = () => {
  const { downloadAppUrl, device } = useDeviceDetection()

  return (
    <MarketingHeader
      title="Your guide to the art world"
      subtitle="Artsy makes it easy to discover artists and artworks you'll love"
      src="https://files.artsy.net/images/02_Artsy_App-Download-Landing-Page.jpg"
      accentColor="mono10"
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
