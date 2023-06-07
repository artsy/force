import { validateSegmentResponse } from "../validateSegmentResponse"

describe("validateSegmentResponse", () => {
  it("returns true if destinations is an empty array", () => {
    expect(validateSegmentResponse([])).toBe(true)
  })
  it("returns true if destinations has good data", () => {
    expect(validateSegmentResponse([{ creationName: "foo" }])).toBe(true)
  })
  it("returns false if destinations is not an array", () => {
    expect(validateSegmentResponse("foo")).toBe(false)
  })
  it("returns false if a destination has no creationName key", () => {
    const destinations = [{ creationName: "foo" }, { blah: "blah" }]
    expect(validateSegmentResponse(destinations)).toBe(false)
  })
  it("returns false if a destination has creationName key but its value is not a string", () => {
    const destinations = [{ creationName: "foo" }, { blah: {} }]
    expect(validateSegmentResponse(destinations)).toBe(false)
  })
})
