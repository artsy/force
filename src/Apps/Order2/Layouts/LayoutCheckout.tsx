import { AppContainer } from "Apps/Components/AppContainer"
import { AppToasts } from "Apps/Components/AppToasts"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import type { BaseLayoutProps } from "Apps/Components/Layouts"
import { NavBarPrimaryLogo } from "Components/NavBar/NavBarPrimaryLogo"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Box, Flex, Spacer } from "@artsy/palette"
import type { FC } from "react"

export const LayoutCheckout: FC<React.PropsWithChildren<BaseLayoutProps>> = ({
  children,
}) => {
  const { isEigen } = useSystemContext()

  return (
    <>
      <AppToasts />

      <Box
        position={["initial", "sticky"]}
        py={1}
        top={0}
        bg="mono0"
        zIndex={1}
      >
        {!isEigen && (
          <HorizontalPadding>
            <RouterLink to="/">
              <NavBarPrimaryLogo />
            </RouterLink>
          </HorizontalPadding>
        )}
      </Box>

      <Flex
        width="100%"
        minHeight="100vh"
        flexDirection="column"
        backgroundColor="mono5"
        justifyContent="center"
      >
        <AppContainer as="main" id="main" flex={1}>
          {children}
        </AppContainer>

        {isEigen && <Spacer y={2} />}
      </Flex>
    </>
  )
}
