import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import {
  BANNER_VARIANTS,
  Banner,
  type BannerProps,
  FullBleed,
} from "@artsy/palette"
import type { FC } from "react"

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
