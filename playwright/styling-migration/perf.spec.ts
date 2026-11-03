import fs from "fs"
import path from "path"
import { type Browser, devices, test } from "@playwright/test"
import { BASE_URL, OUTPUT_ROOT, ROUTES } from "./routes"

// Usage (one server):
//   PERF_LABEL=main PLAYWRIGHT_BASE_URL=http://localhost:4000 \
//     yarn playwright test -c playwright.styling-perf.config.ts
// Usage (two servers, runs interleaved in one process):
//   PERF_TARGETS=main=http://localhost:4000,branch=http://localhost:4001 \
//     yarn playwright test -c playwright.styling-perf.config.ts
// PERF_RUNS (default 15) sets runs per route; PERF_ROUTES=home,artist limits routes.

interface PerfRecord {
  route: string
  run: number
  fcp: number
  lcp: number
  tbt: number
  appReady: number
  cssRules: number
  htmlBytes: number
  cssBytes: number
  jsBytes: number
}

interface PerfTarget {
  label: string
  baseUrl: string
}

interface PagePerf {
  fcp: number | null
  lcp: number | null
  appReady: number | null
  longTasks: { startTime: number; duration: number }[]
  cssRules: number
  htmlBytes: number
  cssBytes: number
  jsBytes: number
}

// The 404 page is not hydrated, so its route sets its own readySelector in routes.ts.
const APP_READY_SELECTOR = 'body[data-test="AppReady"]'
const CPU_THROTTLE_RATE = 4
const LONG_TASK_BLOCKING_THRESHOLD_MS = 50
const APP_READY_TIMEOUT_MS = 60000
// LCP can still move after the app is ready; images fade in late.
const LCP_SETTLE_MS = 3000

const parseRuns = (): number => {
  const runs = Number(process.env.PERF_RUNS ?? 15)
  if (!Number.isInteger(runs) || runs < 1) {
    throw new Error(`PERF_RUNS must be a positive integer, got ${runs}`)
  }
  return runs
}

const parseTargets = (): PerfTarget[] => {
  const raw = process.env.PERF_TARGETS
  if (raw) {
    return raw.split(",").map(entry => {
      const separator = entry.indexOf("=")
      return {
        label: entry.slice(0, separator),
        baseUrl: entry.slice(separator + 1),
      }
    })
  }
  const label = process.env.PERF_LABEL
  if (!label) {
    throw new Error("Set PERF_LABEL (or PERF_TARGETS=label=url,label=url).")
  }
  return [{ label, baseUrl: BASE_URL }]
}

const perfFile = (label: string) => {
  return path.join(OUTPUT_ROOT, label, "perf.json")
}

const readRecords = (label: string): PerfRecord[] => {
  const file = perfFile(label)
  if (!fs.existsSync(file)) {
    return []
  }
  return JSON.parse(fs.readFileSync(file, "utf8"))
}

// Each test reads and rewrites the file so a worker restart after a failure loses nothing.
const appendRecord = ({
  label,
  record,
}: {
  label: string
  record: PerfRecord
}) => {
  fs.mkdirSync(path.dirname(perfFile(label)), { recursive: true })
  fs.writeFileSync(
    perfFile(label),
    JSON.stringify([...readRecords(label), record], null, 2),
  )
}

const RUNS = parseRuns()
const TARGETS = parseTargets()
const SELECTED_ROUTES = process.env.PERF_ROUTES?.split(",")
const ROUTES_TO_MEASURE = ROUTES.filter(route => {
  return !SELECTED_ROUTES || SELECTED_ROUTES.includes(route.name)
})

// The main process loads this file before it starts workers, so only it clears old results.
if (!process.env.PERF_RUN_ID) {
  process.env.PERF_RUN_ID = String(Date.now())
  TARGETS.forEach(({ label }) => {
    if (fs.existsSync(perfFile(label))) {
      fs.unlinkSync(perfFile(label))
    }
  })
}

// Runs in the page before any app code.
const installProbes = (readySelector: string) => {
  const perf = {
    fcp: null as number | null,
    lcp: null as number | null,
    appReady: null as number | null,
    longTasks: [] as { startTime: number; duration: number }[],
  }
  ;(window as any).__perf = perf

  performance.setResourceTimingBufferSize(2000)

  const observe = ({
    type,
    onEntry,
  }: {
    type: string
    onEntry: (entry: PerformanceEntry) => void
  }) => {
    new PerformanceObserver(list => {
      list.getEntries().forEach(onEntry)
    }).observe({ type, buffered: true })
  }

  observe({
    type: "paint",
    onEntry: entry => {
      if (entry.name === "first-contentful-paint") {
        perf.fcp = entry.startTime
      }
    },
  })
  observe({
    type: "largest-contentful-paint",
    onEntry: entry => {
      perf.lcp = entry.startTime
    },
  })
  observe({
    type: "longtask",
    onEntry: entry => {
      perf.longTasks.push({
        startTime: entry.startTime,
        duration: entry.duration,
      })
    },
  })

  const markAppReady = () => {
    if (perf.appReady === null && document.querySelector(readySelector)) {
      perf.appReady = performance.now()
    }
  }
  new MutationObserver(markAppReady).observe(document, {
    attributes: true,
    attributeFilter: ["data-test", "data-testid"],
    childList: true,
    subtree: true,
  })
}

const readPage = (): Omit<
  PagePerf,
  "fcp" | "lcp" | "appReady" | "longTasks"
> => {
  const countRules = (rules: CSSRuleList): number => {
    return Array.from(rules).reduce((total, rule) => {
      const nested = "cssRules" in rule ? countRules((rule as any).cssRules) : 0
      return total + 1 + nested
    }, 0)
  }

  const cssRules = Array.from(document.styleSheets).reduce((total, sheet) => {
    try {
      return total + countRules(sheet.cssRules)
    } catch {
      return total
    }
  }, 0)

  const extensionOf = (url: string) => {
    const pathname = new URL(url, location.href).pathname
    return pathname.slice(pathname.lastIndexOf(".") + 1).toLowerCase()
  }
  const kindOf = (entry: PerformanceResourceTiming) => {
    const extension = extensionOf(entry.name)
    if (extension === "js" || extension === "mjs") {
      return "js"
    }
    if (extension === "css") {
      return "css"
    }
    return entry.initiatorType === "script" ? "js" : "other"
  }
  const bytesOf = (kind: string) => {
    const resources = performance.getEntriesByType(
      "resource",
    ) as PerformanceResourceTiming[]
    return resources
      .filter(entry => kindOf(entry) === kind)
      .reduce((total, entry) => total + entry.encodedBodySize, 0)
  }

  const [navigation] = performance.getEntriesByType(
    "navigation",
  ) as PerformanceNavigationTiming[]

  return {
    cssRules,
    htmlBytes: navigation?.encodedBodySize ?? 0,
    cssBytes: bytesOf("css"),
    jsBytes: bytesOf("js"),
  }
}

const roundMs = (value: number) => Math.round(value * 10) / 10

const measureRoute = async ({
  browser,
  baseUrl,
  routePath,
  readySelector,
  run,
}: {
  browser: Browser
  baseUrl: string
  routePath: string
  readySelector: string
  run: number
}): Promise<Omit<PerfRecord, "route">> => {
  const context = await browser.newContext({
    ...devices["Desktop Chrome"],
    locale: "en-US",
    timezoneId: "America/New_York",
  })

  try {
    const page = await context.newPage()
    const client = await context.newCDPSession(page)
    await client.send("Network.enable")
    await client.send("Network.setCacheDisabled", { cacheDisabled: true })
    await client.send("Emulation.setCPUThrottlingRate", {
      rate: CPU_THROTTLE_RATE,
    })
    await page.addInitScript(installProbes, readySelector)

    await page.goto(new URL(routePath, baseUrl).toString(), {
      waitUntil: "commit",
    })
    await page.waitForSelector(readySelector, {
      state: "attached",
      timeout: APP_READY_TIMEOUT_MS,
    })
    await page.waitForTimeout(LCP_SETTLE_MS)

    const perf = await page.evaluate(() => (window as any).__perf)
    const sizes = await page.evaluate(readPage)
    const { fcp, lcp, appReady, longTasks } = perf as Pick<
      PagePerf,
      "fcp" | "lcp" | "appReady" | "longTasks"
    >

    if (fcp === null || lcp === null || appReady === null) {
      throw new Error(
        `Missing metric (fcp=${fcp}, lcp=${lcp}, appReady=${appReady}) on ${routePath}, run ${run}`,
      )
    }

    const tbt = longTasks
      .filter(task => task.startTime >= fcp && task.startTime < appReady)
      .reduce((total, task) => {
        return total + (task.duration - LONG_TASK_BLOCKING_THRESHOLD_MS)
      }, 0)

    return {
      run,
      fcp: roundMs(fcp),
      lcp: roundMs(lcp),
      tbt: roundMs(tbt),
      appReady: roundMs(appReady),
      ...sizes,
    }
  } finally {
    await context.close()
  }
}

test.describe("styling migration perf", () => {
  test.setTimeout(APP_READY_TIMEOUT_MS * TARGETS.length + 60000)

  Array.from({ length: RUNS }, (_, index) => index + 1).forEach(run => {
    ROUTES_TO_MEASURE.forEach(route => {
      test(`${route.name} run ${run}`, async ({ browser }) => {
        // Rotate the order so no target always goes first.
        const offset = run % TARGETS.length
        const ordered = [...TARGETS.slice(offset), ...TARGETS.slice(0, offset)]

        // Targets run one after another: parallel loads would skew the timings.
        await ordered.reduce(async (previous, { label, baseUrl }) => {
          await previous
          const record = await measureRoute({
            browser,
            baseUrl,
            routePath: route.path,
            readySelector: route.readySelector ?? APP_READY_SELECTOR,
            run,
          })
          appendRecord({ label, record: { route: route.name, ...record } })
        }, Promise.resolve())
      })
    })
  })
})
