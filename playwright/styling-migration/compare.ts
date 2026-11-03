import fs from "fs"
import path from "path"
import pixelmatch from "pixelmatch"
import { PNG } from "pngjs"
import {
  type CaptureData,
  IGNORED_PATHS,
  type IgnoredPath,
  OUTPUT_ROOT,
  THEMES,
  VIEWPORTS,
} from "./routes"

// Usage: node -r @swc-node/register playwright/styling-migration/compare.ts --a main-a --b main-b

const MAX_ROWS_PER_CAPTURE = 1000

interface StyleDifference {
  path: string
  property: string
  a: string
  b: string
}

interface CaptureComparison {
  route: string
  variant: string
  isMissing: "a" | "b" | null
  differences: StyleDifference[]
  onlyInA: string[]
  onlyInB: string[]
  hydrationErrorsA: string[]
  hydrationErrorsB: string[]
  pixelDiffRatio: number | null
  diffImage: string | null
}

const parseArgs = (): { a: string; b: string } => {
  const args = process.argv.slice(2)
  const argValue = (flag: string) => args[args.indexOf(flag) + 1]
  const a = argValue("--a")
  const b = argValue("--b")
  if (!a || !b) {
    console.error("Usage: compare.ts --a <label> --b <label>")
    process.exit(2)
  }
  return { a, b }
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

const matchingIgnores = ({
  route,
  elementPath,
}: {
  route: string
  elementPath: string
}): IgnoredPath[] => {
  return IGNORED_PATHS.filter(entry => {
    if (entry.route && entry.route !== route) {
      return false
    }
    return entry.pattern.test(elementPath)
  })
}

const isElementIgnored = ({
  route,
  elementPath,
}: {
  route: string
  elementPath: string
}): boolean => {
  return matchingIgnores({ route, elementPath }).some(
    entry => !entry.properties,
  )
}

const ignoredProperties = ({
  route,
  elementPath,
}: {
  route: string
  elementPath: string
}): string[] => {
  return matchingIgnores({ route, elementPath }).flatMap(entry => {
    return entry.properties ?? []
  })
}

// The production build reports hydration failures as minified React error codes.
const MINIFIED_HYDRATION_ERROR = /Minified React error #(418|419|422|423|425)\b/

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
}): number | null => {
  if (!fs.existsSync(fileA) || !fs.existsSync(fileB)) {
    return null
  }
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
    {
      threshold: 0.1,
    },
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
    onlyInA: Array.from(elementsA.keys()).filter(p => !elementsB.has(p)),
    onlyInB: Array.from(elementsB.keys()).filter(p => !elementsA.has(p)),
  }
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
  const file = (label: string, extension: string) => {
    return path.join(OUTPUT_ROOT, label, route, `${variant}.${extension}`)
  }
  const dataA = readCapture(file(a, "json"))
  const dataB = readCapture(file(b, "json"))

  const empty = {
    route,
    variant,
    differences: [],
    onlyInA: [],
    onlyInB: [],
    hydrationErrorsA: [],
    hydrationErrorsB: [],
    pixelDiffRatio: null,
    diffImage: null,
  }
  if (!dataA || !dataB) {
    return { ...empty, isMissing: dataA ? "b" : "a" }
  }

  const diffImage = path.join(`diff-${a}-vs-${b}`, route, `${variant}.png`)
  return {
    ...empty,
    isMissing: null,
    ...compareElements({ route, dataA, dataB }),
    hydrationErrorsA: dataA.consoleErrors.filter(isHydrationError),
    hydrationErrorsB: dataB.consoleErrors.filter(isHydrationError),
    pixelDiffRatio: diffScreenshots({
      fileA: file(a, "png"),
      fileB: file(b, "png"),
      diffFile: path.join(OUTPUT_ROOT, diffImage),
    }),
    diffImage,
  }
}

const hasStyleChanges = (comparison: CaptureComparison): boolean => {
  return (
    comparison.isMissing !== null ||
    comparison.differences.length > 0 ||
    comparison.onlyInA.length > 0 ||
    comparison.onlyInB.length > 0
  )
}

const renderImage = (src: string | null, alt: string): string => {
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
  const status = hasStyleChanges(comparison) ? "fail" : "pass"
  const hydration = [
    ...comparison.hydrationErrorsA.map(e => [a, e]),
    ...comparison.hydrationErrorsB.map(e => [b, e]),
  ]

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

  return `<details class="${status}">
<summary><strong>${escapeHtml(base)}</strong> ${
    comparison.isMissing
      ? `missing capture in ${escapeHtml(comparison.isMissing === "a" ? a : b)}`
      : `${differences.length} style differences, ${onlyInA.length + onlyInB.length} unmatched paths`
  }, ${pixels} pixels differ, ${hydration.length} hydration errors</summary>
<div class="shots">
<figure><figcaption>${escapeHtml(a)}</figcaption>${renderImage(`${a}/${base}.png`, a)}</figure>
<figure><figcaption>${escapeHtml(b)}</figcaption>${renderImage(`${b}/${base}.png`, b)}</figure>
<figure><figcaption>diff</figcaption>${renderImage(comparison.pixelDiffRatio === null ? null : comparison.diffImage, "diff")}</figure>
</div>
${styleTable}${missingTable}${hydrationTable}
</details>`
}

const renderReport = ({
  comparisons,
  a,
  b,
}: {
  comparisons: CaptureComparison[]
  a: string
  b: string
}): string => {
  const failing = comparisons.filter(hasStyleChanges)
  const ordered = [...failing, ...comparisons.filter(c => !hasStyleChanges(c))]
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${escapeHtml(a)} vs ${escapeHtml(b)}</title>
<style>
body { font: 14px/1.4 system-ui, sans-serif; margin: 24px; }
details { border: 1px solid #ccc; border-left-width: 6px; margin: 6px 0; padding: 6px 10px; }
details.fail { border-left-color: #c62828; }
details.pass { border-left-color: #2e7d32; }
.shots { display: flex; gap: 12px; align-items: flex-start; margin: 10px 0; }
.shots figure { flex: 1; margin: 0; min-width: 0; }
.shots img { width: 100%; border: 1px solid #ddd; }
table { border-collapse: collapse; width: 100%; margin: 8px 0; font: 12px ui-monospace, monospace; }
td, th { border: 1px solid #ddd; padding: 2px 6px; text-align: left; word-break: break-all; }
.missing { color: #888; }
</style></head><body>
<h1>${escapeHtml(a)} vs ${escapeHtml(b)}</h1>
<p>${comparisons.length} captures compared, ${failing.length} with computed-style or path differences.</p>
${ordered.map(comparison => renderComparison({ comparison, a, b })).join("\n")}
</body></html>`
}

const listRoutes = (label: string): string[] => {
  const dir = path.join(OUTPUT_ROOT, label)
  if (!fs.existsSync(dir)) {
    return []
  }
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && !entry.name.startsWith("."))
    .map(entry => entry.name)
}

const main = (): void => {
  const { a, b } = parseArgs()
  const routes = Array.from(
    new Set([...listRoutes(a), ...listRoutes(b)]),
  ).sort()
  const variants = VIEWPORTS.flatMap(viewport => {
    return THEMES.map(theme => `${viewport.name}-${theme}`)
  })

  const comparisons = routes.flatMap(route => {
    return variants.map(variant => compareCapture({ a, b, route, variant }))
  })

  const reportFile = path.join(OUTPUT_ROOT, `report-${a}-vs-${b}.html`)
  fs.writeFileSync(reportFile, renderReport({ comparisons, a, b }))

  const failing = comparisons.filter(hasStyleChanges)
  failing.forEach(comparison => {
    const unmatched = comparison.onlyInA.length + comparison.onlyInB.length
    console.log(
      `${comparison.route}/${comparison.variant}: ${
        comparison.isMissing
          ? `missing in ${comparison.isMissing === "a" ? a : b}`
          : `${comparison.differences.length} style differences, ${unmatched} unmatched paths`
      }`,
    )
  })
  console.log(
    `${comparisons.length} captures compared, ${failing.length} differ. Report: ${reportFile}`,
  )
  process.exit(failing.length > 0 ? 1 : 0)
}

main()
