import { renderCityGuideOnApp } from "Apps/CityGuide/Server/cityGuideOnApp"
import {
  ALLOW_ALL_PREFERENCES,
  CUSTOM_DESTINATIONS,
  DEFAULT_OPT_IN_PREFERENCES,
  DESTINATION_MAPPING,
  SEGMENT_CATEGORIES,
} from "Components/CookieConsentManager/categories"
import { buildHtmlTemplate } from "html"

// src/tests.ts stubs this module for everyone else
jest.mock("Components/CookieConsentManager/CookieConsentManager", () =>
  jest.requireActual("Components/CookieConsentManager/CookieConsentManager"),
)

const mockConfig = { SEGMENT_WRITE_KEY: "test-write-key" as string | null }

jest.mock("Server/config", () => ({
  ...jest.requireActual("Server/config"),
  get SEGMENT_WRITE_KEY() {
    return mockConfig.SEGMENT_WRITE_KEY
  },
  WEBFONT_URL: "https://webfonts.test",
}))

const SNIPPET_PATTERN =
  /!function\(\)\{var analytics=window\.analytics.*?\}\(\);/s

describe("renderCityGuideOnApp", () => {
  beforeEach(() => {
    mockConfig.SEGMENT_WRITE_KEY = "test-write-key"
  })

  it("fills in the write key for the current environment", () => {
    const html = renderCityGuideOnApp()

    expect(html).toContain('var WRITE_KEY = "test-write-key"')
    expect(html).not.toContain("__SEGMENT_WRITE_KEY__")
  })

  it("uses a different write key when the environment has a different one", () => {
    mockConfig.SEGMENT_WRITE_KEY = "staging-write-key"

    const html = renderCityGuideOnApp()

    expect(html).toContain('var WRITE_KEY = "staging-write-key"')
    expect(html).not.toContain("test-write-key")
  })

  it("leaves the key empty, which turns tracking off, when the environment has none", () => {
    mockConfig.SEGMENT_WRITE_KEY = null

    expect(renderCityGuideOnApp()).toContain('var WRITE_KEY = ""')
  })

  it("can't be broken out of by the write key", () => {
    mockConfig.SEGMENT_WRITE_KEY = '"</script><script>alert(1)</script>'

    const html = renderCityGuideOnApp()

    expect(html).not.toContain("</script><script>alert(1)")
  })

  it("fills in the webfont URL and leaves no placeholders", () => {
    const html = renderCityGuideOnApp()

    expect(html).toContain("https://webfonts.test/ll-unica77_regular.woff2")
    expect(html).not.toMatch(/__[A-Z_]+__/)
  })

  it("is not indexed", () => {
    expect(renderCityGuideOnApp()).toContain(
      '<meta name="robots" content="noindex">',
    )
  })

  it("uses the same Segment snippet as html.ts", () => {
    const forceHtml = buildHtmlTemplate({
      cdnUrl: "",
      content: {},
      disable: {
        analytics: false,
        segment: false,
        stripe: false,
        scripts: false,
        thirdParties: false,
      },
      env: "test",
      fontUrl: "",
      icons: { appleTouchIcon: "", favicon: "", faviconSVG: "" },
      imageCdnUrl: "",
      manifest: { browserconfig: "", openSearch: "", webmanifest: "" },
    })

    const forceSnippet = forceHtml.match(SNIPPET_PATTERN)?.[0]

    expect(forceSnippet).toBeDefined()
    expect(renderCityGuideOnApp().match(SNIPPET_PATTERN)?.[0]).toBe(
      forceSnippet,
    )
  })

  it("passes the consent rules from categories.ts to the page", () => {
    const html = renderCityGuideOnApp()
    const config = JSON.parse(
      html.match(/var CONSENT = (\{.*\})\n/)?.[1] as string,
    )

    expect(config).toEqual({
      cookieName: "tracking-preferences",
      optIn: DEFAULT_OPT_IN_PREFERENCES,
      optOut: ALLOW_ALL_PREFERENCES,
      segmentCategories: SEGMENT_CATEGORIES,
      destinationMapping: DESTINATION_MAPPING,
      defaultCategory: "functional",
      customDestinations: CUSTOM_DESTINATIONS.map(({ id, category }) => {
        return { id, category }
      }),
    })
  })
})
