import { Flex, Spacer } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { AppToasts } from "Apps/Components/AppToasts"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import type { BaseLayoutProps } from "Apps/Components/Layouts"
import { LayoutFooter } from "Apps/Components/Layouts/Components/LayoutFooter"
import { LayoutNav } from "Apps/Components/Layouts/Components/LayoutNav"
import type { FC } from "react"

export const LayoutDefault: FC<React.PropsWithChildren<BaseLayoutProps>> = ({
  children,
}) => {
  return (
    <>
      <AppToasts />

      <Flex
        width="100%"
        // Prevents horizontal scrollbars from `FullBleed` + persistent vertical scrollbars
        overflowX="hidden"
        // Implements "Sticky footer" pattern
        // https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/
        minHeight="100vh"
        flexDirection="column"
      >
        <LayoutNav />

        <AppContainer as="main" id="main" flex={1} minHeight="100vh">
          <HorizontalPadding>{children}</HorizontalPadding>
        </AppContainer>

        <Spacer y={4} />

        <LayoutFooter />
      </Flex>
    </>
  )
}
