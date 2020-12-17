import { SystemContextProvider, useSystemContext } from "v2/Artsy/SystemContext"
import { mount } from "enzyme"
import React from "react"
import { buildAppRoutes } from "../buildAppRoutes"
import { buildClientApp } from "../buildClientApp"

jest.mock("v2/Components/NavBar/NavBar", () => ({
  NavBar: () => <div />,
}))

jest.mock("v2/Artsy/Router/Boot", () => ({
  Boot: ({ children }) => children,
}))

jest.mock("v2/Artsy/Analytics/useTracking", () => ({
  useTracking: () => ({
    trackEvent: x => x,
  }),
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

    expect(routes[0].Component.displayName).toEqual("withRouter(Component)")

    expect(routes[0].children).toEqual([
      {
        fetchIndicator: "overlay",
        path: "/foo",
      },
      {
        fetchIndicator: "overlay",
        path: "/bar",
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
        disabled: true,
        routes: [
          {
            path: "/bar",
          },
        ],
      },
    ])

    expect(routes[0].children).toEqual([
      {
        fetchIndicator: "overlay",
        path: "/foo",
      },
    ])
  })

  it("sets a router in the global context on mount", async done => {
    const App = () => {
      const { router } = useSystemContext()
      expect(router).toBeDefined()
      done()
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
              Component: App,
              path: "/foo",
            },
          ],
        },
      ]),
    })

    mount(
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
              Component: () => <div />,
              path: "/foo",
            },
          ],
        },
      ]),
    })

    const wrapper = mount(
      <SystemContextProvider>
        <ClientApp />
      </SystemContextProvider>
    )
    expect(wrapper.find("AppShell").length).toEqual(1)
  })
})
