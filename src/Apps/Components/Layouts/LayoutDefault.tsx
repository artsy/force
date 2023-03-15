import { FC } from "react"
import { Flex, Spacer } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { AppToasts } from "Apps/Components/AppToasts"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { LayoutFooter } from "Apps/Components/Layouts/Components/LayoutFooter"
import { LayoutNav } from "Apps/Components/Layouts/Components/LayoutNav"
import { BaseLayoutProps } from "Apps/Components/Layouts"

export const LayoutDefault: FC<BaseLayoutProps> = ({ children }) => {
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

        <AppContainer as="main" id="main" flex={1}>
          <HorizontalPadding>{children}</HorizontalPadding>
        </AppContainer>

        <Spacer y={4} />

        <LayoutFooter />
      </Flex>
    </>
  )
}
