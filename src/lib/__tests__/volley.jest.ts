const mockSend = jest.fn()
jest.mock("superagent", () => ({
  post() {
    return {
      send: mockSend,
    }
  },
}))
jest.mock("sharify", () => ({
  data: {
    VOLLEY_ENDPOINT: "http://volley",
  },
}))

import { metricPayload, reportLoadTimeToVolley } from "../volley"

describe("metricsPayload", () => {
  it("should return null if the duration is null", () => {
    expect(metricPayload("", "", "", null)).toBe(null)
  })

  it("should output in the expected format", () => {
    expect(metricPayload("article", "desktop", "dom-interactive", 1000))
      .toMatchInlineSnapshot(`
Object {
  "name": "load-time",
  "tags": Array [
    "page-type:article",
    "device-type:desktop",
    "mark:dom-interactive",
  ],
  "timing": 1000,
  "type": "timing",
}
`)
  })
})

describe("Reporting metrics to Volley", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("reports valid metrics", async () => {
    await reportLoadTimeToVolley("", "desktop", {
      "dom-complete": () => 10,
      "load-event-end": () => 5,
    })
    expect(mockSend.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        metrics: [
          {
            name: "load-time",
            tags: [`page-type:`, `device-type:desktop`, `mark:dom-complete`],
            timing: 10,
            type: "timing",
          },
          {
            name: "load-time",
            tags: [`page-type:`, `device-type:desktop`, `mark:load-event-end`],
            timing: 5,
            type: "timing",
          },
        ],
        serviceName: "force",
      })
    )
  })

  it("reports valid metrics with 'mobile' as the device type when on mobile", async () => {
    await reportLoadTimeToVolley("", "mobile", {
      "dom-complete": () => 10,
      "load-event-end": () => 5,
    })
    expect(mockSend.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        metrics: [
          {
            name: "load-time",
            tags: [`page-type:`, `device-type:mobile`, `mark:dom-complete`],
            timing: 10,
            type: "timing",
          },
          {
            name: "load-time",
            tags: [`page-type:`, `device-type:mobile`, `mark:load-event-end`],
            timing: 5,
            type: "timing",
          },
        ],
        serviceName: "force",
      })
    )
  })

  it("reports valid metrics with 'desktop' as the device type when not on mobile", async () => {
    await reportLoadTimeToVolley("", "desktop", {
      "dom-complete": () => 10,
      "load-event-end": () => 5,
    })
    expect(mockSend.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        metrics: [
          {
            name: "load-time",
            tags: [`page-type:`, `device-type:desktop`, `mark:dom-complete`],
            timing: 10,
            type: "timing",
          },
          {
            name: "load-time",
            tags: [`page-type:`, `device-type:desktop`, `mark:load-event-end`],
            timing: 5,
            type: "timing",
          },
        ],
        serviceName: "force",
      })
    )
  })

  it("omits an invalid metric", async () => {
    await reportLoadTimeToVolley("", "desktop", {
      "dom-complete": () => 10,
      "load-event-end": () => null,
    })
    expect(mockSend.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        metrics: [
          {
            name: "load-time",
            tags: [`page-type:`, `device-type:desktop`, `mark:dom-complete`],
            timing: 10,
            type: "timing",
          },
        ],
        serviceName: "force",
      })
    )
  })

  it("doesn't send anything if called with no valid data", async () => {
    await reportLoadTimeToVolley("", "desktop", {})
    expect(mockSend.mock.calls.length).toBe(0)
  })
})
