import {
  createMockNetworkLayer,
  createMockNetworkLayer2,
} from "DevTools/createMockNetworkLayer"
import { IMocks } from "graphql-tools/dist/Interfaces"
import React, { useEffect, useState } from "react"
import { getUser } from "Utils/user"
import { AppShell } from "Apps/Components/AppShell"
import { Environment } from "react-relay"
import { RouteProps } from "System/Router/Route"
import { HistoryEnhancerOptions } from "farce"
import { RouterConfig, setupClientRouter } from "System/Router/clientRouter"

interface MockRouterProps {
  context?: RouterConfig["context"]
  historyOptions?: HistoryEnhancerOptions
  initialRoute?: string
  mockData?: object
  mockMutationResults?: object
  mockResolvers?: IMocks
  routes: RouteProps[]
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

        const { ClientRouter } = setupClientRouter({
          routes: [
            {
              path: "/",
              children: routes,
              Component: MockRouterAppShell,
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
            relayEnvironment: (relayEnvironment as unknown) as Environment,
          },
        })

        setMockRouterApp((<ClientRouter />) as any)
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

const MockRouterAppShell: React.FC<MockRouterProps> = ({
  children,
  ...props
}) => {
  return <AppShell {...props}>{children}</AppShell>
}
