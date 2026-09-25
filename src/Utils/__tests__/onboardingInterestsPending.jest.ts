import {
  ONBOARDING_INTERESTS,
  clearOnboardingInterestsPending,
  markOnboardingInterestsPending,
  useOnboardingInterestsPending,
  pendingInterestsSchema,
} from "../onboardingInterestsPending"
import { act, renderHook } from "@testing-library/react"

describe("onboardingInterestsPending", () => {
  beforeEach(() => {
    sessionStorage.clear()
    clearOnboardingInterestsPending()
  })

  it("returns the interests that were marked pending", () => {
    const { result } = renderHook(() => useOnboardingInterestsPending())

    act(() => {
      markOnboardingInterestsPending([
        "Buying art",
        "Reading about art and artists",
      ])
    })

    expect(result.current).toEqual([
      "Buying art",
      "Reading about art and artists",
    ])
  })

  it("clears interests correctly", () => {
    const { result } = renderHook(() => useOnboardingInterestsPending())

    act(() => {
      markOnboardingInterestsPending(["Buying art"])
      clearOnboardingInterestsPending()
    })

    expect(result.current).toEqual([])
  })

  it("returns an empty array when sessionStorage is empty", () => {
    const { result } = renderHook(() => useOnboardingInterestsPending())

    expect(result.current).toEqual([])
  })

  it("accepts every value in ONBOARDING_INTERESTS", () => {
    const { result } = renderHook(() => useOnboardingInterestsPending())

    act(() => {
      markOnboardingInterestsPending([...ONBOARDING_INTERESTS])
    })

    expect(result.current).toEqual([...ONBOARDING_INTERESTS])
  })
})

describe("pendingInterestsSchema", () => {
  it("rejects an array containing an invalid interest", () => {
    expect(() =>
      pendingInterestsSchema.validateSync(
        ["Buying art", "Not a real interest"],
        { strict: true },
      ),
    ).toThrow()
  })
})
