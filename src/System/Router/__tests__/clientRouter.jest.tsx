import { SystemContextConsumer } from "System/Contexts/SystemContext"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { setupClientRouter } from "System/Router/clientRouter"
import { render, screen, waitFor } from "@testing-library/react"

jest.mock("Components/NavBar/NavBar", () => ({
  NavBar: () => <div />,
}))

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  ReactRelayContext: {
    Provider: ({ children }) => children,
  },
}))

jest.mock("Utils/Hooks/useOnboardingModal", () => ({
  useOnboardingModal: jest.fn(),
}))

jest.mock("System/Relay/createRelaySSREnvironment", () => ({
  createRelaySSREnvironment: jest.fn(),
}))

describe("clientRouter", () => {
  const mockCreateRelaySSREnvironment = createRelaySSREnvironment as jest.Mock

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("resolves with a <ClientRouter /> component", async () => {
    const { ClientRouter } = await setupClientRouter({
      history: {
        protocol: "memory",
      },
      routes: [
        {
          path: "/",
          Component: () => <div>Hello Router</div>,
        },
        {
          path: "/cv",
          Component: () => <div>CV Page</div>,
        },
      ],
    })

    render(<ClientRouter />)

    await waitFor(() => {
      expect(screen.getByText("Hello Router")).toBeInTheDocument()
    })
  })

  it("accepts an initial route", async () => {
    const { ClientRouter } = await setupClientRouter({
      history: {
        protocol: "memory",
      },
      initialRoute: "/cv",
      routes: [
        {
          path: "/",
          Component: () => <div>Hello Router</div>,
        },
        {
          path: "/cv",
          Component: () => <div>CV Page</div>,
        },
      ],
    })

    render(<ClientRouter />)

    await waitFor(() => {
      expect(screen.getByText("CV Page")).toBeInTheDocument()
    })
  })

  it("bootstraps data from __RELAY_HYDRATION_DATA__", async () => {
    const relayBootstrap = [
      [
        '{"queryID":"OrderQuery","variables":{"orderID":"0"}}',
        "found window cache",
      ],
    ]
    window.__RELAY_HYDRATION_DATA__ = JSON.stringify(relayBootstrap)

    const { ClientRouter } = await setupClientRouter({
      history: {
        protocol: "memory",
      },
      routes: [
        {
          path: "/",
          Component: () => <div>Hello Router</div>,
        },
        {
          path: "/cv",
          Component: () => <div>CV Page</div>,
        },
      ],
    })

    render(<ClientRouter />)

    await waitFor(() => {
      expect(mockCreateRelaySSREnvironment).toHaveBeenCalledWith({
        cache: relayBootstrap,
        user: undefined,
      })
    })
  })

  it("passes along initial context values", async () => {
    const HomeApp = () => {
      return (
        <SystemContextConsumer>
          {context => {
            expect(Object.keys(context).sort()).toEqual([
              "isEigen",
              "isLoggedIn",
              "relayEnvironment",
              "router",
              "routes",
              "setRouter",
              "setUser",
              "user",
              "userPreferences",
            ])

            return <div>SystemContextConsumer</div>
          }}
        </SystemContextConsumer>
      )
    }

    const { ClientRouter } = await setupClientRouter({
      history: {
        protocol: "memory",
      },
      routes: [
        {
          path: "/",
          Component: HomeApp,
        },
      ],
      context: {} as any,
    })

    render(<ClientRouter />)

    await waitFor(() => {
      expect(screen.getByText("SystemContextConsumer")).toBeInTheDocument()
    })
  })

  it("passes unleash to match context", async () => {
    const { ClientRouter } = await setupClientRouter({
      history: {
        protocol: "memory",
      },
      routes: [
        {
          path: "/",
          render: ({ match }) => {
            expect(match.context.featureFlags.isEnabled()).toBe(true)
            return null
          },
        },
      ],
      context: {
        featureFlags: {
          isEnabled: jest.fn().mockReturnValue(true),
          getVariant: jest.fn(),
          toggles: [],
        },
      },
    })

    render(<ClientRouter />)
  })
})
