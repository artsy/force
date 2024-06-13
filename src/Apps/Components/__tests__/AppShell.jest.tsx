import { SystemContextProvider } from "System/Contexts/SystemContext"
import { render, screen } from "@testing-library/react"
import { setupClientRouter } from "System/Router2/clientRouter"
import { buildAppRoutes } from "System/Router2/Utils/buildAppRoutes"

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

jest.mock("Utils/Hooks/useAuthValidation")

jest.mock("Components/Footer/FooterDownloadAppBanner", () => ({
  FooterDownloadAppBanner: () => "Meet your new art advisor.",
}))

describe("AppShell", () => {
  it("renders a Footer", async () => {
    const { ClientRouter } = await setupClientRouter({
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
        <ClientRouter />
      </SystemContextProvider>
    )

    expect(screen.getByText("Meet your new art advisor.")).toBeInTheDocument()
  })

  it("calls the matched routes `prepare` function if found", async () => {
    const onClientSideRender = jest.fn()
    const { ClientRouter } = await setupClientRouter({
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
        <ClientRouter />
      </SystemContextProvider>
    )

    expect(onClientSideRender).toHaveBeenCalledTimes(1)
  })
})
