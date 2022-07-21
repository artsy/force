import * as React from "react"
import { RouterLink, RouterLinkProps } from "System/Router/RouterLink"
import { BaseTab, BaseTabs, BaseTabProps, BaseTabsProps } from "@artsy/palette"
import { useIsRouteActive } from "System/Router/useRouter"
import { useTracking } from "react-tracking"
import { AnalyticsSchema } from "System"

export const RouteTab: React.FC<BaseTabProps & RouterLinkProps> = ({
  children,
  to,
  ...rest
}) => {
  const tracking = useTracking()

  const options = {
    exact: rest.exact !== undefined ? rest.exact : true,
  }

  return (
    <BaseTab
      as={RouterLink}
      // @ts-ignore
      to={to}
      active={useIsRouteActive(to, options)}
      onClick={() => {
        tracking.trackEvent({
          action_type: AnalyticsSchema.ActionType.Click,
          destination_path: to,
          subject: children as string,
        })
      }}
      {...rest}
    >
      {children}
    </BaseTab>
  )
}

RouteTab.displayName = "RouteTab"

export const RouteTabs: React.FC<BaseTabsProps> = ({ children, ...rest }) => {
  return (
    <BaseTabs justifyContent="space-between" mx={[-4, 0]} px={[2, 0]} {...rest}>
      {children}
    </BaseTabs>
  )
}

RouteTabs.displayName = "RouteTabs"
