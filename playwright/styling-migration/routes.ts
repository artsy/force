import path from "path"

export const BASE_URL =
  process.env.PLAYWRIGHT_BASE_URL || "http://localhost:4000"

export const OUTPUT_ROOT = path.resolve(
  __dirname,
  "../../tmp/styling-migration",
)

export interface CaptureRoute {
  name: string
  path: string
  /** Defaults to the hydrated-app marker; the 404 page is not hydrated. */
  readySelector?: string
  /** Defaults to 80 viewport-height steps; infinite-scroll pages need a cap. */
  maxScrollSteps?: number
  /** The 404 page is a static template that ignores the theme, so it skips the dark-mode check. */
  isThemeIgnored?: boolean
}

export const ROUTES: CaptureRoute[] = [
  { name: "home", path: "/" },
  { name: "artist", path: "/artist/pablo-picasso" },
  { name: "artwork", path: "/artwork/pablo-picasso-guernica" },
  {
    name: "article",
    path: "/article/artsy-editorial-agnes-deness-manhattan-wheatfield-grown-poignant",
    // Scrolling past ~6 screens loads the next article, which varies per run.
    maxScrollSteps: 5,
  },
  { name: "fair", path: "/fair/expo-chicago-2019" },
  { name: "search", path: "/search?term=andy" },
  { name: "collect", path: "/collect" },
  { name: "collect-painting", path: "/collect/painting" },
  { name: "collect-red", path: "/collect?colors[0]=red" },
  {
    name: "404",
    path: "/oh-no-some-404",
    readySelector: '[data-testid="error-page"]',
    isThemeIgnored: true,
  },
  { name: "auctions", path: "/auctions" },
  { name: "about", path: "/about" },
]

export const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
]

export const THEMES = ["light", "dark"]

export interface ElementSnapshot {
  path: string
  styles: Record<string, string>
}

export interface CaptureData {
  runId: string
  theme: string
  bodyBackgroundColor: string
  bodyColor: string
  /** False when a settle step (network idle, images, placeholders, quiet DOM) hit its timeout. */
  settled: boolean
  consoleErrors: string[]
  elements: ElementSnapshot[]
}

export interface IgnoredPath {
  /** Limit the entry to these route names; omit to apply to every route. */
  routes?: string[]
  /** Tested against each element path. Anchor it with ^; leave the end open to match descendants too. */
  pattern: RegExp
  /** Ignore only these properties on matching elements; omit to skip the elements entirely. */
  properties?: string[]
  /** Do not report matching elements that exist in only one capture. */
  ignoreUnmatched?: boolean
  reason: string
}

const nth = ({ tag, index = "\\d+" }: { tag: string; index?: string }) => {
  return `${tag}:nth-of-type\\(${index}\\)`
}

const optional = (segment: string) => `?${segment}`

// A segment that starts with "?" is optional.
const pathPattern = (segments: string[]): RegExp => {
  const source = segments
    .map((segment, index) => {
      if (segment.startsWith("?")) {
        return `(?:>${segment.slice(1)})?`
      }
      return index === 0 ? segment : `>${segment}`
    })
    .join("")
  return new RegExp(`^${source}`)
}

const exactPathPattern = (segments: string[]): RegExp => {
  return new RegExp(`${pathPattern(segments).source}$`)
}

// Matches the chain of ancestors down to the last segment, e.g. a>b, a>b>c.
const ancestorChainPattern = (segments: string[]): RegExp => {
  const [first, ...rest] = segments
  const nested = rest.reduceRight((inner, segment) => {
    return `(?:>${segment}${inner})?`
  }, "")
  return new RegExp(`^${first}${nested}$`)
}

const div = (index?: string) => nth({ tag: "div", index })
const main = nth({ tag: "main", index: "1" })

// Paths start with body>div#app for the app root; other body-level roots are keyed by signature.
const APP_ROOT = ["body", "div#app"]
const PAGE_BODY = [...APP_ROOT, div("1"), div("1"), div("2"), main, div("1")]
const RAIL_CARD_CAPTION = [
  nth({ tag: "ul", index: "1" }),
  nth({ tag: "li" }),
  nth({ tag: "a", index: "1" }),
  div("2"),
  div("1"),
]

const COLOR_PROPERTIES = [
  "color",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "outline-color",
]

const TIMER_LINE_PROPERTIES = [
  "display",
  "align-items",
  "line-height",
  "height",
  "width",
  ...COLOR_PROPERTIES,
]

const ARTIST_CARD_LINK = nth({ tag: "a", index: "1" })

// The artist artworks grid nests its cards one way on tablet and desktop, another on mobile.
const ARTIST_GRID_CARDS = [
  [
    div("8"),
    div("1"),
    div("2"),
    div("3"),
    div("6"),
    div("1"),
    div("1"),
    div(),
    div(),
    div(),
    ARTIST_CARD_LINK,
  ],
  [
    div("8"),
    div("1"),
    div("2"),
    div("2"),
    div("5"),
    div("1"),
    div("1"),
    div("1"),
    div(),
    div(),
    ARTIST_CARD_LINK,
  ],
]

const artistGridCardIgnores = (cardSegments: string[]): IgnoredPath[] => {
  return [
    {
      routes: ["artist"],
      pattern: pathPattern([...PAGE_BODY, ...cardSegments, div("1"), div("3")]),
      properties: TIMER_LINE_PROPERTIES,
      ignoreUnmatched: true,
      reason:
        "The lot timer line in artwork grid cards changes layout and colour as bidding times pass.",
    },
    {
      routes: ["artist"],
      pattern: pathPattern([
        ...PAGE_BODY,
        ...cardSegments,
        div("1"),
        div("1"),
        div("2"),
      ]),
      properties: ["width", "height"],
      ignoreUnmatched: true,
      reason:
        "Artworks grid cards show a save count beside the save button, and it arrives after a per-user query.",
    },
  ]
}

export const IGNORED_PATHS: IgnoredPath[] = [
  {
    pattern: pathPattern([
      ...APP_ROOT,
      div("1"),
      div("1"),
      div("2"),
      div("1"),
      div("1"),
      nth({ tag: "header", index: "1" }),
      div("1"),
      nth({ tag: "a", index: "1" }),
      div("1"),
      div(),
    ]),
    properties: ["opacity", "position"],
    reason:
      "Mobile app banner rotates its messages on a timer, swapping opacity and position.",
  },
  {
    routes: ["home", "auctions"],
    pattern: pathPattern([
      ...PAGE_BODY,
      div(),
      optional(div("1")),
      div("3"),
      div("1"),
      div("1"),
      ...RAIL_CARD_CAPTION,
      div("3"),
    ]),
    properties: TIMER_LINE_PROPERTIES,
    ignoreUnmatched: true,
    reason:
      "The lot timer line in rail cards changes layout and colour as bidding times pass.",
  },
  {
    routes: ["auctions"],
    pattern: pathPattern([
      ...PAGE_BODY,
      div(),
      optional(div("1")),
      div("3"),
      div("1"),
      div("1"),
      ...RAIL_CARD_CAPTION,
      div("1"),
      div("2"),
    ]),
    properties: ["width", "height"],
    ignoreUnmatched: true,
    reason:
      "Rail artwork cards show a save count beside the save button, and it arrives after a per-user query.",
  },
  ...ARTIST_GRID_CARDS.flatMap(cardSegments =>
    artistGridCardIgnores(cardSegments),
  ),
  {
    routes: ["artist"],
    pattern: pathPattern([...PAGE_BODY, div("12")]),
    properties: [
      "align-items",
      "background-color",
      "bottom",
      "display",
      "flex-basis",
      "flex-direction",
      "flex-grow",
      "font-size",
      "gap",
      "grid-template-columns",
      "height",
      "justify-content",
      "left",
      "letter-spacing",
      "line-height",
      "margin-right",
      "margin-top",
      "min-height",
      "min-width",
      "opacity",
      "overflow",
      "padding-right",
      "position",
      "right",
      "top",
      "width",
    ],
    ignoreUnmatched: true,
    reason:
      "The Highlights and Achievements section loads on scroll and settles in a different layout from run to run.",
  },
  {
    routes: ["artist"],
    pattern: ancestorChainPattern(PAGE_BODY),
    properties: ["height"],
    reason:
      "These ancestors of the Highlights section take its height, which varies from run to run.",
  },
  {
    routes: ["auctions"],
    pattern: ancestorChainPattern([
      ...PAGE_BODY,
      div(),
      div("1"),
      div("1"),
      div("1"),
      nth({ tag: "h4", index: "1" }),
    ]),
    properties: ["height"],
    reason:
      "A rail heading switches between a dated title and In progress as auctions go live, so it wraps differently and moves its ancestors.",
  },
  {
    routes: ["artist"],
    pattern: exactPathPattern([
      ...PAGE_BODY,
      div("8"),
      div("1"),
      div("2"),
      div("[23]"),
      div("1"),
      div("1"),
    ]),
    properties: ["z-index"],
    reason: "A sticky layer in the artist filters gets a z-index that varies.",
  },
  {
    routes: ["artist"],
    pattern: exactPathPattern([
      ...PAGE_BODY,
      div("10"),
      div("1"),
      div("7"),
      div("[12]"),
      div("1"),
      div("1"),
    ]),
    properties: ["z-index"],
    reason:
      "A sticky layer in the market signals section gets a z-index that varies.",
  },
  {
    routes: ["artist"],
    pattern: /^body>div\[div\/div\/div\{keywordSearchInput\}\]#0$/,
    properties: ["pointer-events"],
    reason:
      "The search input root toggles pointer-events as the navbar settles, and it did so in only one run.",
  },
  {
    routes: ["article"],
    pattern: new RegExp(
      `${pathPattern(PAGE_BODY).source}>(?:${div("5")}>${div("3")}|${div("7")}>${div("3")}>${div("6")})$`,
    ),
    properties: ["opacity"],
    reason:
      "Two faded elements are caught mid-transition, with opacity 0.5 in one run and 0.499736 in the other.",
  },
  {
    routes: ["article"],
    pattern: /^body>div\[div\/div\/div\{dialog\}\]#0/,
    properties: ["cursor", "opacity", "transform", "width"],
    reason:
      "The idle dialog root holds a carousel whose slide position and button state settle differently each load.",
  },
]
