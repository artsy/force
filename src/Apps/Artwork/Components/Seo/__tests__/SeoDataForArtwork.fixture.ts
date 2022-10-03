import { SeoDataForArtwork_Test_Query$rawResponse } from "__generated__/SeoDataForArtwork_Test_Query.graphql"

export const SeoDataForArtworkFixture: SeoDataForArtwork_Test_Query$rawResponse["artwork"] = {
  id: "opaque-artwork-id",
  href: "/artwork/an-artwork",
  date: "1950",
  is_price_hidden: false,
  is_price_range: false,
  listPrice: null,
  meta_image: {
    resized: {
      width: 640,
      height: 640,
      url: "artwork-image",
    },
  },
  meta: {
    title: "artwork title",
    description: "artwork description",
  },
  partner: {
    id: "opaque-partner-id",
    name: "Wright",
    type: "Auction House",
    profile: {
      id: "opaque-profile-id",
      image: {
        resized: {
          url: "partner-image",
        },
      },
    },
  },
  artistNames: "Artist McArtist",
  availability: "for sale",
  category: "Design/Decorative Art",
  dimensions: {
    in: "1 × 2 in",
  },
}
