import { SystemContextProvider, useSystemContext } from "System/SystemContext"
import { render, screen } from "@testing-library/react"
import { buildAppRoutes } from "System/Router/buildAppRoutes"
import { buildClientApp } from "System/Router/buildClientApp"

jest.mock("Components/NavBar/NavBar", () => ({
  NavBar: () => <div />,
}))

jest.mock("System/Router/Boot", () => ({
  Boot: ({ children }) => children,
}))

jest.mock("react-tracking", () => ({
  useTracking: () => ({
    trackEvent: x => x,
  }),
}))

jest.mock("Apps/Components/AppShell", () => ({
  AppShell: () => "AppShell",
}))

describe("buildAppRoutes", () => {
  it("creates a master route list", () => {
    const routes = buildAppRoutes([
      {
        routes: [
          {
            path: "/foo",
          },
        ],
      },
      {
        routes: [
          {
            path: "/bar",
          },
        ],
      },
    ])

    expect(routes[0].Component?.displayName).toEqual("withRouter(Component)")

    // eslint-disable-next-line testing-library/no-node-access
    expect(routes[0].children).toEqual([
      {
        path: "/foo",
        fetchIndicator: "overlay",
      },
      {
        path: "/bar",
        fetchIndicator: "overlay",
      },
    ])
  })

  it("filters out disabled routes", () => {
    const routes = buildAppRoutes([
      {
        routes: [
          {
            path: "/foo",
          },
        ],
      },
      {
        routes: [
          {
            path: "/bar",
          },
        ],
        disabled: true,
      },
    ])

    // eslint-disable-next-line testing-library/no-node-access
    expect(routes[0].children).toEqual([
      {
        path: "/foo",
        fetchIndicator: "overlay",
      },
    ])
  })

  it("sets a router in the global context on mount", async () => {
    const App = () => {
      const { router } = useSystemContext()
      expect(router).toBeDefined()
      return null
    }

    const { ClientApp } = await buildClientApp({
      history: {
        protocol: "memory",
      },
      initialRoute: "/foo",
      routes: buildAppRoutes([
        {
          routes: [
            {
              path: "/foo",
              Component: App,
            },
          ],
        },
      ]),
    })

    render(
      <SystemContextProvider>
        <ClientApp />
      </SystemContextProvider>
    )
  })

  it("uses an `<AppShell>` component to render child routes", async () => {
    const { ClientApp } = await buildClientApp({
      history: {
        protocol: "memory",
      },
      initialRoute: "/foo",
      routes: buildAppRoutes([
        {
          routes: [
            {
              path: "/foo",
              Component: () => <div />,
            },
          ],
        },
      ]),
    })

    render(
      <SystemContextProvider>
        <ClientApp />
      </SystemContextProvider>
    )
    expect(screen.getByText("AppShell")).toBeInTheDocument()
  })
})
