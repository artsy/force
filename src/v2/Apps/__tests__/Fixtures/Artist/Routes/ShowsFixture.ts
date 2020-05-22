import { Shows_Test_QueryRawResponse } from "v2/__generated__/Shows_Test_Query.graphql"

export const ShowsFixture = {
  viewer: {
    artist_currentShows: {
      slug: "pablo-picasso",

      showsConnection: {
        pageInfo: { hasNextPage: true, endCursor: "YXJyYXljb25uZWN0aW9uOjM=" },
        pageCursors: {
          around: [
            { cursor: "YXJyYXljb25uZWN0aW9uOi0x", page: 1, isCurrent: true },
            { cursor: "YXJyYXljb25uZWN0aW9uOjM=", page: 2, isCurrent: false },
          ],
          first: null,
          last: null,
          previous: null,
        },
        edges: [
          {
            node: {
              partner: {
                __typename: "Partner",
                name: "Maddox Gallery",
                id: "UGFydG5lcjptYWRkb3gtZ2FsbGVyeQ==",
              },
              name: "Autumn Contemporary - Gstaad, Switzerland",
              href:
                "/show/maddox-gallery-autumn-contemporary-gstaad-switzerland",
              exhibition_period: "Sep 25 – Oct 22",
              cover_image: {
                cropped: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FfpBvbkttNdtzFcMTOt5M9w%2Flarge.jpg",
                },
              },
              city: "Gstaad",
              id:
                "U2hvdzptYWRkb3gtZ2FsbGVyeS1hdXR1bW4tY29udGVtcG9yYXJ5LWdzdGFhZC1zd2l0emVybGFuZA==",
            },
          },
          {
            node: {
              partner: {
                __typename: "Partner",
                name: "BAILLY GALLERY",
                id: "UGFydG5lcjpiYWlsbHktZ2FsbGVyeQ==",
              },
              name: "BAILLY GALLERY at Art Élysées–Art & Design 2018",
              href:
                "/show/bailly-gallery-bailly-gallery-at-art-elysees-art-and-design-2018",
              exhibition_period: "Oct 18 – 22",
              cover_image: {
                cropped: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fr6_Ax9pz_ms8yC9g8FZxzQ%2Flarge.jpg",
                },
              },
              city: null,
              id:
                "U2hvdzpiYWlsbHktZ2FsbGVyeS1iYWlsbHktZ2FsbGVyeS1hdC1hcnQtZWx5c2Vlcy1hcnQtYW5kLWRlc2lnbi0yMDE4",
            },
          },
          {
            node: {
              partner: {
                __typename: "Partner",
                name: "Galerie Philippe David",
                id: "UGFydG5lcjpnYWxlcmllLXBoaWxpcHBlLWRhdmlk",
              },
              name: "Galerie Philippe David at Art Élysées–Art & Design 2018",
              href:
                "/show/galerie-philippe-david-galerie-philippe-david-at-art-elysees-art-and-design-2018",
              exhibition_period: "Oct 18 – 22",
              cover_image: {
                cropped: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fr1zhpbCHuwwEGhzofxcVkA%2Flarge.jpg",
                },
              },
              city: null,
              id:
                "U2hvdzpnYWxlcmllLXBoaWxpcHBlLWRhdmlkLWdhbGVyaWUtcGhpbGlwcGUtZGF2aWQtYXQtYXJ0LWVseXNlZXMtYXJ0LWFuZC1kZXNpZ24tMjAxOA==",
            },
          },
          {
            node: {
              partner: {
                __typename: "Partner",
                name: "Graves International Art",
                id: "UGFydG5lcjpncmF2ZXMtaW50ZXJuYXRpb25hbC1hcnQ=",
              },
              name: "Dali: The Art of Surrealism and Paris School",
              href:
                "/show/graves-international-art-dali-the-art-of-surrealism-and-paris-school",
              exhibition_period: "Mar 1 – Oct 30",
              cover_image: {
                cropped: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FKJlluFgSnE_pyaO5BBRBLg%2Flarge.jpg",
                },
              },
              city: "Somerset",
              id:
                "U2hvdzpncmF2ZXMtaW50ZXJuYXRpb25hbC1hcnQtZGFsaS10aGUtYXJ0LW9mLXN1cnJlYWxpc20tYW5kLXBhcmlzLXNjaG9vbA==",
            },
          },
        ],
      },
      id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
    },
    artist_upcomingShows: {
      slug: "pablo-picasso",
      showsConnection: {
        pageInfo: { hasNextPage: true, endCursor: "YXJyYXljb25uZWN0aW9uOjM=" },
        pageCursors: {
          around: [
            { cursor: "YXJyYXljb25uZWN0aW9uOi0x", page: 1, isCurrent: true },
            { cursor: "YXJyYXljb25uZWN0aW9uOjM=", page: 2, isCurrent: false },
            { cursor: "YXJyYXljb25uZWN0aW9uOjc=", page: 3, isCurrent: false },
          ],
          first: null,
          last: null,
          previous: null,
        },
        edges: [
          {
            node: {
              partner: {
                __typename: "Partner",
                name: "John Szoke",
                id: "UGFydG5lcjpqb2huLXN6b2tlLTE=",
              },
              name: "John Szoke at IFPDA Fine Art Print Fair 2018",
              href:
                "/show/john-szoke-1-john-szoke-at-ifpda-fine-art-print-fair-2018",
              exhibition_period: "Oct 25 – 28",
              cover_image: {
                cropped: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FAyqPNn8idL1PATU1FbXJJg%2Flarge.jpg",
                },
              },
              city: null,
              id:
                "U2hvdzpqb2huLXN6b2tlLTEtam9obi1zem9rZS1hdC1pZnBkYS1maW5lLWFydC1wcmludC1mYWlyLTIwMTg=",
            },
          },
          {
            node: {
              partner: {
                __typename: "Partner",
                name: "William Weston Gallery Ltd.",
                id: "UGFydG5lcjp3aWxsaWFtLXdlc3Rvbi1nYWxsZXJ5LWx0ZA==",
              },
              name:
                "William Weston Gallery Ltd. at IFPDA Fine Art Print Fair 2018",
              href:
                "/show/william-weston-gallery-ltd-william-weston-gallery-ltd-at-ifpda-fine-art-print-fair-2018",
              exhibition_period: "Oct 25 – 28",
              cover_image: {
                cropped: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F7l47HJal4v0DZMoLojnT5Q%2Flarge.jpg",
                },
              },
              city: null,
              id:
                "U2hvdzp3aWxsaWFtLXdlc3Rvbi1nYWxsZXJ5LWx0ZC13aWxsaWFtLXdlc3Rvbi1nYWxsZXJ5LWx0ZC1hdC1pZnBkYS1maW5lLWFydC1wcmludC1mYWlyLTIwMTg=",
            },
          },
          {
            node: {
              partner: {
                __typename: "Partner",
                name: "Frederick Mulder",
                id: "UGFydG5lcjpmcmVkZXJpY2stbXVsZGVy",
              },
              name: "Frederick Mulder at IFPDA Fine Art Print Fair 2018",
              href:
                "/show/frederick-mulder-frederick-mulder-at-ifpda-fine-art-print-fair-2018",
              exhibition_period: "Oct 25 – 28",
              cover_image: {
                cropped: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fmiy9-2UACZ0kbOb4aRTTKA%2Flarge.jpg",
                },
              },
              city: null,
              id:
                "U2hvdzpmcmVkZXJpY2stbXVsZGVyLWZyZWRlcmljay1tdWxkZXItYXQtaWZwZGEtZmluZS1hcnQtcHJpbnQtZmFpci0yMDE4",
            },
          },
          {
            node: {
              partner: {
                __typename: "Partner",
                name: "Galerie Maximillian",
                id: "UGFydG5lcjpnYWxlcmllLW1heGltaWxsaWFu",
              },
              name: "Galerie Maximillian at IFPDA Fine Art Print Fair 2018",
              href:
                "/show/galerie-maximillian-galerie-maximillian-at-ifpda-fine-art-print-fair-2018",
              exhibition_period: "Oct 25 – 28",
              cover_image: {
                cropped: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FbO-GakAPo__Hf2-jJSGy3w%2Flarge.jpg",
                },
              },
              city: null,
              id:
                "U2hvdzpnYWxlcmllLW1heGltaWxsaWFuLWdhbGVyaWUtbWF4aW1pbGxpYW4tYXQtaWZwZGEtZmluZS1hcnQtcHJpbnQtZmFpci0yMDE4",
            },
          },
        ],
      },
      id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
    },
    artist_pastShows: {
      slug: "pablo-picasso",
      showsConnection: {
        pageInfo: { hasNextPage: true, endCursor: "YXJyYXljb25uZWN0aW9uOjM=" },
        pageCursors: {
          around: [
            { cursor: "YXJyYXljb25uZWN0aW9uOi0x", page: 1, isCurrent: true },
            { cursor: "YXJyYXljb25uZWN0aW9uOjM=", page: 2, isCurrent: false },
            { cursor: "YXJyYXljb25uZWN0aW9uOjc=", page: 3, isCurrent: false },
            { cursor: "YXJyYXljb25uZWN0aW9uOjEx", page: 4, isCurrent: false },
          ],
          first: null,
          last: {
            cursor: "YXJyYXljb25uZWN0aW9uOjIzMQ==",
            page: 59,
            isCurrent: false,
          },
          previous: null,
        },
        edges: [
          {
            node: {
              partner: {
                __typename: "Partner",
                name: "Leviton Fine Art",
                id: "UGFydG5lcjpsZXZpdG9uLWZpbmUtYXJ0",
              },
              name: "Artsy Grand Opening, Blue Chip Artists",
              href:
                "/show/leviton-fine-art-artsy-grand-opening-blue-chip-artists",
              exhibition_period: "Sep 20 – Oct 19",
              cover_image: {
                cropped: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F_2JbbExhmc4Na-t20cRWkw%2Flarge.jpg",
                },
              },
              city: null,
              id:
                "U2hvdzpsZXZpdG9uLWZpbmUtYXJ0LWFydHN5LWdyYW5kLW9wZW5pbmctYmx1ZS1jaGlwLWFydGlzdHM=",
            },
          },
          {
            node: {
              partner: {
                __typename: "Partner",
                name: "ArtWise",
                id: "UGFydG5lcjphcnR3aXNl",
              },
              name: "#ArtWiseUP: Timestamped Exhibition Posters",
              href:
                "/show/artwise-number-artwiseup-timestamped-exhibition-posters",
              exhibition_period: "Sep 14 – Oct 14",
              cover_image: {
                cropped: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Ff3n1ZzNPf7Ta13b98KFhFA%2Flarge.jpg",
                },
              },
              city: null,
              id:
                "U2hvdzphcnR3aXNlLW51bWJlci1hcnR3aXNldXAtdGltZXN0YW1wZWQtZXhoaWJpdGlvbi1wb3N0ZXJz",
            },
          },
          {
            node: {
              partner: {
                __typename: "Partner",
                name: "Tanya Baxter Contemporary",
                id: "UGFydG5lcjp0YW55YS1iYXh0ZXItY29udGVtcG9yYXJ5",
              },
              name:
                "Modern British & Contemporary Art to Celebrate Frieze Week",
              href:
                "/show/tanya-baxter-contemporary-modern-british-and-contemporary-art-to-celebrate-frieze-week",
              exhibition_period: "Oct 6 – 13",
              cover_image: {
                cropped: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F3ssfZl4iMKS19bRqm9ej4w%2Flarge.jpg",
                },
              },
              city: "London",
              id:
                "U2hvdzp0YW55YS1iYXh0ZXItY29udGVtcG9yYXJ5LW1vZGVybi1icml0aXNoLWFuZC1jb250ZW1wb3JhcnktYXJ0LXRvLWNlbGVicmF0ZS1mcmllemUtd2Vlaw==",
            },
          },
          {
            node: {
              partner: {
                __typename: "Partner",
                name: "Marlborough Gallery",
                id: "UGFydG5lcjptYXJsYm9yb3VnaC1nYWxsZXJ5LTE=",
              },
              name: "Portraits in Print",
              href: "/show/marlborough-gallery-1-portraits-in-print",
              exhibition_period: "Sep 4 – Oct 9",
              cover_image: {
                cropped: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FCRs8Aq5Bs1g-LRnqRFsd1A%2Flarge.jpg",
                },
              },
              city: "Marlborough Graphics, New York",
              id:
                "U2hvdzptYXJsYm9yb3VnaC1nYWxsZXJ5LTEtcG9ydHJhaXRzLWluLXByaW50",
            },
          },
        ],
      },
      id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
    },
  },
} as Shows_Test_QueryRawResponse
