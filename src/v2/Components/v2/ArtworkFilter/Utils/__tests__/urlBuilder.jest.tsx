import { paramsToCamelCase, paramsToSnakeCase } from "../urlBuilder"

describe(paramsToSnakeCase, () => {
  it("converts camel cased filter arguments to snake case", () => {
    const params = {
      artistIDs: ["catty-gallery", "doggy-gallery"],
      atAuction: true,
      forSale: true,
      inquireableOnly: false,
      partnerID: "gagosian-gallery",
    }
    expect(paramsToSnakeCase(params)).toEqual({
      artist_ids: ["catty-gallery", "doggy-gallery"],
      at_auction: true,
      for_sale: true,
      inquireable_only: false,
      partner_id: "gagosian-gallery",
    })
  })
})

describe(paramsToCamelCase, () => {
  it("converts snake cased filter arguments to camel case", () => {
    const params = {
      artist_ids: ["catty-gallery", "doggy-gallery"],
      at_auction: true,
      for_sale: true,
      inquireable_only: false,
      partner_id: "gagosian-gallery",
    }
    expect(paramsToCamelCase(params)).toEqual({
      artistIDs: ["catty-gallery", "doggy-gallery"],
      atAuction: true,
      forSale: true,
      inquireableOnly: false,
      partnerID: "gagosian-gallery",
    })
  })
})
