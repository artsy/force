import path from "path"

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
  consoleErrors: string[]
  elements: ElementSnapshot[]
}

export interface IgnoredPath {
  /** Limit the entry to one route name; omit to apply to every route. */
  route?: string
  /** Tested against each element path. Leave it unanchored at the end to match descendants too. */
  pattern: RegExp
  /** Ignore only these properties on matching elements; omit to skip the elements entirely. */
  properties?: string[]
  reason: string
}

export const IGNORED_PATHS: IgnoredPath[] = [
  {
    pattern:
      /header:nth-of-type\(1\)>div:nth-of-type\(1\)>a:nth-of-type\(1\)>div:nth-of-type\(1\)>div/,
    reason:
      "Mobile app banner rotates its messages on a timer, swapping opacity and position.",
  },
  {
    pattern:
      /li:nth-of-type\(\d+\)>a:nth-of-type\(1\)>div:nth-of-type\(2\)>div:nth-of-type\(1\)>div:nth-of-type\(1\)>div:nth-of-type\(2\)/,
    reason:
      "Rail artwork cards show a live save count beside the save button, and it arrives after a per-user query.",
  },
  {
    pattern: /^body>div:nth-of-type\((?!2\))\d+\)/,
    reason:
      "Portal roots beside the app root are appended in a different order on each load and hold hidden overlays.",
  },
  {
    route: "artist",
    pattern:
      /div:nth-of-type\(8\)>.*>a:nth-of-type\(1\)>div:nth-of-type\(1\)>div:nth-of-type\(1\)>div:nth-of-type\(2\)/,
    reason:
      "Artworks grid cards show the same late-arriving save count beside the save button.",
  },
  {
    route: "artist",
    pattern: /main:nth-of-type\(1\)>div:nth-of-type\(1\)>div:nth-of-type\(12\)/,
    reason:
      "The Highlights and Achievements section loads on scroll and settles in a different layout from run to run.",
  },
  {
    route: "artist",
    pattern:
      /^body>div:nth-of-type\(2\)(>div:nth-of-type\(1\)(>div:nth-of-type\(1\)(>div:nth-of-type\(2\)(>main:nth-of-type\(1\)(>div:nth-of-type\(1\))?)?)?)?)?$/,
    properties: ["height"],
    reason:
      "These ancestors of the Highlights section take its height, which varies from run to run.",
  },
  {
    route: "artist",
    pattern:
      /main:nth-of-type\(1\)>div:nth-of-type\(1\)>div:nth-of-type\((8|10)\)>div:nth-of-type\(1\)>div:nth-of-type\([27]\)/,
    properties: ["z-index"],
    reason:
      "Sticky filter and market-signal layers get a z-index that depends on mount order.",
  },
]
