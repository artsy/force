import { useFeatureFlag, useFeatureVariant } from "../useFeatureFlag"
import { useSystemContext } from "v2/System/useSystemContext"

jest.mock("v2/System/useSystemContext")

const mockUseSystemContext = useSystemContext as jest.Mock
let mockFeatureFlags

beforeAll(() => {
  mockFeatureFlags = {
    featureFlags: {
      "feature-a": {
        flagEnabled: true,
        variant: {
          enabled: true,
          name: "variant-a",
          payload: {
            type: "string",
            value: "my payload",
          },
        },
      },
      "feature-b": {
        flagEnabled: false,
        variant: {
          enabled: false,
          name: "disabled",
        },
      },
    },
  }

  mockUseSystemContext.mockImplementation(() => mockFeatureFlags)
})

describe("useFeatureFlag", () => {
  it("returns true when the feature is enabled", () => {
    const result = useFeatureFlag("feature-a")
    expect(result).toBe(true)
  })

  it("returns false when the feature is is NOT enabled", () => {
    const result = useFeatureFlag("feature-b")
    expect(result).toBe(false)
  })

  it("returns null when the feature isn't in featureFlags", () => {
    const result = useFeatureFlag("feature")
    expect(result).toBe(null)
  })
})

describe("useFeatureVariant", () => {
  it("returns true when the variant is enabled", () => {
    const variant = useFeatureVariant("feature-a")
    expect(variant!.enabled).toBe(true)
  })

  it("return false when the variant is NOT enabled", () => {
    const variant = useFeatureVariant("feature-b")
    expect(variant!.enabled).toBe(false)
  })

  it("returns false when the variant isn't present", () => {
    const variant = useFeatureVariant("feature-x")
    expect(variant).toBe(null)
  })
})
