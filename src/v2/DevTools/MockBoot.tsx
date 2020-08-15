import { Boot } from "v2/Artsy/Router"
import React from "react"
import { Breakpoint } from "v2/Utils/Responsive"
import { Environment, Network, RecordSource, Store } from "relay-runtime"

export const MockBoot: React.SFC<{
  breakpoint?: Breakpoint
  headTags?: JSX.Element[]
  user?: User
  context?: any
}> = ({
  breakpoint = "xl",
  headTags,
  children,
  user = null,
  context = null,
}) => {
  const mockRelayEnvironment = new Environment({
    network: Network.create(x => x as any),
    store: new Store(new RecordSource()),
  })
  return (
    <Boot
      onlyMatchMediaQueries={[breakpoint]}
      headTags={headTags}
      context={context}
      user={user}
      relayEnvironment={mockRelayEnvironment}
      routes={null as any}
    >
      {children}
    </Boot>
  )
}
