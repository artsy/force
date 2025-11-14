import { render, screen, waitFor } from "@testing-library/react"
import { SystemContextProvider } from "System/Contexts/SystemContext"
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
        [
          {
            path: "/foo",
            Component: () => <div />,
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
      expect(screen.getByText("Meet your new art advisor.")).toBeInTheDocument()
    })
  })

  it("calls the matched routes `prepare` function if found", async () => {
    const onClientSideRender = jest.fn()
    const { ClientRouter } = await setupClientRouter({
      history: {
        protocol: "memory",
      },
      initialRoute: "/foo",
      routes: buildAppRoutes([
        [
          {
            path: "/foo",
            Component: () => <div />,
            onClientSideRender: props => {
              expect(props?.match.location.pathname).toBe("/foo")
              onClientSideRender()
            },
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
      expect(onClientSideRender).toHaveBeenCalledTimes(1)
    })
  })

  it("calls the matched routes `onPreloadJS` function if found", async () => {
    const spy = jest.fn()
    const { ClientRouter } = await setupClientRouter({
      history: {
        protocol: "memory",
      },
      initialRoute: "/foo",
      routes: buildAppRoutes([
        [
          {
            path: "/foo",
            Component: () => <div />,
            onPreloadJS: spy,
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
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
