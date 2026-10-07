import type { CategoryPreferences } from "@segment/consent-manager/types/types"
import { renderHook } from "@testing-library/react-hooks"
import { renderCityGuideOnApp } from "Apps/CityGuide/Server/cityGuideOnApp"
import {
  ALLOW_ALL_PREFERENCES,
  REJECT_ALL_PREFERENCES,
  mapCustomPreferences,
} from "Components/CookieConsentManager/categories"
import { useConsentRequired } from "Components/CookieConsentManager/useConsentRequired"
import { getENV } from "Utils/getENV"
import { getTimeZone } from "Utils/getTimeZone"
import { JSDOM } from "jsdom"

// src/tests.ts stubs this module for everyone else
jest.mock("Components/CookieConsentManager/CookieConsentManager", () =>
  jest.requireActual("Components/CookieConsentManager/CookieConsentManager"),
)

jest.mock("Server/config", () => ({
  ...jest.requireActual("Server/config"),
  SEGMENT_WRITE_KEY: "test-write-key",
  WEBFONT_URL: "https://webfonts.test",
}))

jest.mock("Utils/getTimeZone")
jest.mock("Utils/getENV")

// What Segment's integrations endpoint returns for the source
const GOOGLE_ANALYTICS = {
  name: "Google Analytics 4",
  creationName: "Google Analytics 4 Web",
  category: "Analytics",
}
const FACEBOOK_PIXEL = {
  name: "Facebook Pixel",
  creationName: "Facebook Pixel",
  category: "Advertising",
}
const BRAZE = {
  name: "Braze Web Mode (Actions)",
  creationName: "Braze Web Mode (Actions)",
  category: "Email",
}
const INTEGRATIONS = [GOOGLE_ANALYTICS, FACEBOOK_PIXEL]

const toDestinations = (integrations: typeof INTEGRATIONS) => {
  return integrations.map(({ creationName, category }) => {
    return { id: creationName, category } as any
  })
}

const savedCookie = ({
  preferences,
  integrations = INTEGRATIONS,
}: {
  preferences: CategoryPreferences
  integrations?: typeof INTEGRATIONS
}) => {
  const { destinationPreferences, customPreferences } = mapCustomPreferences(
    toDestinations(integrations),
    preferences,
  )
  const value = {
    version: 1,
    destinations: destinationPreferences,
    custom: customPreferences,
  }

  return `tracking-preferences=${encodeURIComponent(JSON.stringify(value))}`
}

interface VisitOptions {
  path?: string
  timeZone?: string
  cookie?: string
  integrations?: typeof INTEGRATIONS
  referrer?: string
}

const visit = async ({
  path = "/city-guide-on-app/?from=%2Fcity-guide%2Flondon-united-kingdom%2Fitinerary%2Fabc%3FshareToken%3Dx",
  timeZone = "America/New_York",
  cookie,
  integrations = INTEGRATIONS,
  referrer = "https://example.com/chat",
}: VisitOptions = {}) => {
  const fetch = jest.fn(async () => {
    return { ok: true, status: 200, json: async () => integrations }
  })

  const dom = new JSDOM(renderCityGuideOnApp(), {
    url: `https://www.artsy.net${path}`,
    referrer,
    runScripts: "dangerously",
    beforeParse(window: any) {
      window.fetch = fetch
      window.Intl = {
        DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone }) }),
      }
      if (cookie) {
        window.document.cookie = cookie
      }
    },
  })

  await new Promise(resolve => setTimeout(resolve, 0))
  await new Promise(resolve => setTimeout(resolve, 0))

  const analytics = (dom.window as any).analytics
  const queue: any[][] = Array.from(analytics)
  const loadedScripts = Array.from(
    dom.window.document.querySelectorAll("script[src]"),
  ).map(script => script.getAttribute("src"))

  return {
    fetch,
    isLoaded: loadedScripts.some(src => src?.includes("analytics.min.js")),
    loadedScripts,
    loadOptions: analytics._loadOptions,
    pageCalls: queue.filter(([method]) => method === "page"),
  }
}

describe("City Guide landing page consent", () => {
  describe("with no saved preferences", () => {
    it("tracks a visitor in a US time zone with one page call", async () => {
      const { fetch, isLoaded, loadedScripts, loadOptions, pageCalls } =
        await visit({ timeZone: "America/New_York" })

      expect(fetch).toHaveBeenCalledWith(
        "https://cdn.segment.com/v1/projects/test-write-key/integrations",
      )
      expect(isLoaded).toBe(true)
      expect(loadedScripts).toContain(
        "https://cdn.segment.com/analytics.js/v1/test-write-key/analytics.min.js",
      )
      expect(loadOptions).toEqual({
        integrations: {
          All: false,
          "Segment.io": true,
          "Google Analytics 4 Web": true,
          "Facebook Pixel": true,
        },
      })
      expect(pageCalls).toHaveLength(1)
      expect(pageCalls[0].slice(1)).toEqual([
        {
          path: "/city-guide-on-app/",
          url: "https://www.artsy.net/city-guide-on-app/?from=%2Fcity-guide%2Flondon-united-kingdom%2Fitinerary%2Fabc%3FshareToken%3Dx",
          referrer: "https://example.com/chat",
        },
        { integrations: { Marketo: false } },
      ])
    })

    it.each([
      "America/Los_Angeles",
      "America/Sao_Paulo",
      "Asia/Tokyo",
      "America/Chicago",
    ])("tracks a visitor in %s", async timeZone => {
      const { isLoaded, pageCalls } = await visit({ timeZone })

      expect(isLoaded).toBe(true)
      expect(pageCalls).toHaveLength(1)
    })

    it("sends no page call for a visitor opted out by default with ?geo=eu", async () => {
      const { isLoaded, loadOptions, pageCalls } = await visit({
        path: "/city-guide-on-app/?from=%2Fcity-guide&geo=eu",
      })

      expect(isLoaded).toBe(false)
      expect(loadOptions).toBeUndefined()
      expect(pageCalls).toHaveLength(0)
    })

    it.each(["Europe/London", "Europe/Paris", "UTC", "Etc/UTC", "Etc/GMT"])(
      "sends no page call for a visitor in %s",
      async timeZone => {
        const { isLoaded, pageCalls } = await visit({ timeZone })

        expect(isLoaded).toBe(false)
        expect(pageCalls).toHaveLength(0)
      },
    )

    it("still loads Segment for an EU visitor when the source has a strictly necessary destination", async () => {
      const { loadOptions, pageCalls } = await visit({
        path: "/city-guide-on-app/?from=%2Fcity-guide&geo=eu",
        integrations: [...INTEGRATIONS, BRAZE],
      })

      expect(loadOptions).toEqual({
        integrations: {
          All: false,
          "Segment.io": true,
          "Google Analytics 4 Web": false,
          "Facebook Pixel": false,
          "Braze Web Mode (Actions)": true,
        },
      })
      expect(pageCalls).toHaveLength(1)
    })
  })

  describe("with saved preferences", () => {
    it("sends one page call for ?geo=eu when the visitor has opted in", async () => {
      const { isLoaded, loadOptions, pageCalls } = await visit({
        path: "/city-guide-on-app/?from=%2Fcity-guide&geo=eu",
        cookie: savedCookie({ preferences: ALLOW_ALL_PREFERENCES }),
      })

      expect(isLoaded).toBe(true)
      expect(loadOptions.integrations).toEqual({
        All: false,
        "Segment.io": true,
        "Google Analytics 4 Web": true,
        "Facebook Pixel": true,
      })
      expect(pageCalls).toHaveLength(1)
      expect(pageCalls[0][1].path).toBe("/city-guide-on-app/")
    })

    it("sends no page call when a visitor in the US has rejected everything", async () => {
      const { isLoaded, pageCalls } = await visit({
        cookie: savedCookie({ preferences: REJECT_ALL_PREFERENCES }),
      })

      expect(isLoaded).toBe(false)
      expect(pageCalls).toHaveLength(0)
    })

    it("only enables the destinations the visitor allowed", async () => {
      const { loadOptions, pageCalls } = await visit({
        cookie: savedCookie({
          preferences: { ...ALLOW_ALL_PREFERENCES, targeting: false },
        }),
      })

      expect(loadOptions.integrations).toEqual({
        All: false,
        "Segment.io": true,
        "Google Analytics 4 Web": true,
        "Facebook Pixel": false,
      })
      expect(pageCalls).toHaveLength(1)
    })

    it("treats destinations added since the visitor chose as the consent manager does", async () => {
      const { loadOptions } = await visit({
        cookie: savedCookie({
          preferences: { ...ALLOW_ALL_PREFERENCES, performance: false },
          integrations: [FACEBOOK_PIXEL],
        }),
        integrations: INTEGRATIONS,
      })

      expect(loadOptions.integrations).toEqual({
        All: false,
        "Segment.io": true,
        "Google Analytics 4 Web": false,
        "Facebook Pixel": true,
      })
    })

    it("ignores a cookie it can't read", async () => {
      const { pageCalls } = await visit({
        cookie: "tracking-preferences=%7Bnot-json",
      })

      expect(pageCalls).toHaveLength(1)
    })
  })

  describe("when Segment can't be used", () => {
    it("does nothing without a write key", async () => {
      jest.resetModules()
      jest.doMock("Server/config", () => ({
        ...jest.requireActual("Server/config"),
        SEGMENT_WRITE_KEY: null,
        WEBFONT_URL: "https://webfonts.test",
      }))
      jest.doMock("Components/CookieConsentManager/CookieConsentManager", () =>
        jest.requireActual(
          "Components/CookieConsentManager/CookieConsentManager",
        ),
      )
      const {
        renderCityGuideOnApp: renderWithoutKey,
      } = require("Apps/CityGuide/Server/cityGuideOnApp")
      const fetch = jest.fn()

      const dom = new JSDOM(renderWithoutKey(), {
        url: "https://www.artsy.net/city-guide-on-app/",
        runScripts: "dangerously",
        beforeParse(window: any) {
          window.fetch = fetch
        },
      })
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(fetch).not.toHaveBeenCalled()
      expect(Array.from((dom.window as any).analytics)).toHaveLength(0)

      jest.dontMock("Server/config")
    })
  })

  // The page copies the time-zone rule from useConsentRequired, so check it against the real hook
  describe("matches Force's consent rules", () => {
    const mockedGetTimeZone = getTimeZone as jest.MockedFunction<
      typeof getTimeZone
    >
    const mockedGetENV = getENV as jest.MockedFunction<typeof getENV>

    const CASES = [
      { timeZone: "America/New_York", search: "" },
      { timeZone: "America/Los_Angeles", search: "" },
      { timeZone: "America/Sao_Paulo", search: "" },
      { timeZone: "Europe/London", search: "" },
      { timeZone: "Europe/Berlin", search: "" },
      { timeZone: "UTC", search: "" },
      { timeZone: "Etc/UTC", search: "" },
      { timeZone: "Etc/GMT", search: "" },
      { timeZone: "Asia/Tokyo", search: "" },
      { timeZone: "America/New_York", search: "&geo=eu" },
      { timeZone: "America/New_York", search: "&geo=ca" },
      { timeZone: "America/New_York", search: "&geo=br" },
      { timeZone: "Europe/London", search: "&geo=ca" },
    ]

    it.each(CASES)(
      "enables the same destinations as the hook for %j",
      async ({ timeZone, search }) => {
        const integrations = [GOOGLE_ANALYTICS, FACEBOOK_PIXEL, BRAZE]

        mockedGetTimeZone.mockReturnValue(timeZone)
        mockedGetENV.mockReturnValue("")
        window.history.pushState({}, "", `/?from=x${search}`)
        const { result } = renderHook(() => useConsentRequired())

        const { destinationPreferences } = mapCustomPreferences(
          toDestinations(integrations),
          result.current.initialPreferences,
        )
        const expected = integrations.map(({ creationName }) => {
          return Boolean(destinationPreferences[creationName])
        })

        const page = await visit({
          path: `/city-guide-on-app/?from=x${search}`,
          timeZone,
          integrations,
        })
        const actual = integrations.map(({ creationName }) => {
          return Boolean(page.loadOptions?.integrations[creationName])
        })

        expect(actual).toEqual(expected)
        expect(page.pageCalls).toHaveLength(expected.some(Boolean) ? 1 : 0)
      },
    )
  })
})
