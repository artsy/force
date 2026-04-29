import { Box, Spacer } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { AppToasts } from "Apps/Components/AppToasts"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import type { BaseLayoutProps } from "Apps/Components/Layouts"
import { LayoutNav } from "Apps/Components/Layouts/Components/LayoutNav"
import type { FC } from "react"

export const LayoutOrderDetails: FC<
  React.PropsWithChildren<BaseLayoutProps>
> = ({ children }) => {
  return (
    <>
      <AppToasts />

      <Box
        width="100%"
        minHeight="100vh"
        flexDirection="column"
        backgroundColor="mono5"
      >
        <LayoutNav />

        <AppContainer as="main" id="main" flex={1}>
          <HorizontalPadding>
            <Spacer y={[2, 4]} />
            {children}
          </HorizontalPadding>
        </AppContainer>
      </Box>
    </>
  )
}
