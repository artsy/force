import { getCurrentTimeAsIsoString } from "Utils/getCurrentTimeAsIsoString"
import { DateTime } from "luxon"

describe("getCurrentTimeAsIsoString", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("returns current time in UTC as ISO string", () => {
    jest.useFakeTimers()
    const fixedDate = new Date("2023-10-15T14:30:00.000Z")
    jest.setSystemTime(fixedDate)

    const result = getCurrentTimeAsIsoString()
    const parsedResult = DateTime.fromISO(result, { zone: "utc" })

    expect(parsedResult.zoneName).toBe("UTC")
    expect(result).toBe("2023-10-15T14:30:00.000Z")
  })

  it("returns UTC time regardless of system timezone", () => {
    jest.useFakeTimers()
    const fixedDate = new Date("2023-10-15T14:30:00.000Z")
    jest.setSystemTime(fixedDate)

    const originalTimeZone = process.env.TZ
    process.env.TZ = "America/New_York"

    const result = getCurrentTimeAsIsoString()

    expect(result).toBe("2023-10-15T14:30:00.000Z")
    expect(result.endsWith("Z")).toBe(true)

    process.env.TZ = originalTimeZone
  })

  it("returns consistent format for timezone handling", () => {
    jest.useFakeTimers()
    const fixedDate = new Date("2023-10-15T14:30:00.000Z")
    jest.setSystemTime(fixedDate)

    const result = getCurrentTimeAsIsoString()

    expect(() => DateTime.fromISO(result)).not.toThrow()
    expect(result).toMatch(/Z$/)
  })

  it("maintains consistency between server and client rendering", () => {
    jest.useFakeTimers()
    const fixedDate = new Date("2023-10-15T14:30:00.000Z")
    jest.setSystemTime(fixedDate)

    const call1 = getCurrentTimeAsIsoString()
    const call2 = getCurrentTimeAsIsoString()

    expect(call1).toBe("2023-10-15T14:30:00.000Z")
    expect(call2).toBe("2023-10-15T14:30:00.000Z")
    expect(call1).toBe(call2)
  })
})
