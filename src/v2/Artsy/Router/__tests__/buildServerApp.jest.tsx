/**
 * @jest-environment node
 */

import { SystemContextConsumer } from "v2/Artsy"
import { createRelaySSREnvironment } from "v2/Artsy/Relay/createRelaySSREnvironment"
import {
  __THOU_SHALT_NOT_FAFF_AROUND_WITH_THIS_HERE_OBJECT_WE_ARE_SERIOUS__,
  buildServerApp,
  ServerRouterConfig,
} from "v2/Artsy/Router/buildServerApp"
import { createMockNetworkLayer } from "v2/DevTools"
import { render } from "enzyme"
import React from "react"
import ReactDOMServer from "react-dom/server"
import { Title } from "react-head"
import { graphql } from "react-relay"
import { Media } from "v2/Utils/Responsive"

jest.unmock("react-relay")

jest.mock("@loadable/server", () => ({
  ChunkExtractor: class {
    collectChunks = x => x
    getScriptTags = x =>
      `<script src="/assets/foo.js"></script> <script src="/assets/bar.js"></script>`
  },
}))

const defaultComponent = () => <div>hi!</div>

describe("buildServerApp", () => {
  const getWrapper = async ({
    url = "/",
    Component = defaultComponent,
    ...options
  }: { Component?: React.ComponentType } & Pick<
    ServerRouterConfig,
    Exclude<keyof ServerRouterConfig, "routes">
  > = {}) => {
    const result = await buildServerApp({
      routes: [
        {
          path: "/",
          Component,
        },
        {
          path: "/relay",
          Component,
          query: graphql`
            query buildServerAppTestQuery {
              me {
                id
              }
            }
          `,
        },
      ],
      url,
      userAgent: "A random user-agent",
      ...options,
    })
    const ServerApp = Object.getOwnPropertyDescriptor(
      result,
      __THOU_SHALT_NOT_FAFF_AROUND_WITH_THIS_HERE_OBJECT_WE_ARE_SERIOUS__
    ).value
    return {
      ...result,
      ServerApp,
      wrapper: render(<ServerApp />),
    }
  }

  it("resolves with a rendered version of the ServerApp component", async () => {
    const { ServerApp, bodyHTML } = await getWrapper()
    expect(bodyHTML).toEqual(ReactDOMServer.renderToString(<ServerApp />))
  })

  describe("scripts", () => {
    const prevEnv = process.env
    const CDN_URL = "http://test.com"

    afterAll(() => {
      process.env = prevEnv
    })

    it("bootstraps relay SSR data", async () => {
      const { scripts } = await getWrapper()
      expect(scripts).toContain("__RELAY_BOOTSTRAP__")
    })

    it("does not prefix CDN_URL if not available", async () => {
      const postScripts = `<script src="/assets/foo.js"></script> <script src="/assets/bar.js"></script>`
      const { scripts } = await getWrapper()
      expect(scripts).toContain(postScripts)
    })

    it("prefixes CDN_URL to script tags if available", async () => {
      process.env.CDN_URL = CDN_URL
      const postScripts = `<script src="${CDN_URL}/assets/foo.js"></script> <script src="${CDN_URL}/assets/bar.js"></script>`
      const { scripts } = await getWrapper()
      expect(scripts).toContain(postScripts)
    })
  })

  it("resolves with a 200 status if url matches request", async () => {
    const { status } = await getWrapper({ url: "/" })
    expect(status).toEqual(200)
  })

  it("resolves with a 404 status if url does not match request", async () => {
    const { status } = await getWrapper({ url: "/bad-url" })
    expect(status).toEqual(404)
  })

  it("resolves with headTags if react-head components present", async () => {
    const { headTags } = await getWrapper({
      Component: () => <Title>test</Title>,
    })
    // Enzyme won't render the right results for the title for whatever reason
    // It renders fine with renderToString though. ¯\_(ツ)_/¯
    expect(headTags[headTags.length - 1].type).toBe("title")
    expect(headTags[headTags.length - 1].props.children).toBe("test")
  })

  it("passes items along in context option", async done => {
    const HomeApp = () => {
      return (
        <SystemContextConsumer>
          {context => {
            expect(Object.keys(context).sort()).toEqual([
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

    await getWrapper({
      Component: HomeApp,
      context: {
        mediator: {
          trigger: jest.fn(),
        },
      },
    })
  })

  it("passes along rendered css", async () => {
    const { styleTags } = await getWrapper()
    expect(styleTags).toContain("style data-styled")
  })

  describe("concerning device detection", () => {
    const MediaComponent = () => (
      <div>
        <Media at="xs">
          <span>xs</span>
        </Media>
        <Media at="lg">
          <span>lg</span>
        </Media>
        <Media interaction="hover">
          <span>hover</span>
        </Media>
        <Media interaction="notHover">
          <span>notHover</span>
        </Media>
      </div>
    )

    it("renders all media queries when no user-agent exists", async () => {
      const { wrapper } = await getWrapper({
        Component: MediaComponent,
        userAgent: undefined,
      })
      expect(
        wrapper
          .find("span")
          .map((_, el) => el.firstChild.data)
          .get()
      ).toEqual(["xs", "lg", "hover", "notHover"])
    })

    it("renders all media queries for unknown devices", async () => {
      const { wrapper } = await getWrapper({
        Component: MediaComponent,
        userAgent: "Unknown device",
      })
      expect(
        wrapper
          .find("span")
          .map((_, el) => el.firstChild.data)
          .get()
      ).toEqual(["xs", "lg", "hover", "notHover"])
    })

    it("renders some media queries for known devices", async () => {
      const { wrapper } = await getWrapper({
        Component: MediaComponent,
        userAgent: "Something iPhone; something",
      })
      expect(
        wrapper
          .find("span")
          .map((_, el) => el.firstChild.data)
          .get()
      ).toEqual(["xs", "notHover"])
    })
  })

  describe("concerning GraphQL errors", () => {
    const consoleError = console.error

    beforeAll(() => {
      console.error = jest.fn()
    })

    afterAll(() => {
      console.error = consoleError
    })

    it("rejects with a GraphQL error", async () => {
      const relayNetwork = createMockNetworkLayer({
        Query: () => ({
          me: () => {
            throw new Error("Oh noes")
          },
        }),
      })
      const relayEnvironment = createRelaySSREnvironment({ relayNetwork })
      try {
        await getWrapper({
          url: "/relay",
          context: { relayEnvironment },
        })
      } catch (error) {
        expect(error.message).toMatch(/Oh noes/)
      }
    })
  })
})
