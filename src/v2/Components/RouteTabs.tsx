import React from "react"
import { RouterLink, RouterLinkProps } from "v2/Artsy/Router/RouterLink"
import { BaseTab, BaseTabs, BaseTabProps, BaseTabsProps } from "@artsy/palette"
import { useIsRouteActive } from "v2/Artsy/Router/useRouter"

export const RouteTab: React.FC<BaseTabProps & RouterLinkProps> = ({
  children,
  to,
  ...rest
}) => {
  const options = {
    exact: rest.exact !== undefined ? rest.exact : true,
  }

  return (
    <BaseTab
      as={RouterLink}
      // @ts-ignore
      to={to}
      active={useIsRouteActive(to, options)}
      {...rest}
    >
      {children}
    </BaseTab>
  )
}

RouteTab.displayName = "RouteTab"

export const RouteTabs: React.FC<BaseTabsProps> = props => {
  return <BaseTabs mx={[-2, 0]} px={[2, 0]} {...props} />
}

RouteTabs.displayName = "RouteTabs"
