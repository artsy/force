import type { ArtworkQueryFilterQuery$rawResponse } from "__generated__/ArtworkQueryFilterQuery.graphql"

export const ArtworkFilterFixture: ArtworkQueryFilterQuery$rawResponse = {
  viewer: {
    filtered_artworks: {
      __isArtworkConnectionInterface: "FilterArtworksConnection",
      counts: {
        total: 3,
      },
      id: "RmlsdGVyQXJ0d29ya3M6eyJhZ2dyZWdhdGlvbnMiOlsidG90YWwiXSwia2V5d29yZCI6ImFuZHkgd2FyaG9sIn0=",
      pageInfo: {
        hasNextPage: true,
        endCursor: "YXJyYXljb25uZWN0aW9uOjI5",
      },
      pageCursors: {
        around: [
          {
            cursor: "YXJyYXljb25uZWN0aW9uOi0x",
            page: 1,
            isCurrent: true,
          },
          {
            cursor: "YXJyYXljb25uZWN0aW9uOjI5",
            page: 2,
            isCurrent: false,
          },
          {
            cursor: "YXJyYXljb25uZWN0aW9uOjU5",
            page: 3,
            isCurrent: false,
          },
          {
            cursor: "YXJyYXljb25uZWN0aW9uOjg5",
            page: 4,
            isCurrent: false,
          },
        ],
        first: null,
        last: {
          cursor: "YXJyYXljb25uZWN0aW9uOjI5Njk=",
          page: 100,
          isCurrent: false,
        },
        previous: null,
      },
      edges: [
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1rZW5ueS1idXJyZWxs",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1rZW5ueS1idXJyZWxs",
            slug: "andy-warhol-kenny-burrell",
            href: "/artwork/andy-warhol-kenny-burrell",
            image: {
              internalID: "5bbe671fa13448002a77b29e",
              resized: {
                src: "",
                srcSet: "",
                width: 10,
                height: 200,
              },
              versions: [],
              aspectRatio: 1.35,
              placeholder: "74.20097898070833%",
              url: "https://d32dm0rphc51dk.cloudfront.net/lTTEGbhqyyMC8IraJuGTtw/large.jpg",
            },
            internalID: "5d041931e607c200127ef3c1",
            title: "Kenny Burrell",
            image_title: "Andy Warhol, ‘Kenny Burrell’, 1956",
            date: "1956",
            sale_message: "$125,000",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OmFuZHktd2FyaG9s",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            artistNames: "Andy Warhol",
            collecting_institution: null,
            partner: {
              name: "Ambleside Gallery",
              href: "/ambleside-gallery",
              id: "UGFydG5lcjphbWJsZXNpZGUtZ2FsbGVyeQ==",
            },
            sale: null,
            sale_artwork: null,
          },
          immersiveArtworkNode: {
            id: "id-1",
            slug: "artwork-1",
            formattedMetadata: "Artwork 1",
            image: {
              aspectRatio: 1,
              blurhash: "H4$#",
              url: "https://example.com/artwork-1.jpg",
            },
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1kb2xsYXJzLTEtZnMtaWktZG90LTI3NA==",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1kb2xsYXJzLTEtZnMtaWktZG90LTI3NA==",
            slug: "andy-warhol-dollars-1-fs-ii-dot-274",
            href: "/artwork/andy-warhol-dollars-1-fs-ii-dot-274",
            image: {
              internalID: "5bbe671fa13448002a77b29e",
              resized: {
                src: "",
                srcSet: "",
                width: 10,
                height: 200,
              },
              versions: [],
              aspectRatio: 0.79,
              placeholder: "126.35956493921945%",
              url: "https://d32dm0rphc51dk.cloudfront.net/QNBY1kx6foZiKrB7msMWmw/large.jpg",
            },
            internalID: "5c65e45bdf9e64439cfecedf",
            title: "$(1) FS II.274",
            image_title: "Andy Warhol, ‘$(1) FS II.274’, 1982",
            date: "1982",
            sale_message: "$85,000",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OmFuZHktd2FyaG9s",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            artistNames: "Andy Warhol",
            collecting_institution: null,
            partner: {
              name: "Gallery Art",
              href: "/gallery-art",
              id: "UGFydG5lcjpnYWxsZXJ5LWFydA==",
            },
            sale: null,
            sale_artwork: null,
          },
          immersiveArtworkNode: {
            id: "id-1",
            slug: "artwork-2",
            formattedMetadata: "Artwork 2",
            image: {
              aspectRatio: 1,
              blurhash: "H4$#",
              url: "https://example.com/artwork-2.jpg",
            },
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1wZWFjaGVz",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1wZWFjaGVz",
            slug: "andy-warhol-peaches",
            href: "/artwork/andy-warhol-peaches",
            image: {
              internalID: "5bbe671fa13448002a77b29e",
              resized: {
                src: "",
                srcSet: "",
                width: 10,
                height: 200,
              },
              versions: [],
              aspectRatio: 1.33,
              placeholder: "75.44910179640718%",
              url: "https://d32dm0rphc51dk.cloudfront.net/RkBOuh6bjwu-pY9a3CzaHA/large.jpg",
            },
            internalID: "59664e918b0c1456357651c2",
            title: "Peaches",
            image_title: "Andy Warhol, ‘Peaches’, 1978",
            date: "1978",
            sale_message: "$15,000",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OmFuZHktd2FyaG9s",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            artistNames: "Andy Warhol",
            collecting_institution: null,
            partner: {
              name: "DTR Modern Galleries",
              href: "/dtr-modern-galleries",
              id: "UGFydG5lcjpkdHItbW9kZXJuLWdhbGxlcmllcw==",
            },
            sale: null,
            sale_artwork: null,
          },
          immersiveArtworkNode: {
            id: "id-1",
            slug: "artwork-3",
            formattedMetadata: "Artwork 3",
            image: {
              aspectRatio: 1,
              blurhash: "H4$#",
              url: "https://example.com/artwork-3.jpg",
            },
          },
        },
      ],
    },
  },
}
