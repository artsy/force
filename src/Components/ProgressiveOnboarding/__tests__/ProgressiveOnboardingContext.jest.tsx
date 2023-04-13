import { renderHook } from "@testing-library/react-hooks"
import {
  ProgressiveOnboardingProvider,
  __dismiss__,
  get,
  parse,
  reset,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"

describe("ProgressiveOnboardingContext", () => {
  const id = "user"

  describe("get", () => {
    afterEach(() => reset(id))

    it("returns an empty array if there is no value in local storage", () => {
      expect(get(id)).toEqual([])
    })

    it("returns the all dismissed keys if there is a value in local storage", () => {
      __dismiss__(id, "follow-artist")
      expect(get(id)).toEqual(["follow-artist"])
      __dismiss__(id, "follow-find")
      expect(get(id)).toEqual(["follow-artist", "follow-find"])
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
          JSON.stringify(["follow-artist", "follow-find", "follow-highlight"])
        )
      ).toEqual(["follow-artist", "follow-find", "follow-highlight"])
    })

    it("returns only the valid keys", () => {
      expect(
        parse(
          id,
          JSON.stringify([
            "follow-artist",
            "follow-find",
            "follow-highlight",
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
      ).toEqual(["follow-artist", "follow-find", "follow-highlight"])
    })
  })

  describe("__dismiss__", () => {
    afterEach(() => reset(id))

    it("adds the key to local storage", () => {
      __dismiss__(id, "follow-artist")
      expect(get(id)).toEqual(["follow-artist"])
    })

    it("adds multiple keys to local storage", () => {
      __dismiss__(id, ["follow-artist", "follow-find"])
      expect(get(id)).toEqual(["follow-artist", "follow-find"])
    })

    it("does not add duplicate keys to local storage", () => {
      __dismiss__(id, "follow-artist")
      expect(get(id)).toEqual(["follow-artist"])
      __dismiss__(id, "follow-artist")
      expect(get(id)).toEqual(["follow-artist"])
    })

    it('handles subsequent calls to "dismiss"', () => {
      __dismiss__(id, "follow-artist")
      expect(get(id)).toEqual(["follow-artist"])
      __dismiss__(id, "follow-find")
      expect(get(id)).toEqual(["follow-artist", "follow-find"])
      __dismiss__(id, "follow-highlight")
      expect(get(id)).toEqual([
        "follow-artist",
        "follow-find",
        "follow-highlight",
      ])
    })
  })

  describe("dismiss", () => {
    afterEach(() => reset(id))

    const wrapper = ({ children }) => (
      <ProgressiveOnboardingProvider>{children}</ProgressiveOnboardingProvider>
    )

    it("dismisses keys", () => {
      const { result } = renderHook(useProgressiveOnboarding, { wrapper })

      result.current.dismiss("follow-artist")
      expect(result.current.isDismissed("follow-artist")).toBe(true)
      expect(result.current.isDismissed("follow-find")).toBe(false)
      expect(result.current.isDismissed("follow-highlight")).toBe(false)

      expect(get(id)).toEqual(["follow-artist"])

      result.current.dismiss(["follow-find", "follow-highlight"])
      expect(result.current.isDismissed("follow-artist")).toBe(true)
      expect(result.current.isDismissed("follow-find")).toBe(true)
      expect(result.current.isDismissed("follow-highlight")).toBe(true)

      expect(get(id)).toEqual([
        "follow-artist",
        "follow-find",
        "follow-highlight",
      ])
    })
  })
})
