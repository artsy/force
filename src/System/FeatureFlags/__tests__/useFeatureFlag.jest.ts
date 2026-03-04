jest.unmock("System/FeatureFlags/useFeatureFlag")

import {
  useFlag as useUnleashFlag,
  useVariant as useUnleashVariant,
} from "@unleash/proxy-client-react"
import * as overrides from "System/FeatureFlags/featureFlagOverrides"
import { useFlag, useVariant } from "System/FeatureFlags/useFeatureFlag"
import { renderHook } from "@testing-library/react-hooks"

jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn().mockReturnValue(false),
  useVariant: jest.fn().mockReturnValue({
    name: "disabled",
    enabled: false,
    feature_enabled: false,
    payload: undefined,
  }),
}))

jest.mock("System/FeatureFlags/featureFlagOverrides", () => ({
  getOverride: jest.fn().mockReturnValue(undefined),
}))

const mockGetOverride = overrides.getOverride as jest.Mock
const mockUseUnleashFlag = useUnleashFlag as jest.Mock
const mockUseUnleashVariant = useUnleashVariant as jest.Mock

describe("useFeatureFlag", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseUnleashFlag.mockReturnValue(false)
    mockUseUnleashVariant.mockReturnValue({
      name: "disabled",
      enabled: false,
      feature_enabled: false,
      payload: undefined,
    })
    mockGetOverride.mockReturnValue(undefined)
  })

  describe("useFlag", () => {
    it("delegates to Unleash when no override exists", () => {
      mockUseUnleashFlag.mockReturnValue(true)

      const { result } = renderHook(() => useFlag("my-flag"))

      expect(result.current).toBe(true)
      expect(mockUseUnleashFlag).toHaveBeenCalledWith("my-flag")
    })

    it("returns true when override is 'true'", () => {
      mockGetOverride.mockReturnValue("true")

      const { result } = renderHook(() => useFlag("my-flag"))

      expect(result.current).toBe(true)
    })

    it("returns false when override is 'false'", () => {
      mockUseUnleashFlag.mockReturnValue(true)
      mockGetOverride.mockReturnValue("false")

      const { result } = renderHook(() => useFlag("my-flag"))

      expect(result.current).toBe(false)
    })

    it("returns false for any non-'true' override value", () => {
      mockGetOverride.mockReturnValue("experiment")

      const { result } = renderHook(() => useFlag("my-flag"))

      expect(result.current).toBe(false)
    })
  })

  describe("useVariant", () => {
    it("delegates to Unleash when no override exists", () => {
      const unleashVariant = {
        name: "control",
        enabled: true,
        feature_enabled: true,
        payload: { type: "string", value: "data" },
      }
      mockUseUnleashVariant.mockReturnValue(unleashVariant)

      const { result } = renderHook(() => useVariant("my-experiment"))

      expect(result.current).toEqual(unleashVariant)
      expect(mockUseUnleashVariant).toHaveBeenCalledWith("my-experiment")
    })

    it("returns experiment variant when override is 'experiment'", () => {
      mockGetOverride.mockReturnValue("experiment")

      const { result } = renderHook(() => useVariant("my-experiment"))

      expect(result.current).toEqual({
        name: "experiment",
        enabled: true,
        feature_enabled: true,
        payload: undefined,
      })
    })

    it("returns control variant when override is 'control'", () => {
      mockGetOverride.mockReturnValue("control")

      const { result } = renderHook(() => useVariant("my-experiment"))

      expect(result.current).toEqual({
        name: "control",
        enabled: true,
        feature_enabled: true,
        payload: undefined,
      })
    })

    it("returns disabled variant when override is 'disabled'", () => {
      mockGetOverride.mockReturnValue("disabled")

      const { result } = renderHook(() => useVariant("my-experiment"))

      expect(result.current).toEqual({
        name: "disabled",
        enabled: false,
        feature_enabled: false,
        payload: undefined,
      })
    })

    it("returns disabled variant when override is 'false'", () => {
      mockGetOverride.mockReturnValue("false")

      const { result } = renderHook(() => useVariant("my-experiment"))

      expect(result.current).toEqual({
        name: "disabled",
        enabled: false,
        feature_enabled: false,
        payload: undefined,
      })
    })

    it("preserves payload from Unleash when overriding to enabled variant", () => {
      const payload = { type: "string", value: "test-data" }
      mockUseUnleashVariant.mockReturnValue({
        name: "control",
        enabled: true,
        feature_enabled: true,
        payload,
      })
      mockGetOverride.mockReturnValue("experiment")

      const { result } = renderHook(() => useVariant("my-experiment"))

      expect(result.current.payload).toEqual(payload)
    })
  })
})
