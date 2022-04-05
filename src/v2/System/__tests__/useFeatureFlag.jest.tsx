import {
  useFeatureFlag,
  useFeatureVariant,
  useTrackFeatureVariant,
  shouldTrack,
} from "../useFeatureFlag"
import { useSystemContext } from "v2/System/useSystemContext"

jest.mock("v2/System/useSystemContext")
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        pathname: "/artist/daniel-arsham",
      },
    },
  }),
}))

beforeAll(() => {
  ;(useSystemContext as jest.Mock).mockImplementation(() => {
    return {
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
  })
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

describe("useTrackVariantView", () => {
  const analytics = window.analytics

  beforeEach(() => {
    window.analytics = {
      track: jest.fn(),
    } as any
  })

  afterEach(() => {
    window.localStorage.clear()
    window.analytics = analytics
  })

  it("calls the tracking function with the correct payload", () => {
    const { trackFeatureVariant } = useTrackFeatureVariant({
      experimentName: "cool-experiment",
      variantName: "experiment",
    })

    trackFeatureVariant()

    expect(window?.analytics?.track).toHaveBeenLastCalledWith(
      "experimentViewed",
      {
        context_owner_slug: "daniel-arsham",
        context_owner_type: "artist",
        experiment_name: "cool-experiment",
        payload: undefined,
        service: "unleash",
        variant_name: "experiment",
      }
    )
  })
})

describe("shouldTrack", () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it("returns true if the experiment has not been viewed", () => {
    const track = shouldTrack("coolFeature", "variantName")
    expect(track).toEqual(true)
  })

  it("returns false if the experiment has been viewed", () => {
    shouldTrack("coolFeature", "variantName")
    const track = shouldTrack("coolFeature", "variantName")
    expect(track).toEqual(false)
  })
})
