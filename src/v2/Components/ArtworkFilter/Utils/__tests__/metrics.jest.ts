import { getSupportedMetric } from "../metrics"

describe("getSupportedMetric", () => {
  it("should return supported metrics", () => {
    expect(getSupportedMetric("cm")).toBe("cm")
    expect(getSupportedMetric("in")).toBe("in")
  })

  it("should return fallback metric", () => {
    expect(getSupportedMetric("UNKNOWN")).toBe("cm")
  })

  it("should return fallback metric if nothing is passed", () => {
    expect(getSupportedMetric()).toBe("cm")
  })
})
