import { Boot } from "v2/System/Router"
import * as React from "react"
import { Breakpoint } from "v2/Utils/Responsive"
import { buildClientAppContext } from "v2/System/Router/buildClientAppContext"
import { ClientContext } from "v2/System/Router/buildClientAppContext"

export const MockBoot: React.SFC<{
  breakpoint?: Breakpoint
  headTags?: JSX.Element[]
  user?: User
  context?: object
}> = ({ breakpoint = "xl", headTags, children, user = null, context = {} }) => {
  const mockContext = buildClientAppContext(context)

  return (
    <Boot
      onlyMatchMediaQueries={[breakpoint]}
      headTags={headTags}
      context={mockContext as ClientContext}
      user={user}
      relayEnvironment={null as any}
      routes={null as any}
    >
      {children}
    </Boot>
  )
}
