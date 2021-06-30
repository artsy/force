import { ArtsyLogoIcon } from "@artsy/palette"
import React from "react"
import { HomeHeroUnit, HomeHeroUnitProps } from "./HomeHeroUnit"

interface HomeHeroUnitLoggedOutProps
  extends Pick<HomeHeroUnitProps, "layout" | "index"> {}

export const HomeHeroUnitLoggedOut: React.FC<HomeHeroUnitLoggedOutProps> = ({
  index,
  layout,
}) => {
  return (
    <HomeHeroUnit
      bg="black100"
      index={index}
      layout={layout}
      heroUnit={{
        heading: (
          <ArtsyLogoIcon
            fill="white100"
            style={{ height: "40px", width: "117px" }}
          />
        ),
        title: "Collect art from leading galleries, fairs, and auctions",
        subtitle: "Sign up to get updates about your favorite artists",
        href: "/signup",
        linkText: "Sign up",
        backgroundImageURL:
          "https://files.artsy.net/images/alexander-calder-rouge-triomphant-triumphant-red-1959-1965.jpg",
      }}
    />
  )
}
