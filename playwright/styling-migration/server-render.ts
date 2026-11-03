import fs from "fs"
import path from "path"
import { percentile } from "../../src/Utils/percentile"
import { OUTPUT_ROOT, ROUTES } from "./routes"

// Usage:
//   node -r @swc-node/register playwright/styling-migration/server-render.ts \
//     --a http://localhost:4000 --b http://localhost:4001 [--requests 30] [--warmup 3] [--routes home,artist] [--json out.json]
// --b is optional. Requests alternate between the sides so load drift hits both equally.

const DEFAULT_REQUESTS = 30
const DEFAULT_WARMUP = 3
const METRICS = ["render", "total"] as const

type Metric = (typeof METRICS)[number]
type Samples = Record<Metric, number[]>

interface Stats {
  median: number
  p90: number
  /** Samples behind the median and p90. */
  count: number
}

interface SideResult {
  render: Stats | null
  total: Stats | null
  /** Responses with an unexpected status (not 2xx; 404 for the 404 route), left out of the stats. */
  failedCount: number
}

interface Side {
  name: string
  baseUrl: string
}

interface RouteResult {
  route: string
  sides: Record<string, SideResult>
}

interface SideSamples extends Samples {
  failedCount: number
}

// The 404 page is not rendered by React, so it never reports `render`.
const ROUTES_WITHOUT_RENDER = ["404"]

const argValue = ({ args, flag }: { args: string[]; flag: string }) => {
  const value = args[args.indexOf(flag) + 1]
  if (args.indexOf(flag) === -1 || !value || value.startsWith("--")) {
    return undefined
  }
  return value
}

const parseArgs = () => {
  const args = process.argv.slice(2)
  const a = argValue({ args, flag: "--a" })
  const b = argValue({ args, flag: "--b" })
  if (!a) {
    console.error(
      "Usage: server-render.ts --a <url> [--b <url>] [--requests 30] [--warmup 3] [--routes home,artist] [--json file]",
    )
    process.exit(2)
  }
  const requests = Number(
    argValue({ args, flag: "--requests" }) ?? DEFAULT_REQUESTS,
  )
  const warmup = Number(argValue({ args, flag: "--warmup" }) ?? DEFAULT_WARMUP)
  if (
    !Number.isInteger(requests) ||
    requests < 1 ||
    !Number.isInteger(warmup) ||
    warmup < 0
  ) {
    console.error(
      "--requests must be a positive integer, --warmup a non-negative integer",
    )
    process.exit(2)
  }
  const routeNames = argValue({ args, flag: "--routes" })?.split(",")
  const sides: Side[] = [{ name: "a", baseUrl: a }]
  if (b) {
    sides.push({ name: "b", baseUrl: b })
  }
  return {
    sides,
    requests,
    warmup,
    routes: ROUTES.filter(route => {
      return !routeNames || routeNames.includes(route.name)
    }),
    jsonFile: argValue({ args, flag: "--json" }),
  }
}

export const parseServerTiming = (header: string | null) => {
  const timings: Partial<Record<Metric, number>> = {}
  ;(header ?? "").split(",").forEach(part => {
    const [name, ...params] = part.trim().split(";")
    const duration = params.find(param => param.trim().startsWith("dur="))
    if (!duration || !METRICS.includes(name as Metric)) {
      return
    }
    timings[name as Metric] = Number(duration.trim().slice("dur=".length))
  })
  return timings
}

const summarize = (values: number[]): Stats | null => {
  if (values.length === 0) {
    return null
  }
  return {
    median: percentile({ values, p: 0.5 }),
    p90: percentile({ values, p: 0.9 }),
    count: values.length,
  }
}

const isExpectedStatus = ({
  status,
  routeName,
}: {
  status: number
  routeName: string
}) => {
  if (routeName === "404") {
    return status === 404
  }
  return status >= 200 && status < 300
}

const withServerTiming = ({
  baseUrl,
  routePath,
}: {
  baseUrl: string
  routePath: string
}) => {
  const url = new URL(routePath, baseUrl)
  url.searchParams.set("serverTiming", "true")
  return url.toString()
}

const timeRequest = async (url: string) => {
  const response = await fetch(url, { redirect: "follow" })
  await response.arrayBuffer()
  return {
    status: response.status,
    timings: parseServerTiming(response.headers.get("server-timing")),
  }
}

const inSequence = async <T>(
  items: T[],
  task: (item: T) => Promise<void>,
): Promise<void> => {
  await items.reduce(async (previous, item) => {
    await previous
    await task(item)
  }, Promise.resolve())
}

const measureRoute = async ({
  sides,
  routeName,
  routePath,
  requests,
  warmup,
}: {
  sides: Side[]
  routeName: string
  routePath: string
  requests: number
  warmup: number
}) => {
  const samples: Record<string, SideSamples> = Object.fromEntries(
    sides.map(side => [side.name, { render: [], total: [], failedCount: 0 }]),
  )
  const rounds = Array.from({ length: warmup + requests }, (_, index) => index)

  await inSequence(rounds, async round => {
    // Swap who goes first each round.
    const offset = round % sides.length
    const ordered = [...sides.slice(offset), ...sides.slice(0, offset)]
    await inSequence(ordered, async side => {
      const { status, timings } = await timeRequest(
        withServerTiming({ baseUrl: side.baseUrl, routePath }),
      )
      if (round < warmup) {
        return
      }
      if (!isExpectedStatus({ status, routeName })) {
        samples[side.name].failedCount += 1
        return
      }
      METRICS.forEach(metric => {
        const value = timings[metric]
        if (value !== undefined) {
          samples[side.name][metric].push(value)
        }
      })
    })
  })

  return samples
}

const formatStats = (stats: Stats | null) => {
  if (!stats) {
    return "n/a".padStart(18)
  }
  return `${stats.median.toFixed(1)} / ${stats.p90.toFixed(1)}`.padStart(18)
}

const countsLabel = (result: SideResult) => {
  const renderCount = result.render?.count ?? 0
  const totalCount = result.total?.count ?? 0
  return `n render ${renderCount}, total ${totalCount}, bad status ${result.failedCount}`
}

const findWarnings = ({
  results,
  sides,
  requests,
}: {
  results: RouteResult[]
  sides: Side[]
  requests: number
}) => {
  return results.flatMap(({ route, sides: perSide }) => {
    return sides.flatMap(side => {
      const result = perSide[side.name]
      const warnings: string[] = []
      if (result.failedCount > 0) {
        warnings.push(
          `${route} (${side.name}): ${result.failedCount} responses with an unexpected status left out of the stats`,
        )
      }
      if (!ROUTES_WITHOUT_RENDER.includes(route) && !result.render) {
        warnings.push(
          `${route} (${side.name}): no "render" in Server-Timing (is ENABLE_SSR_STREAMING on, or is the server an old build?)`,
        )
      }
      const total = result.total?.count ?? 0
      if (total < requests && result.failedCount === 0) {
        warnings.push(
          `${route} (${side.name}): only ${total} of ${requests} responses had a "total" value`,
        )
      }
      return warnings
    })
  })
}

const printResults = ({
  results,
  sides,
  requests,
}: {
  results: RouteResult[]
  sides: Side[]
  requests: number
}) => {
  const header = ["route".padEnd(18)]
  sides.forEach(side => {
    METRICS.forEach(metric => {
      header.push(`${side.name} ${metric} med/p90`.padStart(18))
    })
  })
  console.log(header.join(""))
  results.forEach(({ route, sides: perSide }) => {
    const row = [route.padEnd(18)]
    sides.forEach(side => {
      METRICS.forEach(metric => {
        row.push(formatStats(perSide[side.name][metric]))
      })
    })
    console.log(row.join(""))
  })

  console.log("\nSamples per route and side:")
  results.forEach(({ route, sides: perSide }) => {
    sides.forEach(side => {
      console.log(
        `  ${route.padEnd(18)}${side.name}  ${countsLabel(perSide[side.name])}`,
      )
    })
  })

  console.log(
    "\nTimes are ms, from the Server-Timing header. p90 interpolates between ranks.",
  )
  const warnings = findWarnings({ results, sides, requests })
  warnings.forEach(warning => {
    console.warn(`WARN ${warning}`)
  })
}

const main = async () => {
  const { sides, requests, warmup, routes, jsonFile } = parseArgs()
  console.log(
    `${requests} requests per route (+${warmup} warmup), sides: ${sides
      .map(side => `${side.name}=${side.baseUrl}`)
      .join(" ")}\n`,
  )

  const results: RouteResult[] = []
  await inSequence(routes, async route => {
    const samples = await measureRoute({
      sides,
      routeName: route.name,
      routePath: route.path,
      requests,
      warmup,
    })
    results.push({
      route: route.name,
      sides: Object.fromEntries(
        sides.map(side => [
          side.name,
          {
            render: summarize(samples[side.name].render),
            total: summarize(samples[side.name].total),
            failedCount: samples[side.name].failedCount,
          },
        ]),
      ),
    })
  })

  printResults({ results, sides, requests })

  if (jsonFile) {
    const file = path.resolve(OUTPUT_ROOT, jsonFile)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(
      file,
      JSON.stringify({ requests, sides, results }, null, 2),
    )
    console.log(`Wrote ${file}`)
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error(error)
    process.exit(1)
  })
}
