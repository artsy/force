import type * as React from "react"
import type { Breakpoint } from "Utils/Responsive"
import type { createMockEnvironment } from "relay-test-utils"
import {
  type ClientContext,
  getClientAppContext,
} from "System/Router/Utils/clientAppContext"
import { Boot } from "System/Boot"

export interface MockBootProps {
  breakpoint?: Breakpoint | undefined
  headTags?: JSX.Element[]
  user?: User
  context?: object
  relayEnvironment?: ReturnType<typeof createMockEnvironment>
}

export const MockBoot: React.FC<React.PropsWithChildren<MockBootProps>> = ({
  breakpoint = "lg",
  headTags,
  children,
  user = null,
  context = {},
  relayEnvironment,
}) => {
  const mockContext = getClientAppContext(context)

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
