import { Box } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { AppToasts } from "Apps/Components/AppToasts"
import type { BaseLayoutProps } from "Apps/Components/Layouts"
import { LayoutMain } from "Apps/Components/Layouts/Components/LayoutMain"
import { NavBarPrimaryLogo } from "Components/NavBar/NavBarPrimaryLogo"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { FC } from "react"

export const LayoutLogoOnlyFullBleed: FC<
  React.PropsWithChildren<BaseLayoutProps>
> = ({ children }) => {
  const { match } = useRouter()
  const { isEigen } = useSystemContext()

  return (
    <>
      <AppToasts />
      <LayoutMain overflowX="visible">
        <AppContainer maxWidth="100%" as="main" id="main">
          <Box position="sticky" py={1} top={0} bg="mono0" zIndex={1}>
            <RouterLink
              ml={2}
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
          </Box>
          {children}
        </AppContainer>
      </LayoutMain>
    </>
  )
}
