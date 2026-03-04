import {
  getOverride,
  getOverrides,
  parseUnleashParam,
  syncOverridesFromURL,
} from "System/FeatureFlags/featureFlagOverrides"

const STORAGE_KEY = "unleash_overrides"

describe("featureFlagOverrides", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe("parseUnleashParam", () => {
    it("returns an empty object for an empty string", () => {
      expect(parseUnleashParam("")).toEqual({})
    })

    it("parses a single flag override", () => {
      expect(parseUnleashParam("my-flag:true")).toEqual({
        "my-flag": "true",
      })
    })

    it("parses multiple flag overrides", () => {
      expect(
        parseUnleashParam("flag-a:true,flag-b:experiment,flag-c:false")
      ).toEqual({
        "flag-a": "true",
        "flag-b": "experiment",
        "flag-c": "false",
      })
    })

    it("trims whitespace from names and values", () => {
      expect(parseUnleashParam(" my-flag : true ")).toEqual({
        "my-flag": "true",
      })
    })

    it("handles colons in values", () => {
      expect(parseUnleashParam("my-flag:some:value")).toEqual({
        "my-flag": "some:value",
      })
    })

    it("skips entries without a value", () => {
      expect(parseUnleashParam("my-flag")).toEqual({})
    })
  })

  describe("syncOverridesFromURL", () => {
    function setURL(search: string) {
      Object.defineProperty(window, "location", {
        value: { search },
        writable: true,
      })
    }

    it("does nothing when the unleash param is absent", () => {
      setURL("")
      syncOverridesFromURL()
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })

    it("writes parsed overrides to localStorage", () => {
      setURL("?unleash=my-flag:true")
      syncOverridesFromURL()
      expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual({
        "my-flag": "true",
      })
    })

    it("merges with existing overrides", () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ "existing-flag": "control" })
      )
      setURL("?unleash=new-flag:experiment")
      syncOverridesFromURL()
      expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual({
        "existing-flag": "control",
        "new-flag": "experiment",
      })
    })

    it("overwrites existing values for the same flag", () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ "my-flag": "control" })
      )
      setURL("?unleash=my-flag:experiment")
      syncOverridesFromURL()
      expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual({
        "my-flag": "experiment",
      })
    })

    it("clears all overrides when the unleash param is empty", () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ "my-flag": "true" })
      )
      setURL("?unleash=")
      syncOverridesFromURL()
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })
  })

  describe("getOverrides", () => {
    it("returns an empty object when nothing is stored", () => {
      expect(getOverrides()).toEqual({})
    })

    it("returns stored overrides", () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ "my-flag": "true" })
      )
      expect(getOverrides()).toEqual({ "my-flag": "true" })
    })

    it("returns an empty object on corrupted storage", () => {
      localStorage.setItem(STORAGE_KEY, "not-json")
      expect(getOverrides()).toEqual({})
    })
  })

  describe("getOverride", () => {
    it("returns undefined for a non-overridden flag", () => {
      expect(getOverride("unknown-flag")).toBeUndefined()
    })

    it("returns the override value for an overridden flag", () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ "my-flag": "experiment" })
      )
      expect(getOverride("my-flag")).toBe("experiment")
    })
  })
})
