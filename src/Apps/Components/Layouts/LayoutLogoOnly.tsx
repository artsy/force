import { Spacer } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { AppToasts } from "Apps/Components/AppToasts"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import type { BaseLayoutProps } from "Apps/Components/Layouts"
import { LayoutMain } from "Apps/Components/Layouts/Components/LayoutMain"
import { NavBarPrimaryLogo } from "Components/NavBar/NavBarPrimaryLogo"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { type FC, Fragment } from "react"

export const LayoutLogoOnly: FC<
  React.PropsWithChildren<BaseLayoutProps & { fullBleed?: boolean }>
> = ({ children, fullBleed = false }) => {
  const { match } = useRouter()
  const { isEigen } = useSystemContext()

  const LayoutPadding = fullBleed ? Fragment : HorizontalPadding

  return (
    <>
      <AppToasts />

      <LayoutMain>
        <AppContainer>
          <LayoutPadding>
            <Spacer y={[2, 4]} />

            <RouterLink
              ml={fullBleed ? [2, 4] : 0}
              onClick={event => {
                if (match.location.pathname.includes("/order") && isEigen) {
                  event.preventDefault()
                }
              }}
              to="/"
              display="block"
            >
              <NavBarPrimaryLogo />
            </RouterLink>

            <Spacer y={[2, 4]} />

            {children}
          </LayoutPadding>
        </AppContainer>
      </LayoutMain>
    </>
  )
}
