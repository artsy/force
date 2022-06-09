import { ArtworkSidebarMetadata_Test_QueryRawResponse } from "v2/__generated__/ArtworkSidebarMetadata_Test_Query.graphql"
import { FullArtworkFixture } from "v2/Apps/__tests__/Fixtures/Artwork/FullArtwork.fixture"

export const FilledOutMetadataNoEditions: ArtworkSidebarMetadata_Test_QueryRawResponse["artwork"] = {
  ...FullArtworkFixture,
  __isSellable: "Artwork",
  attributionClass: {
    id: "opaque-attribution-class-id",
    shortArrayDescription: ["This is", "a unique work"],
  },
  date: "1995",
  dimensions: {
    cm: "246.4 × 38.1 cm",
    in: "97 × 15 in",
  },
  edition_of: "",
  edition_sets: [],
  id: "filled_out_metadata_no_editions",
  is_biddable: false,
  medium: "Acrylic and graphite on bonded aluminium",
  sale_artwork: null,
  title: "Easel (Vydock)",
}

export const FilledOutMetadataNoSizeInfo: ArtworkSidebarMetadata_Test_QueryRawResponse["artwork"] = {
  ...FullArtworkFixture,
  __isSellable: "Artwork",
  attributionClass: {
    id: "opaque-attribution-class-id",
    shortArrayDescription: ["This is", "a unique work"],
  },
  date: "1995",
  dimensions: {
    cm: null,
    in: null,
  },
  edition_of: "",
  edition_sets: [],
  id: "filled_out_metadata_no_editions",
  is_biddable: false,
  medium: "Acrylic and graphite on bonded aluminium",
  sale_artwork: null,
  title: "Easel (Vydock)",
}

export const FilledOutMetadataOneEditionSet: ArtworkSidebarMetadata_Test_QueryRawResponse["artwork"] = {
  ...FullArtworkFixture,
  __isSellable: "Artwork",
  attributionClass: {
    id: "opauqe-attribution-class-id",
    shortArrayDescription: ["This is part of", "a limited edition set"],
  },
  date: "1972",
  dimensions: { cm: "35.6 × 45.7 cm", in: "14 × 18 in" },
  edition_of: "Edition of 3000",
  edition_sets: [
    {
      __typename: "Artwork",
      id: "RWRpdGlvblNldDo1NzIzYTIzNTEzOWIyMTEyNzEwMDAzNzY=",
      // dimensions: { in: "14 × 18 in", cm: "35.6 × 45.7 cm" },
      // edition_of: "Edition of 3000",
      // is_offerable: false,
      // is_acquireable: true,
    },
  ],
  id: "filled_out_metadata_one_editions_set:richard-anuszkiewicz-sun-keyed",
  is_biddable: false,
  medium: "Serigraph",
  sale_artwork: null,
  title: "Sun Keyed",
}

export const FilledOutMetadataMultipleEditionSets: ArtworkSidebarMetadata_Test_QueryRawResponse["artwork"] = {
  ...FullArtworkFixture,
  __isSellable: "Artwork",
  attributionClass: {
    id: "opauqe-attribution-class-id",
    shortArrayDescription: ["This is part of", "a limited edition set"],
  },
  date: "2018",
  dimensions: { cm: "101.6 × 106.7 cm", in: "40 × 42 in" },
  edition_of: "Edition of 3000",
  edition_sets: [
    {
      __typename: "Artwork",
      id: "RWRpdGlvblNldDo1YjIyOWFkNmE2Y2E2ZDEzNjkxOWZkZTY=",
      // dimensions: { in: "24 × 26 in", cm: "61 × 66 cm" },
      // edition_of: "",
      // is_offerable: false,
      // is_acquireable: true,
    },
    {
      __typename: "Artwork",
      id: "RWRpdGlvblNldDo1YjIyOWFkNjViMmZiYTE3NmZjOTliZmU=",
      // dimensions: { in: "40 × 42 in", cm: "101.6 × 106.7 cm" },
      // edition_of: "Edition of 3000",
      // is_offerable: false,
      // is_acquireable: true,
    },
  ],
  id: "filled_out_multiple_edition_set:kim-keever-abstract-36742",
  is_biddable: false,
  medium: "Premium high gloss archival print",
  sale_artwork: null,
  title: "Abstract 36742",
}

export const EmptyMetadataNoEditions: ArtworkSidebarMetadata_Test_QueryRawResponse["artwork"] = {
  ...FullArtworkFixture,
  __isSellable: "Artwork",
  attributionClass: null,
  date: " ",
  dimensions: { cm: null, in: null },
  edition_of: "",
  edition_sets: [],
  id: "empty_metadata_no_editions",
  is_biddable: false,
  medium: "",
  sale_artwork: null,
  title: "Empty metadata / No editions",
}

export const EmptyMetadataOneEditionSet: ArtworkSidebarMetadata_Test_QueryRawResponse["artwork"] = {
  ...FullArtworkFixture,
  __isSellable: "Artwork",
  attributionClass: null,
  date: " ",
  dimensions: { cm: null, in: null },
  edition_of: "",
  edition_sets: [
    {
      __typename: "Artwork",
      id: "5b1fff790923cc00205152fe",
      // is_offerable: false,
      // is_acquireable: true,
    },
  ],
  id: "empty_metadata_one_edition",
  is_biddable: false,
  medium: "",
  sale_artwork: null,
  title: "Empty metadata / One edition set",
}

export const EmptyMetadataMultipleEditionSets: ArtworkSidebarMetadata_Test_QueryRawResponse["artwork"] = {
  ...FullArtworkFixture,
  __isSellable: "Artwork",
  attributionClass: null,
  date: " ",
  dimensions: { cm: null, in: null },
  edition_of: "",
  edition_sets: [
    {
      __typename: "Artwork",
      id: "5b1ffd455405ff0020d933bb",
      // is_offerable: false,
      // is_acquireable: true,
    },
    {
      __typename: "Artwork",
      id: "5b1ffdb20923cc00205152d3",
      // is_offerable: false,
      // is_acquireable: true,
    },
  ],
  id: "empty_metadata_multple_editions",
  is_biddable: false,
  medium: "",
  sale_artwork: null,
  title: "Empty metadata / Multiple edition Sets",
}

export const MetadataForAuctionWork: ArtworkSidebarMetadata_Test_QueryRawResponse["artwork"] = {
  ...FullArtworkFixture,
  __isSellable: "Artwork",
  attributionClass: {
    id: "opauqe-attribution-class-id",
    shortArrayDescription: ["This is part of", "a limited edition set"],
  },
  date: "1948",
  dimensions: { cm: "43.2 × 33 cm", in: "17 × 13 in" },
  edition_of: "",
  edition_sets: [],
  id:
    "metadata_for_auction_work:marc-chagall-then-the-boy-displayed-to-the-dervish-his-bosom-saying-look-at-my-breasts-which-be-goodlier-than-the-breasts-of-maidens-and-my-lipdews-are-sweeter-than-sugar-candy-dot-dot-dot-from-four-tales-from-the-arabian-nights",
  is_biddable: true,
  medium: "Lithograph in colors, on laid paper",
  sale_artwork: {
    id: "opaque-sale-arwork-id",
    lot_label: "210",
  },
  title:
    'Then the boy displayed to the Dervish his bosom, saying: "Look at my breasts which be goodlier than the breasts of maidens and my lipdews are sweeter than sugar candy...", from Four Tales from the Arabian Nights',
}
