import { FC } from "react"
import { AppToasts } from "Apps/Components/AppToasts"
import { BaseLayoutProps } from "Apps/Components/Layouts"
import { LayoutMain } from "Apps/Components/Layouts/Components/LayoutMain"

export const LayoutBlank: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <AppToasts />

      <LayoutMain>{children}</LayoutMain>
    </>
  )
}
