import type { AuctionResultsFilters } from "../../initialAuctionResultsFilterState"
import { extractAuctionResultPillsFromCriteria } from "../extractAuctionResultPills"

describe("extractAuctionResultPillsFromCriteria", () => {
  it("returns empty array for empty criteria", () => {
    const result = extractAuctionResultPillsFromCriteria({
      criteria: {},
    })
    expect(result).toEqual([])
  })

  describe("array-based filters", () => {
    it("extracts organization pills with proper display names", () => {
      const criteria: Partial<AuctionResultsFilters> = {
        organizations: ["Sotheby's", "Christie's"],
      }
      const result = extractAuctionResultPillsFromCriteria({
        criteria: criteria as AuctionResultsFilters,
      })

      expect(result).toEqual([
        {
          field: "organizations",
          value: "Sotheby's",
          displayValue: "Sotheby's",
        },
        {
          field: "organizations",
          value: "Christie's",
          displayValue: "Christie's",
        },
      ])
    })

    it("extracts category pills with proper display names", () => {
      const criteria: Partial<AuctionResultsFilters> = {
        categories: ["Painting", "Sculpture"],
      }
      const result = extractAuctionResultPillsFromCriteria({
        criteria: criteria as AuctionResultsFilters,
      })

      expect(result).toEqual([
        {
          field: "categories",
          value: "Painting",
          displayValue: "Painting",
        },
        {
          field: "categories",
          value: "Sculpture",
          displayValue: "Sculpture",
        },
      ])
    })

    it("extracts size pills with metric-specific display names", () => {
      const criteria: Partial<AuctionResultsFilters> = {
        sizes: ["SMALL", "LARGE"],
      }

      // Test with cm metric
      const resultCm = extractAuctionResultPillsFromCriteria({
        criteria: criteria as AuctionResultsFilters,
        metric: "cm",
      })
      expect(resultCm).toEqual([
        {
          field: "sizes",
          value: "SMALL",
          displayValue: "Small (under 40cm)",
        },
        {
          field: "sizes",
          value: "LARGE",
          displayValue: "Large (over 100cm)",
        },
      ])

      // Test with inch metric
      const resultIn = extractAuctionResultPillsFromCriteria({
        criteria: criteria as AuctionResultsFilters,
        metric: "in",
      })
      expect(resultIn).toEqual([
        {
          field: "sizes",
          value: "SMALL",
          displayValue: "Small (under 16in)",
        },
        {
          field: "sizes",
          value: "LARGE",
          displayValue: "Large (over 40in)",
        },
      ])
    })
  })

  describe("boolean filters", () => {
    it("extracts hideUpcoming when true", () => {
      const criteria: Partial<AuctionResultsFilters> = {
        hideUpcoming: true,
      }
      const result = extractAuctionResultPillsFromCriteria({
        criteria: criteria as AuctionResultsFilters,
      })

      expect(result).toEqual([
        {
          field: "hideUpcoming",
          value: "true",
          displayValue: "Hide Upcoming",
        },
      ])
    })

    it("does not extract hideUpcoming when false", () => {
      const criteria: Partial<AuctionResultsFilters> = {
        hideUpcoming: false,
      }
      const result = extractAuctionResultPillsFromCriteria({
        criteria: criteria as AuctionResultsFilters,
      })

      expect(result).toEqual([])
    })

    it("extracts inverted boolean filters correctly", () => {
      const criteria: Partial<AuctionResultsFilters> = {
        includeUnknownPrices: false,
        allowEmptyCreatedDates: false,
      }
      const result = extractAuctionResultPillsFromCriteria({
        criteria: criteria as AuctionResultsFilters,
      })

      expect(result).toEqual([
        {
          field: "includeUnknownPrices",
          value: "false",
          displayValue: "Exclude Unknown Prices",
        },
        {
          field: "allowEmptyCreatedDates",
          value: "false",
          displayValue: "Exclude Unknown Creation Dates",
        },
      ])
    })
  })

  describe("string filters", () => {
    it("extracts keyword pills", () => {
      const criteria: Partial<AuctionResultsFilters> = {
        keyword: "abstract",
      }
      const result = extractAuctionResultPillsFromCriteria({
        criteria: criteria as AuctionResultsFilters,
      })

      expect(result).toEqual([
        {
          field: "keyword",
          value: "abstract",
          displayValue: "Keyword: abstract",
        },
      ])
    })

    it("extracts currency pills", () => {
      const criteria: Partial<AuctionResultsFilters> = {
        currency: "USD",
      }
      const result = extractAuctionResultPillsFromCriteria({
        criteria: criteria as AuctionResultsFilters,
      })

      expect(result).toEqual([
        {
          field: "currency",
          value: "USD",
          displayValue: "USD",
        },
      ])
    })

    it("extracts custom price range pills", () => {
      const criteria: Partial<AuctionResultsFilters> = {
        priceRange: "1000-5000",
      }
      const result = extractAuctionResultPillsFromCriteria({
        criteria: criteria as AuctionResultsFilters,
      })

      expect(result).toEqual([
        {
          field: "priceRange",
          value: "1000-5000",
          displayValue: "$1000–$5000",
        },
      ])
    })
  })

  describe("year range filters", () => {
    it("extracts created year range pill when both years are set", () => {
      const criteria: Partial<AuctionResultsFilters> = {
        createdAfterYear: 2020,
        createdBeforeYear: 2023,
      }
      const result = extractAuctionResultPillsFromCriteria({
        criteria: criteria as AuctionResultsFilters,
      })

      expect(result).toEqual([
        {
          field: "createdYear",
          value: "2020-2023",
          displayValue: "Created: 2020–2023",
        },
      ])
    })

    it("extracts single created year pill when years are the same", () => {
      const criteria: Partial<AuctionResultsFilters> = {
        createdAfterYear: 2022,
        createdBeforeYear: 2022,
      }
      const result = extractAuctionResultPillsFromCriteria({
        criteria: criteria as AuctionResultsFilters,
      })

      expect(result).toEqual([
        {
          field: "createdYear",
          value: "2022",
          displayValue: "Created: 2022",
        },
      ])
    })

    it("extracts only start year pill when end year is not set", () => {
      const criteria: Partial<AuctionResultsFilters> = {
        createdAfterYear: 2020,
      }
      const result = extractAuctionResultPillsFromCriteria({
        criteria: criteria as AuctionResultsFilters,
      })

      expect(result).toEqual([
        {
          field: "createdYearStartYear",
          value: "2020",
          displayValue: "Created after: 2020",
        },
      ])
    })

    it("does not show year pills when they match initial state", () => {
      const criteria: Partial<AuctionResultsFilters> = {
        createdAfterYear: 1900,
        createdBeforeYear: 2024,
      }
      const initialState: Partial<AuctionResultsFilters> = {
        createdAfterYear: 1900,
        createdBeforeYear: 2024,
      }
      const result = extractAuctionResultPillsFromCriteria({
        criteria: criteria as AuctionResultsFilters,
        initialState: initialState as AuctionResultsFilters,
      })

      expect(result).toEqual([])
    })
  })

  describe("multiple filters", () => {
    it("extracts pills from multiple filter types", () => {
      const criteria: Partial<AuctionResultsFilters> = {
        organizations: ["Phillips"],
        keyword: "landscape",
        hideUpcoming: true,
        createdAfterYear: 2020,
        createdBeforeYear: 2023,
      }
      const result = extractAuctionResultPillsFromCriteria({
        criteria: criteria as AuctionResultsFilters,
      })

      expect(result).toHaveLength(4)
      expect(result).toEqual(
        expect.arrayContaining([
          {
            field: "organizations",
            value: "Phillips",
            displayValue: "Phillips",
          },
          {
            field: "keyword",
            value: "landscape",
            displayValue: "Keyword: landscape",
          },
          {
            field: "hideUpcoming",
            value: "true",
            displayValue: "Hide Upcoming",
          },
          {
            field: "createdYear",
            value: "2020-2023",
            displayValue: "Created: 2020–2023",
          },
        ])
      )
    })
  })
})
