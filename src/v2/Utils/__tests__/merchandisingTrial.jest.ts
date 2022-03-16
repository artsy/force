import { getENV } from "../getENV"
import { getDefaultSortValueByVariant } from "../merchandisingTrial"

jest.mock("v2/Utils/getENV")

describe("getDefaultSortValueByVariant", () => {
  let mockGetENV = getENV as jest.Mock

  describe("when A/B variant is CONTROL", () => {
    beforeEach(() => {
      mockGetENV.mockImplementation(() => "control")
    })

    it("returns uncurated sort when artist from the list of manually curated", () => {
      const result = getDefaultSortValueByVariant("jeff-koons")

      expect(result).toEqual("-decayed_merch_uncurated")
    })

    it("returns default sort when artist NOT from the list of manually curated", () => {
      const result = getDefaultSortValueByVariant("unknown-artist")

      expect(result).toEqual("-decayed_merch")
    })
  })

  describe("when A/B variant is EXPERIMENT", () => {
    beforeEach(() => {
      mockGetENV.mockImplementation(() => "experiment")
    })

    it("returns default sort when artist from the list of manually curated", () => {
      const result = getDefaultSortValueByVariant("jeff-koons")

      expect(result).toEqual("-decayed_merch")
    })

    it("returns default sort when artist NOT from the list of manually curated", () => {
      const result = getDefaultSortValueByVariant("unknown-artist")

      expect(result).toEqual("-decayed_merch")
    })
  })

  describe("when A/B variant is UNKNOWN", () => {
    beforeEach(() => {
      mockGetENV.mockImplementation(() => "unknown")
    })

    it("returns default sort when artist from the list of manually curated", () => {
      const result = getDefaultSortValueByVariant("jeff-koons")

      expect(result).toEqual("-decayed_merch")
    })

    it("returns default sort when artist NOT from the list of manually curated", () => {
      const result = getDefaultSortValueByVariant("unknown-artist")

      expect(result).toEqual("-decayed_merch")
    })
  })
})
