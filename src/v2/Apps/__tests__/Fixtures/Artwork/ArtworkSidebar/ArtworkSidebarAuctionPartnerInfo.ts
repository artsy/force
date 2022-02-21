import { ArtworkSidebarAuctionPartnerInfo_Test_Query$rawResponse } from "v2/__generated__/ArtworkSidebarAuctionPartnerInfo_Test_Query.graphql"

export const ArtworkClosedAuction: ArtworkSidebarAuctionPartnerInfo_Test_Query$rawResponse["artwork"] = {
  id: "artwork_auction_closed",
  partner: {
    id: "5acd52b11a1e866b17e16045",
    name: "Art For Life: Benefit Auction 2018",
  },
  sale_artwork: {
    id: "asdfsdf",
    estimate: "$5,000",
  },
  sale: {
    internalID: "5bdb70e27ffd411bc71ee16c",
    id: "sdfsdf",
    is_closed: true,
  },
}

export const ArtworkAuctionPreview: ArtworkSidebarAuctionPartnerInfo_Test_Query$rawResponse["artwork"] = {
  id: "artwork_auction_preview",
  partner: {
    id: "553e693d7261695a85350100",
    name: "Christie's",
  },
  sale_artwork: {
    id: "sdfsdf",
    estimate: "$500,000–$700,000",
  },
  sale: {
    internalID: "5c05aa507c4cf06fa475b354",
    id: "sdfsdf",
    is_closed: false,
  },
}

export const ArtworkNoEstimateNoPremium: ArtworkSidebarAuctionPartnerInfo_Test_Query$rawResponse["artwork"] = {
  id: "auction_artwork",
  partner: {
    id: "5bd72842658111197ca3e697",
    name: "Fountain House Gallery: Benefit Auction 2018",
  },
  sale_artwork: {
    id: "sdfsdf",
    estimate: null,
  },
  sale: {
    internalID: "5bd7286433a1110029a0e9ec",
    id: "Sdfsdf",
    is_closed: false,
  },
}

export const ArtworkWithEstimateNoPremium: ArtworkSidebarAuctionPartnerInfo_Test_Query$rawResponse["artwork"] = {
  id: "auction_artwork_estimate",
  partner: {
    id: "5a3842668b0c1457e619554e",
    name: "Heather James Fine Art: Benefit Auction 2018",
  },
  sale_artwork: {
    id: "sdfsdf",
    estimate: "$3,500",
  },
  sale: {
    internalID: "5bf2c924a4685802e05a1456",
    id: "sdf",
    is_closed: false,
  },
}

export const ArtworkWithEstimateAndPremium: ArtworkSidebarAuctionPartnerInfo_Test_Query$rawResponse["artwork"] = {
  id: "auction_artwork_estimate_premium",
  partner: {
    id: "5a84a434275b247345983eac",
    name: "Bruun Rasmussen",
  },
  sale_artwork: {
    id: "sdfsdf",
    estimate: "DKK 100,000–DKK 125,000",
  },
  sale: {
    internalID: "5bedc643023c175c11b9ee9c",
    id: "sdf",
    is_closed: false,
  },
}
