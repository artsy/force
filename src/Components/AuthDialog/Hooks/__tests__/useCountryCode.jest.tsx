import { renderHook } from "@testing-library/react"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { getENV } from "Utils/getENV"

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))

const mockGetENV = getENV as jest.Mock

const subscribedFor = (countryCode: string) => {
  mockGetENV.mockReturnValue(countryCode)
  return renderHook(() => useCountryCode()).result.current
    .isAutomaticallySubscribed
}

describe("useCountryCode", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("auto-subscribes visitors from non-GDPR countries", () => {
    expect(subscribedFor("US")).toBe(true)
  })

  it("does not auto-subscribe visitors from GDPR countries", () => {
    expect(subscribedFor("FR")).toBe(false)
    expect(subscribedFor("GB")).toBe(false)
  })

  it("normalizes casing and surrounding whitespace", () => {
    expect(subscribedFor(" us ")).toBe(true)
    expect(subscribedFor(" de ")).toBe(false)
  })

  it("fails safe to GDPR when the country is unknown", () => {
    expect(subscribedFor("")).toBe(false)
    expect(subscribedFor("XX")).toBe(false)
    expect(subscribedFor("T1")).toBe(false)
  })

  it("fails safe to GDPR when the header is missing entirely", () => {
    mockGetENV.mockReturnValue(undefined)
    const { result } = renderHook(() => useCountryCode())
    expect(result.current.isAutomaticallySubscribed).toBe(false)
  })
})
