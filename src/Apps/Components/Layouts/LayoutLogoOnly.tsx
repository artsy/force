import { Spacer } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { AppToasts } from "Apps/Components/AppToasts"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import type { BaseLayoutProps } from "Apps/Components/Layouts"
import { LayoutMain } from "Apps/Components/Layouts/Components/LayoutMain"
import { NavBarPrimaryLogo } from "Components/NavBar/NavBarPrimaryLogo"
import { RouterLink } from "System/Components/RouterLink"
import type { FC } from "react"

export const LayoutLogoOnly: FC<React.PropsWithChildren<BaseLayoutProps>> = ({
  children,
}) => {
  return (
    <>
      <AppToasts />

      <LayoutMain>
        <AppContainer>
          <HorizontalPadding>
            <Spacer y={[2, 4]} />

            <RouterLink to="/" display="block">
              <NavBarPrimaryLogo />
            </RouterLink>

            <Spacer y={[2, 4]} />

            {children}
          </HorizontalPadding>
        </AppContainer>
      </LayoutMain>
    </>
  )
}
