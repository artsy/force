/**
 * @jest-environment node
 */

import { SystemContextConsumer } from "v2/Artsy"
import {
  ServerRouterConfig,
  __TEST_INTERNAL_SERVER_APP__,
  buildServerApp,
} from "v2/Artsy/Router/buildServerApp"
import { render } from "enzyme"
import React from "react"
import ReactDOMServer from "react-dom/server"
import { Title } from "react-head"
import { graphql } from "react-relay"
import { Media } from "v2/Utils/Responsive"
import { Request, Response } from "express"
import { createMockNetworkLayer } from "v2/DevTools/createMockNetworkLayer"

jest.unmock("react-relay")

// FIXME: Not sure why this fails test since all code here is server-side. Need
// to investigate where this dep intersects
jest.mock("found-scroll", () => {})

jest.mock("@loadable/server", () => ({
  ChunkExtractor: class {
    collectChunks = x => x
    getScriptTags = x =>
      `<script src="/assets/foo.js"></script> <script src="/assets/bar.js"></script>`
  },
}))

const defaultComponent = () => <div>hi!</div>

describe("buildServerApp", () => {
  let res: Response
  let req: Request
  let options: Pick<
    ServerRouterConfig,
    Exclude<keyof ServerRouterConfig, "routes">
  > = { req, res }

  beforeEach(() => {
    res = {
      locals: { sd: {} },
    } as Response
    let req = ({
      path: "/",
      url: "/",
      header: jest.fn().mockReturnValue("A random user-agent"),
    } as unknown) as Request
    options = {
      res,
      req,
    }
  })

  const getWrapper = async (
    Component = defaultComponent,
    passedOptions = options
  ) => {
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
      ...passedOptions,
    })
    const ServerApp = Object.getOwnPropertyDescriptor(
      result,
      __TEST_INTERNAL_SERVER_APP__
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
    const { status } = await getWrapper()
    expect(status).toEqual(200)
  })

  it("resolves with a 404 status if url does not match request", async () => {
    options.req.url = "/bad-url"
    const { status } = await getWrapper(defaultComponent, options)
    expect(status).toEqual(404)
  })

  it("resolves with headTags if react-head components present", async () => {
    const component = () => <Title>test</Title>
    const { headTags } = await getWrapper(component)
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
              "analytics",
              "initialMatchingMediaQueries",
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

    await getWrapper(HomeApp)
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
      options.req.header = jest.fn().mockReturnValue(undefined)
      const { wrapper } = await getWrapper(MediaComponent, options)
      expect(
        wrapper
          .find("span")
          .map((_, el) => el.firstChild.data)
          .get()
      ).toEqual(["xs", "lg", "hover", "notHover"])
    })

    it("renders all media queries for unknown devices", async () => {
      options.req.header = jest.fn().mockReturnValue("Unknown device")
      const { wrapper } = await getWrapper(MediaComponent, options)

      expect(
        wrapper
          .find("span")
          .map((_, el) => el.firstChild.data)
          .get()
      ).toEqual(["xs", "lg", "hover", "notHover"])
    })

    it("renders some media queries for known devices", async () => {
      options.req.header = jest
        .fn()
        .mockReturnValue("Something iPhone; something")
      const { wrapper } = await getWrapper(MediaComponent, options)

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
    jest.mock("v2/Artsy/Relay/createRelaySSREnvironment", () => ({
      createRelaySSREnvironment: jest.fn(),
    }))

    const createRelaySSREnvironment = require("v2/Artsy/Relay/createRelaySSREnvironment")
      .createRelaySSREnvironment as jest.Mock

    beforeAll(() => {
      // @ts-ignore
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: null,
        json: jest.fn(),
      })
      console.error = jest.fn()
    })

    afterAll(() => {
      console.error = consoleError
      // @ts-ignore
      global.fetch.mockRestore()
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
        await getWrapper(defaultComponent, options)
      } catch (error) {
        expect(error.message).toMatch(/Oh noes/)
      }
    })
  })
})
