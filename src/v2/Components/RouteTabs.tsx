import React from "react"
import { RouterLink, RouterLinkProps } from "v2/Artsy/Router/RouterLink"
import { BaseTab, BaseTabs, BaseTabProps, BaseTabsProps } from "@artsy/palette"

export const RouteTab: React.FC<BaseTabProps & RouterLinkProps> = ({
  children,
  ...rest
}) => {
  return (
    // FIXME:
    // @ts-ignore
    <BaseTab as={RouterLink} activeClassName="active" {...rest}>
      {children}
    </BaseTab>
  )
}

RouteTab.displayName = "RouteTab"

export const RouteTabs: React.FC<BaseTabsProps> = props => {
  return <BaseTabs mx={[-2, 0]} px={[2, 0]} {...props} />
}

RouteTabs.displayName = "RouteTabs"
