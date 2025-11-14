import {
  DEFAULT_OPT_IN_PREFERENCES,
  DEFAULT_OPT_OUT_PREFERENCES,
} from "Components/CookieConsentManager/categories"
import { useConsentRequired } from "Components/CookieConsentManager/useConsentRequired"
import { getENV } from "Utils/getENV"
import { getTimeZone } from "Utils/getTimeZone"
import { renderHook } from "@testing-library/react-hooks"

jest.mock("Utils/getTimeZone")
jest.mock("Utils/getENV")

const mockedGetTimeZone = getTimeZone as jest.MockedFunction<typeof getTimeZone>
const mockedGetENV = getENV as jest.MockedFunction<typeof getENV>

describe("useConsentRequired", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedGetENV.mockReturnValue("")

    window.history.pushState({}, "", "/")
  })

  describe("EU Detection", () => {
    it("should detect EU based on timezone", () => {
      mockedGetTimeZone.mockReturnValue("Europe/London")

      const { result } = renderHook(() => useConsentRequired())

      expect(result.current).toEqual({
        isEU: true,
        isCA: false,
        isBR: false,
        isOptIn: true,
        isOptOut: false,
        isDisplayable: true,
        initialPreferences: DEFAULT_OPT_IN_PREFERENCES,
      })
    })

    it("should detect EU based on ambiguous timezone", () => {
      mockedGetTimeZone.mockReturnValue("UTC")

      const { result } = renderHook(() => useConsentRequired())

      expect(result.current.isEU).toBe(true)
      expect(result.current.isOptIn).toBe(true)
    })

    it("should detect EU based on URL parameter", () => {
      mockedGetTimeZone.mockReturnValue("America/New_York")
      window.history.pushState({}, "", "/?geo=eu")

      const { result } = renderHook(() => useConsentRequired())

      expect(result.current.isEU).toBe(true)
      expect(result.current.isOptIn).toBe(true)
    })
  })

  describe("California Detection", () => {
    it("should detect California based on timezone", () => {
      mockedGetTimeZone.mockReturnValue("America/Los_Angeles")

      const { result } = renderHook(() => useConsentRequired())

      expect(result.current).toEqual({
        isEU: false,
        isCA: true,
        isBR: false,
        isOptIn: false,
        isOptOut: true,
        isDisplayable: true,
        initialPreferences: DEFAULT_OPT_OUT_PREFERENCES,
      })
    })
  })

  describe("Brazil Detection", () => {
    it("should detect Brazil based on timezone", () => {
      mockedGetTimeZone.mockReturnValue("America/Sao_Paulo")

      const { result } = renderHook(() => useConsentRequired())

      expect(result.current).toEqual({
        isEU: false,
        isCA: false,
        isBR: true,
        isOptIn: false,
        isOptOut: true,
        isDisplayable: true,
        initialPreferences: DEFAULT_OPT_OUT_PREFERENCES,
      })
    })
  })

  describe("GoogleBot Detection", () => {
    it("should not be displayable for GoogleBot", () => {
      mockedGetTimeZone.mockReturnValue("Europe/London")
      mockedGetENV.mockReturnValue(true)

      const { result } = renderHook(() => useConsentRequired())

      expect(result.current.isDisplayable).toBe(false)
    })

    it("should be displayable for non-GoogleBot", () => {
      mockedGetTimeZone.mockReturnValue("Europe/London")
      mockedGetENV.mockReturnValue(false)

      const { result } = renderHook(() => useConsentRequired())

      expect(result.current.isDisplayable).toBe(true)
    })
  })

  describe("Fallback Behavior", () => {
    it("should return restrictive defaults when Intl is undefined", () => {
      const originalIntl = global.Intl
      // @ts-expect-error
      delete global.Intl

      const { result } = renderHook(() => useConsentRequired())

      expect(result.current).toEqual({
        isEU: true,
        isCA: false,
        isBR: false,
        isOptOut: true,
        isOptIn: false,
        isDisplayable: true,
        initialPreferences: DEFAULT_OPT_OUT_PREFERENCES,
      })

      global.Intl = originalIntl
    })
  })
})
