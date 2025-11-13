import { RouterLink, type RouterLinkProps } from "System/Components/RouterLink"
import { useIsRouteActive } from "System/Hooks/useRouter"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  BaseTab,
  type BaseTabProps,
  BaseTabs,
  type BaseTabsProps,
} from "@artsy/palette"
import type * as React from "react"
import { useTracking } from "react-tracking"

export const RouteTab: React.FC<
  React.PropsWithChildren<BaseTabProps & RouterLinkProps>
> = ({ children, to, ...rest }) => {
  const tracking = useTracking()

  const options = {
    exact: rest.exact !== undefined ? rest.exact : true,
  }

  return (
    <BaseTab
      as={RouterLink}
      // @ts-expect-error
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

export const RouteTabs: React.FC<React.PropsWithChildren<BaseTabsProps>> = ({
  children,
  ...rest
}) => {
  return (
    <BaseTabs mx={[-4, 0]} px={[2, 0]} {...rest}>
      {children}
    </BaseTabs>
  )
}

RouteTabs.displayName = "RouteTabs"
