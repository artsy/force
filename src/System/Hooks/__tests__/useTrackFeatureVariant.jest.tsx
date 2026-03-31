import { ActionType } from "@artsy/cohesion"
import { act, renderHook } from "@testing-library/react-hooks"
import { useRouter } from "System/Hooks/useRouter"
import {
  useTrackFeatureVariant,
  useTrackFeatureVariantOnMount,
} from "System/Hooks/useTrackFeatureVariant"

jest.mock("System/Hooks/useRouter")

const mockUseRouter = useRouter as jest.Mock

describe("useTrackFeatureVariant", () => {
  const mockTrack = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    window.analytics = { track: mockTrack }
    mockUseRouter.mockReturnValue({
      match: { location: { pathname: "/artist/andy-warhol" } },
    })
  })

  afterEach(() => {
    delete (window as { analytics?: { track: jest.Mock } }).analytics
  })

  describe("useTrackFeatureVariant", () => {
    it("fires experiment_viewed once when trackFeatureVariant is called twice for the same pathname", () => {
      const { result } = renderHook(() =>
        useTrackFeatureVariant({
          experimentName: "test-exp",
          variantName: "control",
        }),
      )

      act(() => {
        result.current.trackFeatureVariant()
      })
      expect(mockTrack).toHaveBeenCalledTimes(1)
      expect(mockTrack).toHaveBeenCalledWith(
        ActionType.experimentViewed,
        expect.objectContaining({
          experiment_name: "test-exp",
          variant_name: "control",
        }),
      )

      act(() => {
        result.current.trackFeatureVariant()
      })
      expect(mockTrack).toHaveBeenCalledTimes(1)
    })

    it("fires again when pathname changes within the same hook instance", () => {
      mockUseRouter.mockReturnValue({
        match: { location: { pathname: "/artist/first-artist" } },
      })

      const { result, rerender } = renderHook(() =>
        useTrackFeatureVariant({
          experimentName: "test-exp",
          variantName: "control",
        }),
      )

      act(() => {
        result.current.trackFeatureVariant()
      })
      expect(mockTrack).toHaveBeenCalledTimes(1)

      mockUseRouter.mockReturnValue({
        match: { location: { pathname: "/artist/second-artist" } },
      })
      rerender()

      act(() => {
        result.current.trackFeatureVariant()
      })
      expect(mockTrack).toHaveBeenCalledTimes(2)
    })

    it("does not fire when variantName is disabled", () => {
      const { result } = renderHook(() =>
        useTrackFeatureVariant({
          experimentName: "test-exp",
          variantName: "disabled",
        }),
      )

      act(() => {
        result.current.trackFeatureVariant()
      })
      expect(mockTrack).not.toHaveBeenCalled()
    })
  })

  describe("useTrackFeatureVariantOnMount", () => {
    it("fires experiment_viewed on mount", () => {
      renderHook(() =>
        useTrackFeatureVariantOnMount({
          experimentName: "test-exp",
          variantName: "control",
        }),
      )
      expect(mockTrack).toHaveBeenCalledTimes(1)
    })

    it("does not double-fire on rerender with same pathname", () => {
      const { rerender } = renderHook(() =>
        useTrackFeatureVariantOnMount({
          experimentName: "test-exp",
          variantName: "control",
        }),
      )
      expect(mockTrack).toHaveBeenCalledTimes(1)
      rerender()
      expect(mockTrack).toHaveBeenCalledTimes(1)
    })

    it("fires again when pathname changes", () => {
      mockUseRouter.mockReturnValue({
        match: { location: { pathname: "/artist/artist-a" } },
      })
      const { rerender } = renderHook(() =>
        useTrackFeatureVariantOnMount({
          experimentName: "test-exp",
          variantName: "control",
        }),
      )
      expect(mockTrack).toHaveBeenCalledTimes(1)

      mockUseRouter.mockReturnValue({
        match: { location: { pathname: "/artist/artist-b" } },
      })
      rerender()
      expect(mockTrack).toHaveBeenCalledTimes(2)
    })

    it("skips tracking when variant is disabled", () => {
      renderHook(() =>
        useTrackFeatureVariantOnMount({
          experimentName: "test-exp",
          variantName: "disabled",
        }),
      )
      expect(mockTrack).not.toHaveBeenCalled()
    })
  })
})
