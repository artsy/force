import { render, screen, waitFor } from "@testing-library/react"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { buildAppRoutes } from "System/Router/Utils/buildAppRoutes"
import { setupClientRouter } from "System/Router/clientRouter"

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

    const { ClientRouter } = setupClientRouter({
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
      </SystemContextProvider>
    )
  })

  it("uses an `<AppShell>` component to render child routes", async () => {
    const { ClientRouter } = setupClientRouter({
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
      </SystemContextProvider>
    )

    await waitFor(() => {
      expect(screen.getByText("AppShell")).toBeInTheDocument()
      expect(screen.getByText("foo route")).toBeInTheDocument()
    })
  })
})
