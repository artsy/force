import { usePrevious } from "@artsy/palette"
import {
  INPOptimizer,
  useEnableINPOptimizer,
} from "Apps/Components/INPOptimizer"
import { LayoutBlank } from "Apps/Components/Layouts/LayoutBlank"
import { LayoutContainerOnly } from "Apps/Components/Layouts/LayoutContainerOnly"
import { LayoutDefault } from "Apps/Components/Layouts/LayoutDefault"
import { LayoutFullBleed } from "Apps/Components/Layouts/LayoutFullBleed"
import { LayoutLogoOnly } from "Apps/Components/Layouts/LayoutLogoOnly"
import { LayoutNavOnly } from "Apps/Components/Layouts/LayoutNavOnly"
import { useRouter } from "System/Hooks/useRouter"
import type React from "react"
import type { FC, ReactNode } from "react"

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

export const Layout: FC<React.PropsWithChildren<LayoutProps>> = ({
  variant = "Default",
  children,
}) => {
  const { match } = useRouter()
  const enableINPOptimizer = useEnableINPOptimizer()

  const isFetching = !match.elements

  const previousVariant = usePrevious(variant)
  const Previous = LAYOUTS[previousVariant]

  if (isFetching) {
    return <Previous>{children}</Previous>
  }

  const Component = LAYOUTS[variant]

  return (
    <Component>
      {enableINPOptimizer ? (
        <INPOptimizer
          key={match.location.pathname}
          enabled={enableINPOptimizer}
        >
          {children}
        </INPOptimizer>
      ) : (
        children
      )}
    </Component>
  )
}
