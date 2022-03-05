import { ArtworkQueryFilterQueryRawResponse } from "v2/__generated__/ArtworkQueryFilterQuery.graphql"

export const ArtworkFilterFixture: ArtworkQueryFilterQueryRawResponse = {
  viewer: {
    filtered_artworks: {
      __isArtworkConnectionInterface: "FilterArtworksConnection",
      id:
        "RmlsdGVyQXJ0d29ya3M6eyJhZ2dyZWdhdGlvbnMiOlsidG90YWwiXSwia2V5d29yZCI6ImFuZHkgd2FyaG9sIn0=",
      pageInfo: { hasNextPage: true, endCursor: "YXJyYXljb25uZWN0aW9uOjI5" },
      pageCursors: {
        around: [
          { cursor: "YXJyYXljb25uZWN0aW9uOi0x", page: 1, isCurrent: true },
          { cursor: "YXJyYXljb25uZWN0aW9uOjI5", page: 2, isCurrent: false },
          { cursor: "YXJyYXljb25uZWN0aW9uOjU5", page: 3, isCurrent: false },
          { cursor: "YXJyYXljb25uZWN0aW9uOjg5", page: 4, isCurrent: false },
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
              aspect_ratio: 1.35,
              placeholder: "74.20097898070833%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/lTTEGbhqyyMC8IraJuGTtw/large.jpg",
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
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1kb2xsYXJzLTEtZnMtaWktZG90LTI3NA==",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1kb2xsYXJzLTEtZnMtaWktZG90LTI3NA==",
            slug: "andy-warhol-dollars-1-fs-ii-dot-274",
            href: "/artwork/andy-warhol-dollars-1-fs-ii-dot-274",
            image: {
              aspect_ratio: 0.79,
              placeholder: "126.35956493921945%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/QNBY1kx6foZiKrB7msMWmw/large.jpg",
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
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1wZWFjaGVz",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1wZWFjaGVz",
            slug: "andy-warhol-peaches",
            href: "/artwork/andy-warhol-peaches",
            image: {
              aspect_ratio: 1.33,
              placeholder: "75.44910179640718%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/RkBOuh6bjwu-pY9a3CzaHA/large.jpg",
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
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id:
            "QXJ0d29yazphbmR5LXdhcmhvbC1hY3RyZXNzLXNob3RzLWFuZHktd2FyaG9sLW55LWRhaWx5LW5ld3MtMTk2OA==",
          node: {
            id:
              "QXJ0d29yazphbmR5LXdhcmhvbC1hY3RyZXNzLXNob3RzLWFuZHktd2FyaG9sLW55LWRhaWx5LW5ld3MtMTk2OA==",
            slug: "andy-warhol-actress-shots-andy-warhol-ny-daily-news-1968",
            href:
              "/artwork/andy-warhol-actress-shots-andy-warhol-ny-daily-news-1968",
            image: {
              aspect_ratio: 1.07,
              placeholder: "93.81044487427465%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/L8Vjqhum4XX6sqiEXUg3Fg/large.jpg",
            },
            internalID: "575f459bcd530e65df000adb",
            title: '"ACTRESS SHOTS ANDY WARHOL" NY Daily News, 1968',
            image_title:
              'Andy Warhol, ‘"ACTRESS SHOTS ANDY WARHOL" NY Daily News, 1968’, 1968',
            date: "1968",
            sale_message: "$1,250",
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
              name: "VINCE fine arts/ephemera",
              href: "/vince-fine-arts-slash-ephemera",
              id: "UGFydG5lcjp2aW5jZS1maW5lLWFydHMtc2xhc2gtZXBoZW1lcmE=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1jb3Ntb3M=",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1jb3Ntb3M=",
            slug: "andy-warhol-cosmos",
            href: "/artwork/andy-warhol-cosmos",
            image: {
              aspect_ratio: 0.78,
              placeholder: "128.15296989422293%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/Lzonx30NloDXcs0FdKUjDw/large.jpg",
            },
            internalID: "5c84405fc8cb3760fe0e628d",
            title: "COSMOS",
            image_title: "Andy Warhol, ‘COSMOS’, ca. 1984",
            date: "ca. 1984",
            sale_message: "$99,500",
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
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1sZWUtaWFjb2NjYS0y",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1sZWUtaWFjb2NjYS0y",
            slug: "andy-warhol-lee-iacocca-2",
            href: "/artwork/andy-warhol-lee-iacocca-2",
            image: {
              aspect_ratio: 0.82,
              placeholder: "121.67539267015708%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/NuQp4MqjsqRaiPpC9hu5BA/large.jpg",
            },
            internalID: "59d7a04a7622dd4d838b9f10",
            title: "Lee Iacocca",
            image_title: "Andy Warhol, ‘Lee Iacocca’, 1985",
            date: "1985",
            sale_message: "$18,500",
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
              name: "Robert Fontaine Gallery",
              href: "/robert-fontaine-gallery",
              id: "UGFydG5lcjpyb2JlcnQtZm9udGFpbmUtZ2FsbGVyeQ==",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1zaG9lLTE4",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1zaG9lLTE4",
            slug: "andy-warhol-shoe-18",
            href: "/artwork/andy-warhol-shoe-18",
            image: {
              aspect_ratio: 1.42,
              placeholder: "70.31349968010237%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/123zBWZmYy_OC9d9tV3ajQ/large.jpg",
            },
            internalID: "5bad2bbbc5cfa04f7c0c669e",
            title: "Shoe",
            image_title: "Andy Warhol, ‘Shoe’, 1958",
            date: "1958",
            sale_message: "$18,000",
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
              name: "McClain Gallery",
              href: "/mcclain-gallery",
              id: "UGFydG5lcjptY2NsYWluLWdhbGxlcnk=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1zZXdpbmctbWFjaGluZQ==",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1zZXdpbmctbWFjaGluZQ==",
            slug: "andy-warhol-sewing-machine",
            href: "/artwork/andy-warhol-sewing-machine",
            image: {
              aspect_ratio: 1,
              placeholder: "100%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/MySOcyJvvgWT6US5jFafRA/large.jpg",
            },
            internalID: "572b64d18b3b81436a0011c8",
            title: "Sewing Machine",
            image_title: "Andy Warhol, ‘Sewing Machine’, 1952",
            date: "1952",
            sale_message: "$17,500",
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
              name: "Joseph K. Levene Fine Art, Ltd.",
              href: "/joseph-k-levene-fine-art-ltd",
              id: "UGFydG5lcjpqb3NlcGgtay1sZXZlbmUtZmluZS1hcnQtbHRk",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1zdXBlcm1hbi1mLWFuZC1zLWlpLTI2MC0z",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1zdXBlcm1hbi1mLWFuZC1zLWlpLTI2MC0z",
            slug: "andy-warhol-superman-f-and-s-ii-260-3",
            href: "/artwork/andy-warhol-superman-f-and-s-ii-260-3",
            image: {
              aspect_ratio: 1,
              placeholder: "100.45558086560365%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/JfQvrm5cdR-D0O7hqqbEZg/large.jpg",
            },
            internalID: "5d02a7dc9a0484000d291164",
            title: "Superman (F. & S. II. 260)",
            image_title: "Andy Warhol, ‘Superman (F. & S. II. 260)’, 1981",
            date: "1981",
            sale_message: "$240,000",
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
              name: "David Benrimon Fine Art",
              href: "/david-benrimon-fine-art",
              id: "UGFydG5lcjpkYXZpZC1iZW5yaW1vbi1maW5lLWFydA==",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1iaXJtaW5naGFtLXJhY2UtcmlvdC0xMA==",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1iaXJtaW5naGFtLXJhY2UtcmlvdC0xMA==",
            slug: "andy-warhol-birmingham-race-riot-10",
            href: "/artwork/andy-warhol-birmingham-race-riot-10",
            image: {
              aspect_ratio: 1.21,
              placeholder: "82.84023668639054%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/TuMBh41hMifd0F7EaheI9w/large.jpg",
            },
            internalID: "5cd38e5486c1c459da06ad0d",
            title: "Birmingham Race Riot",
            image_title: "Andy Warhol, ‘Birmingham Race Riot’, 1964",
            date: "1964",
            sale_message: "$13,000",
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
              name: "Graves International Art",
              href: "/graves-international-art",
              id: "UGFydG5lcjpncmF2ZXMtaW50ZXJuYXRpb25hbC1hcnQ=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id:
            "QXJ0d29yazphbmR5LXdhcmhvbC1ub3J0aHdlc3QtY29hc3QtbWFzay1mcy1paS1kb3QtMzgwLTI=",
          node: {
            id:
              "QXJ0d29yazphbmR5LXdhcmhvbC1ub3J0aHdlc3QtY29hc3QtbWFzay1mcy1paS1kb3QtMzgwLTI=",
            slug: "andy-warhol-northwest-coast-mask-fs-ii-dot-380-2",
            href: "/artwork/andy-warhol-northwest-coast-mask-fs-ii-dot-380-2",
            image: {
              aspect_ratio: 1,
              placeholder: "99.71291866028709%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/6y_-lwRBHGbGgw6KmsdCmQ/large.jpg",
            },
            internalID: "5ba6bc7e869e571108ea1aaa",
            title: "NORTHWEST COAST MASK FS II.380",
            image_title: "Andy Warhol, ‘NORTHWEST COAST MASK FS II.380’, 1986",
            date: "1986",
            sale_message: "$72,500",
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
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id:
            "QXJ0d29yazphbmR5LXdhcmhvbC1yYXJlLW9yaWdpbmFsLWFuZHktd2FyaG9sLXJlY29yZC1hcnQ=",
          node: {
            id:
              "QXJ0d29yazphbmR5LXdhcmhvbC1yYXJlLW9yaWdpbmFsLWFuZHktd2FyaG9sLXJlY29yZC1hcnQ=",
            slug: "andy-warhol-rare-original-andy-warhol-record-art",
            href: "/artwork/andy-warhol-rare-original-andy-warhol-record-art",
            image: {
              aspect_ratio: 1,
              placeholder: "100.2248201438849%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/nhUiLKacJVUqpMSXQ30nJA/large.jpg",
            },
            internalID: "5c7eccb73f643300285eb707",
            title: "Rare original Andy Warhol record art",
            image_title:
              "Andy Warhol, ‘Rare original Andy Warhol record art’, 1964",
            date: "1964",
            sale_message: "$750",
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
              name: "Lot 180",
              href: "/lot-180",
              id: "UGFydG5lcjpsb3QtMTgw",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id:
            "QXJ0d29yazphbmR5LXdhcmhvbC1hbmR5LXdhcmhvbC1waGlsaXAtZmFnYW4tYW5kLWdlcmFyZC1tYWxhbmdh",
          node: {
            id:
              "QXJ0d29yazphbmR5LXdhcmhvbC1hbmR5LXdhcmhvbC1waGlsaXAtZmFnYW4tYW5kLWdlcmFyZC1tYWxhbmdh",
            slug: "andy-warhol-andy-warhol-philip-fagan-and-gerard-malanga",
            href:
              "/artwork/andy-warhol-andy-warhol-philip-fagan-and-gerard-malanga",
            image: {
              aspect_ratio: 0.58,
              placeholder: "172.1784776902887%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/EjLVZTsT0Ve41R6ProKQPQ/large.jpg",
            },
            internalID: "530f70e97622dd44ed0000b9",
            title: "Andy Warhol, Philip Fagan & Gerard Malanga",
            image_title:
              "Andy Warhol, ‘Andy Warhol, Philip Fagan & Gerard Malanga’, 1964",
            date: "1964",
            sale_message: "Contact For Price",
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
              name: "Joseph K. Levene Fine Art, Ltd.",
              href: "/joseph-k-levene-fine-art-ltd",
              id: "UGFydG5lcjpqb3NlcGgtay1sZXZlbmUtZmluZS1hcnQtbHRk",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id:
            "QXJ0d29yazphbmR5LXdhcmhvbC1hbmR5LXdhcmhvbC1waG90b2dyYXBoLW9mLWNvcm5lbGlhLWd1ZXN0LTE5ODU=",
          node: {
            id:
              "QXJ0d29yazphbmR5LXdhcmhvbC1hbmR5LXdhcmhvbC1waG90b2dyYXBoLW9mLWNvcm5lbGlhLWd1ZXN0LTE5ODU=",
            slug: "andy-warhol-andy-warhol-photograph-of-cornelia-guest-1985",
            href:
              "/artwork/andy-warhol-andy-warhol-photograph-of-cornelia-guest-1985",
            image: {
              aspect_ratio: 0.8,
              placeholder: "124.82435597189696%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/PWBFswpR5-Ai0lCrpRO5YA/large.jpg",
            },
            internalID: "5acf9ca9c9dc2404e5b1e7e1",
            title: "Andy Warhol, Photograph of Cornelia Guest, 1985",
            image_title:
              "Andy Warhol, ‘Andy Warhol, Photograph of Cornelia Guest, 1985’, 1985",
            date: "1985",
            sale_message: "$12,500",
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
              name: "Hedges Projects",
              href: "/hedges-projects",
              id: "UGFydG5lcjpoZWRnZXMtcHJvamVjdHM=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id:
            "QXJ0d29yazphbmR5LXdhcmhvbC1hbmR5LXdhcmhvbC1waG90b2dyYXBoLW9mLXRpbW90aHktaHV0dG9uLTE5ODA=",
          node: {
            id:
              "QXJ0d29yazphbmR5LXdhcmhvbC1hbmR5LXdhcmhvbC1waG90b2dyYXBoLW9mLXRpbW90aHktaHV0dG9uLTE5ODA=",
            slug: "andy-warhol-andy-warhol-photograph-of-timothy-hutton-1980",
            href:
              "/artwork/andy-warhol-andy-warhol-photograph-of-timothy-hutton-1980",
            image: {
              aspect_ratio: 0.76,
              placeholder: "131.11395646606914%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/_Gp2Tqu2040tCbVzm5ZSOg/large.jpg",
            },
            internalID: "5a849c5c8b0c1437e789894f",
            title: "Andy Warhol, Photograph of Timothy Hutton, 1980",
            image_title:
              "Andy Warhol, ‘Andy Warhol, Photograph of Timothy Hutton, 1980’, 1980",
            date: "1980",
            sale_message: "$6,000",
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
              name: "Hedges Projects",
              href: "/hedges-projects",
              id: "UGFydG5lcjpoZWRnZXMtcHJvamVjdHM=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1tdWhhbW1lZC1hbGktMQ==",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1tdWhhbW1lZC1hbGktMQ==",
            slug: "andy-warhol-muhammed-ali-1",
            href: "/artwork/andy-warhol-muhammed-ali-1",
            image: {
              aspect_ratio: 0.75,
              placeholder: "133.57142857142856%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/mdtpEgwYjBZOLAnbV_wT3A/large.jpg",
            },
            internalID: "5c5350d87571e150e59c064a",
            title: "Muhammed Ali",
            image_title: "Andy Warhol, ‘Muhammed Ali’, 1978",
            date: "1978",
            sale_message: "$110,000",
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
              name: "Samuel Owen Gallery",
              href: "/samuel-owen-gallery",
              id: "UGFydG5lcjpzYW11ZWwtb3dlbi1nYWxsZXJ5",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC11bnRpdGxlZC1qb24tZ291bGQtMQ==",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC11bnRpdGxlZC1qb24tZ291bGQtMQ==",
            slug: "andy-warhol-untitled-jon-gould-1",
            href: "/artwork/andy-warhol-untitled-jon-gould-1",
            image: {
              aspect_ratio: 0.73,
              placeholder: "137.22126929674099%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/m08CoClNXzF2xnjrCxy5Kg/large.jpg",
            },
            internalID: "5ba53e0aac71ac1fcc830a61",
            title: "UNTITLED ( JON GOULD)",
            image_title: "Andy Warhol, ‘UNTITLED ( JON GOULD)’, 1982",
            date: "1982",
            sale_message: "$75,000",
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
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1nZXJvbmltby1mcy1paS1kb3QtMzg0LTEy",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1nZXJvbmltby1mcy1paS1kb3QtMzg0LTEy",
            slug: "andy-warhol-geronimo-fs-ii-dot-384-12",
            href: "/artwork/andy-warhol-geronimo-fs-ii-dot-384-12",
            image: {
              aspect_ratio: 1,
              placeholder: "99.9002493765586%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/XzLLLPlzBCa4VLRv-x9Llw/large.jpg",
            },
            internalID: "598dee35b202a34d8ae555fd",
            title: "GERONIMO FS II.384",
            image_title: "Andy Warhol, ‘GERONIMO FS II.384’, 1986",
            date: "1986",
            sale_message: "$59,500",
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
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1qYXNvbi1tY2NveQ==",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1qYXNvbi1tY2NveQ==",
            slug: "andy-warhol-jason-mccoy",
            href: "/artwork/andy-warhol-jason-mccoy",
            image: {
              aspect_ratio: 0.78,
              placeholder: "128.2233936458185%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/1wd-zBc5RUMqVxXxWwvD2Q/large.jpg",
            },
            internalID: "5899f38bcd530e4cb9497c39",
            title: "Jason McCoy",
            image_title: "Andy Warhol, ‘Jason McCoy’, ca. 1975",
            date: "ca. 1975",
            sale_message: "$7,500",
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
              name: "Alpha 137 Gallery",
              href: "/alpha-137-gallery",
              id: "UGFydG5lcjphbHBoYS0xMzctZ2FsbGVyeQ==",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id:
            "QXJ0d29yazphbmR5LXdhcmhvbC1kb2xsYXJzLXF1YWRyYW50LWZzLWlpLWRvdC0yODQtMQ==",
          node: {
            id:
              "QXJ0d29yazphbmR5LXdhcmhvbC1kb2xsYXJzLXF1YWRyYW50LWZzLWlpLWRvdC0yODQtMQ==",
            slug: "andy-warhol-dollars-quadrant-fs-ii-dot-284-1",
            href: "/artwork/andy-warhol-dollars-quadrant-fs-ii-dot-284-1",
            image: {
              aspect_ratio: 0.79,
              placeholder: "125.92766557069046%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/kHTEwjm-QJPlM0woOxF3RQ/large.jpg",
            },
            internalID: "5ba51faa7cc3c02d1360402b",
            title: "$ (QUADRANT) FS II.284",
            image_title: "Andy Warhol, ‘$ (QUADRANT) FS II.284’, 1982",
            date: "1982",
            sale_message: "$215,000",
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
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id:
            "QXJ0d29yazphbmR5LXdhcmhvbC1sYWRpZXMtYW5kLWdlbnRsZW1lbi1mcy1paS1kb3QtMTMwLTE=",
          node: {
            id:
              "QXJ0d29yazphbmR5LXdhcmhvbC1sYWRpZXMtYW5kLWdlbnRsZW1lbi1mcy1paS1kb3QtMTMwLTE=",
            slug: "andy-warhol-ladies-and-gentlemen-fs-ii-dot-130-1",
            href: "/artwork/andy-warhol-ladies-and-gentlemen-fs-ii-dot-130-1",
            image: {
              aspect_ratio: 0.65,
              placeholder: "153.60983102918587%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/o_SwQjGrVcVDI3ZBFw_p1A/large.jpg",
            },
            internalID: "5bb91a3efb13b3467ad92176",
            title: "LADIES & GENTLEMEN FS II.130",
            image_title: "Andy Warhol, ‘LADIES & GENTLEMEN FS II.130’, 1975",
            date: "1975",
            sale_message: "$18,000",
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
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1tYW8tZi1kb3Qtcy1paS1kb3QtOTU=",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1tYW8tZi1kb3Qtcy1paS1kb3QtOTU=",
            slug: "andy-warhol-mao-f-dot-s-ii-dot-95",
            href: "/artwork/andy-warhol-mao-f-dot-s-ii-dot-95",
            image: {
              aspect_ratio: 0.99,
              placeholder: "101.26150698943061%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/NQ-02-O7u2EcAK3VVVuBpg/large.jpg",
            },
            internalID: "5ade4038b202a32c06c7391e",
            title: "Mao F.S.II.95",
            image_title: "Andy Warhol, ‘Mao F.S.II.95’, 1972",
            date: "1972",
            sale_message: "$70,000",
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
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id:
            "QXJ0d29yazphbmR5LXdhcmhvbC1sYWRpZXMtYW5kLWdlbnRsZW1lbi1mcy1paS1kb3QtMTI3LTE=",
          node: {
            id:
              "QXJ0d29yazphbmR5LXdhcmhvbC1sYWRpZXMtYW5kLWdlbnRsZW1lbi1mcy1paS1kb3QtMTI3LTE=",
            slug: "andy-warhol-ladies-and-gentlemen-fs-ii-dot-127-1",
            href: "/artwork/andy-warhol-ladies-and-gentlemen-fs-ii-dot-127-1",
            image: {
              aspect_ratio: 0.69,
              placeholder: "145.1534339990258%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/fqXp8pPB9Gq_skirBR-Ttw/large.jpg",
            },
            internalID: "5bb932d248638b389dccd1de",
            title: "LADIES & GENTLEMEN FS II.127",
            image_title: "Andy Warhol, ‘LADIES & GENTLEMEN FS II.127’, 1975",
            date: "1975",
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
              name: "Gallery Art",
              href: "/gallery-art",
              id: "UGFydG5lcjpnYWxsZXJ5LWFydA==",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC10cnVjay05",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC10cnVjay05",
            slug: "andy-warhol-truck-9",
            href: "/artwork/andy-warhol-truck-9",
            image: {
              aspect_ratio: 1.24,
              placeholder: "80.53691275167785%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/-RLvowuSRvkjZP9aPrdXhg/large.jpg",
            },
            internalID: "5936d55c8b3b816199432aeb",
            title: "Truck",
            image_title: "Andy Warhol, ‘Truck’, 1985",
            date: "1985",
            sale_message: "$40,000 - 50,000",
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
              name: "HG Contemporary",
              href: "/hg-contemporary",
              id: "UGFydG5lcjpoZy1jb250ZW1wb3Jhcnk=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1icmlsbG8tMQ==",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1icmlsbG8tMQ==",
            slug: "andy-warhol-brillo-1",
            href: "/artwork/andy-warhol-brillo-1",
            image: {
              aspect_ratio: 0.87,
              placeholder: "115.29525653436592%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/bXDSjJjt3mNnTtUbmv3-GQ/large.jpg",
            },
            internalID: "5a42130b275b24365005ee0e",
            title: "Brillo ",
            image_title: "Andy Warhol, ‘Brillo ’, 1970",
            date: "1970",
            sale_message: "$2,500",
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
              name: "Alpha 137 Gallery",
              href: "/alpha-137-gallery",
              id: "UGFydG5lcjphbHBoYS0xMzctZ2FsbGVyeQ==",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id:
            "QXJ0d29yazphbmR5LXdhcmhvbC1wbGFpbnMtaW5kaWFuLXNoaWVsZC1mcy1paS1kb3QtMzgyLTM=",
          node: {
            id:
              "QXJ0d29yazphbmR5LXdhcmhvbC1wbGFpbnMtaW5kaWFuLXNoaWVsZC1mcy1paS1kb3QtMzgyLTM=",
            slug: "andy-warhol-plains-indian-shield-fs-ii-dot-382-3",
            href: "/artwork/andy-warhol-plains-indian-shield-fs-ii-dot-382-3",
            image: {
              aspect_ratio: 1,
              placeholder: "99.70089730807578%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/YTOAMMo5veMFGqxWRfGGKw/large.jpg",
            },
            internalID: "5bad21ad1f74731ee9303eef",
            title: "PLAINS INDIAN SHIELD FS II.382",
            image_title: "Andy Warhol, ‘PLAINS INDIAN SHIELD FS II.382’, 1986",
            date: "1986",
            sale_message: "$29,500",
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
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1tYXJ0aGEtZ3JhaGFtLTE1",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1tYXJ0aGEtZ3JhaGFtLTE1",
            slug: "andy-warhol-martha-graham-15",
            href: "/artwork/andy-warhol-martha-graham-15",
            image: {
              aspect_ratio: 0.88,
              placeholder: "113.60239162929746%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/LQ_-wbit7h14pg_rRZlUxg/large.jpg",
            },
            internalID: "58aa83afa09a6724705e70ee",
            title: "Martha Graham",
            image_title: "Andy Warhol, ‘Martha Graham’, ca. 1980",
            date: "ca. 1980",
            sale_message: "$35,000",
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
              name: "Long-Sharp Gallery",
              href: "/long-sharp-gallery",
              id: "UGFydG5lcjpsb25nLXNoYXJwLWdhbGxlcnk=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC1maXNoLWZzLWlpaWEtZG90LTM5LTE=",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC1maXNoLWZzLWlpaWEtZG90LTM5LTE=",
            slug: "andy-warhol-fish-fs-iiia-dot-39-1",
            href: "/artwork/andy-warhol-fish-fs-iiia-dot-39-1",
            image: {
              aspect_ratio: 0.69,
              placeholder: "144.65281297516472%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/sxPJfeQIEfyw4ZIPs3CUBA/large.jpg",
            },
            internalID: "5a5a5a7f275b24325dcf4205",
            title: "FISH FS IIIA.39",
            image_title: "Andy Warhol, ‘FISH FS IIIA.39’, 1983",
            date: "1983",
            sale_message: "$27,500",
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
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "QXJ0d29yazphbmR5LXdhcmhvbC11bnRpdGxlZC1mZW1hbGUtZmlndXJl",
          node: {
            id: "QXJ0d29yazphbmR5LXdhcmhvbC11bnRpdGxlZC1mZW1hbGUtZmlndXJl",
            slug: "andy-warhol-untitled-female-figure",
            href: "/artwork/andy-warhol-untitled-female-figure",
            image: {
              aspect_ratio: 0.74,
              placeholder: "134.3361674296926%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/riZWHaE2IEQhiNHwmFjiKw/large.jpg",
            },
            internalID: "5c9a503a9817f366d0db9c4c",
            title: "Untitled (Female Figure)",
            image_title: "Andy Warhol, ‘Untitled (Female Figure)’, ca. 1956",
            date: "ca. 1956",
            sale_message: "$14,000",
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
              name: "Long-Sharp Gallery",
              href: "/long-sharp-gallery",
              id: "UGFydG5lcjpsb25nLXNoYXJwLWdhbGxlcnk=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id:
            "QXJ0d29yazphbmR5LXdhcmhvbC1sYWRpZXMtYW5kLWdlbnRsZW1lbi1mcy1paS1kb3QtMTI4LTI=",
          node: {
            id:
              "QXJ0d29yazphbmR5LXdhcmhvbC1sYWRpZXMtYW5kLWdlbnRsZW1lbi1mcy1paS1kb3QtMTI4LTI=",
            slug: "andy-warhol-ladies-and-gentlemen-fs-ii-dot-128-2",
            href: "/artwork/andy-warhol-ladies-and-gentlemen-fs-ii-dot-128-2",
            image: {
              aspect_ratio: 0.62,
              placeholder: "160.09673518742443%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/GIsZlmTq9UiTCEVIwx709g/large.jpg",
            },
            internalID: "5bbe671fa13448002a77b29e",
            title: "LADIES & GENTLEMEN FS II.128",
            image_title: "Andy Warhol, ‘LADIES & GENTLEMEN FS II.128’, 1975",
            date: "1975",
            sale_message: "$23,000",
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
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: false,
            is_saved: false,
            is_biddable: false,
          },
        },
      ],
    },
  },
}

// export const ArtworkFilterFixture = {
//   viewer: {
//     filtered_artworks: {
//       artworks: {
//         pageInfo: {
//           hasNextPage: true,
//           endCursor: "YXJyYXljb25uZWN0aW9uOjI5",
//         },
//         pageCursors: {
//           around: [
//             {
//               cursor: "YXJyYXljb25uZWN0aW9uOi0x",
//               page: 1,
//               isCurrent: true,
//             },
//             {
//               cursor: "YXJyYXljb25uZWN0aW9uOjI5",
//               page: 2,
//               isCurrent: false,
//             },
//             {
//               cursor: "YXJyYXljb25uZWN0aW9uOjU5",
//               page: 3,
//               isCurrent: false,
//             },
//             {
//               cursor: "YXJyYXljb25uZWN0aW9uOjg5",
//               page: 4,
//               isCurrent: false,
//             },
//           ],
//           first: null,
//           last: {
//             cursor: "YXJyYXljb25uZWN0aW9uOjI5Njk=",
//             page: 100,
//             isCurrent: false,
//           },
//           previous: null,
//         },
//         edges: [
//           {
//             node: {
//               slug: "andy-warhol-kenny-burrell",
//               href: "/artwork/andy-warhol-kenny-burrell",
//               image: {
//                 aspect_ratio: 1.35,
//                 placeholder: "74.20097898070833%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/lTTEGbhqyyMC8IraJuGTtw/large.jpg",
//               },
//               internalID: "5d041931e607c200127ef3c1",
//               title: "Kenny Burrell",
//               image_title: "Andy Warhol, ‘Kenny Burrell’, 1956",
//               date: "1956",
//               sale_message: "$95,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Ambleside Gallery",
//                 href: "/ambleside-gallery",
//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-truck-13",
//               href: "/artwork/andy-warhol-truck-13",
//               image: {
//                 aspect_ratio: 1.38,
//                 placeholder: "72.25%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/qguoXSQBjO8DWY7_hccTLA/large.jpg",
//               },
//               internalID: "5cb74b740c1fe113bb9e4bb3",
//               title: "Truck",
//               image_title: "Andy Warhol, ‘Truck’, ca. 1980",
//               date: "ca. 1980",
//               sale_message: "$215,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Westwood Gallery NYC",
//                 href: "/westwood-gallery-nyc",
//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-dollar-signs-2",
//               href: "/artwork/andy-warhol-dollar-signs-2",
//               image: {
//                 aspect_ratio: 0.77,
//                 placeholder: "129.25764192139738%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/PK5SWJlAnKSfnfcu2Gsz-A/large.jpg",
//               },
//               internalID: "5ba511f67cc3c00c36503f23",
//               title: "DOLLAR SIGNS",
//               image_title: "Andy Warhol, ‘DOLLAR SIGNS’, 1981",
//               date: "1981",
//               sale_message: "$315,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Gallery Art",
//                 href: "/gallery-art",
//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-dollars-1-fs-ii-dot-274",
//               href: "/artwork/andy-warhol-dollars-1-fs-ii-dot-274",
//               image: {
//                 aspect_ratio: 0.79,
//                 placeholder: "126.35956493921945%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/QNBY1kx6foZiKrB7msMWmw/large.jpg",
//               },
//               internalID: "5c65e45bdf9e64439cfecedf",
//               title: "$(1) FS II.274",
//               image_title: "Andy Warhol, ‘$(1) FS II.274’, 1982",
//               date: "1982",
//               sale_message: "$85,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Gallery Art",
//                 href: "/gallery-art",
//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-truck-9",
//               href: "/artwork/andy-warhol-truck-9",
//               image: {
//                 aspect_ratio: 1.24,
//                 placeholder: "80.53691275167785%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/-RLvowuSRvkjZP9aPrdXhg/large.jpg",
//               },
//               internalID: "5936d55c8b3b816199432aeb",
//               title: "Truck",
//               image_title: "Andy Warhol, ‘Truck’, 1985",
//               date: "1985",
//               sale_message: "Contact For Price",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "HG Contemporary",
//                 href: "/hg-contemporary",
//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: true,
//               is_saved: false,
//               is_biddable: false,
//
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-mao-177",
//               href: "/artwork/andy-warhol-mao-177",
//               image: {
//                 aspect_ratio: 1,
//                 placeholder: "100%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/aKZbFz8GjfIfUj9AKCl1ZQ/large.jpg",
//               },
//               internalID: "5936d55dcd530e69388b704e",
//               title: "MAO ",
//               image_title: "Andy Warhol, ‘MAO ’, 1972",
//               date: "1972",
//               sale_message: "Contact For Price",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "HG Contemporary",
//                 href: "/hg-contemporary",
//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: true,
//               is_saved: false,
//               is_biddable: false,
//
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-actress-shots-andy-warhol-ny-daily-news-1968",
//               href:
//                 "/artwork/andy-warhol-actress-shots-andy-warhol-ny-daily-news-1968",
//               image: {
//                 aspect_ratio: 1.07,
//                 placeholder: "93.81044487427465%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/L8Vjqhum4XX6sqiEXUg3Fg/large.jpg",
//               },
//               internalID: "575f459bcd530e65df000adb",
//               title: '"ACTRESS SHOTS ANDY WARHOL" NY Daily News, 1968',
//               image_title:
//                 'Andy Warhol, ‘"ACTRESS SHOTS ANDY WARHOL" NY Daily News, 1968’, 1968',
//               date: "1968",
//               sale_message: "$1,250",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "VINCE fine arts/ephemera",
//                 href: "/vince-fine-arts-slash-ephemera",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: true,
//               is_saved: false,
//               is_biddable: false,
//
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-shoe-18",
//               href: "/artwork/andy-warhol-shoe-18",
//               image: {
//                 aspect_ratio: 1.42,

//                 placeholder: "70.31349968010237%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/123zBWZmYy_OC9d9tV3ajQ/large.jpg",
//               },
//               internalID: "5bad2bbbc5cfa04f7c0c669e",
//               title: "Shoe",
//               image_title: "Andy Warhol, ‘Shoe’, 1958",
//               date: "1958",
//               sale_message: "$18,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "McClain Gallery",
//                 href: "/mcclain-gallery",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-cosmos",
//               href: "/artwork/andy-warhol-cosmos",
//               image: {
//                 aspect_ratio: 0.78,

//                 placeholder: "128.15296989422293%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/Lzonx30NloDXcs0FdKUjDw/large.jpg",
//               },
//               internalID: "5c84405fc8cb3760fe0e628d",
//               title: "COSMOS",
//               image_title: "Andy Warhol, ‘COSMOS’, ca. 1984",
//               date: "ca. 1984",
//               sale_message: "$99,500",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Gallery Art",
//                 href: "/gallery-art",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-unknown-female-iranian-princess",
//               href: "/artwork/andy-warhol-unknown-female-iranian-princess",
//               image: {
//                 aspect_ratio: 0.78,

//                 placeholder: "127.65957446808511%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/Ai17efWbDETpA3y9puiW5Q/large.jpg",
//               },
//               internalID: "5b197fed5b2fba13b1e3fc11",
//               title: "Unknown Female (Iranian Princess)",
//               image_title:
//                 "Andy Warhol, ‘Unknown Female (Iranian Princess)’, 1977",
//               date: "1977",
//               sale_message: "$45,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Cerbera Gallery",
//                 href: "/cerbera-gallery",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: true,
//               is_saved: false,
//               is_biddable: false,
//
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-peaches",
//               href: "/artwork/andy-warhol-peaches",
//               image: {
//                 aspect_ratio: 1.33,

//                 placeholder: "75.44910179640718%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/RkBOuh6bjwu-pY9a3CzaHA/large.jpg",
//               },
//               internalID: "59664e918b0c1456357651c2",
//               title: "Peaches",
//               image_title: "Andy Warhol, ‘Peaches’, 1978",
//               date: "1978",
//               sale_message: "$15,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "DTR Modern Galleries",
//                 href: "/dtr-modern-galleries",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-lee-iacocca-2",
//               href: "/artwork/andy-warhol-lee-iacocca-2",
//               image: {
//                 aspect_ratio: 0.82,

//                 placeholder: "121.67539267015708%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/NuQp4MqjsqRaiPpC9hu5BA/large.jpg",
//               },
//               internalID: "59d7a04a7622dd4d838b9f10",
//               title: "Lee Iacocca",
//               image_title: "Andy Warhol, ‘Lee Iacocca’, 1985",
//               date: "1985",
//               sale_message: "$18,500",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Robert Fontaine Gallery",
//                 href: "/robert-fontaine-gallery",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-birmingham-race-riot-10",
//               href: "/artwork/andy-warhol-birmingham-race-riot-10",
//               image: {
//                 aspect_ratio: 1.21,

//                 placeholder: "82.84023668639054%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/TuMBh41hMifd0F7EaheI9w/large.jpg",
//               },
//               internalID: "5cd38e5486c1c459da06ad0d",
//               title: "Birmingham Race Riot",
//               image_title: "Andy Warhol, ‘Birmingham Race Riot’, 1964",
//               date: "1964",
//               sale_message: "$13,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Graves International Art",
//                 href: "/graves-international-art",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-the-beatles-unique",
//               href: "/artwork/andy-warhol-the-beatles-unique",
//               image: {
//                 aspect_ratio: 1.31,

//                 placeholder: "76.54534950895436%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/veZiKJqEyw3EwO1xfIINEg/large.jpg",
//               },
//               internalID: "59e24ecd139b214a3023f5e4",
//               title: "The Beatles (Unique)",
//               image_title: "Andy Warhol, ‘The Beatles (Unique)’, 1980",
//               date: "1980",
//               sale_message: "$115,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "DANE FINE ART",
//                 href: "/great-dane-auctions",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: true,
//               is_saved: false,
//               is_biddable: false,
//
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-sewing-machine",
//               href: "/artwork/andy-warhol-sewing-machine",
//               image: {
//                 aspect_ratio: 1,

//                 placeholder: "100%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/MySOcyJvvgWT6US5jFafRA/large.jpg",
//               },
//               internalID: "572b64d18b3b81436a0011c8",
//               title: "Sewing Machine",
//               image_title: "Andy Warhol, ‘Sewing Machine’, 1952",
//               date: "1952",
//               sale_message: "$17,500",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Joseph K. Levene Fine Art, Ltd.",
//                 href: "/joseph-k-levene-fine-art-ltd",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-rare-original-andy-warhol-record-art",
//               href: "/artwork/andy-warhol-rare-original-andy-warhol-record-art",
//               image: {
//                 aspect_ratio: 1,

//                 placeholder: "100.2248201438849%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/nhUiLKacJVUqpMSXQ30nJA/large.jpg",
//               },
//               internalID: "5c7eccb73f643300285eb707",
//               title: "Rare original Andy Warhol record art",
//               image_title:
//                 "Andy Warhol, ‘Rare original Andy Warhol record art’, 1964",
//               date: "1964",
//               sale_message: "$750",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Lot 180",
//                 href: "/lot-180",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: true,
//               is_saved: false,
//               is_biddable: false,
//
//             },
//           },
//           {
//             node: {
//               slug:
//                 "andy-warhol-andy-warhol-photograph-of-victor-hugo-in-sequin-dress-and-a-man-1970s",
//               href:
//                 "/artwork/andy-warhol-andy-warhol-photograph-of-victor-hugo-in-sequin-dress-and-a-man-1970s",
//               image: {
//                 aspect_ratio: 1.37,

//                 placeholder: "73.24777887462982%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/h_JhF79Y6oy_fRMhg6M9tw/large.jpg",
//               },
//               internalID: "5c3fa9f737553c5bf49d2b0b",
//               title:
//                 "Andy Warhol, Photograph of Victor Hugo in Sequin Dress and a Man, 1970s",
//               image_title:
//                 "Andy Warhol, ‘Andy Warhol, Photograph of Victor Hugo in Sequin Dress and a Man, 1970s’, 1970s",
//               date: "1970s",
//               sale_message: "$8,500",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Hedges Projects",
//                 href: "/hedges-projects",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-northwest-coast-mask-fs-ii-dot-380-2",
//               href: "/artwork/andy-warhol-northwest-coast-mask-fs-ii-dot-380-2",
//               image: {
//                 aspect_ratio: 1,

//                 placeholder: "99.71291866028709%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/6y_-lwRBHGbGgw6KmsdCmQ/large.jpg",
//               },
//               internalID: "5ba6bc7e869e571108ea1aaa",
//               title: "NORTHWEST COAST MASK FS II.380",
//               image_title:
//                 "Andy Warhol, ‘NORTHWEST COAST MASK FS II.380’, 1986",
//               date: "1986",
//               sale_message: "$72,500",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Gallery Art",
//                 href: "/gallery-art",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-untitled-angel-with-scarf",
//               href: "/artwork/andy-warhol-untitled-angel-with-scarf",
//               image: {
//                 aspect_ratio: 0.8,

//                 placeholder: "124.86187845303867%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/yqC7sUAP_E2TTcBH2luELQ/large.jpg",
//               },
//               internalID: "5d03df49e607c200127ee73b",
//               title: "Untitled (Angel with Scarf)",
//               image_title:
//                 "Andy Warhol, ‘Untitled (Angel with Scarf)’, ca. 1954",
//               date: "ca. 1954",
//               sale_message: "$15,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Long-Sharp Gallery",
//                 href: "/long-sharp-gallery",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-andy-warhol-philip-fagan-and-gerard-malanga",
//               href:
//                 "/artwork/andy-warhol-andy-warhol-philip-fagan-and-gerard-malanga",
//               image: {
//                 aspect_ratio: 0.58,

//                 placeholder: "172.1784776902887%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/EjLVZTsT0Ve41R6ProKQPQ/large.jpg",
//               },
//               internalID: "530f70e97622dd44ed0000b9",
//               title: "Andy Warhol, Philip Fagan & Gerard Malanga",
//               image_title:
//                 "Andy Warhol, ‘Andy Warhol, Philip Fagan & Gerard Malanga’, 1964",
//               date: "1964",
//               sale_message: "Contact For Price",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Joseph K. Levene Fine Art, Ltd.",
//                 href: "/joseph-k-levene-fine-art-ltd",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: true,
//               is_saved: false,
//               is_biddable: false,
//
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-edward-kennedy-246",
//               href: "/artwork/andy-warhol-edward-kennedy-246",
//               image: {
//                 aspect_ratio: 0.79,

//                 placeholder: "126.05042016806722%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/v4_Qr-qqxp5ykoEDrvy3YQ/large.jpg",
//               },
//               internalID: "56e87cb3cb4c270f630006ac",
//               title: "Edward Kennedy ",
//               image_title: "Andy Warhol, ‘Edward Kennedy ’, 1980",
//               date: "1980",
//               sale_message: "$19,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "DTR Modern Galleries",
//                 href: "/dtr-modern-galleries",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-geronimo-fs-ii-dot-384-12",
//               href: "/artwork/andy-warhol-geronimo-fs-ii-dot-384-12",
//               image: {
//                 aspect_ratio: 1,

//                 placeholder: "99.9002493765586%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/XzLLLPlzBCa4VLRv-x9Llw/large.jpg",
//               },
//               internalID: "598dee35b202a34d8ae555fd",
//               title: "GERONIMO FS II.384",
//               image_title: "Andy Warhol, ‘GERONIMO FS II.384’, 1986",
//               date: "1986",
//               sale_message: "$59,500",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Gallery Art",
//                 href: "/gallery-art",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-muhammed-ali-1",
//               href: "/artwork/andy-warhol-muhammed-ali-1",
//               image: {
//                 aspect_ratio: 0.75,

//                 placeholder: "133.57142857142856%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/mdtpEgwYjBZOLAnbV_wT3A/large.jpg",
//               },
//               internalID: "5c5350d87571e150e59c064a",
//               title: "Muhammed Ali",
//               image_title: "Andy Warhol, ‘Muhammed Ali’, 1978",
//               date: "1978",
//               sale_message: "$110,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Samuel Owen Gallery",
//                 href: "/samuel-owen-gallery",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-andy-warhol-photograph-of-cornelia-guest-1985",
//               href:
//                 "/artwork/andy-warhol-andy-warhol-photograph-of-cornelia-guest-1985",
//               image: {
//                 aspect_ratio: 0.8,

//                 placeholder: "124.82435597189696%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/PWBFswpR5-Ai0lCrpRO5YA/large.jpg",
//               },
//               internalID: "5acf9ca9c9dc2404e5b1e7e1",
//               title: "Andy Warhol, Photograph of Cornelia Guest, 1985",
//               image_title:
//                 "Andy Warhol, ‘Andy Warhol, Photograph of Cornelia Guest, 1985’, 1985",
//               date: "1985",
//               sale_message: "$12,500",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Hedges Projects",
//                 href: "/hedges-projects",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-jason-mccoy",
//               href: "/artwork/andy-warhol-jason-mccoy",
//               image: {
//                 aspect_ratio: 0.78,

//                 placeholder: "128.2233936458185%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/1wd-zBc5RUMqVxXxWwvD2Q/large.jpg",
//               },
//               internalID: "5899f38bcd530e4cb9497c39",
//               title: "Jason McCoy",
//               image_title: "Andy Warhol, ‘Jason McCoy’, ca. 1975",
//               date: "ca. 1975",
//               sale_message: "$7,500",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Alpha 137 Gallery",
//                 href: "/alpha-137-gallery",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-christmas-tree",
//               href: "/artwork/andy-warhol-christmas-tree",
//               image: {
//                 aspect_ratio: 1.54,

//                 placeholder: "64.7452229299363%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/Xnb1U4aBD90UjbZG727O-A/large.jpg",
//               },
//               internalID: "5d03bbdc0727f1000dbcf08b",
//               title: "Christmas Tree",
//               image_title: "Andy Warhol, ‘Christmas Tree’, ca. 1957",
//               date: "ca. 1957",
//               sale_message: "$12,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Long-Sharp Gallery",
//                 href: "/long-sharp-gallery",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-untitled-jon-gould-1",
//               href: "/artwork/andy-warhol-untitled-jon-gould-1",
//               image: {
//                 aspect_ratio: 0.73,

//                 placeholder: "137.22126929674099%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/m08CoClNXzF2xnjrCxy5Kg/large.jpg",
//               },
//               internalID: "5ba53e0aac71ac1fcc830a61",
//               title: "UNTITLED ( JON GOULD)",
//               image_title: "Andy Warhol, ‘UNTITLED ( JON GOULD)’, 1982",
//               date: "1982",
//               sale_message: "$75,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Gallery Art",
//                 href: "/gallery-art",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-andy-warhol-photograph-of-timothy-hutton-1980",
//               href:
//                 "/artwork/andy-warhol-andy-warhol-photograph-of-timothy-hutton-1980",
//               image: {
//                 aspect_ratio: 0.76,

//                 placeholder: "131.11395646606914%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/_Gp2Tqu2040tCbVzm5ZSOg/large.jpg",
//               },
//               internalID: "5a849c5c8b0c1437e789894f",
//               title: "Andy Warhol, Photograph of Timothy Hutton, 1980",
//               image_title:
//                 "Andy Warhol, ‘Andy Warhol, Photograph of Timothy Hutton, 1980’, 1980",
//               date: "1980",
//               sale_message: "$6,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "Hedges Projects",
//                 href: "/hedges-projects",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-superman-f-and-s-ii-260-3",
//               href: "/artwork/andy-warhol-superman-f-and-s-ii-260-3",
//               image: {
//                 aspect_ratio: 1,

//                 placeholder: "100.45558086560365%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/JfQvrm5cdR-D0O7hqqbEZg/large.jpg",
//               },
//               internalID: "5d02a7dc9a0484000d291164",
//               title: "Superman (F. & S. II. 260)",
//               image_title: "Andy Warhol, ‘Superman (F. & S. II. 260)’, 1981",
//               date: "1981",
//               sale_message: "$240,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "David Benrimon Fine Art",
//                 href: "/david-benrimon-fine-art",

//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//           {
//             node: {
//               slug: "andy-warhol-mao-f-dot-s-ii-dot-95",
//               href: "/artwork/andy-warhol-mao-f-dot-s-ii-dot-95",
//               image: {
//                 aspect_ratio: 0.99,

//                 placeholder: "101.26150698943061%",
//                 url:
//                   "https://d32dm0rphc51dk.cloudfront.net/NQ-02-O7u2EcAK3VVVuBpg/large.jpg",
//               },
//               internalID: "5ade4038b202a32c06c7391e",
//               title: "Mao F.S.II.95",
//               image_title: "Andy Warhol, ‘Mao F.S.II.95’, 1972",
//               date: "1972",
//               sale_message: "$70,000",
//               cultural_maker: null,
//               artists: [
//                 {
//                   href: "/artist/andy-warhol",
//                   name: "Andy Warhol",
//                 },
//               ],
//               collecting_institution: null,
//               partner: {
//                 name: "DTR Modern Galleries",
//                 href: "/dtr-modern-galleries",
//                 type: "Gallery",
//               },
//               sale: null,
//               sale_artwork: null,
//               is_inquireable: false,
//               is_saved: false,
//               is_biddable: false,
//               is_offerable: true,
//             },
//           },
//         ],
//       },
//     },
//   },
// }
