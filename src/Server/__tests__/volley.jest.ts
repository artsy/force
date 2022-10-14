import { OwnerType } from "@artsy/cohesion"
import { reportLoadTimeToVolley } from "Server/volley"

jest.mock("Utils/getENV", () => ({
  getENV: () => "https://volley.endpoint",
}))

describe("Reporting metrics to Volley", () => {
  const mockFetch = jest.fn()

  // @ts-ignore
  global.fetch = mockFetch

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("reports valid metrics", async () => {
    await reportLoadTimeToVolley({
      pageType: OwnerType.article,
      deviceType: "desktop",
      metricsMap: {
        "dom-complete": () => 10,
        "load-event-end": () => 5,
      },
    })

    expect(mockFetch.mock.calls[0]).toEqual([
      "https://volley.endpoint",
      {
        body: JSON.stringify({
          serviceName: "force",
          metrics: [
            {
              type: "timing",
              name: "load-time",
              timing: 10,
              tags: [
                "page-type:article",
                "device-type:desktop",
                "mark:dom-complete",
              ],
            },
            {
              type: "timing",
              name: "load-time",
              timing: 5,
              tags: [
                "page-type:article",
                "device-type:desktop",
                "mark:load-event-end",
              ],
            },
          ],
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      },
    ])
  })

  it("reports valid metrics with 'mobile' as the device type when on mobile", async () => {
    await reportLoadTimeToVolley({
      pageType: OwnerType.article,
      deviceType: "mobile",
      metricsMap: {
        "dom-complete": () => 10,
        "load-event-end": () => 5,
      },
    })

    expect(mockFetch.mock.calls[0]).toEqual([
      "https://volley.endpoint",
      {
        body: JSON.stringify({
          serviceName: "force",
          metrics: [
            {
              type: "timing",
              name: "load-time",
              timing: 10,
              tags: [
                "page-type:article",
                "device-type:mobile",
                "mark:dom-complete",
              ],
            },
            {
              type: "timing",
              name: "load-time",
              timing: 5,
              tags: [
                "page-type:article",
                "device-type:mobile",
                "mark:load-event-end",
              ],
            },
          ],
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      },
    ])
  })

  it("reports valid metrics with 'desktop' as the device type when not on mobile", async () => {
    await reportLoadTimeToVolley({
      pageType: OwnerType.article,
      deviceType: "desktop",
      metricsMap: {
        "dom-complete": () => 10,
        "load-event-end": () => 5,
      },
    })

    expect(mockFetch.mock.calls[0]).toEqual([
      "https://volley.endpoint",
      {
        body: JSON.stringify({
          serviceName: "force",
          metrics: [
            {
              type: "timing",
              name: "load-time",
              timing: 10,
              tags: [
                "page-type:article",
                "device-type:desktop",
                "mark:dom-complete",
              ],
            },
            {
              type: "timing",
              name: "load-time",
              timing: 5,
              tags: [
                "page-type:article",
                "device-type:desktop",
                "mark:load-event-end",
              ],
            },
          ],
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      },
    ])
  })

  it("omits an invalid metric", async () => {
    await reportLoadTimeToVolley({
      pageType: OwnerType.article,
      deviceType: "desktop",
      metricsMap: {
        "dom-complete": () => 10,
        "load-event-end": () => null,
      },
    })

    expect(mockFetch.mock.calls[0]).toEqual([
      "https://volley.endpoint",
      {
        body: JSON.stringify({
          serviceName: "force",
          metrics: [
            {
              type: "timing",
              name: "load-time",
              timing: 10,
              tags: [
                "page-type:article",
                "device-type:desktop",
                "mark:dom-complete",
              ],
            },
          ],
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      },
    ])
  })

  it("doesn't send anything if called with no valid data", async () => {
    await reportLoadTimeToVolley({
      pageType: OwnerType.article,
      deviceType: "desktop",
      metricsMap: {},
    })

    expect(mockFetch.mock.calls.length).toBe(0)
  })
})
