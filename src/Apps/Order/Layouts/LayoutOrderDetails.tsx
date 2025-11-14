import { AppContainer } from "Apps/Components/AppContainer"
import { AppToasts } from "Apps/Components/AppToasts"
import type { BaseLayoutProps } from "Apps/Components/Layouts"
import { LayoutNav } from "Apps/Components/Layouts/Components/LayoutNav"
import { Flex } from "@artsy/palette"
import type { FC } from "react"

export const LayoutOrderDetails: FC<
  React.PropsWithChildren<BaseLayoutProps>
> = ({ children }) => {
  return (
    <>
      <AppToasts />

      <Flex
        width="100%"
        overflowX="hidden"
        minHeight="100vh"
        flexDirection="column"
        backgroundColor="mono5"
      >
        <LayoutNav />

        <AppContainer as="main" id="main" flex={1}>
          {children}
        </AppContainer>
      </Flex>
    </>
  )
}
