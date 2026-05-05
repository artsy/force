import { renderHook } from "@testing-library/react-hooks"
import { useArtworkDimensions } from "../useArtworkDimensions"

describe("useArtworkDimensions", () => {
  describe("Basic dimension formatting", () => {
    it("formats dimensions with both in and cm", () => {
      const { result } = renderHook(() =>
        useArtworkDimensions({
          dimensions: {
            in: "10 × 20 in",
            cm: "25.4 × 50.8 cm",
          },
        }),
      )

      expect(result.current.dimensionsLabel).toBe("10 × 20 in | 25.4 × 50.8 cm")
      expect(result.current.hasDimensions).toBe(true)
    })

    it("formats dimensions with only in", () => {
      const { result } = renderHook(() =>
        useArtworkDimensions({
          dimensions: {
            in: "10 × 20 in",
            cm: null,
          },
        }),
      )

      expect(result.current.dimensionsLabel).toBe("10 × 20 in")
      expect(result.current.hasDimensions).toBe(true)
    })

    it("formats dimensions with only cm", () => {
      const { result } = renderHook(() =>
        useArtworkDimensions({
          dimensions: {
            in: null,
            cm: "25.4 × 50.8 cm",
          },
        }),
      )

      expect(result.current.dimensionsLabel).toBe("25.4 × 50.8 cm")
      expect(result.current.hasDimensions).toBe(true)
    })

    it("returns null when no dimensions", () => {
      const { result } = renderHook(() =>
        useArtworkDimensions({
          dimensions: {
            in: null,
            cm: null,
          },
        }),
      )

      expect(result.current.dimensionsLabel).toBeNull()
      expect(result.current.hasDimensions).toBe(false)
    })

    it("returns null when dimensions is null", () => {
      const { result } = renderHook(() =>
        useArtworkDimensions({ dimensions: null }),
      )

      expect(result.current.dimensionsLabel).toBeNull()
    })

    it("returns null when dimensions is undefined", () => {
      const { result } = renderHook(() =>
        useArtworkDimensions({ dimensions: undefined }),
      )

      expect(result.current.dimensionsLabel).toBeNull()
    })
  })

  describe("Framed dimensions", () => {
    it("shows framed dimensions when framed dimensions exist", () => {
      const { result } = renderHook(() =>
        useArtworkDimensions({
          dimensions: { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
          framedDimensions: { in: "12 × 22 in", cm: "30.5 × 55.9 cm" },
        }),
      )

      expect(result.current.dimensionsLabel).toBe(
        "12 × 22 in | 30.5 × 55.9 cm with frame included",
      )
      expect(result.current.dimensionsLabelWithoutFrameText).toBe(
        "12 × 22 in | 30.5 × 55.9 cm",
      )
      expect(result.current.isShowingFramedDimensions).toBe(true)
      expect(result.current.shouldShowFrameText).toBe(false)
    })

    it("shows regular dimensions when framed dimensions are null", () => {
      const { result } = renderHook(() =>
        useArtworkDimensions({
          dimensions: { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
          framedDimensions: null,
        }),
      )

      expect(result.current.dimensionsLabel).toBe("10 × 20 in | 25.4 × 50.8 cm")
      expect(result.current.isShowingFramedDimensions).toBe(false)
      expect(result.current.shouldShowFrameText).toBe(true)
    })

    it("shows regular dimensions when framed dimensions are empty", () => {
      const { result } = renderHook(() =>
        useArtworkDimensions({
          dimensions: { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
          framedDimensions: { in: null, cm: null },
        }),
      )

      expect(result.current.dimensionsLabel).toBe("10 × 20 in | 25.4 × 50.8 cm")
      expect(result.current.isShowingFramedDimensions).toBe(false)
      expect(result.current.shouldShowFrameText).toBe(true)
    })

    it("shows regular dimensions when framed dimensions have no numbers", () => {
      const { result } = renderHook(() =>
        useArtworkDimensions({
          dimensions: { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
          framedDimensions: { in: "N/A", cm: "N/A" },
        }),
      )

      expect(result.current.dimensionsLabel).toBe("10 × 20 in | 25.4 × 50.8 cm")
      expect(result.current.isShowingFramedDimensions).toBe(false)
      expect(result.current.shouldShowFrameText).toBe(true)
    })
  })

  describe("Frame text", () => {
    it("returns 'Frame included' when frame details is 'Included'", () => {
      const { result } = renderHook(() =>
        useArtworkDimensions({
          dimensions: { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
          framed: { details: "Included" },
        }),
      )

      expect(result.current.frameText).toBe("Frame included")
      expect(result.current.shouldShowFrameText).toBe(true)
    })

    it("returns 'Frame not included' when unlisted and frame is not included", () => {
      const { result } = renderHook(() =>
        useArtworkDimensions({
          dimensions: { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
          framed: { details: "Not included" },
          isUnlisted: true,
        }),
      )

      expect(result.current.frameText).toBe("Frame not included")
    })

    it("returns null when frame details is not 'Included' and not unlisted", () => {
      const { result } = renderHook(() =>
        useArtworkDimensions({
          dimensions: { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
          framed: { details: "Not included" },
          isUnlisted: false,
        }),
      )

      expect(result.current.frameText).toBe(null)
    })

    it("returns null when framed dimensions are shown", () => {
      const { result } = renderHook(() =>
        useArtworkDimensions({
          dimensions: { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
          framedDimensions: { in: "12 × 22 in", cm: "30.5 × 55.9 cm" },
          framed: { details: "Included" },
        }),
      )

      expect(result.current.frameText).toBe(null)
      expect(result.current.shouldShowFrameText).toBe(false)
      expect(result.current.isShowingFramedDimensions).toBe(true)
    })

    it("handles missing framed info", () => {
      const { result } = renderHook(() =>
        useArtworkDimensions({
          dimensions: { in: "10 × 20 in", cm: "25.4 × 50.8 cm" },
        }),
      )

      expect(result.current.frameText).toBe(null)
    })
  })
})
