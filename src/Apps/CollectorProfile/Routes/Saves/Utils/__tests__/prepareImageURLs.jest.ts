import { prepareImageURLs } from "Apps/CollectorProfile/Routes/Saves/Utils/prepareImageURLs"

describe("prepareImageURLs", () => {
  describe("should always return 4 items", () => {
    it("when an empty array is passed", () => {
      expect(prepareImageURLs([])).toEqual([null, null, null, null])
    })

    it("when not the entire array is passed", () => {
      expect(prepareImageURLs(["url-1", "url-2"])).toEqual([
        "url-1",
        "url-2",
        null,
        null,
      ])
    })

    it("when more elements are passed than expected", () => {
      const input = ["url-1", "url-2", "url-3", "url-4", "url-5"]
      const output = ["url-1", "url-2", "url-3", "url-4"]

      expect(prepareImageURLs(input)).toEqual(output)
    })

    it("when the expected count of elements is passed", () => {
      const input = ["url-1", "url-2", "url-3", "url-4"]

      expect(prepareImageURLs(input)).toEqual(input)
    })
  })

  it("should correctly handle not allowed/unexpected elements", () => {
    const input = ["url-1", null, undefined, "url-4"] as Array<string | null>
    const output = ["url-1", null, null, "url-4"]

    expect(prepareImageURLs(input)).toEqual(output)
  })
})
