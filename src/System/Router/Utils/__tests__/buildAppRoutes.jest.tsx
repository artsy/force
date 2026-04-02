import { render, screen, waitFor } from "@testing-library/react"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { buildAppRoutes } from "System/Router/Utils/buildAppRoutes"
import { setupClientRouter } from "System/Router/clientRouter"
import { Redirect } from "found"
import { getRequest } from "relay-runtime"

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

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  ReactRelayContext: {
    Provider: ({ children }) => children,
  },
}))

jest.mock("Apps/Components/AppShell", () => ({
  AppShell: ({ children }) => <>AppShell {children}</>,
}))

describe("buildAppRoutes", () => {
  const fetchMock = jest.fn().mockResolvedValue({
    json: async () => ({
      data: {
        whatsNewNavigation: null,
        artistsNavigation: null,
        artworksNavigation: null,
      },
    }),
  })

  beforeAll(() => {
    ;(global as any).fetch = fetchMock
  })

  beforeEach(() => {
    fetchMock.mockClear()
  })

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

  it("preserves Found Redirect instances instead of spreading them", () => {
    const redirect = new Redirect({
      from: "/",
      to: "/foo/bar",
    })

    const routes = buildAppRoutes([
      [
        {
          path: "/foo",
          children: [redirect as any],
        },
      ],
    ])

    const child = routes[0].children![0].children![0]
    expect(child).toBe(redirect)
    expect(child).toBeInstanceOf(Redirect)
    expect(typeof child.render).toBe("function")
  })

  describe("navigation query", () => {
    it("attaches the GraphQL query to the route", () => {
      const routes = buildAppRoutes([[{ path: "/foo" }]])
      const route = routes[0]

      expect(route.query).toBeDefined()
      const request = getRequest(route.query!)
      expect(request.params.name).toBe("buildAppRoutesQuery")
    })

    it("prepareVariables returns LIVE by default", () => {
      const routes = buildAppRoutes([[{ path: "/foo" }]])
      const prepareVariables = routes[0].prepareVariables!

      const result = prepareVariables({}, { location: { query: {} } } as any)
      expect(result).toEqual({ requestedVersionState: "LIVE" })
    })

    it("prepareVariables returns DRAFT when navigationVersion=draft query param is present", () => {
      const routes = buildAppRoutes([[{ path: "/foo" }]])
      const prepareVariables = routes[0].prepareVariables!

      const result = prepareVariables({}, {
        location: { query: { navigationVersion: "draft" } },
      } as any)
      expect(result).toEqual({ requestedVersionState: "DRAFT" })
    })
  })
})
