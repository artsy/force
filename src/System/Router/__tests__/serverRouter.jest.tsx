/**
 * @jest-environment node
 */

import { render } from "enzyme"
import ReactDOMServer from "react-dom/server"
import { Title } from "react-head"
import { graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { NextFunction, Request } from "express"
import type { ArtsyResponse } from "Server/middleware/artsyExpress"
import { createMockNetworkLayer } from "DevTools/createMockNetworkLayer"
import { useTracking } from "react-tracking"
import {
  __TEST_INTERNAL_SERVER_APP__,
  setupServerRouter,
} from "System/Router/serverRouter"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"
import { SystemContextConsumer } from "System/Contexts/SystemContext"

jest.unmock("react-relay")

// FIXME: Not sure why this fails test since all code here is server-side. Need
// to investigate where this dep intersects
jest.mock("found-scroll", () => {})
jest.mock("System/Router/Utils/routeUtils", () => ({
  ...jest.requireActual("System/Router/Utils/routeUtils"),
  findRoutesByPath: jest.fn(),
}))

jest.mock("@loadable/server", () => ({
  ChunkExtractor: class {
    collectChunks = x => x
    getScriptTags = () =>
      `<script src="/assets/foo.js"></script> <script src="/assets/bar.js"></script>`
  },
}))

jest.mock("react-tracking")

const defaultComponent = () => <div>hi!</div>

describe("serverRouter", () => {
  let mockFindRoutesByPath = findRoutesByPath as jest.Mock
  let res: ArtsyResponse
  let req: Request
  let next: NextFunction
  // @ts-ignore
  let options: any = { req, res, next }

  mockFindRoutesByPath.mockImplementation(() => {
    return []
  })

  const mockTracking = useTracking as jest.Mock

  beforeEach(() => {
    res = {
      locals: { sd: {} },
    } as ArtsyResponse

    let req = ({
      path: "/",
      url: "/",
      header: jest.fn().mockReturnValue("A random user-agent"),
    } as unknown) as Request

    options = {
      res,
      req,
      next,
    }

    mockTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  const getWrapper = async (
    Component = defaultComponent,
    passedOptions = options
  ) => {
    const result = await setupServerRouter({
      routes: [
        {
          path: "/",
          Component,
        },
        {
          path: "/relay",
          Component,
          query: graphql`
            query serverRouterTestQuery @relay_test_operation {
              me {
                id
              }
            }
          `,
        },
      ],
      ...passedOptions,
    })

    const ServerRouter = Object.getOwnPropertyDescriptor(
      result,
      __TEST_INTERNAL_SERVER_APP__!
    )?.value

    return {
      ...result,
      ServerRouter,
      wrapper: render(<ServerRouter />),
    }
  }

  it("resolves with a rendered version of the ServerApp component", async () => {
    const { ServerRouter, html } = await getWrapper()
    expect(html).toEqual(ReactDOMServer.renderToString(<ServerRouter />))
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
    expect(headTags?.[headTags.length - 1].type).toBe("title")
    expect(headTags?.[headTags.length - 1].props.children).toBe("test")
  })

  it("passes items along in context option", async () => {
    const HomeApp = () => {
      return (
        <SystemContextConsumer>
          {context => {
            expect(Object.keys(context).sort()).toEqual([
              "featureFlags",
              "initialMatchingMediaQueries",
              "isEigen",
              "isFetching",
              "isLoggedIn",
              "relayEnvironment",
              "router",
              "routes",
              "setFetching",
              "setRouter",
              "setUser",
              "user",
              "userPreferences",
            ])
            return <div>HomeApp</div>
          }}
        </SystemContextConsumer>
      )
    }

    const { wrapper } = await getWrapper(HomeApp)
    expect(wrapper.find("div").text()).toContain("HomeApp")
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
    jest.mock("System/Relay/createRelaySSREnvironment", () => ({
      createRelaySSREnvironment: jest.fn(),
    }))

    const createRelaySSREnvironment = require("System/Relay/createRelaySSREnvironment")
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
        // eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect
        expect(error.message).toMatch(/Oh noes/)
      }
    })
  })

  it("invokes onServerSideRender hook", async () => {
    const spy = jest.fn()
    const route = {
      path: "/",
      Component: () => null,
      onServerSideRender: spy,
    }

    mockFindRoutesByPath.mockImplementation(() => {
      return [route]
    })

    await getWrapper(() => <>Hello</>, {
      ...options,
      routes: [route],
    })

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        ...options,
        route,
      })
    )
  })
})
