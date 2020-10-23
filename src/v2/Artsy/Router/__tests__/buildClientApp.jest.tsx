import { SystemContextConsumer } from "v2/Artsy"
import { buildClientApp } from "v2/Artsy/Router/buildClientApp"
import { createMockNetworkLayer } from "v2/DevTools"
import { mount } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { Boot } from "../Boot"

jest.mock("v2/Components/NavBar", () => ({
  NavBar: () => <div />,
}))

jest.mock("react-relay", () => ({
  ReactRelayContext: {
    Provider: ({ children }) => children,
  },
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

    const wrapper = mount(<ClientApp />)
    expect(wrapper.html()).toContain("<div>Hello Router</div>")
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

    const wrapper = mount(<ClientApp />)
    expect(wrapper.html()).toContain("<div>CV Page</div>")
  })

  it("bootstraps data from __RELAY_BOOTSTRAP__", async () => {
    window.__RELAY_BOOTSTRAP__ = JSON.stringify([
      [
        '{"queryID":"OrderQuery","variables":{"orderID":"0"}}',
        "found window cache",
      ],
    ])

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

    const wrapper = mount(<ClientApp />)
    expect(
      (wrapper
        .find(Boot)
        .props() as any).relayEnvironment.relaySSRMiddleware.cache.values()
    ).toContain("found window cache")
  })

  it("passes along initial context values", async done => {
    const HomeApp = () => {
      return (
        <SystemContextConsumer>
          {context => {
            expect(Object.keys(context).sort()).toEqual([
              "analytics",
              "isEigen",
              "isFetching",
              "mediator",
              "relayEnvironment",
              "router",
              "routes",
              "setFetching",
              "setRouter",
              "setUser",
              "user",
            ])
            setImmediate(done)
            return <div />
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

    mount(<ClientApp />)
  })

  describe("concerning GraphQL errors", () => {
    const consoleError = console.error
    jest.mock("v2/Artsy/Relay/createRelaySSREnvironment", () => ({
      createRelaySSREnvironment: jest.fn(),
    }))

    const createRelaySSREnvironment = require("v2/Artsy/Relay/createRelaySSREnvironment")
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
                query buildClientAppTestQuery {
                  me {
                    id
                  }
                }
              `,
            },
          ],
        })

        mount(<ClientApp />)
      } catch (error) {
        expect(error.message).toMatch(/Oh noes/)
      }
    })
  })
})
