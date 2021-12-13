import {
  SystemContextProvider,
  useSystemContext,
} from "v2/System/SystemContext"
import { render, screen } from "@testing-library/react"
import { buildAppRoutes } from "../buildAppRoutes"
import { buildClientApp } from "../buildClientApp"

jest.mock("v2/Components/NavBar/NavBar", () => ({
  NavBar: () => <div />,
}))

jest.mock("v2/System/Router/Boot", () => ({
  Boot: ({ children }) => children,
}))

jest.mock("v2/System/Analytics/useTracking", () => ({
  useTracking: () => ({
    trackEvent: x => x,
  }),
}))

jest.mock("v2/Apps/Components/AppShell", () => ({
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
