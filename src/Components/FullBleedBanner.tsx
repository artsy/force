import { Banner, BannerProps, FullBleed, BANNER_VARIANTS } from "@artsy/palette"
import { FC } from "react"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"

export const FullBleedBanner: FC<BannerProps> = ({ variant, ...rest }) => {
  const scheme = BANNER_VARIANTS[variant ?? "defaultLight"]

  return (
    <FullBleed backgroundColor={scheme.backgroundColor}>
      <AppContainer>
        <HorizontalPadding>
          <Banner variant={variant} {...rest} />
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
