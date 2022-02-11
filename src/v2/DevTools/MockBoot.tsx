import { Boot } from "v2/System/Router"
import * as React from "react"
import { Breakpoint } from "v2/Utils/Responsive"
import { buildClientAppContext } from "desktop/lib/buildClientAppContext"

export const MockBoot: React.SFC<{
  breakpoint?: Breakpoint
  headTags?: JSX.Element[]
  user?: User
  context?: object
  featureFlags?: Record<string, boolean>
}> = ({
  breakpoint = "xl",
  headTags,
  children,
  user = null,
  context = {},
  featureFlags = { "feature-a": true },
}) => {
  const mockContext = buildClientAppContext(context)
  return (
    <Boot
      onlyMatchMediaQueries={[breakpoint]}
      headTags={headTags}
      context={mockContext}
      user={user}
      relayEnvironment={null as any}
      routes={null as any}
      featureFlags={featureFlags}
    >
      {children}
    </Boot>
  )
}
