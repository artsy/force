import { usePrevious } from "@artsy/palette"
import { LayoutBlank } from "Apps/Components/Layouts/LayoutBlank"
import { LayoutContainerOnly } from "Apps/Components/Layouts/LayoutContainerOnly"
import { LayoutDefault } from "Apps/Components/Layouts/LayoutDefault"
import { LayoutFullBleed } from "Apps/Components/Layouts/LayoutFullBleed"
import { LayoutLogoOnly } from "Apps/Components/Layouts/LayoutLogoOnly"
import { LayoutNavOnly } from "Apps/Components/Layouts/LayoutNavOnly"
import { useRouter } from "System/Hooks/useRouter"
import type React from "react"
import { type FC, Fragment, type ReactNode, useEffect, useState } from "react"

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
  const isFetching = !match.elements

  const previousVariant = usePrevious(variant)
  const Previous = LAYOUTS[previousVariant]

  if (isFetching) {
    return <Previous>{children}</Previous>
  }

  const Component = LAYOUTS[variant]

  const enableINPHack = /^\/(artwork|artist)\/[^/]+$/i.test(
    match.location.pathname,
  )

  return (
    <Component>
      <INPHack
        {...(enableINPHack ? { key: match.location.pathname } : {})}
        enabled={enableINPHack}
      >
        {children}
      </INPHack>
    </Component>
  )
}

interface INPHackProps {
  enabled: boolean
}

const INPHack: React.FC<React.PropsWithChildren<INPHackProps>> = ({
  children,
  enabled,
}) => {
  const { match } = useRouter()
  const [isSecondRender, setIsSecondRender] = useState(false)

  const isPrefetched = match?.location?.state?.isPrefetched === true

  useEffect(() => {
    if (isPrefetched) {
      setIsSecondRender(true)
    }
  }, [isPrefetched])

  if (isPrefetched && !isSecondRender) {
    return null
  }

  if (!enabled) {
    return children
  }

  return <Fragment key={match.location.pathname}>{children}</Fragment>
}
