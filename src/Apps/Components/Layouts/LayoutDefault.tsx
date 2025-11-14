import { AppContainer } from "Apps/Components/AppContainer"
import { AppToasts } from "Apps/Components/AppToasts"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import type { BaseLayoutProps } from "Apps/Components/Layouts"
import { LayoutFooter } from "Apps/Components/Layouts/Components/LayoutFooter"
import { LayoutNav } from "Apps/Components/Layouts/Components/LayoutNav"
import { Flex, Spacer } from "@artsy/palette"
import type { FC, ReactNode } from "react"

export interface LayoutDefaultProps extends BaseLayoutProps {
  nav?: ReactNode
  footer?: ReactNode
}

export const LayoutDefault: FC<React.PropsWithChildren<LayoutDefaultProps>> = ({
  nav,
  footer,
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
        {nav ?? <LayoutNav />}

        <AppContainer as="main" id="main" flex={1} minHeight="100vh">
          <HorizontalPadding>{children}</HorizontalPadding>
        </AppContainer>

        <Spacer y={4} />

        {footer ?? <LayoutFooter />}
      </Flex>
    </>
  )
}
