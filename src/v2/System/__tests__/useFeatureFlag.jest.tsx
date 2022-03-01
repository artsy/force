import { useFeatureFlag } from "../useFeatureFlag"
import { useSystemContext } from "v2/System/useSystemContext"

jest.mock("v2/System/useSystemContext")

describe("useFeatureFlag", () => {
  const mockUseSystemContext = useSystemContext as jest.Mock

  beforeEach(() => {
    mockUseSystemContext.mockImplementation(() => ({
      featureFlags: {
        feature: true,
      },
    }))
  })

  it("returns true when the feature flag is present", () => {
    const result = useFeatureFlag("feature")
    expect(result).toBe(true)
  })

  it("returns false when the feature flag is not present", () => {
    const result = useFeatureFlag("notAvailable")
    expect(result).toBe(false)
  })

  it("returns null when we don't pass in an argument", () => {
    const result = useFeatureFlag()
    expect(result).toBe(null)
    expect(console.error).toHaveBeenLastCalledWith(
      `[Force] Error: no argument passed into useFeatureFlag`
    )
  })

  it("returns null when we don't have featureFlags", () => {
    mockUseSystemContext.mockImplementation(() => ({}))

    const result = useFeatureFlag("feature")
    expect(result).toBe(null)
    expect(console.error).toHaveBeenLastCalledWith(
      "[Force] Error: featureFlags is undefined in SystemContext"
    )
  })
})
