import fs from "fs"
import path from "path"
import { type Page, test } from "@playwright/test"
import {
  BASE_URL,
  type CaptureData,
  type CaptureRoute,
  type ElementSnapshot,
  OUTPUT_ROOT,
  ROUTES,
  THEMES,
  VIEWPORTS,
} from "./routes"

// Usage: STYLING_LABEL=main-a yarn playwright test -c playwright.styling-migration.config.ts

const STYLING_LABEL = process.env.STYLING_LABEL
// The main process loads this file before it starts workers, so they all inherit one run id.
process.env.STYLING_RUN_ID = process.env.STYLING_RUN_ID || String(Date.now())
const RUN_ID = process.env.STYLING_RUN_ID

const SIDES = ["top", "right", "bottom", "left"]
const CORNERS = ["top-left", "top-right", "bottom-right", "bottom-left"]

const STYLE_PROPERTIES = [
  "display",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "z-index",
  ...SIDES.map(side => `margin-${side}`),
  ...SIDES.map(side => `padding-${side}`),
  "width",
  "height",
  "min-width",
  "max-width",
  "min-height",
  "max-height",
  "box-sizing",
  "color",
  "background-color",
  "background-image",
  ...SIDES.flatMap(side => [
    `border-${side}-width`,
    `border-${side}-style`,
    `border-${side}-color`,
  ]),
  ...CORNERS.map(corner => `border-${corner}-radius`),
  "font-family",
  "font-size",
  "font-weight",
  "line-height",
  "letter-spacing",
  "text-align",
  "flex-direction",
  "flex-wrap",
  "flex-grow",
  "flex-shrink",
  "flex-basis",
  "align-items",
  "justify-content",
  "gap",
  "grid-template-columns",
  "opacity",
  "visibility",
  "overflow",
  "box-shadow",
  "text-decoration-line",
  "text-transform",
  "cursor",
  "white-space",
  "transform",
  "pointer-events",
  "object-fit",
  "outline-style",
  "outline-width",
  "outline-color",
]

const SKIPPED_TAGS = ["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"]

// Returns false when any settle step hit its timeout.
const settlePage = async ({
  page,
  maxScrollSteps,
}: {
  page: Page
  maxScrollSteps: number
}): Promise<boolean> => {
  await page.evaluate(async steps => {
    const sleep = (ms: number) =>
      new Promise(resolve => setTimeout(resolve, ms))
    const scrollDownFrom = async (remaining: number): Promise<void> => {
      const reachedBottom =
        window.scrollY + window.innerHeight >= document.body.scrollHeight - 2
      if (remaining === 0 || reachedBottom) {
        return
      }
      window.scrollBy(0, window.innerHeight)
      await sleep(150)
      return scrollDownFrom(remaining - 1)
    }
    await scrollDownFrom(steps)
    await sleep(500)
    window.scrollTo(0, 0)
  }, maxScrollSteps)

  const isNetworkIdle = await page
    .waitForLoadState("networkidle", { timeout: 10000 })
    .then(() => true)
    .catch(() => false)

  const settleSteps = await page.evaluate(async () => {
    const sleep = (ms: number) =>
      new Promise(resolve => setTimeout(resolve, ms))

    // Off-screen rail images never load on scroll; without this, fade-in opacity varies per run.
    const loadAllImages = async (): Promise<boolean> => {
      document.querySelectorAll('img[loading="lazy"]').forEach(image => {
        image.setAttribute("loading", "eager")
      })
      const pending = Array.from(document.images)
        .filter(image => !image.complete)
        .map(image => {
          return new Promise<void>(resolve => {
            image.addEventListener("load", () => resolve())
            image.addEventListener("error", () => resolve())
          })
        })
      const loaded = Promise.all(pending).then(() => true)
      const timedOut = sleep(20000).then(() => false)
      return Promise.race([loaded, timedOut])
    }

    // Skeletons render as "█" glyphs and artwork save buttons start as placeholders;
    // wait until every lazy query and per-user check has resolved.
    const hasPlaceholders = () => {
      return (
        document.body.innerText.includes("█") ||
        document.querySelector('[data-test="saveButtonPlaceholder"]') !== null
      )
    }
    const waitForPlaceholders = async (
      remainingMs: number,
    ): Promise<boolean> => {
      if (!hasPlaceholders()) {
        return true
      }
      if (remainingMs <= 0) {
        return false
      }
      await sleep(250)
      return waitForPlaceholders(remainingMs - 250)
    }

    // Lazy sections finish loading at different times; wait for the DOM to stop changing.
    const waitForQuietDom = () => {
      return new Promise<boolean>(resolve => {
        const finish = (isQuiet: boolean) => {
          observer.disconnect()
          resolve(isQuiet)
        }
        let quietTimer = setTimeout(() => finish(true), 1500)
        const observer = new MutationObserver(() => {
          clearTimeout(quietTimer)
          quietTimer = setTimeout(() => finish(true), 1500)
        })
        observer.observe(document.body, {
          attributes: true,
          childList: true,
          subtree: true,
        })
        setTimeout(() => finish(false), 10000)
      })
    }

    const hasNoPlaceholders = await waitForPlaceholders(20000)
    const areImagesLoaded = await loadAllImages()
    await document.fonts.ready
    const isQuiet = await waitForQuietDom()
    const areLateImagesLoaded = await loadAllImages()
    const isQuietAgain = await waitForQuietDom()
    return [
      hasNoPlaceholders,
      areImagesLoaded,
      isQuiet,
      areLateImagesLoaded,
      isQuietAgain,
    ]
  })

  return [isNetworkIdle, ...settleSteps].every(Boolean)
}

interface PageSnapshot {
  elements: ElementSnapshot[]
  bodyBackgroundColor: string
  bodyColor: string
}

const snapshotPage = (page: Page): Promise<PageSnapshot> => {
  return page.evaluate(
    ({ properties, skippedTags }) => {
      const hasNoLayoutBox = (element: Element) => {
        const rect = element.getBoundingClientRect()
        return (
          rect.width === 0 ||
          rect.height === 0 ||
          window.getComputedStyle(element).display === "none"
        )
      }

      // Client effects insert and remove empty spans without a layout box between runs.
      const isInvisibleEmptySpan = (element: Element) => {
        return (
          element.tagName === "SPAN" &&
          element.childNodes.length === 0 &&
          hasNoLayoutBox(element)
        )
      }

      const isSkipped = (element: Element) => {
        return skippedTags.includes(element.tagName)
      }

      const rootChildren = Array.from(document.body.children)
      const appRoot = rootChildren.find(element => {
        return element.tagName === "DIV" && element.querySelector("main")
      })

      // Portal roots are appended in a different order on each load, so key them by content.
      const rootSignature = (root: Element) => {
        const chain: string[] = []
        let current: Element | null = root
        while (current && chain.length < 4) {
          chain.push(current.tagName.toLowerCase())
          current = current.firstElementChild
        }
        const marker = root.matches("[data-testid],[data-test],[role]")
          ? root
          : root.querySelector("[data-testid],[data-test],[role]")
        const markerValue =
          marker?.getAttribute("data-testid") ??
          marker?.getAttribute("data-test") ??
          marker?.getAttribute("role")
        return `${chain.join("/")}${markerValue ? `{${markerValue}}` : ""}`
      }

      const signatureCounts = new Map<string, number>()
      const rootSegments = new Map<Element, string>()
      rootChildren
        .filter(element => element.tagName === "DIV")
        .forEach(element => {
          if (element === appRoot) {
            rootSegments.set(element, "div#app")
            return
          }
          const signature = rootSignature(element)
          const index = signatureCounts.get(signature) ?? 0
          signatureCounts.set(signature, index + 1)
          rootSegments.set(element, `div[${signature}]#${index}`)
        })

      const paths = new Map<Element, string>()
      paths.set(document.body, "body")

      const segmentOf = (element: Element) => {
        const rootSegment = rootSegments.get(element)
        if (rootSegment) {
          return rootSegment
        }
        const sameTypeIndex =
          Array.from(element.parentElement?.children ?? [])
            .filter(sibling => {
              return (
                sibling.tagName === element.tagName &&
                !isInvisibleEmptySpan(sibling)
              )
            })
            .indexOf(element) + 1
        return `${element.tagName.toLowerCase()}:nth-of-type(${sameTypeIndex})`
      }

      const pathOf = (element: Element): string => {
        const parentPath = paths.get(element.parentElement as Element)
        const elementPath = `${parentPath}>${segmentOf(element)}`
        paths.set(element, elementPath)
        return elementPath
      }

      // Body-level divs without children have nothing to compare, and their count varies per run.
      const isChildlessRoot = (element: Element) => {
        return (
          element.parentElement === document.body &&
          element.tagName === "DIV" &&
          element.children.length === 0
        )
      }

      const elements = Array.from(document.querySelectorAll("body *"))
        .filter(element => {
          return (
            !isSkipped(element) &&
            !isInvisibleEmptySpan(element) &&
            !isChildlessRoot(element)
          )
        })
        .map(element => {
          const computed = window.getComputedStyle(element)
          const styles = Object.fromEntries(
            properties.map(property => [
              property,
              computed.getPropertyValue(property),
            ]),
          )
          return { path: pathOf(element), styles }
        })

      const bodyStyle = window.getComputedStyle(document.body)
      return {
        elements,
        bodyBackgroundColor: bodyStyle.backgroundColor,
        bodyColor: bodyStyle.color,
      }
    },
    { properties: STYLE_PROPERTIES, skippedTags: SKIPPED_TAGS },
  )
}

const removeIfExists = (file: string): void => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file)
  }
}

const readCapture = (file: string): CaptureData | null => {
  if (!fs.existsSync(file)) {
    return null
  }
  return JSON.parse(fs.readFileSync(file, "utf8"))
}

// Whichever theme finishes second sees both files and runs this check.
const assertThemesDiffer = ({
  outputDir,
  viewportName,
}: {
  outputDir: string
  viewportName: string
}): void => {
  const [light, dark] = THEMES.map(theme => {
    return readCapture(path.join(outputDir, `${viewportName}-${theme}.json`))
  })
  if (!light || !dark || light.runId !== dark.runId) {
    return
  }
  if (light.bodyBackgroundColor === dark.bodyBackgroundColor) {
    throw new Error(
      `Dark theme not applied: ${viewportName} body background is ${dark.bodyBackgroundColor} in both themes. Check the x-theme header.`,
    )
  }
}

const captureRoute = async ({
  page,
  route,
  viewport,
  theme,
}: {
  page: Page
  route: CaptureRoute
  viewport: (typeof VIEWPORTS)[number]
  theme: string
}): Promise<void> => {
  const outputDir = path.join(OUTPUT_ROOT, STYLING_LABEL as string, route.name)
  const basename = `${viewport.name}-${theme}`
  const pngFile = path.join(outputDir, `${basename}.png`)
  const jsonFile = path.join(outputDir, `${basename}.json`)
  fs.mkdirSync(outputDir, { recursive: true })
  removeIfExists(pngFile)
  removeIfExists(jsonFile)

  const consoleErrors: string[] = []
  page.on("console", message => {
    if (message.type() === "error") {
      consoleErrors.push(message.text())
    }
  })
  page.on("pageerror", error => {
    consoleErrors.push(`pageerror: ${error.message}`)
  })

  // A global extra header would also hit cross-origin requests and trigger CORS preflights.
  const origin = new URL(BASE_URL).origin
  await page.route(
    url => url.origin === origin,
    request => {
      return request.continue({
        headers: { ...request.request().headers(), "x-theme": theme },
      })
    },
  )

  await page.setViewportSize({ width: viewport.width, height: viewport.height })
  await page.goto(route.path, { timeout: 60000 })
  await page.waitForSelector(
    route.readySelector ?? 'body[data-test="AppReady"]',
    { timeout: 60000 },
  )
  await page.evaluate(() => document.fonts.ready)
  const settled = await settlePage({
    page,
    maxScrollSteps: route.maxScrollSteps ?? 80,
  })

  await page.screenshot({
    path: pngFile,
    fullPage: true,
    animations: "disabled",
  })

  const snapshot = await snapshotPage(page)
  const data: CaptureData = {
    runId: RUN_ID,
    theme,
    settled,
    consoleErrors,
    ...snapshot,
  }
  fs.writeFileSync(jsonFile, JSON.stringify(data))
  if (!route.isThemeIgnored) {
    assertThemesDiffer({ outputDir, viewportName: viewport.name })
  }
}

test.describe("styling migration capture", () => {
  test.beforeAll(() => {
    if (!STYLING_LABEL) {
      throw new Error("Set STYLING_LABEL to name this capture, e.g. main-a")
    }
  })

  ROUTES.forEach(route => {
    VIEWPORTS.forEach(viewport => {
      THEMES.forEach(theme => {
        test(`${route.name} ${viewport.name} ${theme}`, async ({ page }) => {
          await captureRoute({ page, route, viewport, theme })
        })
      })
    })
  })
})
