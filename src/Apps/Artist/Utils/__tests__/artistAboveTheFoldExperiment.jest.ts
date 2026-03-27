import { isInExperimentGroup } from "../artistAboveTheFoldExperiment"

describe("isInExperimentGroup", () => {
  it("returns true for a slug in the experiment group", () => {
    expect(isInExperimentGroup("banksy")).toBe(true)
  })

  it("returns false for a slug not in the experiment group", () => {
    expect(isInExperimentGroup("unknown-artist")).toBe(false)
  })
})
