import { RouterConfig } from "v2/System/Router"
import { buildClientApp } from "v2/System/Router/buildClientApp"
import {
  createMockNetworkLayer,
  createMockNetworkLayer2,
} from "v2/DevTools/createMockNetworkLayer"
import { FarceCreateRouterArgs, RouteConfig } from "found"
import { IMocks } from "graphql-tools/dist/Interfaces"
import React, { useEffect, useState } from "react"
import { getUser } from "v2/Utils/user"
import { AppShell } from "v2/Apps/Components/AppShell"
import { RelaySSREnvironment } from "v2/System/Relay/createRelaySSREnvironment"

interface MockRouterProps {
  context?: RouterConfig["context"]
  historyOptions?: FarceCreateRouterArgs["historyOptions"]
  initialRoute?: string
  mockData?: object
  mockMutationResults?: object
  mockResolvers?: IMocks
  routes: RouteConfig[]
}

export const MockRouter: React.FC<MockRouterProps> = ({
  context,
  historyOptions,
  initialRoute = "/",
  mockData,
  mockMutationResults,
  mockResolvers,
  routes,
}) => {
  const [MockRouterApp, setMockRouterApp] = useState<React.ReactElement<
    any
  > | null>(null)

  useEffect(() => {
    const initRouter = async () => {
      try {
        const user = getUser(context?.user)

        const relayEnvironment = mockResolvers
          ? createMockNetworkLayer(mockResolvers)
          : mockData || mockMutationResults
          ? createMockNetworkLayer2({ mockData, mockMutationResults })
          : null

        const { ClientApp } = await buildClientApp({
          routes: [
            {
              path: "/",
              children: routes,
              Component: ({ children, ...props }) => {
                return <AppShell {...props}>{children}</AppShell>
              },
            },
          ],
          initialRoute,
          history: {
            protocol: "memory",
            options: historyOptions,
          },
          context: {
            ...context,
            user,
            relayEnvironment: (relayEnvironment as unknown) as RelaySSREnvironment,
          },
        })

        setMockRouterApp((<ClientApp />) as any)
      } catch (error) {
        console.error("[DevTools/MockRouter] Error rendering router:", error)
      }
    }

    initRouter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!MockRouterApp) {
    return null
  }

  return MockRouterApp
}
