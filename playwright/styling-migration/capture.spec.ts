import fs from "fs"
import path from "path"
import { type Page, test } from "@playwright/test"
import {
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
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:4000"

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
]

const SKIPPED_TAGS = ["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"]

const scrollThroughPage = async ({
  page,
  maxScrollSteps,
}: {
  page: Page
  maxScrollSteps: number
}): Promise<void> => {
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
  await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {})
  await page.evaluate(async () => {
    const sleep = (ms: number) =>
      new Promise(resolve => setTimeout(resolve, ms))

    // Off-screen rail images never load on scroll; without this, fade-in opacity varies per run.
    const loadAllImages = async () => {
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
      await Promise.race([Promise.all(pending), sleep(20000)])
    }

    // Skeletons render as "█" glyphs and artwork save buttons start as placeholders;
    // wait until every lazy query and per-user check has resolved.
    const hasPlaceholders = () => {
      return (
        document.body.innerText.includes("█") ||
        document.querySelector('[data-test="saveButtonPlaceholder"]') !== null
      )
    }
    const waitForPlaceholders = async (remainingMs: number): Promise<void> => {
      if (!hasPlaceholders() || remainingMs <= 0) {
        return
      }
      await sleep(250)
      return waitForPlaceholders(remainingMs - 250)
    }

    // Lazy sections finish loading at different times; wait for the DOM to stop changing.
    const waitForQuietDom = () => {
      return new Promise<void>(resolve => {
        const finish = () => {
          observer.disconnect()
          resolve()
        }
        let quietTimer = setTimeout(finish, 1500)
        const observer = new MutationObserver(() => {
          clearTimeout(quietTimer)
          quietTimer = setTimeout(finish, 1500)
        })
        observer.observe(document.body, {
          attributes: true,
          childList: true,
          subtree: true,
        })
        setTimeout(finish, 10000)
      })
    }

    await waitForPlaceholders(20000)
    await loadAllImages()
    await document.fonts.ready
    await waitForQuietDom()
    await loadAllImages()
    await waitForQuietDom()
  })
}

const collectElementStyles = (page: Page): Promise<ElementSnapshot[]> => {
  return page.evaluate(
    ({ properties, skippedTags }) => {
      const paths = new Map<Element, string>()
      paths.set(document.body, "body")

      // Client effects insert and remove empty spans between runs; dropping them keeps paths stable.
      const isEmptySpan = (element: Element) => {
        return element.tagName === "SPAN" && element.childNodes.length === 0
      }

      const pathOf = (element: Element): string => {
        const parentPath = paths.get(element.parentElement as Element)
        const sameTypeIndex =
          Array.from(element.parentElement?.children ?? [])
            .filter(sibling => {
              return (
                sibling.tagName === element.tagName && !isEmptySpan(sibling)
              )
            })
            .indexOf(element) + 1
        const elementPath = `${parentPath}>${element.tagName.toLowerCase()}:nth-of-type(${sameTypeIndex})`
        paths.set(element, elementPath)
        return elementPath
      }

      return Array.from(document.querySelectorAll("body *"))
        .filter(element => {
          return !skippedTags.includes(element.tagName) && !isEmptySpan(element)
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
    },
    { properties: STYLE_PROPERTIES, skippedTags: SKIPPED_TAGS },
  )
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
  await scrollThroughPage({
    page,
    maxScrollSteps: route.maxScrollSteps ?? 80,
  })

  const outputDir = path.join(OUTPUT_ROOT, STYLING_LABEL as string, route.name)
  fs.mkdirSync(outputDir, { recursive: true })
  const basename = `${viewport.name}-${theme}`

  await page.screenshot({
    path: path.join(outputDir, `${basename}.png`),
    fullPage: true,
    animations: "disabled",
  })

  const data: CaptureData = {
    consoleErrors,
    elements: await collectElementStyles(page),
  }
  fs.writeFileSync(
    path.join(outputDir, `${basename}.json`),
    JSON.stringify(data),
  )
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
