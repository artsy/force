import { render, screen, waitFor } from "@testing-library/react"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { buildAppRoutes } from "System/Router/Utils/buildAppRoutes"
import { setupClientRouter } from "System/Router/clientRouter"
import { getRequest } from "relay-runtime"
import { getENV } from "Utils/getENV"

jest.mock("Utils/getENV")

jest.mock("Components/NavBar/NavBar", () => ({
  NavBar: () => <div />,
}))

jest.mock("System/Boot", () => ({
  Boot: ({ children }) => children,
}))

jest.mock("react-tracking", () => ({
  useTracking: () => ({
    trackEvent: x => x,
  }),
}))

jest.mock("Apps/Components/AppShell", () => ({
  AppShell: ({ children }) => <>AppShell {children}</>,
}))

describe("buildAppRoutes", () => {
  it("creates a master route list", () => {
    const routes = buildAppRoutes([
      [
        {
          path: "/foo",
        },
      ],
      [
        {
          path: "/bar",
        },
      ],
    ])

    expect(routes[0].Component?.displayName).toEqual("withRouter(Component)")

    // eslint-disable-next-line testing-library/no-node-access
    expect(routes[0].children).toEqual([
      {
        path: "/foo",
      },
      {
        path: "/bar",
      },
    ])
  })

  it("sets a router in the global context on mount", async () => {
    const App = () => {
      const { router } = useSystemContext()
      expect(router).toBeDefined()
      return null
    }

    const { ClientRouter } = await setupClientRouter({
      history: {
        protocol: "memory",
      },
      initialRoute: "/foo",
      routes: buildAppRoutes([
        [
          {
            path: "/foo",
            Component: App,
          },
        ],
      ]),
    })

    render(
      <SystemContextProvider>
        <ClientRouter />
      </SystemContextProvider>,
    )
  })

  it("uses an `<AppShell>` component to render child routes", async () => {
    const { ClientRouter } = await setupClientRouter({
      history: {
        protocol: "memory",
      },
      initialRoute: "/foo",
      routes: buildAppRoutes([
        [
          {
            path: "/foo",
            Component: () => <div>foo route</div>,
          },
        ],
      ]),
    })

    render(
      <SystemContextProvider>
        <ClientRouter />
      </SystemContextProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText("AppShell")).toBeInTheDocument()
      expect(screen.getByText("foo route")).toBeInTheDocument()
    })
  })

  describe("ENABLE_SERVER_DRIVEN_NAVIGATION feature flag", () => {
    const mockGetENV = getENV as jest.Mock

    beforeEach(() => {
      mockGetENV.mockReset()
    })

    it("attaches the GraphQL query to the route when the flag is enabled", () => {
      mockGetENV.mockImplementation(
        (key: string) => key === "ENABLE_SERVER_DRIVEN_NAVIGATION",
      )

      const routes = buildAppRoutes([[{ path: "/foo" }]])
      const route = routes[0]

      expect(route.query).toBeDefined()
      const request = getRequest(route.query!)
      expect(request.params.name).toBe("buildAppRoutesQuery")
    })

    it("prepareVariables returns LIVE by default", () => {
      mockGetENV.mockImplementation(
        (key: string) => key === "ENABLE_SERVER_DRIVEN_NAVIGATION",
      )

      const routes = buildAppRoutes([[{ path: "/foo" }]])
      const prepareVariables = routes[0].prepareVariables!

      const result = prepareVariables({}, { location: { query: {} } } as any)
      expect(result).toEqual({ requestedVersionState: "LIVE" })
    })

    it("prepareVariables returns DRAFT when navigationVersion=draft query param is present", () => {
      mockGetENV.mockImplementation(
        (key: string) => key === "ENABLE_SERVER_DRIVEN_NAVIGATION",
      )

      const routes = buildAppRoutes([[{ path: "/foo" }]])
      const prepareVariables = routes[0].prepareVariables!

      const result = prepareVariables({}, {
        location: { query: { navigationVersion: "draft" } },
      } as any)
      expect(result).toEqual({ requestedVersionState: "DRAFT" })
    })

    it("does not attach query or prepareVariables when the flag is disabled", () => {
      mockGetENV.mockImplementation(
        (key: string) => key !== "ENABLE_SERVER_DRIVEN_NAVIGATION",
      )

      const routes = buildAppRoutes([[{ path: "/foo" }]])
      const route = routes[0]

      expect(route.query).toBeUndefined()
      expect(route.prepareVariables).toBeUndefined()
    })
  })
})
