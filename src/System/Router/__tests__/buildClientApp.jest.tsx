import { SystemContextConsumer } from "System"
import { buildClientApp } from "System/Router/buildClientApp"
import { createMockNetworkLayer } from "DevTools"
import { render, screen } from "@testing-library/react"
import { graphql } from "react-relay"
import * as relaySystem from "System/Relay/createRelaySSREnvironment"

jest.mock("Components/NavBar", () => ({
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

describe("buildClientApp", () => {
  it("resolves with a <ClientApp /> component", async () => {
    const { ClientApp } = await buildClientApp({
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

    render(<ClientApp />)
    expect(screen.getByText("Hello Router")).toBeInTheDocument()
  })

  it("accepts an initial route", async () => {
    const { ClientApp } = await buildClientApp({
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

    render(<ClientApp />)
    expect(screen.getByText("CV Page")).toBeInTheDocument()
  })

  // FIXME: SWC_COMPILER_MIGRATION
  it.skip("bootstraps data from __RELAY_BOOTSTRAP__", async () => {
    const createRelayEnvSpy = jest.spyOn(
      relaySystem,
      "createRelaySSREnvironment"
    )

    const relayBootstrap = [
      [
        '{"queryID":"OrderQuery","variables":{"orderID":"0"}}',
        "found window cache",
      ],
    ]
    window.__RELAY_BOOTSTRAP__ = JSON.stringify(relayBootstrap)

    const { ClientApp } = await buildClientApp({
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

    render(<ClientApp />)

    expect(createRelayEnvSpy).toHaveBeenCalledWith({
      cache: relayBootstrap,
      user: undefined,
    })
  })

  it("passes along initial context values", async () => {
    const HomeApp = () => {
      return (
        <SystemContextConsumer>
          {context => {
            expect(Object.keys(context).sort()).toEqual([
              "analytics",
              "featureFlags",
              "isEigen",
              "isFetching",
              "isLoggedIn",
              "mediator",
              "relayEnvironment",
              "router",
              "routes",
              "setFetching",
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

    const { ClientApp } = await buildClientApp({
      history: {
        protocol: "memory",
      },
      routes: [
        {
          path: "/",
          Component: HomeApp,
        },
      ],
      context: {},
    })

    render(<ClientApp />)
    expect(screen.getByText("SystemContextConsumer")).toBeInTheDocument()
  })

  describe("concerning GraphQL errors", () => {
    const consoleError = console.error
    jest.mock("System/Relay/createRelaySSREnvironment", () => ({
      createRelaySSREnvironment: jest.fn(),
    }))

    const createRelaySSREnvironment = require("System/Relay/createRelaySSREnvironment")
      .createRelaySSREnvironment as jest.Mock

    beforeAll(() => {
      console.error = jest.fn()
    })

    afterAll(() => {
      console.error = consoleError
    })

    it("rejects with a GraphQL error", async () => {
      const relay = () => {
        const relayNetwork = createMockNetworkLayer({
          Query: () => ({
            me: () => {
              throw new Error("Oh noes")
            },
          }),
        })
        return createRelaySSREnvironment({ relayNetwork })
      }
      createRelaySSREnvironment.mockReturnValue(relay())

      try {
        const { ClientApp } = await buildClientApp({
          history: {
            protocol: "memory",
          },
          routes: [
            {
              path: "/",
              Component: () => null,
              query: graphql`
                query buildClientAppTestQuery @relay_test_operation {
                  me {
                    id
                  }
                }
              `,
            },
          ],
        })

        render(<ClientApp />)
      } catch (error) {
        // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
        expect(error.message).toMatch(/Oh noes/)
      }
    })
  })
})
