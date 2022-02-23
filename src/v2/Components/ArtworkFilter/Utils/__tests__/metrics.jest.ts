import { getSupportedMetric } from "../metrics"

describe("getSupportedMetric", () => {
  it("should return supported metrics", () => {
    expect(getSupportedMetric("CM")).toBe("CM")
    expect(getSupportedMetric("IN")).toBe("IN")
  })

  it("should return fallback metric", () => {
    expect(getSupportedMetric("UNKNOWN")).toBe("CM")
  })

  it("should return fallback metric if nothing is passed", () => {
    expect(getSupportedMetric()).toBe("CM")
  })
})
