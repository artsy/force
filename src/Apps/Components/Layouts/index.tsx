import { usePrevious } from "@artsy/palette"
import { LayoutBlank } from "Apps/Components/Layouts/LayoutBlank"
import { LayoutContainerOnly } from "Apps/Components/Layouts/LayoutContainerOnly"
import { LayoutDefault } from "Apps/Components/Layouts/LayoutDefault"
import { LayoutFullBleed } from "Apps/Components/Layouts/LayoutFullBleed"
import { LayoutLogoOnly } from "Apps/Components/Layouts/LayoutLogoOnly"
import { LayoutNavOnly } from "Apps/Components/Layouts/LayoutNavOnly"
import { LayoutCheckout } from "Apps/Order2/Layouts/LayoutCheckout"
import { LayoutOrderDetails } from "Apps/Order2/Layouts/LayoutOrderDetails"
import { useRouter } from "System/Hooks/useRouter"
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
  Checkout: LayoutCheckout,
  OrderDetails: LayoutOrderDetails,
} as const

export type LayoutVariant = keyof typeof LAYOUTS

export const Layout: FC<React.PropsWithChildren<LayoutProps>> = ({
  variant = "Default",
  children,
}) => {
  const { match } = useRouter()

  const isFetching = !match.elements

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
