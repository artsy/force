import { SystemContextProvider } from "v2/System"
import { buildAppRoutes } from "v2/System/Router/buildAppRoutes"
import { buildClientApp } from "v2/System/Router/client"
import { render, screen } from "@testing-library/react"

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

    render(
      <SystemContextProvider>
        <ClientApp />
      </SystemContextProvider>
    )
    expect(screen.getByText("Get the Artsy app")).toBeInTheDocument()
  })

  it("calls the matched routes `prepare` function if found", async () => {
    const onClientSideRender = jest.fn()
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
                onClientSideRender()
              },
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

    expect(onClientSideRender).toHaveBeenCalledTimes(1)
  })
})
