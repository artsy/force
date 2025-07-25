import { AppShell } from "Apps/Components/AppShell"
import { createMockNetworkLayer } from "DevTools/createMockNetworkLayer"
import type { SystemContextProps } from "System/Contexts/SystemContext"
import type { RouteProps } from "System/Router/Route"
import {
  type RouterConfig,
  setupClientRouter,
} from "System/Router/clientRouter"
import { getUser } from "Utils/user"
import type { HistoryEnhancerOptions } from "farce"
import type React from "react"
import { useEffect, useState } from "react"
import type { Environment } from "react-relay"

interface MockRouterProps {
  context?: RouterConfig["context"]
  historyOptions?: HistoryEnhancerOptions
  initialRoute?: string
  mockData?: object
  mockMutationResults?: object
  routes: RouteProps[]
}

export const MockRouter: React.FC<React.PropsWithChildren<MockRouterProps>> = ({
  context,
  historyOptions,
  initialRoute = "/",
  mockData,
  mockMutationResults,
  routes,
}) => {
  const [MockRouterApp, setMockRouterApp] =
    useState<React.ReactElement<any> | null>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const initRouter = async () => {
      try {
        const user = getUser(context?.user)

        const relayEnvironment = (mockData || mockMutationResults)
          ? createMockNetworkLayer({ mockData, mockMutationResults })
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
