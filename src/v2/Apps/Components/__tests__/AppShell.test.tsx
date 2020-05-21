import { Mediator, SystemContextProvider } from "v2/Artsy"
import { buildAppRoutes } from "v2/Artsy/Router/buildAppRoutes"
import { buildClientApp } from "v2/Artsy/Router/client"
import { mount } from "enzyme"
import React from "react"

jest.mock("Components/NavBar/NavBar", () => ({
  NavBar: () => <div />,
}))

jest.mock("Artsy/Router/Boot", () => ({
  Boot: ({ children }) => children,
}))

jest.mock("Artsy/Analytics/useTracking", () => ({
  useTracking: () => ({
    trackEvent: x => x,
  }),
}))

describe("AppShell", () => {
  const mediator: Mediator = {
    trigger: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  }

  it("renders a NavBar", async () => {
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

    const wrapper = mount(
      <SystemContextProvider mediator={mediator}>
        <ClientApp />
      </SystemContextProvider>
    )
    expect(wrapper.find("AppShell").length).toEqual(1)
  })

  it("calls the matched routes `prepare` function if found", async done => {
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
              prepare: () => {
                done()
              },
            },
          ],
        },
      ]),
    })

    mount(
      <SystemContextProvider mediator={mediator}>
        <ClientApp />
      </SystemContextProvider>
    )
  })
})
