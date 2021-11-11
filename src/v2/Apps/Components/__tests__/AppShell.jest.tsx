import { SystemContextProvider } from "v2/System"
import { buildAppRoutes } from "v2/System/Router/buildAppRoutes"
import { buildClientApp } from "v2/System/Router/client"
import { mount } from "enzyme"

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

describe("AppShell", () => {
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
      <SystemContextProvider>
        <ClientApp />
      </SystemContextProvider>
    )
    expect(wrapper.find("AppShell").length).toEqual(1)
  })

  // eslint-disable-next-line jest/no-done-callback, jest/expect-expect
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
              onClientSideRender: ({ match }) => {
                expect(match.location.pathname).toBe("/foo")
                done()
              },
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
})
