import { LayoutBlank } from "Apps/Components/Layouts/LayoutBlank"
import { LayoutContainerOnly } from "Apps/Components/Layouts/LayoutContainerOnly"
import { LayoutDefault } from "Apps/Components/Layouts/LayoutDefault"
import { LayoutFullBleed } from "Apps/Components/Layouts/LayoutFullBleed"
import { LayoutLogoOnly } from "Apps/Components/Layouts/LayoutLogoOnly"
import { LayoutNavOnly } from "Apps/Components/Layouts/LayoutNavOnly"
import { LayoutOrderDetails } from "Apps/Order/Layouts/LayoutOrderDetails"
import { LayoutCheckout } from "Apps/Order2/Layouts/LayoutCheckout"
import { useRouter } from "System/Hooks/useRouter"
import { usePrevious } from "@artsy/palette"
import type { FC, PropsWithChildren, ReactNode } from "react"

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
  Checkout: LayoutCheckout, // TODO: Should just be a custom layout in the routes
  OrderDetails: LayoutOrderDetails, // TODO: Should just be a custom layout in the routes
} as const

export type LayoutVariant =
  | keyof typeof LAYOUTS
  | FC<PropsWithChildren<BaseLayoutProps>>

export const Layout: FC<React.PropsWithChildren<LayoutProps>> = ({
  variant = "Default",
  children,
}) => {
  const { match } = useRouter()

  const isFetching = !match.elements

  // If we're fetching, we want to render the previous layout and not execute
  // the new one right away.
  const previousVariant = usePrevious(variant)
  const Previous =
    typeof previousVariant === "string"
      ? LAYOUTS[previousVariant]
      : previousVariant

  if (isFetching) {
    return <Previous>{children}</Previous>
  }

  const Component = typeof variant === "string" ? LAYOUTS[variant] : variant

  return <Component>{children}</Component>
}
