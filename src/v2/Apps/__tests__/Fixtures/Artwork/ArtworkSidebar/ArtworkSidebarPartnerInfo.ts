const PartnerWithLocations = {
  href: "/gagosian-gallery",
  id: "UGFydG5lcjpnYWdvc2lhbg==",
  locations: [
    { city: "New York" },
    { city: "New York" },
    { city: "New York" },
    { city: "New York" },
    { city: "New York" },
    { city: "Beverly Hills" },
    { city: "San Francisco" },
    { city: "London" },
    { city: "London" },
    { city: "London" },
    { city: "Paris" },
    { city: "Le Bourget" },
    { city: "Rome" },
    { city: "Geneva" },
    { city: "Athens" },
    { city: "Central, Hong Kong" },
  ],
  name: "Gagosian",
}
export const ArtworkFromPartnerWithLocations = {
  collecting_institution: null,
  internalID: "artwork_from_partner_with_locations",
  partner: PartnerWithLocations,
  sale: null,
}

const PartnerWithoutLocations = {
  href: "/galerie-kronsbein",
  id: "UGFydG5lcjpnYWxlcmllLWtyb25zYmVpbg==",
  locations: [],
  name: "Galerie Kronsbein",
}

export const ArtworkFromPartnerWithoutLocations = {
  collecting_institution: null,
  id: "artwork_from_partner_without_locations",
  partner: PartnerWithoutLocations,
}

export const ArtworkWithCollectingInstitution = {
  collecting_institution: "National Gallery of Art, Washington D.C.",
  partner: PartnerWithLocations,
}

export const ArtworkInNonAuctionSale = {
  collecting_institution: null,
  id: "artwork_from_partner_without_locations",
  partner: PartnerWithoutLocations,
  sale: {
    href: "/auction/mass-moca-benefit-auction-2019-buy-now",
    name: "MASS MoCA Benefit Auction 2019: Buy Now",
  },
}
