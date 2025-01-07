import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  BaseTab,
  type BaseTabProps,
  BaseTabs,
  type BaseTabsProps,
} from "@artsy/palette"
import { RouterLink, type RouterLinkProps } from "System/Components/RouterLink"
import { useIsRouteActive } from "System/Hooks/useRouter"
import { useRouter } from "found"
import type * as React from "react"
import { useTracking } from "react-tracking"

export const RouteTab: React.FC<
  React.PropsWithChildren<BaseTabProps & RouterLinkProps>
> = ({ children, to, ...rest }) => {
  const { router } = useRouter()
  const tracking = useTracking()

  const options = {
    exact: rest.exact !== undefined ? rest.exact : true,
  }

  const location = router?.createLocation?.((to as string) ?? "") ?? {
    pathname: to,
    query: {},
  }

  return (
    <BaseTab
      as={RouterLink}
      // @ts-ignore
      to={to}
      active={useIsRouteActive(to, options)}
      onClick={event => {
        event.preventDefault()
        router?.push({
          ...location,
          state: { isPrefetched: false },
        })

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
