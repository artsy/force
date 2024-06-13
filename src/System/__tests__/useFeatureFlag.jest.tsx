import { render } from "@testing-library/react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  useFeatureFlag,
  useFeatureVariant,
  useTrackFeatureVariant,
  getFeatureVariant,
} from "System/Hooks/useFeatureFlag"
import { useEffect } from "react"

const FEATURE_FLAGS = {
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
}

jest.mock("System/Hooks/useSystemContext")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        pathname: "/artist/daniel-arsham",
      },
    },
  }),
}))

jest.mock("Utils/getENV", () => ({ getENV: () => FEATURE_FLAGS }))

beforeAll(() => {
  ;(useSystemContext as jest.Mock).mockImplementation(() => {
    return { featureFlags: FEATURE_FLAGS }
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

describe("getFeatureVariant", () => {
  it("returns true when the variant is enabled", () => {
    const variant = getFeatureVariant("feature-a")
    expect(variant).toEqual({
      enabled: true,
      name: "variant-a",
      payload: { type: "string", value: "my payload" },
    })
  })

  it("returns the disabled response when not enabled", () => {
    const variant = getFeatureVariant("feature-b")
    expect(variant).toEqual({ enabled: false, name: "disabled" })
  })

  it("returns null when the variant is not present", () => {
    const variant = getFeatureVariant("feature-x")
    expect(variant).toBe(null)
  })
})

describe("useTrackFeatureVariantView", () => {
  const analytics = window.analytics

  const analyticsPayload = {
    context_owner_slug: "daniel-arsham",
    context_owner_type: "artist",
    experiment_name: "cool-experiment",
    payload: undefined,
    service: "unleash",
    variant_name: "experiment",
  }

  // variantName is only for testing disabled variants.
  // It will not be a prop in production.
  const TestComponent: React.FC<{
    greeting?: string
    variantName?: string
  }> = ({ greeting = "Hello", variantName = "experiment" }) => {
    const { trackFeatureVariant } = useTrackFeatureVariant({
      experimentName: "cool-experiment",
      variantName,
    })
    useEffect(trackFeatureVariant, [trackFeatureVariant])
    return (
      <div>
        <div>{greeting}!</div>
      </div>
    )
  }

  const renderTestComponent = (variantName?: string) => {
    return render(<TestComponent variantName={variantName} />)
  }

  beforeEach(() => {
    window.analytics = {
      track: jest.fn(),
    } as any
  })

  afterEach(() => {
    window.analytics = analytics
  })

  it("calls the tracking function with the correct payload", () => {
    renderTestComponent()

    expect(window?.analytics?.track).toHaveBeenCalledWith(
      "experiment_viewed",
      analyticsPayload
    )
  })

  it("Does not refire tracking on component rerender", () => {
    const { rerender, unmount } = renderTestComponent()

    rerender(<TestComponent greeting="Hi" />)
    rerender(<TestComponent greeting="Hola" />)

    unmount()

    renderTestComponent()

    expect(window?.analytics?.track).toHaveBeenNthCalledWith(
      1,
      "experiment_viewed",
      analyticsPayload
    )

    expect(window?.analytics?.track).toHaveBeenNthCalledWith(
      2,
      "experiment_viewed",
      analyticsPayload
    )

    expect(window?.analytics?.track).toHaveBeenCalledTimes(2)
  })

  it("does not call the tracking function if the variantName is disabled", () => {
    renderTestComponent("disabled")

    expect(window?.analytics?.track).toHaveBeenCalledTimes(0)
  })
})
