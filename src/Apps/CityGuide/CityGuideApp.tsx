import { Flex, Image, Spacer, Text } from "@artsy/palette"
import { CityGuidePhones } from "Apps/CityGuide/Components/CityGuidePhones"
import { MetaTags } from "Components/MetaTags"
import type { FC } from "react"

export const CityGuideApp: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <>
      <MetaTags
        title="City Guide | Artsy"
        description="Plan your art day with City Guide on the Artsy app."
        pathname="/city-guide-on-app"
        blockRobots
      />

      <Flex
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        pt={[2, 4]}
      >
        <Text as="h1" variant={["lg-display", "xl"]} maxWidth={960}>
          Plan your art day with City&nbsp;Guide on the Artsy app.
        </Text>

        <Spacer y={4} />

        <Image
          src="/city-guide-on-app/assets/qr-flowcode.png"
          alt="QR code to download the Artsy app"
          width={140}
          height={140}
        />

        <Spacer y={2} />

        <Text variant="xs" maxWidth={380}>
          To download the app, open your phone’s camera and point it at the QR
          code.
        </Text>

        <Spacer y={4} />

        <CityGuidePhones />
      </Flex>
    </>
  )
}
