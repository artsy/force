import {
  createMockNetworkLayer,
  createMockNetworkLayer2,
} from "DevTools/createMockNetworkLayer"
import type { IMocks } from "graphql-tools/dist/Interfaces"
import type React from "react"
import { useEffect, useState } from "react"
import { getUser } from "Utils/user"
import { AppShell } from "Apps/Components/AppShell"
import type { Environment } from "react-relay"
import type { RouteProps } from "System/Router/Route"
import type { HistoryEnhancerOptions } from "farce"
import {
  type RouterConfig,
  setupClientRouter,
} from "System/Router/clientRouter"
import type { SystemContextProps } from "System/Contexts/SystemContext"

interface MockRouterProps {
  context?: RouterConfig["context"]
  historyOptions?: HistoryEnhancerOptions
  initialRoute?: string
  mockData?: object
  mockMutationResults?: object
  mockResolvers?: IMocks
  routes: RouteProps[]
}

export const MockRouter: React.FC<React.PropsWithChildren<MockRouterProps>> = ({
  context,
  historyOptions,
  initialRoute = "/",
  mockData,
  mockMutationResults,
  mockResolvers,
  routes,
}) => {
  const [MockRouterApp, setMockRouterApp] =
    useState<React.ReactElement<any> | null>(null)

  useEffect(() => {
    const initRouter = async () => {
      try {
        const user = getUser(context?.user)

        const relayEnvironment = mockResolvers
          ? createMockNetworkLayer(mockResolvers)
          : mockData || mockMutationResults
            ? createMockNetworkLayer2({ mockData, mockMutationResults })
            : null

        const { ClientRouter } = await setupClientRouter({
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
            relayEnvironment: relayEnvironment as unknown as Environment,
          } as SystemContextProps,
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

const MockRouterAppShell: React.FC<
  React.PropsWithChildren<MockRouterProps>
> = ({ children, ...props }) => {
  return <AppShell {...props}>{children}</AppShell>
}
