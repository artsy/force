import React from "react"
import { RouterLink, RouterLinkProps } from "v2/Artsy/Router/RouterLink"
import { BaseTab, BaseTabs, BaseTabProps, BaseTabsProps } from "@artsy/palette"
import { useIsRouteActive } from "v2/Artsy/Router/useRouter"
// import { useTracking } from "react-tracking"
// import { AnalyticsSchema } from "v2/Artsy"

export const RouteTab: React.FC<BaseTabProps & RouterLinkProps> = ({
  children,
  to,
  ...rest
}) => {
  // const tracking = useTracking()

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
        // tracking.trackEvent({
        //   action_type: AnalyticsSchema.ActionType.Click,
        //   destination_path: to,
        //   subject: children as string,
        // })
      }}
      {...rest}
    >
      {children}
    </BaseTab>
  )
}

RouteTab.displayName = "RouteTab"

export const RouteTabs: React.FC<
  // FIXME: For some reason this isn't liking conditional rendering in jsx
  Omit<BaseTabsProps, "children"> & { children: any }
> = props => {
  return <BaseTabs mx={[-2, 0]} px={[2, 0]} {...props} />
}

RouteTabs.displayName = "RouteTabs"
