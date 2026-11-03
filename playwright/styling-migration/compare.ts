import fs from "fs"
import path from "path"
import pixelmatch from "pixelmatch"
import { PNG } from "pngjs"
import {
  type CaptureData,
  IGNORED_PATHS,
  type IgnoredPath,
  OUTPUT_ROOT,
  ROUTES,
  THEMES,
  VIEWPORTS,
} from "./routes"

// Usage: node -r @swc-node/register playwright/styling-migration/compare.ts --a main-a --b main-b [--strict]
// Needs Node 22.12 or later: pixelmatch 7 is ESM-only and loads through require(esm).

const MAX_ROWS_PER_CAPTURE = 1000

// Pixel differences above this share of the page only warn. In A/A runs the stable routes stay at or
// below 0.03%; routes with live data (home, artist, auctions, collect) reach 3% to 35% from content shifts.
const PIXEL_WARN_RATIO = 0.005

type Status = "fail" | "warn" | "pass"
type Side = "a" | "b"

interface StyleDifference {
  path: string
  property: string
  a: string
  b: string
}

interface CaptureComparison {
  route: string
  variant: string
  missingSides: Side[]
  differences: StyleDifference[]
  onlyInA: string[]
  onlyInB: string[]
  hydrationErrorsA: string[]
  hydrationErrorsB: string[]
  isSettledA: boolean | null
  isSettledB: boolean | null
  pixelDiffRatio: number | null
  diffImage: string
  warnings: string[]
  status: Status
}

interface Args {
  a: string
  b: string
  isStrict: boolean
}

const parseArgs = (): Args => {
  const args = process.argv.slice(2)
  const argValue = (flag: string) => {
    const value = args[args.indexOf(flag) + 1]
    if (args.indexOf(flag) === -1 || !value || value.startsWith("--")) {
      return undefined
    }
    return value
  }
  const a = argValue("--a")
  const b = argValue("--b")
  if (!a || !b) {
    console.error("Usage: compare.ts --a <label> --b <label> [--strict]")
    process.exit(2)
  }
  return { a, b, isStrict: args.includes("--strict") }
}

const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

const readCapture = (file: string): CaptureData | null => {
  if (!fs.existsSync(file)) {
    return null
  }
  return JSON.parse(fs.readFileSync(file, "utf8"))
}

interface ElementKey {
  route: string
  elementPath: string
}

const matchingIgnores = ({ route, elementPath }: ElementKey): IgnoredPath[] => {
  return IGNORED_PATHS.filter(entry => {
    if (entry.routes && !entry.routes.includes(route)) {
      return false
    }
    return entry.pattern.test(elementPath)
  })
}

const isElementIgnored = (key: ElementKey): boolean => {
  return matchingIgnores(key).some(entry => !entry.properties)
}

const isUnmatchedIgnored = (key: ElementKey): boolean => {
  return matchingIgnores(key).some(entry => entry.ignoreUnmatched)
}

const ignoredProperties = (key: ElementKey): string[] => {
  return matchingIgnores(key).flatMap(entry => entry.properties ?? [])
}

// The production build reports hydration failures as minified React error codes.
const MINIFIED_HYDRATION_ERROR =
  /Minified React error #(418|419|421|422|423|424|425)\b/

const isHydrationError = (message: string): boolean => {
  return (
    message.includes("Hydration") ||
    message.includes("did not match") ||
    MINIFIED_HYDRATION_ERROR.test(message)
  )
}

const padToSize = ({
  image,
  width,
  height,
}: {
  image: PNG
  width: number
  height: number
}): PNG => {
  if (image.width === width && image.height === height) {
    return image
  }
  const padded = new PNG({ width, height })
  PNG.bitblt(image, padded, 0, 0, image.width, image.height, 0, 0)
  return padded
}

const diffScreenshots = ({
  fileA,
  fileB,
  diffFile,
}: {
  fileA: string
  fileB: string
  diffFile: string
}): number => {
  const imageA = PNG.sync.read(fs.readFileSync(fileA))
  const imageB = PNG.sync.read(fs.readFileSync(fileB))
  const width = Math.max(imageA.width, imageB.width)
  const height = Math.max(imageA.height, imageB.height)
  const paddedA = padToSize({ image: imageA, width, height })
  const paddedB = padToSize({ image: imageB, width, height })
  const diff = new PNG({ width, height })
  const mismatched = pixelmatch(
    paddedA.data,
    paddedB.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 },
  )
  fs.mkdirSync(path.dirname(diffFile), { recursive: true })
  fs.writeFileSync(diffFile, PNG.sync.write(diff))
  return mismatched / (width * height)
}

const compareElements = ({
  route,
  dataA,
  dataB,
}: {
  route: string
  dataA: CaptureData
  dataB: CaptureData
}): Pick<CaptureComparison, "differences" | "onlyInA" | "onlyInB"> => {
  const keep = (elementPath: string) => {
    return !isElementIgnored({ route, elementPath })
  }
  const isReportable = (elementPath: string) => {
    return !isUnmatchedIgnored({ route, elementPath })
  }
  const elementsA = new Map(
    dataA.elements.filter(e => keep(e.path)).map(e => [e.path, e.styles]),
  )
  const elementsB = new Map(
    dataB.elements.filter(e => keep(e.path)).map(e => [e.path, e.styles]),
  )

  const differences = Array.from(elementsA).flatMap(
    ([elementPath, stylesA]) => {
      const stylesB = elementsB.get(elementPath)
      if (!stylesB) {
        return []
      }
      const skipped = ignoredProperties({ route, elementPath })
      return Object.keys(stylesA)
        .filter(property => !skipped.includes(property))
        .filter(property => stylesA[property] !== stylesB[property])
        .map(property => ({
          path: elementPath,
          property,
          a: stylesA[property],
          b: stylesB[property],
        }))
    },
  )

  return {
    differences,
    onlyInA: Array.from(elementsA.keys()).filter(
      p => !elementsB.has(p) && isReportable(p),
    ),
    onlyInB: Array.from(elementsB.keys()).filter(
      p => !elementsA.has(p) && isReportable(p),
    ),
  }
}

const getWarnings = ({
  hydrationErrorsA,
  hydrationErrorsB,
  pixelDiffRatio,
}: Pick<
  CaptureComparison,
  "hydrationErrorsA" | "hydrationErrorsB" | "pixelDiffRatio"
>): string[] => {
  const warnings: string[] = []
  if (hydrationErrorsB.length > hydrationErrorsA.length) {
    warnings.push(
      `hydration errors ${hydrationErrorsA.length} -> ${hydrationErrorsB.length}`,
    )
  }
  if (pixelDiffRatio !== null && pixelDiffRatio > PIXEL_WARN_RATIO) {
    warnings.push(`${(pixelDiffRatio * 100).toFixed(1)}% of pixels differ`)
  }
  return warnings
}

const getStatus = ({
  missingSides,
  differences,
  onlyInA,
  onlyInB,
  warnings,
}: Pick<
  CaptureComparison,
  "missingSides" | "differences" | "onlyInA" | "onlyInB" | "warnings"
>): Status => {
  const hasFailure =
    missingSides.length > 0 ||
    differences.length > 0 ||
    onlyInA.length > 0 ||
    onlyInB.length > 0
  if (hasFailure) {
    return "fail"
  }
  return warnings.length > 0 ? "warn" : "pass"
}

const compareCapture = ({
  a,
  b,
  route,
  variant,
}: {
  a: string
  b: string
  route: string
  variant: string
}): CaptureComparison => {
  const file = ({ label, extension }: { label: string; extension: string }) => {
    return path.join(OUTPUT_ROOT, label, route, `${variant}.${extension}`)
  }
  const dataA = readCapture(file({ label: a, extension: "json" }))
  const dataB = readCapture(file({ label: b, extension: "json" }))
  const hasPngA = fs.existsSync(file({ label: a, extension: "png" }))
  const hasPngB = fs.existsSync(file({ label: b, extension: "png" }))

  const missingSides: Side[] = []
  if (!dataA || !hasPngA) {
    missingSides.push("a")
  }
  if (!dataB || !hasPngB) {
    missingSides.push("b")
  }

  const diffImage = path.join(`diff-${a}-vs-${b}`, route, `${variant}.png`)
  const base = {
    route,
    variant,
    missingSides,
    diffImage,
    isSettledA: dataA?.settled ?? null,
    isSettledB: dataB?.settled ?? null,
  }
  if (!dataA || !dataB || missingSides.length > 0) {
    return {
      ...base,
      differences: [],
      onlyInA: [],
      onlyInB: [],
      hydrationErrorsA: [],
      hydrationErrorsB: [],
      pixelDiffRatio: null,
      warnings: [],
      status: "fail",
    }
  }

  const elements = compareElements({ route, dataA, dataB })
  const hydrationErrorsA = dataA.consoleErrors.filter(isHydrationError)
  const hydrationErrorsB = dataB.consoleErrors.filter(isHydrationError)
  const pixelDiffRatio = diffScreenshots({
    fileA: file({ label: a, extension: "png" }),
    fileB: file({ label: b, extension: "png" }),
    diffFile: path.join(OUTPUT_ROOT, diffImage),
  })
  const warnings = getWarnings({
    hydrationErrorsA,
    hydrationErrorsB,
    pixelDiffRatio,
  })
  return {
    ...base,
    ...elements,
    hydrationErrorsA,
    hydrationErrorsB,
    pixelDiffRatio,
    warnings,
    status: getStatus({ missingSides, ...elements, warnings }),
  }
}

const describeMissing = ({
  comparison,
  a,
  b,
}: {
  comparison: CaptureComparison
  a: string
  b: string
}): string => {
  const labels = comparison.missingSides.map(side => (side === "a" ? a : b))
  return `missing capture in ${labels.join(" and ")}`
}

const describeComparison = ({
  comparison,
  a,
  b,
}: {
  comparison: CaptureComparison
  a: string
  b: string
}): string => {
  if (comparison.missingSides.length > 0) {
    return describeMissing({ comparison, a, b })
  }
  const unmatched = comparison.onlyInA.length + comparison.onlyInB.length
  const parts = [
    `${comparison.differences.length} style differences`,
    `${unmatched} unmatched paths`,
    ...comparison.warnings,
  ]
  return parts.join(", ")
}

const renderImage = ({
  src,
  alt,
}: {
  src: string | null
  alt: string
}): string => {
  if (!src) {
    return `<div class="missing">${escapeHtml(alt)}: none</div>`
  }
  return `<a href="${encodeURI(src)}"><img loading="lazy" src="${encodeURI(src)}" alt="${escapeHtml(alt)}"></a>`
}

const renderRows = (rows: string[][]): string => {
  return rows
    .map(cells => {
      return `<tr>${cells.map(cell => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`
    })
    .join("")
}

const countMessages = (messages: string[]): string[][] => {
  const counts = messages.reduce((result, message) => {
    return result.set(message, (result.get(message) ?? 0) + 1)
  }, new Map<string, number>())
  return Array.from(counts).map(([message, count]) => [`${count}x`, message])
}

const renderSettledNote = ({
  comparison,
  a,
  b,
}: {
  comparison: CaptureComparison
  a: string
  b: string
}): string => {
  const unsettled = [
    comparison.isSettledA === false ? a : null,
    comparison.isSettledB === false ? b : null,
  ].filter(Boolean)
  if (unsettled.length === 0) {
    return ""
  }
  return `<p class="unsettled">Not settled in ${escapeHtml(unsettled.join(" and "))}: a wait step timed out, so differences here may come from timing.</p>`
}

const renderComparison = ({
  comparison,
  a,
  b,
}: {
  comparison: CaptureComparison
  a: string
  b: string
}): string => {
  const { route, variant, differences, onlyInA, onlyInB } = comparison
  const base = `${route}/${variant}`
  const pixels =
    comparison.pixelDiffRatio === null
      ? "n/a"
      : `${(comparison.pixelDiffRatio * 100).toFixed(2)}%`
  const hydration = [
    ...countMessages(comparison.hydrationErrorsA).map(row => [a, ...row]),
    ...countMessages(comparison.hydrationErrorsB).map(row => [b, ...row]),
  ]
  const hasA = !comparison.missingSides.includes("a")
  const hasB = !comparison.missingSides.includes("b")
  const hasDiff = comparison.pixelDiffRatio !== null

  const styleTable = differences.length
    ? `<table><thead><tr><th>Path</th><th>Property</th><th>${escapeHtml(a)}</th><th>${escapeHtml(b)}</th></tr></thead><tbody>${renderRows(
        differences
          .slice(0, MAX_ROWS_PER_CAPTURE)
          .map(d => [d.path, d.property, d.a, d.b]),
      )}</tbody></table>${
        differences.length > MAX_ROWS_PER_CAPTURE
          ? `<p>Showing ${MAX_ROWS_PER_CAPTURE} of ${differences.length} differences.</p>`
          : ""
      }`
    : ""

  const missingTable =
    onlyInA.length + onlyInB.length > 0
      ? `<table><thead><tr><th>Path</th><th>Only in</th></tr></thead><tbody>${renderRows(
          [...onlyInA.map(p => [p, a]), ...onlyInB.map(p => [p, b])].slice(
            0,
            MAX_ROWS_PER_CAPTURE,
          ),
        )}</tbody></table>`
      : ""

  const hydrationTable = hydration.length
    ? `<h4>Hydration errors</h4><table><tbody>${renderRows(hydration)}</tbody></table>`
    : ""

  return `<details class="${comparison.status}">
<summary><strong>${escapeHtml(base)}</strong> ${escapeHtml(describeComparison({ comparison, a, b }))}, ${pixels} pixels differ, hydration errors ${comparison.hydrationErrorsA.length} in ${escapeHtml(a)}, ${comparison.hydrationErrorsB.length} in ${escapeHtml(b)}</summary>
${renderSettledNote({ comparison, a, b })}
<div class="shots">
<figure><figcaption>${escapeHtml(a)}</figcaption>${renderImage({ src: hasA ? `${a}/${base}.png` : null, alt: a })}</figure>
<figure><figcaption>${escapeHtml(b)}</figcaption>${renderImage({ src: hasB ? `${b}/${base}.png` : null, alt: b })}</figure>
<figure><figcaption>diff</figcaption>${renderImage({ src: hasDiff ? comparison.diffImage : null, alt: "diff" })}</figure>
</div>
${styleTable}${missingTable}${hydrationTable}
</details>`
}

const STATUS_ORDER: Status[] = ["fail", "warn", "pass"]

const renderReport = ({
  comparisons,
  a,
  b,
}: {
  comparisons: CaptureComparison[]
  a: string
  b: string
}): string => {
  const ordered = STATUS_ORDER.flatMap(status => {
    return comparisons.filter(comparison => comparison.status === status)
  })
  const count = (status: Status) => {
    return comparisons.filter(comparison => comparison.status === status).length
  }
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${escapeHtml(a)} vs ${escapeHtml(b)}</title>
<style>
body { font: 14px/1.4 system-ui, sans-serif; margin: 24px; }
details { border: 1px solid #ccc; border-left-width: 6px; margin: 6px 0; padding: 6px 10px; }
details.fail { border-left-color: #c62828; }
details.warn { border-left-color: #ef6c00; }
details.pass { border-left-color: #2e7d32; }
.shots { display: flex; gap: 12px; align-items: flex-start; margin: 10px 0; }
.shots figure { flex: 1; margin: 0; min-width: 0; }
.shots img { width: 100%; border: 1px solid #ddd; }
table { border-collapse: collapse; width: 100%; margin: 8px 0; font: 12px ui-monospace, monospace; }
td, th { border: 1px solid #ddd; padding: 2px 6px; text-align: left; word-break: break-all; }
.missing { color: #888; }
.unsettled { color: #ef6c00; }
</style></head><body>
<h1>${escapeHtml(a)} vs ${escapeHtml(b)}</h1>
<p>${comparisons.length} captures: ${count("fail")} fail (style, path or missing), ${count("warn")} warn (hydration errors or pixel diff above ${PIXEL_WARN_RATIO * 100}%), ${count("pass")} pass.</p>
${ordered.map(comparison => renderComparison({ comparison, a, b })).join("\n")}
</body></html>`
}

const main = (): void => {
  const { a, b, isStrict } = parseArgs()
  const variants = VIEWPORTS.flatMap(viewport => {
    return THEMES.map(theme => `${viewport.name}-${theme}`)
  })

  const comparisons = ROUTES.flatMap(route => {
    return variants.map(variant => {
      return compareCapture({ a, b, route: route.name, variant })
    })
  })

  const reportFile = path.join(OUTPUT_ROOT, `report-${a}-vs-${b}.html`)
  fs.writeFileSync(reportFile, renderReport({ comparisons, a, b }))

  const withStatus = (status: Status) => {
    return comparisons.filter(comparison => comparison.status === status)
  }
  const print = ({ prefix, status }: { prefix: string; status: Status }) => {
    withStatus(status).forEach(comparison => {
      const description = describeComparison({ comparison, a, b })
      console.log(
        `${prefix} ${comparison.route}/${comparison.variant}: ${description}`,
      )
    })
  }
  print({ prefix: "FAIL", status: "fail" })
  print({ prefix: "WARN", status: "warn" })

  const compared = comparisons.filter(c => c.missingSides.length === 0)
  const maxPixelRatio = Math.max(0, ...compared.map(c => c.pixelDiffRatio ?? 0))
  const failCount = withStatus("fail").length
  const warnCount = withStatus("warn").length
  console.log(
    `${comparisons.length} captures, ${compared.length} compared, ${failCount} fail, ${warnCount} warn. Max pixel diff ${(maxPixelRatio * 100).toFixed(2)}%. Report: ${reportFile}`,
  )

  if (compared.length === 0) {
    console.error("No captures were compared.")
    process.exit(1)
  }
  const shouldFail = failCount > 0 || (isStrict && warnCount > 0)
  process.exit(shouldFail ? 1 : 0)
}

main()
