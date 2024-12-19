import {
  Banner,
  type BannerProps,
  FullBleed,
  BANNER_VARIANTS,
} from "@artsy/palette"
import type { FC } from "react"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"

export const FullBleedBanner: FC<React.PropsWithChildren<BannerProps>> = ({
  variant,
  ...rest
}) => {
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
