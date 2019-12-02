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

import { reportLoadTimeToVolley, metricPayload } from "../volley"

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
        serviceName: "force",
        metrics: [
          {
            type: "timing",
            name: "load-time",
            timing: 10,
            tags: [`page-type:`, `device-type:desktop`, `mark:dom-complete`],
          },
          {
            type: "timing",
            name: "load-time",
            timing: 5,
            tags: [`page-type:`, `device-type:desktop`, `mark:load-event-end`],
          },
        ],
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
        serviceName: "force",
        metrics: [
          {
            type: "timing",
            name: "load-time",
            timing: 10,
            tags: [`page-type:`, `device-type:mobile`, `mark:dom-complete`],
          },
          {
            type: "timing",
            name: "load-time",
            timing: 5,
            tags: [`page-type:`, `device-type:mobile`, `mark:load-event-end`],
          },
        ],
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
        serviceName: "force",
        metrics: [
          {
            type: "timing",
            name: "load-time",
            timing: 10,
            tags: [`page-type:`, `device-type:desktop`, `mark:dom-complete`],
          },
          {
            type: "timing",
            name: "load-time",
            timing: 5,
            tags: [`page-type:`, `device-type:desktop`, `mark:load-event-end`],
          },
        ],
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
        serviceName: "force",
        metrics: [
          {
            type: "timing",
            name: "load-time",
            timing: 10,
            tags: [`page-type:`, `device-type:desktop`, `mark:dom-complete`],
          },
        ],
      })
    )
  })

  it("doesn't send anything if called with no valid data", async () => {
    await reportLoadTimeToVolley("", "desktop", {})
    expect(mockSend.mock.calls.length).toBe(0)
  })
})
