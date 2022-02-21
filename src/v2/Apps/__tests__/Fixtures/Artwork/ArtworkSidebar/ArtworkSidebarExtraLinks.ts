import { ArtworkSidebarExtraLinks_Test_Query$rawResponse } from "v2/__generated__/ArtworkSidebarExtraLinks_Test_Query.graphql"

export const LiveAuctionArtwork: ArtworkSidebarExtraLinks_Test_Query$rawResponse["artwork"] = {
  id: "QXJ0d29yazpqb3NlcC1tYXN0dXNldC1zZWxmLXBvcnRyYWl0",
  internalID: "abc12356",
  is_in_auction: true,
  is_for_sale: true,
  is_acquireable: false,
  is_inquireable: true,
  artists: [{ id: "QXJ0aXN0Ompvc2VwLW1hc3R1c2V0", is_consignable: true }],
  sale: {
    id: "QXJ0aXN0Ompvc2VwLW1hc3R1c2V3",
    is_closed: false,
    partner: { id: "partner-id", name: "Christie's" },
    isBenefit: false,
  },
}

export const LiveAuctionArtworkWithoutPartner: ArtworkSidebarExtraLinks_Test_Query$rawResponse["artwork"] = {
  id: "QXJ0d29yazpqb3NlcC1tYXN0dXNldC1zZWxmLXBvcnRyYWl0",
  internalID: "abc12356",
  is_in_auction: true,
  is_for_sale: true,
  is_acquireable: false,
  is_inquireable: true,
  artists: [{ id: "QXJ0aXN0Ompvc2VwLW1hc3R1c2V0", is_consignable: true }],
  sale: {
    id: "QXJ0aXN0Ompvc2VwLW1hc3R1c2V3",
    is_closed: false,
    isBenefit: false,
    partner: null,
  },
}

export const VanHamLiveAuctionArtwork: ArtworkSidebarExtraLinks_Test_Query$rawResponse["artwork"] = {
  id: "QXJ0d29yazpqb3NlcC1tYXN0dXNldC1zZWxmLXBvcnRyYWl0",
  internalID: "abc12356",
  is_in_auction: true,
  is_for_sale: true,
  is_acquireable: false,
  is_inquireable: true,
  artists: [{ id: "QXJ0aXN0Ompvc2VwLW1hc3R1c2V0", is_consignable: true }],
  sale: {
    id: "QXJ0aXN0Ompvc2VwLW1hc3R1c2V3",
    is_closed: false,
    partner: { id: "partner-id2", name: "Van Ham" },
    isBenefit: false,
  },
}
export const BenefitAuctionArtwork: ArtworkSidebarExtraLinks_Test_Query$rawResponse["artwork"] = {
  id: "QXJ0d29yazpqb3NlcC1tYXN0dXNldC1zZWxmLXBvcnRyYWl0",
  internalID: "abc12356",
  is_in_auction: true,
  is_for_sale: true,
  is_acquireable: false,
  is_inquireable: true,
  artists: [{ id: "QXJ0aXN0Ompvc2VwLW1hc3R1c2V1", is_consignable: true }],
  sale: {
    id: "QXJ0aXN0Ompvc2VwLW1hc3R1c2V2",
    is_closed: false,
    partner: { id: "partner-id", name: "Christie's" },
    isBenefit: true,
  },
}

export const AcquireableArtworkWithOneConsignableArtist: ArtworkSidebarExtraLinks_Test_Query$rawResponse["artwork"] = {
  id: "QXJ0d29yazpwYWJsby1waWNhc3NvLW5hdHVyZS1tb3J0ZS1hdS1waWNoZXQtcm9zZQ==",
  internalID: "abc12356",
  is_in_auction: false,
  is_for_sale: true,
  is_acquireable: true,
  is_inquireable: true,
  artists: [{ id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=", is_consignable: true }],
  sale: null,
}

export const InquireableArtworkWithNoConsignableArtists: ArtworkSidebarExtraLinks_Test_Query$rawResponse["artwork"] = {
  id:
    "QXJ0d29yazpuYWFtYS10c2FiYXItc3R1ZHktZm9yLWEtbWljcm9waG9uZS12YXJpYXRpb24tNQ==",
  internalID: "abc12356",
  is_in_auction: false,
  is_for_sale: true,
  is_acquireable: false,
  is_inquireable: true,
  artists: [{ id: "QXJ0aXN0Om5hYW1hLXRzYWJhcg==", is_consignable: false }],
  sale: null,
}

export const InquireableArtworkWithOneConsignableArtist: ArtworkSidebarExtraLinks_Test_Query$rawResponse["artwork"] = {
  id:
    "QXJ0d29yazpyb2JlcnQtaW5kaWFuYS10aWx0LWZyb20tdGhlLW9yaWdpbmFsLTE5NzEtYW1lcmljYW4tZHJlYW0tcG9ydGZvbGlvLXNoZWVoYW4tNjM=",
  internalID: "abc12356",
  is_in_auction: false,
  is_for_sale: true,
  is_acquireable: false,
  is_inquireable: true,
  artists: [{ id: "QXJ0aXN0OnJvYmVydC1pbmRpYW5h", is_consignable: true }],
  sale: null,
}

export const InquireableArtworkWithMultipleConsignableArtists: ArtworkSidebarExtraLinks_Test_Query$rawResponse["artwork"] = {
  id:
    "QXJ0d29yazplZC1ydXNjaGEtZnVuLXZhY2F0aW9uLXNpZ25lZC1ieS1ib3RoLXJ1c2NoYS1hbmQtc2NoYXJm",
  internalID: "abc12356",
  is_in_auction: false,
  is_for_sale: true,
  is_acquireable: false,
  is_inquireable: true,
  artists: [
    { id: "QXJ0aXN0OmVkLXJ1c2NoYQ==", is_consignable: true },
    { id: "QXJ0aXN0Omtlbm55LXNjaGFyZg==", is_consignable: true },
  ],
  sale: null,
}

export const NotForSaleArtworkWithOneConsignableArtist: ArtworkSidebarExtraLinks_Test_Query$rawResponse["artwork"] = {
  id: "QXJ0d29yazpzYXJhaC1sdWNhcy1idW5ueS1nZXRzLXNub29rZXJlZC1udW1iZXItOA==",
  internalID: "abc12356",
  is_in_auction: false,
  is_for_sale: false,
  is_acquireable: false,
  is_inquireable: false,
  artists: [
    {
      id: "QXJ0aXN0OnNhcmFoLWx1Y2Fz",
      is_consignable: true,
    },
  ],
  sale: null,
}

export const NotForSaleArtworkWithMultipleConsignableArtist: ArtworkSidebarExtraLinks_Test_Query$rawResponse["artwork"] = {
  id:
    "QXJ0d29yazphbnRob255LWdyYXZlcy1sYS1kaXN0YW5jaWEtZW50cmUtcG9udHJlc2luYS15LXplcm1hdHQtZXMtbGEtbWlzbWEtcXVlLWxhLWRlLXplcm1hdHQtYS1wb250cmVzaW5hLXRoZS1kaXN0YW5jZS1mcm9tLXBvbnRyZXNpbmEtdG8temVybWF0dC1pcy10aGUtc2FtZS1hcy1mcm9tLXplcm1hdHQtdG8tcG9udHJlc2luYQ==",
  internalID: "abc12356",
  is_in_auction: false,
  is_for_sale: false,
  is_acquireable: false,
  is_inquireable: false,
  artists: [
    {
      id: "QXJ0aXN0OmFudGhvbnktZ3JhdmVz",
      is_consignable: true,
    },
    {
      id: "QXJ0aXN0OmNhcmxhLWhlcnJlcmEtcHJhdHM=",
      is_consignable: true,
    },
  ],
  sale: null,
}

export const NotForSaleArtworkWithNoConsignableArtists: ArtworkSidebarExtraLinks_Test_Query$rawResponse["artwork"] = {
  id: "QXJ0d29yazpjaGVuZy1yYW4tZGlhcnktb2YtYS1tYWRtYW4tZGVhZC1ob3JzZS1iYXk=",
  internalID: "abc12356",
  is_in_auction: false,
  is_for_sale: false,
  is_acquireable: false,
  is_inquireable: false,
  artists: [
    {
      id: "QXJ0aXN0OmNoZW5nLXJhbg==",
      is_consignable: false,
    },
  ],
  sale: null,
}
