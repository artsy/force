/**
 * @jest-environment node
 */
import path from "path"
import { cityGuideMiddleware } from "Apps/CityGuide/Server/cityGuideMiddleware"
import { bootstrapSharifyAndContextLocalsMiddleware } from "Server/middleware/bootstrapSharifyAndContextLocalsMiddleware"
import { downcaseMiddleware } from "Server/middleware/downcase"
import { DOWNLOAD_APP_URLS, Device } from "Utils/Hooks/useDeviceDetection"
import express from "express"
import glob from "glob"

const APP_STORE_URL = DOWNLOAD_APP_URLS[Device.iPhone]
const GOOGLE_PLAY_URL = DOWNLOAD_APP_URLS[Device.Android]

const DESKTOP_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
const IPHONE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1"
const IPAD_UA =
  "Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1"
const ANDROID_PHONE_UA =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36"
const ANDROID_TABLET_UA =
  "Mozilla/5.0 (Linux; Android 14; SM-X710) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"

const SRC_DIR = path.resolve(__dirname, "../../../..")

const ITINERARY_PATH =
  "/city-guide/london-united-kingdom/itinerary/abc?shareToken=x"

describe("cityGuideMiddleware", () => {
  let server: ReturnType<ReturnType<typeof express>["listen"]>
  let baseUrl: string

  // Same order as src/middleware.ts: City Guide first, then downcase, then the static folders, then the app
  beforeAll(async () => {
    const app = express()

    app.use((req: any, res, next) => {
      req.session = {}
      res.locals.sd = {}
      next()
    })
    app.use(bootstrapSharifyAndContextLocalsMiddleware as any)
    app.use(cityGuideMiddleware)
    app.use(downcaseMiddleware as any)
    glob.sync(`${SRC_DIR}/{public,**/public}`).forEach(folder => {
      app.use(express.static(folder))
    })
    // Stands in for the app router
    app.use((req, res) => {
      res.status(404).send(`APP ROUTER ${req.originalUrl}`)
    })

    await new Promise<void>(resolve => {
      server = app.listen(0, resolve)
    })
    baseUrl = `http://127.0.0.1:${(server.address() as any).port}`
  })

  afterAll(() => {
    server.close()
  })

  const get = (urlPath: string, userAgent = DESKTOP_UA) => {
    return fetch(`${baseUrl}${urlPath}`, {
      headers: { "user-agent": userAgent },
      redirect: "manual",
    })
  }

  describe("desktop", () => {
    it("redirects an itinerary link to the landing page and keeps the original link in ?from=", async () => {
      const res = await get(ITINERARY_PATH)

      expect(res.status).toBe(302)
      expect(res.headers.get("location")).toBe(
        `/city-guide-on-app/?from=${encodeURIComponent(ITINERARY_PATH)}`,
      )
      expect(res.headers.get("location")).toBe(
        "/city-guide-on-app/?from=%2Fcity-guide%2Flondon-united-kingdom%2Fitinerary%2Fabc%3FshareToken%3Dx",
      )
    })

    it("redirects /city-guide with a query", async () => {
      const res = await get("/city-guide?citySlug=london-united-kingdom")

      expect(res.status).toBe(302)
      expect(res.headers.get("location")).toBe(
        "/city-guide-on-app/?from=%2Fcity-guide%3FcitySlug%3Dlondon-united-kingdom",
      )
    })

    it("redirects /city-guide/", async () => {
      const res = await get("/city-guide/")

      expect(res.status).toBe(302)
      expect(res.headers.get("location")).toBe(
        "/city-guide-on-app/?from=%2Fcity-guide%2F",
      )
    })

    it("does not change the case of the original link", async () => {
      const res = await get("/city-guide/London/itinerary/AbC?shareToken=XyZ")

      expect(res.status).toBe(302)
      expect(res.headers.get("location")).toBe(
        "/city-guide-on-app/?from=%2Fcity-guide%2FLondon%2Fitinerary%2FAbC%3FshareToken%3DXyZ",
      )
    })

    it("encodes characters that could change the redirect", async () => {
      const res = await get("/city-guide?x=1&from=//evil.example#y")

      expect(res.headers.get("location")).toMatch(
        /^\/city-guide-on-app\/\?from=[^&#]*$/,
      )
    })

    it("lets /city-guide-on-app/ through to the app router without redirecting", async () => {
      const res = await get("/city-guide-on-app/")

      expect(res.status).toBe(404)
      expect(res.headers.get("location")).toBeNull()
      expect(await res.text()).toBe("APP ROUTER /city-guide-on-app/")
    })

    // express.static adds the slash because the assets live in a folder with this name
    it("adds the trailing slash to /city-guide-on-app, keeping the query", async () => {
      const res = await get("/city-guide-on-app?from=%2Fcity-guide")

      expect(res.status).toBe(301)
      expect(res.headers.get("location")).toBe(
        "/city-guide-on-app/?from=%2Fcity-guide",
      )
    })

    it("lets the page through with the ?from= it was given", async () => {
      const res = await get("/city-guide-on-app/?from=%2Fcity-guide")

      expect(res.headers.get("location")).toBeNull()
      expect(await res.text()).toBe(
        "APP ROUTER /city-guide-on-app/?from=%2Fcity-guide",
      )
    })

    it("serves the page's images", async () => {
      const paths = [
        "/city-guide-on-app/assets/qr-flowcode.png",
        "/city-guide-on-app/assets/v3/map.webp",
        "/city-guide-on-app/assets/v3/frieze-week-guide.webp",
        "/city-guide-on-app/assets/v3/city-guide.webp",
        "/city-guide-on-app/assets/v3/add-to-itinerary.webp",
        "/city-guide-on-app/assets/v3/itinerary.webp",
      ]

      const statuses = await Promise.all(
        paths.map(async urlPath => {
          return (await get(urlPath)).status
        }),
      )

      expect(statuses).toEqual(paths.map(() => 200))
    })

    it("does not match other paths that start with city-guide", async () => {
      const res = await get("/city-guidebook")

      expect(res.headers.get("location")).toBeNull()
      expect(await res.text()).toBe("APP ROUTER /city-guidebook")
    })
  })

  describe("phones and tablets", () => {
    const LINKS = [
      "/city-guide",
      "/city-guide/",
      ITINERARY_PATH,
      "/city-guide?citySlug=london-united-kingdom",
      "/city-guide-on-app",
      "/city-guide-on-app/",
      "/city-guide-on-app/?from=%2Fcity-guide",
    ]

    it.each(LINKS)("sends an iPhone on %s to the App Store", async link => {
      const res = await get(link, IPHONE_UA)

      expect(res.status).toBe(302)
      expect(res.headers.get("location")).toBe(APP_STORE_URL)
    })

    it.each(LINKS)("sends an iPad on %s to the App Store", async link => {
      const res = await get(link, IPAD_UA)

      expect(res.status).toBe(302)
      expect(res.headers.get("location")).toBe(APP_STORE_URL)
    })

    it.each(LINKS)(
      "sends an Android phone on %s to Google Play",
      async link => {
        const res = await get(link, ANDROID_PHONE_UA)

        expect(res.status).toBe(302)
        expect(res.headers.get("location")).toBe(GOOGLE_PLAY_URL)
      },
    )

    it.each(LINKS)(
      "sends an Android tablet on %s to Google Play",
      async link => {
        const res = await get(link, ANDROID_TABLET_UA)

        expect(res.status).toBe(302)
        expect(res.headers.get("location")).toBe(GOOGLE_PLAY_URL)
      },
    )

    it("uses the same store URLs as the useDeviceDetection hook", () => {
      expect(APP_STORE_URL).toBe(
        "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080",
      )
      expect(GOOGLE_PLAY_URL).toBe(
        "https://play.google.com/store/apps/details?id=net.artsy.app",
      )
    })
  })

  it("varies on User-Agent so caches don't mix up devices", async () => {
    const redirect = await get(ITINERARY_PATH)
    const page = await get("/city-guide-on-app/")

    expect(redirect.headers.get("vary")).toMatch(/User-Agent/i)
    expect(page.headers.get("vary")).toMatch(/User-Agent/i)
  })
})
