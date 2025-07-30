import { buildPaginatedHeading } from "./PaginationMeta"

describe("PaginationMeta", () => {
  describe("buildPaginatedHeading", () => {
    it("returns heading without prefix for page 1", () => {
      const result = buildPaginatedHeading("Auction Results", 1)
      expect(result).toBe("Auction Results")
    })

    it("adds page prefix for pages > 1", () => {
      const result = buildPaginatedHeading("Auction Results", 2)
      expect(result).toBe("Page 2: Auction Results")
    })

    it("handles page numbers correctly", () => {
      const result = buildPaginatedHeading("Test Heading", 15)
      expect(result).toBe("Page 15: Test Heading")
    })
  })
})
