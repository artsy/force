// Usage: NODE_ENV=production node -r @swc-node/register playwright/styling-migration/render-bench.ts [--runs 30]
// Renders ~2,000-element trees with whichever @artsy/palette is installed, as a string (SSR) and
// into a jsdom root (CSR). The "Sprinkles-style" rows are a stand-in for a class-per-prop Box, not Palette.

import fs from "fs"
import path from "path"
import { JSDOM } from "jsdom"
import { percentile } from "../../src/Utils/percentile"

const dom = new JSDOM(
  "<!doctype html><html><head></head><body><div id=root></div></body></html>",
)
// Do not assign navigator: Node defines it as a getter and the write throws.
Object.assign(global, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
})

const React = require("react")
const { renderToString } = require("react-dom/server")
const { createRoot } = require("react-dom/client")
const { flushSync } = require("react-dom")
const { ServerStyleSheet } = require("styled-components")
const { Theme, Box, Flex, Text, Spacer, Separator } = require("@artsy/palette")

const h = React.createElement
const ELEMENT_COUNT = 2000
const TEXT_VARIANTS = ["sm", "md", "lg", "xs"]
const BREAKPOINT_PREFIXES = ["", "md-"]
const WARMUP_RUNS = 5
const DEFAULT_RUNS = 30

type Component = unknown

const indexes = (count: number) => Array.from({ length: count }, (_, i) => i)

const CLASS_MAP = new Map<string, string>()
const classFor = ({
  prop,
  value,
  breakpoint,
}: {
  prop: string
  value: unknown
  breakpoint: string
}) => {
  const key = `${breakpoint}${prop}:${value}`
  const existing = CLASS_MAP.get(key)
  if (existing) {
    return existing
  }
  const created = `s${CLASS_MAP.size}`
  CLASS_MAP.set(key, created)
  return created
}

const SprinklesBox = ({ as = "div", children, ...props }: any) => {
  const classes = Object.keys(props).flatMap(prop => {
    const value = props[prop]
    if (!Array.isArray(value)) {
      return [classFor({ prop, value, breakpoint: "" })]
    }
    return value.map((entry, i) => {
      return classFor({
        prop,
        value: entry,
        breakpoint: BREAKPOINT_PREFIXES[i] || "",
      })
    })
  })
  return h(as, { className: classes.join(" ") }, children)
}
const SprinklesFlex = (props: any) => {
  return h(SprinklesBox, { display: "flex", ...props })
}
const SprinklesText = ({ variant, ...props }: any) => {
  return h(SprinklesBox, { textVariant: variant, ...props })
}
const SprinklesSpacer = ({ y }: { y: number }) => {
  return h(SprinklesBox, { height: y })
}
const SprinklesSeparator = () => {
  return h(SprinklesBox, { as: "hr", borderColor: "mono10" })
}
const Passthrough = ({ children }: any) => {
  return children
}

interface Kit {
  Wrap: Component
  Box: Component
  Flex: Component
  Text: Component
  Spacer: Component
  Separator: Component
}

const PALETTE: Kit = { Wrap: Theme, Box, Flex, Text, Spacer, Separator }
const SPRINKLES: Kit = {
  Wrap: Passthrough,
  Box: SprinklesBox,
  Flex: SprinklesFlex,
  Text: SprinklesText,
  Spacer: SprinklesSpacer,
  Separator: SprinklesSeparator,
}

// Four elements per row.
const mixedTree = (kit: Kit) => {
  return h(
    kit.Wrap,
    null,
    h(
      kit.Box,
      null,
      indexes(ELEMENT_COUNT / 4).map(i => {
        return h(
          kit.Flex,
          {
            key: i,
            flexDirection: ["column", "row"],
            alignItems: "center",
            mt: i % 4,
            px: [1, 2],
          },
          h(
            kit.Box,
            { width: ["100%", "50%"], mb: 1, display: ["none", "block"] },
            h(
              kit.Text,
              { variant: TEXT_VARIANTS[i % 4], color: "mono60" },
              `Artist ${i}`,
            ),
          ),
          h(
            kit.Text,
            { variant: ["xs", "sm"], fontWeight: "bold" },
            `Lot ${i}`,
          ),
        )
      }),
    ),
  )
}

// Two elements per row: a text line and the filler under test.
const fillerTree = ({ kit, filler }: { kit: Kit; filler: Component }) => {
  return h(
    kit.Wrap,
    null,
    h(
      kit.Box,
      null,
      indexes(ELEMENT_COUNT / 2).map(i => {
        return h(
          React.Fragment,
          { key: i },
          h(kit.Text, { variant: "sm" }, `Row ${i}`),
          filler === kit.Spacer ? h(kit.Spacer, { y: 2 }) : h(filler),
        )
      }),
    ),
  )
}

// The package's exports map may hide ./package.json, so walk up from the resolved entry file.
const installedPaletteInfo = () => {
  const findPackageJson = (directory: string): string => {
    const candidate = path.join(directory, "package.json")
    if (
      fs.existsSync(candidate) &&
      JSON.parse(fs.readFileSync(candidate, "utf8")).name === "@artsy/palette"
    ) {
      return candidate
    }
    const parent = path.dirname(directory)
    if (parent === directory) {
      throw new Error("Could not find the @artsy/palette package.json")
    }
    return findPackageJson(parent)
  }
  const packageJson = findPackageJson(
    path.dirname(require.resolve("@artsy/palette")),
  )
  const { version } = JSON.parse(fs.readFileSync(packageJson, "utf8"))
  return { version, directory: path.dirname(fs.realpathSync(packageJson)) }
}

const time = ({
  label,
  fn,
  runs,
}: {
  label: string
  fn: () => void
  runs: number
}) => {
  indexes(WARMUP_RUNS).forEach(fn)
  const samples = indexes(runs).map(() => {
    const start = process.hrtime.bigint()
    fn()
    return Number(process.hrtime.bigint() - start) / 1e6
  })
  const median = percentile({ values: samples, p: 0.5 })
  const p90 = percentile({ values: samples, p: 0.9 })
  console.log(
    `${label.padEnd(44)} median ${median.toFixed(1)} ms   p90 ${p90.toFixed(1)} ms   (n=${runs})`,
  )
}

const ssrPalette = (make: () => unknown) => () => {
  const sheet = new ServerStyleSheet()
  try {
    renderToString(sheet.collectStyles(make()))
    sheet.getStyleTags()
  } finally {
    sheet.seal()
  }
}
const ssrPlain = (make: () => unknown) => () => {
  renderToString(make())
}
const mount = (make: () => unknown) => () => {
  const element = document.createElement("div")
  const root = createRoot(element)
  flushSync(() => {
    root.render(make())
  })
  root.unmount()
}

const argRuns = () => {
  const args = process.argv.slice(2)
  const index = args.indexOf("--runs")
  return index === -1 ? DEFAULT_RUNS : Number(args[index + 1])
}

const main = () => {
  const runs = argRuns()
  const csrRuns = Math.max(3, Math.floor(runs / 2))
  const trees: {
    name: string
    palette: () => unknown
    sprinkles: () => unknown
  }[] = [
    {
      name: "mixed",
      palette: () => mixedTree(PALETTE),
      sprinkles: () => mixedTree(SPRINKLES),
    },
    {
      name: "spacer-heavy",
      palette: () => fillerTree({ kit: PALETTE, filler: Spacer }),
      sprinkles: () => fillerTree({ kit: SPRINKLES, filler: SPRINKLES.Spacer }),
    },
    {
      name: "separator-heavy",
      palette: () => fillerTree({ kit: PALETTE, filler: Separator }),
      sprinkles: () =>
        fillerTree({ kit: SPRINKLES, filler: SPRINKLES.Separator }),
    },
  ]

  const installed = installedPaletteInfo()
  console.log(`@artsy/palette ${installed.version} from ${installed.directory}`)
  console.log(
    `${ELEMENT_COUNT} elements per render, NODE_ENV=${process.env.NODE_ENV}, runs=${runs} (CSR ${csrRuns})`,
  )
  trees.forEach(({ name, palette, sprinkles }) => {
    console.log(`\n${name}`)
    time({ label: "SSR  installed Palette", fn: ssrPalette(palette), runs })
    time({
      label: "SSR  Sprinkles-style stand-in",
      fn: ssrPlain(sprinkles),
      runs,
    })
    time({ label: "CSR  installed Palette", fn: mount(palette), runs: csrRuns })
    time({
      label: "CSR  Sprinkles-style stand-in",
      fn: mount(sprinkles),
      runs: csrRuns,
    })
  })
}

main()
