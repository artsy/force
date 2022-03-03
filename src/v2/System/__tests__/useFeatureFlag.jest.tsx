import { useFeatureFlag, useFeatureVariant } from "../useFeatureFlag"
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
    // @ts-ignore
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

describe("useVariant", () => {
  const mockUseSystemContext = useSystemContext as jest.Mock

  beforeEach(() => {
    mockUseSystemContext.mockImplementation(() => ({
      featureVariants: {
        "feature-a": {
          enabled: true,
          name: "variant-a",
          payload: {
            type: "string",
            value: "my payload",
          },
        },
        "feature-b": {
          enabled: false,
          name: "variant-b",
          payload: {
            type: "string",
            value: "my payload",
          },
        },
      },
    }))
  })

  it("returns true when the variant is enabled", () => {
    const variant = useFeatureVariant("feature-a")
    expect(variant!.enabled).toBe(true)
  })

  it("return false when the variant is not enabled", () => {
    const variant = useFeatureVariant("feature-b")
    expect(variant!.enabled).toBe(false)
  })

  it("returns false for the enabled property when the variant is not passed in as an argument", () => {
    // @ts-ignore
    const variant = useFeatureVariant()
    expect(variant!.enabled).toBe(false)
    expect(console.error).toHaveBeenCalledWith(
      "[Force] Error: no argument passed into useFeatureVariant"
    )
  })
  // TODO: rethink how we're doing this
  it("returns false when the variant isn't present", () => {
    const variant = useFeatureVariant("feature-x")
    expect(variant!.enabled).toBe(false)
    expect(console.error).toHaveBeenLastCalledWith(
      "[Force] Error: the variant can't be found on featureVariants"
    )
  })
})
