import { getENV } from "Utils/getENV"
import { getMerchandisingPartnerSlugs } from "../getMerchandisingPartnerSlugs"

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))

describe("getMerchandisingPartnerSlugs", () => {
  const mockGetENV = getENV as jest.Mock

  describe("should return empty array", () => {
    it("when env is undefined", () => {
      const slugs = getMerchandisingPartnerSlugs()
      expect(slugs).toEqual([])
    })

    it("when env is NOT string", () => {
      mockGetENV.mockImplementation(key => {
        switch (key) {
          case "ARTSY_MERCHANDISING_PARTNER_SLUGS":
            return true
        }
      })

      const slugs = getMerchandisingPartnerSlugs()
      expect(slugs).toEqual([])
    })
  })

  it("should return parsed slugs from env string", () => {
    mockGetENV.mockImplementation(key => {
      switch (key) {
        case "ARTSY_MERCHANDISING_PARTNER_SLUGS":
          return "slug-1,slug-2,slug-3"
      }
    })

    const slugs = getMerchandisingPartnerSlugs()
    expect(slugs).toEqual(["slug-1", "slug-2", "slug-3"])
  })
})
