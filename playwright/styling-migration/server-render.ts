import fs from "fs"
import path from "path"
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
}

interface Side {
  name: string
  baseUrl: string
}

interface RouteResult {
  route: string
  sides: Record<string, Record<Metric, Stats | null>>
}

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
    !Number.isInteger(warmup)
  ) {
    console.error("--requests must be a positive integer, --warmup an integer")
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

const percentile = ({ sorted, p }: { sorted: number[]; p: number }) => {
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))]
}

const summarize = (values: number[]): Stats | null => {
  if (values.length === 0) {
    return null
  }
  const sorted = [...values].sort((x, y) => x - y)
  return {
    median: percentile({ sorted, p: 0.5 }),
    p90: percentile({ sorted, p: 0.9 }),
  }
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
  return parseServerTiming(response.headers.get("server-timing"))
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
  routePath,
  requests,
  warmup,
}: {
  sides: Side[]
  routePath: string
  requests: number
  warmup: number
}) => {
  const samples: Record<string, Samples> = Object.fromEntries(
    sides.map(side => [side.name, { render: [], total: [] }]),
  )
  const rounds = Array.from({ length: warmup + requests }, (_, index) => index)

  await inSequence(rounds, async round => {
    // Swap who goes first each round.
    const offset = round % sides.length
    const ordered = [...sides.slice(offset), ...sides.slice(0, offset)]
    await inSequence(ordered, async side => {
      const timings = await timeRequest(
        withServerTiming({ baseUrl: side.baseUrl, routePath }),
      )
      if (round < warmup) {
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

const printResults = ({
  results,
  sides,
}: {
  results: RouteResult[]
  sides: Side[]
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
  console.log("\nTimes are ms, from the Server-Timing header.")
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
          },
        ]),
      ),
    })
  })

  printResults({ results, sides })

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
