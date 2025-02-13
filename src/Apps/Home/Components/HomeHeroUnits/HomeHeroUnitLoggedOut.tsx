import { useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import type * as React from "react"
import { HomeHeroUnitBase } from "./HomeHeroUnit"

export const HomeHeroUnitLoggedOut: React.FC<{ index: number }> = ({
  index,
}) => {
  const { downloadAppUrl } = useDeviceDetection()

  return (
    <HomeHeroUnitBase
      title="Your guide to the art world"
      body="Artsy makes it easy to discover artists and artworks you'll love"
      imageUrl="https://files.artsy.net/images/02_Artsy_App-Download-HP.jpg"
      link={{
        desktop: {
          text: "Sign up",
          url: "/signup",
        },
        mobile: {
          text: "Get the App",
          url: downloadAppUrl,
        },
      }}
      index={index}
      credit="Sam Gilliam, Annie, 2021. David Kordansky Gallery"
    />
  )
}
