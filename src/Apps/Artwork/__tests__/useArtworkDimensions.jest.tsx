import { renderHook } from "@testing-library/react-hooks"
import { useArtworkDimensions } from "../useArtworkDimensions"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import type { ReactNode } from "react"

const mockFeatureFlags = {
  isEnabled: jest.fn(),
  getVariant: jest.fn(),
}

const wrapper =
  (featureFlagEnabled: boolean) =>
  ({ children }: { children: ReactNode }) => {
    mockFeatureFlags.isEnabled.mockReturnValue(featureFlagEnabled)
    return (
      <SystemContextProvider featureFlags={mockFeatureFlags}>
        {children}
      </SystemContextProvider>
    )
  }

describe("useArtworkDimensions", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("Basic dimension formatting", () => {
    it("formats dimensions with both in and cm", () => {
      const { result } = renderHook(
        () =>
          useArtworkDimensions({
            in: "10 × 20 in",
            cm: "25.4 × 50.8 cm",
          }),
        { wrapper: wrapper(false) },
      )

      expect(result.current.dimensionsLabel).toBe("10 × 20 in | 25.4 × 50.8 cm")
      expect(result.current.hasInDimensions).toBe(true)
      expect(result.current.hasCmDimensions).toBe(true)
    })

    it("formats dimensions with only in", () => {
      const { result } = renderHook(
        () =>
          useArtworkDimensions({
            in: "10 × 20 in",
            cm: null,
          }),
        { wrapper: wrapper(false) },
      )

      expect(result.current.dimensionsLabel).toBe("10 × 20 in")
      expect(result.current.hasInDimensions).toBe(true)
      expect(result.current.hasCmDimensions).toBe(false)
    })

    it("formats dimensions with only cm", () => {
      const { result } = renderHook(
        () =>
          useArtworkDimensions({
            in: null,
            cm: "25.4 × 50.8 cm",
          }),
        { wrapper: wrapper(false) },
      )

      expect(result.current.dimensionsLabel).toBe("25.4 × 50.8 cm")
      expect(result.current.hasInDimensions).toBe(false)
      expect(result.current.hasCmDimensions).toBe(true)
    })

    it("returns empty string when no dimensions", () => {
      const { result } = renderHook(
        () =>
          useArtworkDimensions({
            in: null,
            cm: null,
          }),
        { wrapper: wrapper(false) },
      )

      expect(result.current.dimensionsLabel).toBe("")
      expect(result.current.hasInDimensions).toBe(false)
      expect(result.current.hasCmDimensions).toBe(false)
    })

    it("returns empty string when dimensions is null", () => {
      const { result } = renderHook(() => useArtworkDimensions(null), {
        wrapper: wrapper(false),
      })

      expect(result.current.dimensionsLabel).toBe("")
    })

    it("returns empty string when dimensions is undefined", () => {
      const { result } = renderHook(() => useArtworkDimensions(undefined), {
        wrapper: wrapper(false),
      })

      expect(result.current.dimensionsLabel).toBe("")
    })
  })

  describe("Framed dimensions with feature flag OFF", () => {
    it("shows regular dimensions when framed dimensions provided but flag is off", () => {
      const { result } = renderHook(
        () =>
          useArtworkDimensions(
            { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
            { in: "12 × 22 in", cm: "30.5 × 55.9 cm" },
          ),
        { wrapper: wrapper(false) },
      )

      expect(result.current.dimensionsLabel).toBe("10 × 20 in | 25.4 × 50.8 cm")
      expect(result.current.isShowingFramedDimensions).toBe(false)
      expect(result.current.shouldShowFrameText).toBe(true)
    })
  })

  describe("Framed dimensions with feature flag ON", () => {
    it("shows framed dimensions when flag is on and framed dimensions exist", () => {
      const { result } = renderHook(
        () =>
          useArtworkDimensions(
            { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
            { in: "12 × 22 in", cm: "30.5 × 55.9 cm" },
          ),
        { wrapper: wrapper(true) },
      )

      expect(result.current.dimensionsLabel).toBe("12 × 22 in | 30.5 × 55.9 cm")
      expect(result.current.isShowingFramedDimensions).toBe(true)
      expect(result.current.shouldShowFrameText).toBe(false)
    })

    it("shows regular dimensions when flag is on but framed dimensions are null", () => {
      const { result } = renderHook(
        () =>
          useArtworkDimensions(
            { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
            null,
          ),
        { wrapper: wrapper(true) },
      )

      expect(result.current.dimensionsLabel).toBe("10 × 20 in | 25.4 × 50.8 cm")
      expect(result.current.isShowingFramedDimensions).toBe(false)
      expect(result.current.shouldShowFrameText).toBe(true)
    })

    it("shows regular dimensions when flag is on but framed dimensions are empty", () => {
      const { result } = renderHook(
        () =>
          useArtworkDimensions(
            { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
            { in: null, cm: null },
          ),
        { wrapper: wrapper(true) },
      )

      expect(result.current.dimensionsLabel).toBe("10 × 20 in | 25.4 × 50.8 cm")
      expect(result.current.isShowingFramedDimensions).toBe(false)
      expect(result.current.shouldShowFrameText).toBe(true)
    })

    it("shows regular dimensions when flag is on but framed dimensions have no numbers", () => {
      const { result } = renderHook(
        () =>
          useArtworkDimensions(
            { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
            { in: "N/A", cm: "N/A" },
          ),
        { wrapper: wrapper(true) },
      )

      expect(result.current.dimensionsLabel).toBe("10 × 20 in | 25.4 × 50.8 cm")
      expect(result.current.isShowingFramedDimensions).toBe(false)
      expect(result.current.shouldShowFrameText).toBe(true)
    })
  })

  describe("Frame text", () => {
    it("returns 'Frame included' when frame details is 'Included'", () => {
      const { result } = renderHook(
        () =>
          useArtworkDimensions(
            { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
            undefined,
            { details: "Included" },
          ),
        { wrapper: wrapper(false) },
      )

      expect(result.current.frameText).toBe("Frame included")
      expect(result.current.shouldShowFrameText).toBe(true)
    })

    it("returns 'Frame not included' when unlisted and frame is not included", () => {
      const { result } = renderHook(
        () =>
          useArtworkDimensions(
            { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
            undefined,
            { details: "Not included" },
            true, // isUnlisted
          ),
        { wrapper: wrapper(false) },
      )

      expect(result.current.frameText).toBe("Frame not included")
    })

    it("returns null when frame details is not 'Included' and not unlisted", () => {
      const { result } = renderHook(
        () =>
          useArtworkDimensions(
            { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
            undefined,
            { details: "Not included" },
            false, // isUnlisted
          ),
        { wrapper: wrapper(false) },
      )

      expect(result.current.frameText).toBe(null)
    })

    it("returns null when framed dimensions are shown", () => {
      const { result } = renderHook(
        () =>
          useArtworkDimensions(
            { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
            { in: "12 × 22 in", cm: "30.5 × 55.9 cm" },
            { details: "Included" },
          ),
        { wrapper: wrapper(true) }, // flag ON
      )

      expect(result.current.frameText).toBe(null)
      expect(result.current.shouldShowFrameText).toBe(false)
      expect(result.current.isShowingFramedDimensions).toBe(true)
    })

    it("handles missing framed info", () => {
      const { result } = renderHook(
        () => useArtworkDimensions({ in: "10 × 20 in", cm: "25.4 × 50.8 cm" }),
        { wrapper: wrapper(false) },
      )

      expect(result.current.frameText).toBe(null)
    })
  })

  describe("Feature flag check", () => {
    it("checks the correct feature flag name", () => {
      renderHook(
        () =>
          useArtworkDimensions(
            { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
            { in: "12 × 22 in", cm: "30.5 × 55.9 cm" },
          ),
        { wrapper: wrapper(true) },
      )

      expect(mockFeatureFlags.isEnabled).toHaveBeenCalledWith(
        "topaz_framed-dims-on-artwork-page",
      )
    })
  })
})
