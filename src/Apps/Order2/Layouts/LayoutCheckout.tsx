import { Box, Flex } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { AppToasts } from "Apps/Components/AppToasts"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import type { BaseLayoutProps } from "Apps/Components/Layouts"
import { NavBarPrimaryLogo } from "Components/NavBar/NavBarPrimaryLogo"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { FC } from "react"

export const LayoutCheckout: FC<React.PropsWithChildren<BaseLayoutProps>> = ({
  children,
}) => {
  const { match } = useRouter()
  const { isEigen } = useSystemContext()

  return (
    <>
      <AppToasts />

      <Box
        position={["initial", "initial", "sticky"]}
        py={1}
        top={0}
        bg="mono0"
        zIndex={1}
      >
        <HorizontalPadding>
          <RouterLink
            onClick={event => {
              if (match.location.pathname.includes("/order") && isEigen) {
                event.preventDefault()
              }
            }}
            to="/"
          >
            <NavBarPrimaryLogo />
          </RouterLink>
        </HorizontalPadding>
      </Box>

      <Flex
        width="100%"
        overflowX="hidden"
        minHeight="100vh"
        flexDirection="column"
        backgroundColor="mono5"
        justifyContent="center"
      >
        <AppContainer as="main" id="main" flex={1}>
          {children}
        </AppContainer>
      </Flex>
    </>
  )
}
