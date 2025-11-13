/**
 * @jest-environment node
 */

import type { ArtsyResponse } from "Server/middleware/artsyExpress"
import { SystemContextConsumer } from "System/Contexts/SystemContext"
import {
  __TEST_INTERNAL_SERVER_APP__,
  setupServerRouter,
} from "System/Router/serverRouter"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"
import { Media } from "Utils/Responsive"
import type { NextFunction, Request } from "express"
import ReactDOMServer from "react-dom/server"
import { Title } from "react-head"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

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

jest.mock("Server/config", () => {
  return {
    ENABLE_SSR_STREAMING: false,
  }
})

jest.mock("Server/manifest", () => ({
  loadAssetManifest: jest.fn().mockReturnValue({
    manifest: {
      entries: {
        index: {
          initial: {
            js: [],
          },
        },
      },
    },
  }),
}))

const defaultComponent = () => <div>hi!</div>

describe("serverRouter", () => {
  const mockFindRoutesByPath = findRoutesByPath as jest.Mock
  let res: ArtsyResponse
  let req: Request
  let next: NextFunction
  // @ts-expect-error
  let options: any = { req, res, next }

  mockFindRoutesByPath.mockImplementation(() => {
    return []
  })

  const mockTracking = useTracking as jest.Mock

  beforeEach(() => {
    res = {
      locals: { sd: {} },
    } as ArtsyResponse

    const req = {
      path: "/",
      url: "/",
      header: jest.fn().mockReturnValue("A random user-agent"),
    } as unknown as Request

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
            query serverRouterQuery @relay_test_operation {
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
      __TEST_INTERNAL_SERVER_APP__ as any
    )?.value

    // Since we're testing server-side rendering, we need to render to string
    const html = ReactDOMServer.renderToString(<ServerRouter />)

    // For server-side rendering tests, we don't need RTL render
    // Instead, we'll create a simple object that can query the HTML string
    const wrapper = {
      textContent: html.replace(/<[^>]*>/g, ""), // Strip HTML tags for text content
      innerHTML: html,
      querySelector: (selector: string) => {
        // Simple querySelector simulation for basic cases
        if (selector === "span") {
          return html.includes("<span") ? {} : null
        }
        return null
      },
      querySelectorAll: (selector: string) => {
        // Simple querySelectorAll simulation
        if (selector === "span") {
          const matches = html.match(/<span[^>]*>(.*?)<\/span>/g) || []
          return matches.map(match => ({
            textContent: match.replace(/<[^>]*>/g, ""),
          }))
        }
        return []
      },
    }

    return {
      ...result,
      ServerRouter,
      wrapper,
      html,
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
      const { extractScriptTags } = await getWrapper()
      expect(extractScriptTags?.()).toContain("__RELAY_HYDRATION_DATA__")
    })

    it("does not prefix CDN_URL if not available", async () => {
      const postScripts = `<script src="/assets/foo.js"></script> <script src="/assets/bar.js"></script>`
      const { extractScriptTags } = await getWrapper()
      expect(extractScriptTags?.()).toContain(postScripts)
    })

    it("prefixes CDN_URL to script tags if available", async () => {
      process.env.CDN_URL = CDN_URL
      const postScripts = `<script src="${CDN_URL}/foo.js"></script> <script src="${CDN_URL}/bar.js"></script>`
      const { extractScriptTags } = await getWrapper()
      expect(extractScriptTags?.()).toContain(postScripts)
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
    expect(headTags?.[headTags.length - 1].type).toBe("title")
    expect(headTags?.[headTags.length - 1].props.children).toBe("test")
  })

  it("passes items along in context option", async () => {
    const HomeApp = () => {
      return (
        <SystemContextConsumer>
          {context => {
            expect(Object.keys(context).sort()).toEqual([
              "initialMatchingMediaQueries",
              "isEigen",
              "isLoggedIn",
              "relayEnvironment",
              "router",
              "routes",
              "sessionId",
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
    expect(wrapper.textContent).toContain("HomeApp")
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

      const spans = wrapper.querySelectorAll("span")
      const texts = Array.from(spans).map(span => span.textContent)
      expect(texts).toEqual(["xs", "lg", "hover", "notHover"])
    })

    it("renders all media queries for unknown devices", async () => {
      options.req.header = jest.fn().mockReturnValue("Unknown device")
      const { wrapper } = await getWrapper(MediaComponent, options)

      const spans = wrapper.querySelectorAll("span")
      const texts = Array.from(spans).map(span => span.textContent)
      expect(texts).toEqual(["xs", "lg", "hover", "notHover"])
    })

    it("renders some media queries for known devices", async () => {
      options.req.header = jest
        .fn()
        .mockReturnValue("Something iPhone; something")
      const { wrapper } = await getWrapper(MediaComponent, options)

      const spans = wrapper.querySelectorAll("span")
      const texts = Array.from(spans).map(span => span.textContent)
      expect(texts).toEqual(["xs", "notHover"])
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
      return [{ route }]
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

  it("passes unleash to match context", async () => {
    const route = {
      path: "/",
      Component: () => null,
      render: ({ match }) => {
        expect(match.context.unleashClient.isEnabled()).toBe(true)
        return null
      },
    }

    mockFindRoutesByPath.mockImplementation(() => {
      return [{ route }]
    })

    await getWrapper(() => <>Hello</>, {
      ...options,
      routes: [route],
      context: {
        unleashClient: {
          isEnabled: jest.fn().mockReturnValue(true),
        },
      },
    })
  })
})
