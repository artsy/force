import { FC } from "react"
import { AppContainer } from "Apps/Components/AppContainer"
import { AppToasts } from "Apps/Components/AppToasts"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { LayoutNav } from "Apps/Components/Layouts/Components/LayoutNav"
import { BaseLayoutProps } from "Apps/Components/Layouts"
import { LayoutMain } from "Apps/Components/Layouts/Components/LayoutMain"

export const LayoutNavOnly: FC<BaseLayoutProps> = ({ children }) => {
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
