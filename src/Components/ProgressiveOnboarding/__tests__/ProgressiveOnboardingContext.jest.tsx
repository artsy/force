import {
  __dismiss__,
  get,
  parse,
  reset,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"

describe("ProgressiveOnboardingContext", () => {
  const id = "example"

  describe("get", () => {
    afterEach(() => reset(id))

    it("returns an empty array if there is no value in local storage", () => {
      expect(get(id)).toEqual([])
    })

    it("returns the all dismissed keys if there is a value in local storage", () => {
      __dismiss__(id, "follow-artist")
      expect(get(id)).toEqual(["follow-artist"])
      __dismiss__(id, "find-follows")
      expect(get(id)).toEqual(["follow-artist", "find-follows"])
    })

    it("does not return duplicate keys", () => {
      __dismiss__(id, "follow-artist")
      expect(get(id)).toEqual(["follow-artist"])
      __dismiss__(id, "follow-artist")
      expect(get(id)).toEqual(["follow-artist"])
    })
  })

  describe("parse", () => {
    it("returns an empty array if the value is null", () => {
      expect(parse(id, null)).toEqual([])
    })

    it("returns an empty array if the value is not an array", () => {
      expect(parse(id, "foo")).toEqual([])
    })

    it("returns an empty array if the value is an array of non-strings", () => {
      expect(parse(id, JSON.stringify([1, 2, 3]))).toEqual([])
    })

    it("returns an empty array if the value is an array of strings that are not valid keys", () => {
      expect(parse(id, JSON.stringify(["foo", "bar", "baz"]))).toEqual([])
    })

    it("returns an array of valid keys if the value is an array of strings that are valid keys", () => {
      expect(
        parse(
          id,
          JSON.stringify(["follow-artist", "find-follows", "follows-highlight"])
        )
      ).toEqual(["follow-artist", "find-follows", "follows-highlight"])
    })

    it("returns only the valid keys", () => {
      expect(
        parse(
          id,
          JSON.stringify([
            "follow-artist",
            "find-follows",
            "follows-highlight",
            "foo",
            "bar",
            "baz",
            1,
            2,
            true,
            false,
            null,
            undefined,
          ])
        )
      ).toEqual(["follow-artist", "find-follows", "follows-highlight"])
    })
  })
})
