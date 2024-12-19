import { AppContainer } from "Apps/Components/AppContainer"
import { AppToasts } from "Apps/Components/AppToasts"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import type { BaseLayoutProps } from "Apps/Components/Layouts"
import { LayoutMain } from "Apps/Components/Layouts/Components/LayoutMain"
import { LayoutNav } from "Apps/Components/Layouts/Components/LayoutNav"
import type { FC } from "react"

export const LayoutNavOnly: FC<React.PropsWithChildren<BaseLayoutProps>> = ({
  children,
}) => {
  return (
    <>
      <AppToasts />

      <LayoutNav />

      <LayoutMain>
        <AppContainer>
          <HorizontalPadding>{children}</HorizontalPadding>
        </AppContainer>
      </LayoutMain>
    </>
  )
}
