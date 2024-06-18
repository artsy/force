import * as React from "react"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { BaseTab, BaseTabs, BaseTabProps, BaseTabsProps } from "@artsy/palette"
import { useIsRouteActive } from "System/Hooks/useRouter"
import { useTracking } from "react-tracking"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"

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
          action_type: DeprecatedAnalyticsSchema.ActionType.Click,
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
    <BaseTabs mx={[-4, 0]} px={[2, 0]} {...rest}>
      {children}
    </BaseTabs>
  )
}

RouteTabs.displayName = "RouteTabs"
