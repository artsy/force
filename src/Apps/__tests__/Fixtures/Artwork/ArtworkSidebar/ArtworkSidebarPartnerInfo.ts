const PartnerWithLocations = {
  id: "UGFydG5lcjpnYWdvc2lhbg==",
  name: "Gagosian",
  href: "/gagosian-gallery",
  cities: [
    "New York",
    "Beverly Hills",
    "San Francisco",
    "London",
    "Paris",
    "Le Bourget",
    "Rome",
    "Geneva",
    "Athens",
    "Central, Hong Kong",
  ],
}
export const ArtworkFromPartnerWithLocations = {
  internalID: "artwork_from_partner_with_locations",
  collecting_institution: null,
  partner: PartnerWithLocations,
  sale: null,
}

const PartnerWithoutLocations = {
  id: "UGFydG5lcjpnYWxlcmllLWtyb25zYmVpbg==",
  name: "Galerie Kronsbein",
  href: "/galerie-kronsbein",
  locations: [],
}

export const ArtworkInNonAuctionSale = {
  id: "artwork_from_partner_without_locations",
  collecting_institution: null,
  partner: PartnerWithoutLocations,
  sale: {
    name: "MASS MoCA Benefit Auction 2019: Buy Now",
    href: "/auction/mass-moca-benefit-auction-2019-buy-now",
  },
  is_in_auction: true,
}
