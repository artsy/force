import type { FC } from "react"
import { AppToasts } from "Apps/Components/AppToasts"
import type { BaseLayoutProps } from "Apps/Components/Layouts"
import { LayoutMain } from "Apps/Components/Layouts/Components/LayoutMain"

export const LayoutBlank: FC<React.PropsWithChildren<BaseLayoutProps>> = ({
  children,
}) => {
  return (
    <>
      <AppToasts />

      <LayoutMain>{children}</LayoutMain>
    </>
  )
}
