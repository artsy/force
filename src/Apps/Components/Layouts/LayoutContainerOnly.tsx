import { AppContainer } from "Apps/Components/AppContainer"
import { AppToasts } from "Apps/Components/AppToasts"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import type { BaseLayoutProps } from "Apps/Components/Layouts"
import { LayoutMain } from "Apps/Components/Layouts/Components/LayoutMain"
import type { FC } from "react"

export const LayoutContainerOnly: FC<
  React.PropsWithChildren<BaseLayoutProps>
> = ({ children }) => {
  return (
    <>
      <AppToasts />

      <LayoutMain>
        <AppContainer>
          <HorizontalPadding>{children}</HorizontalPadding>
        </AppContainer>
      </LayoutMain>
    </>
  )
}
