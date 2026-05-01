import { useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import type * as React from "react"
import { HomeHeroUnitBase } from "./HomeHeroUnit"

export const HomeHeroUnitLoggedOut: React.FC<{ index: number }> = ({
  index,
}) => {
  const { downloadAppUrl } = useDeviceDetection()

  return (
    <HomeHeroUnitBase
      title="Discover and Buy Art That Moves You"
      body="Turn art into a daily habit. Follow artists, explore stories, and get personalized recommendations, all in one place."
      imageUrl="https://files.artsy.net/images/new-works-for-you-hero.jpg"
      link={{
        desktop: {
          text: "Sign Up",
          url: "/signup",
        },
        mobile: {
          text: "Get the App",
          url: downloadAppUrl,
        },
      }}
      index={index}
      credit="France-Lise McGurn, 90s mirror, 2023. Margot Samel"
    />
  )
}
