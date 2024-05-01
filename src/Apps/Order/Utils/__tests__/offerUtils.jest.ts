import {
  lastOfferNote,
  getInitialOfferState,
  getOfferPriceOptions,
} from "Apps/Order/Utils/offerUtils"

describe("offer utils", () => {
  describe("get initial offer state", () => {
    const priceOptions = [
      { key: "price-option-max", value: 100, description: "Max Price" },
      { key: "price-option-mid", value: 90, description: "Mid Price" },
      { key: "price-option-min", value: 80, description: "Min Price" },
    ]
    it("returns first option if custom offer is undefined", () => {
      expect(getInitialOfferState(priceOptions, undefined)).toEqual({
        lastOffer: undefined,
        selectedPriceOption: "price-option-max",
        selectedPriceValue: 100,
      })
    })

    describe("last offer", () => {
      it("returns one of the options if the last offer value matches", () => {
        expect(getInitialOfferState(priceOptions, 90)).toEqual({
          lastOffer: undefined,
          selectedPriceOption: "price-option-mid",
          selectedPriceValue: 90,
        })
      })

      it("returns custom option if last offer is not in list price options", () => {
        expect(getInitialOfferState(priceOptions, 85)).toEqual({
          lastOffer: 85,
          selectedPriceOption: "price-option-custom",
          selectedPriceValue: undefined,
        })
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
          key: "price-option-max",
          value: 100,
          description: "List price (high chance of acceptance)",
        },
        {
          key: "price-option-mid",
          value: 90,
          description: "10% below the list price (good chance of acceptance)",
        },
        {
          key: "price-option-min",
          value: 80,
          description:
            "20% below the list price (substantial reduction, lower chance of acceptance)",
        },
      ])
    })

    it("returns percentage options with different values and copy if partner offer", () => {
      expect(getOfferPriceOptions({ major: 100 }, false, true)).toEqual([
        {
          key: "price-option-max",
          value: 100,
          description: "Gallery offer",
        },
        {
          key: "price-option-mid",
          value: 95,
          description: "5% below the gallery offer",
        },
        {
          key: "price-option-min",
          value: 90,
          description: "10% below the gallery offer",
        },
      ])
    })

    it("returns range options if list price is range", () => {
      expect(
        getOfferPriceOptions(
          { maxPrice: { major: 150 }, minPrice: { major: 100 } },
          true
        )
      ).toEqual([
        {
          key: "price-option-max",
          value: 150,
          description: "Top-end of range (high chance of acceptance)",
        },
        {
          key: "price-option-mid",
          value: 125,
          description: "Midpoint (good chance of acceptance)",
        },
        {
          key: "price-option-min",
          value: 100,
          description: "Low-end of range (lower chance of acceptance)",
        },
      ])
    })
  })
})
