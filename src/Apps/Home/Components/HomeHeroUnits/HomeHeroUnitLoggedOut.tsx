import * as React from "react"
import { HomeHeroUnitBase, HomeHeroUnitBaseProps } from "./HomeHeroUnit"
import { useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import { useFeatureVariant } from "System/Hooks/useFeatureFlag"

export const HomeHeroUnitLoggedOut: React.FC<{ index: number }> = ({
  index,
}) => {
  const { downloadAppUrl } = useDeviceDetection()

  const variants: Record<string, Omit<HomeHeroUnitBaseProps, "index">> = {
    control: {
      title: "The art world online",
      body:
        "Artsy is the world’s leading platform to discover, buy, and manage the art you love",
      imageUrl: "https://files.artsy.net/images/01_Artsy_App-Download-HP.jpg",
      link: {
        desktop: {
          text: "Sign up",
          url: "/signup",
        },
        mobile: {
          text: "Get the App",
          url: downloadAppUrl,
        },
      },
      credit: "France-Lise McGurn, 90s mirror, 2023. Margot Samel",
    },
    experiment: {
      title: "Your guide to the art world",
      body: "Artsy makes it easy to discover artists and artworks you’ll love",
      imageUrl: "https://files.artsy.net/images/02_Artsy_App-Download-HP.jpg",
      link: {
        desktop: {
          text: "Sign up",
          url: "/signup",
        },
        mobile: {
          text: "Get the App",
          url: downloadAppUrl,
        },
      },
      credit: "Sam Gilliam, Annie, 2021. David Kordansky Gallery",
    },
  }

  const featureVariant = useFeatureVariant("diamond_hero-app-download")
  const variant = variants[featureVariant?.name || "control"]

  return (
    <HomeHeroUnitBase
      title={variant.title}
      body={variant.body}
      imageUrl={variant.imageUrl}
      link={variant.link}
      index={index}
      credit={variant.credit}
    />
  )
}
