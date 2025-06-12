import { ContextModule } from "@artsy/cohesion"
import { useAuthDialog } from "Components/AuthDialog"
import { useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import type * as React from "react"
import { HomeHeroUnitBase } from "./HomeHeroUnit"

export const HomeHeroUnitLoggedOut: React.FC<{ index: number }> = ({
  index,
}) => {
  const { downloadAppUrl } = useDeviceDetection()
  const { showAuthDialog } = useAuthDialog()

  return (
    <HomeHeroUnitBase
      title="Your guide to the art world"
      body="Artsy makes it easy to discover artists and artworks you'll love"
      imageUrl="https://files.artsy.net/images/90s-mirror.jpg"
      link={{
        desktop: {
          text: "Sign up",
          url: "/signup",
          onClick: e => {
            e.preventDefault()

            showAuthDialog({
              analytics: {
                contextModule: ContextModule.heroUnitsRail,
              },
            })
          },
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
