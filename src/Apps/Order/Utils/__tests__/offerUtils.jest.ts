import {
  lastOfferNote,
  getInitialOfferState,
  getOfferPriceOptions,
} from "Apps/Order/Utils/offerUtils"

describe("offer utils", () => {
  describe("get initial offer state", () => {
    const priceOptions = [
      { key: "price-option-0", value: 100, description: "Max Price" },
      { key: "price-option-1", value: 90, description: "Mid Price" },
      { key: "price-option-2", value: 80, description: "Min Price" },
    ]
    it("returns first option if custom offer is undefined", () => {
      expect(getInitialOfferState(priceOptions, undefined)).toEqual({
        customOffer: undefined,
        selectedPriceOption: "price-option-0",
        selectedPriceValue: 100,
      })
    })

    describe("custom offer", () => {
      it("returns one of the options if the custom offer value matches", () => {
        expect(getInitialOfferState(priceOptions, 90)).toEqual({
          customOffer: undefined,
          selectedPriceOption: "price-option-1",
          selectedPriceValue: 90,
        })
      })

      it("returns custom offer if custom offer is not in list price options", () => {
        expect(getInitialOfferState(priceOptions, 85)).toEqual({
          customOffer: 85,
          selectedPriceOption: "price-option-custom",
          selectedPriceValue: undefined,
        })
      })
    })

    it("returns custom offer if custom offer is not in list price options", () => {
      expect(
        getInitialOfferState(
          [{ key: "key", value: 100, description: "description" }],
          300
        )
      ).toEqual({
        customOffer: 300,
        selectedPriceOption: "price-option-custom",
        selectedPriceValue: undefined,
      })
    })
  })

  describe("last offer note", () => {
    it("returns empty string if note is empty", () => {
      expect(lastOfferNote("")).toEqual("")
    })

    it("returns empty string if note is default", () => {
      expect(lastOfferNote("I sent an offer for $1,000")).toEqual("")
    })

    it("returns note if note is custom", () => {
      expect(lastOfferNote("This is my note")).toEqual("This is my note")
    })
  })

  describe("get offer price options", () => {
    it("returns percentage options if list price is percentage", () => {
      expect(getOfferPriceOptions({ major: 100 }, false)).toEqual([
        {
          key: "price-option-0",
          value: 100,
          description: "List price (high chance of acceptance)",
        },
        {
          key: "price-option-1",
          value: 90,
          description: "10% below the list price (good chance of acceptance)",
        },
        {
          key: "price-option-2",
          value: 80,
          description:
            "20% below the list price (substantial reduction, lower chance of acceptance)",
        },
      ])
    })

    it("returns range options if list price is range", () => {
      expect(
        getOfferPriceOptions(
          {
            maxPrice: { major: 150 },
            minPrice: { major: 100 },
          },
          true
        )
      ).toEqual([
        {
          key: "price-option-0",
          value: 150,
          description: "Top-end of range (high chance of acceptance)",
        },
        {
          key: "price-option-1",
          value: 125,
          description: "Midpoint (good chance of acceptance)",
        },
        {
          key: "price-option-2",
          value: 100,
          description: "Low-end of range (lower chance of acceptance)",
        },
      ])
    })
  })
})
