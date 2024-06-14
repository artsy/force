import { usePrevious } from "@artsy/palette"
import { LayoutBlank } from "Apps/Components/Layouts/LayoutBlank"
import { LayoutContainerOnly } from "Apps/Components/Layouts/LayoutContainerOnly"
import { LayoutDefault } from "Apps/Components/Layouts/LayoutDefault"
import { LayoutFullBleed } from "Apps/Components/Layouts/LayoutFullBleed"
import { LayoutLogoOnly } from "Apps/Components/Layouts/LayoutLogoOnly"
import { LayoutNavOnly } from "Apps/Components/Layouts/LayoutNavOnly"
import { useSystemContext } from "System/Hooks/useSystemContext"
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
  FullBleed: LayoutFullBleed,
  LogoOnly: LayoutLogoOnly,
  NavOnly: LayoutNavOnly,
} as const

export type LayoutVariant = keyof typeof LAYOUTS

export const Layout: FC<LayoutProps> = ({ variant = "Default", children }) => {
  const { isFetching } = useSystemContext()

  // If we're fetching, we want to render the previous layout and not execute
  // the new one right away.
  const previousVariant = usePrevious(variant)
  const Previous = LAYOUTS[previousVariant]

  if (isFetching) {
    return <Previous>{children}</Previous>
  }

  const Component = LAYOUTS[variant]

  return <Component>{children}</Component>
}
