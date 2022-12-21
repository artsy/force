import { LayoutBlank } from "Apps/Components/Layouts/LayoutBlank"
import { LayoutContainerOnly } from "Apps/Components/Layouts/LayoutContainerOnly"
import { LayoutDefault } from "Apps/Components/Layouts/LayoutDefault"
import { LayoutLogoOnly } from "Apps/Components/Layouts/LayoutLogoOnly"
import { LayoutNavOnly } from "Apps/Components/Layouts/LayoutNavOnly"
import { FC, ReactNode } from "react"

export interface BaseLayoutProps {
  children: ReactNode
}

export interface LayoutProps extends BaseLayoutProps {
  variant?: LayoutVariant
}

export const LAYOUTS = {
  Blank: LayoutBlank,
  ContainerOnly: LayoutContainerOnly,
  Default: LayoutDefault,
  LogoOnly: LayoutLogoOnly,
  NavOnly: LayoutNavOnly,
} as const

export type LayoutVariant = keyof typeof LAYOUTS

export const Layout: FC<LayoutProps> = ({ variant = "Default", children }) => {
  const Component = LAYOUTS[variant]

  return <Component>{children}</Component>
}
