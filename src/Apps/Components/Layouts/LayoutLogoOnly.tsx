import { FC } from "react"
import { AppContainer } from "Apps/Components/AppContainer"
import { AppToasts } from "Apps/Components/AppToasts"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { RouterLink } from "System/Router/RouterLink"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import { Spacer } from "@artsy/palette"
import { BaseLayoutProps } from "Apps/Components/Layouts"
import { LayoutMain } from "Apps/Components/Layouts/Components/LayoutMain"

export const LayoutLogoOnly: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <AppToasts accomodateNav={false} />

      <LayoutMain>
        <AppContainer>
          <HorizontalPadding>
            <Spacer y={4} />

            <RouterLink to="/" display="block">
              <ArtsyLogoIcon />
            </RouterLink>

            <Spacer y={4} />

            {children}
          </HorizontalPadding>
        </AppContainer>
      </LayoutMain>
    </>
  )
}
