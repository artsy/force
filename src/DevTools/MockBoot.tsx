import * as React from "react"
import { Breakpoint } from "Utils/Responsive"
import { createMockEnvironment } from "relay-test-utils"
import {
  ClientContext,
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

export const MockBoot: React.FC<MockBootProps> = ({
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
