import { Boot } from "System/Router/Boot"
import * as React from "react"
import { Breakpoint } from "Utils/Responsive"
import { buildClientAppContext } from "System/Router/buildClientAppContext"
import { ClientContext } from "System/Router/buildClientAppContext"
import { createMockEnvironment } from "relay-test-utils"

export const MockBoot: React.FC<{
  breakpoint?: Breakpoint | undefined
  headTags?: JSX.Element[]
  user?: User
  context?: object
  relayEnvironment?: ReturnType<typeof createMockEnvironment>
}> = ({
  breakpoint = "xl" as Breakpoint,
  headTags,
  children,
  user = null,
  context = {},
  relayEnvironment,
}) => {
  const mockContext = buildClientAppContext(context)

  return (
    <Boot
      onlyMatchMediaQueries={[breakpoint]}
      headTags={headTags}
      context={mockContext as ClientContext}
      user={user}
      relayEnvironment={relayEnvironment ?? (null as any)}
      routes={null as any}
    >
      {children}
    </Boot>
  )
}
