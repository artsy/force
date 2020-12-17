import { SeoDataForArtwork_Test_QueryRawResponse } from "v2/__generated__/SeoDataForArtwork_Test_Query.graphql"

export const SeoDataForArtworkFixture: SeoDataForArtwork_Test_QueryRawResponse["artwork"] = {
  artist_names: "Artist McArtist",
  availability: "for sale",
  date: "1950",
  category: "Design/Decorative Art",
  href: "/artwork/an-artwork",
  dimensions: {
    in: "1 × 2 in",
  },
  id: "opaque-artwork-id",
  is_price_hidden: false,
  is_price_range: false,
  listPrice: null,
  meta: {
    description: "artwork description",
    title: "artwork title",
  },
  meta_image: {
    resized: {
      height: 640,
      url: "artwork-image",
      width: 640,
    },
  },
  partner: {
    id: "opaque-partner-id",
    name: "Wright",
    profile: {
      id: "opaque-profile-id",
      image: {
        resized: {
          url: "partner-image",
        },
      },
    },
    type: "Auction House",
  },
}
