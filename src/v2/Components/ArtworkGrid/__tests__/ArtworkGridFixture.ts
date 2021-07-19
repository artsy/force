import { ArtworkGrid_Test_QueryRawResponse } from "v2/__generated__/ArtworkGrid_Test_Query.graphql"

// @ts-expect-error STRICT_NULL_CHECK
export const ArtworksGridEdges: ArtworkGrid_Test_QueryRawResponse["artist"]["artworks_connection"]["edges"] = [
  {
    __typename: "ArtworkEdge",
    id: "QXJ0d29yazprYXdzLXBpbm9jY2hpby0z",
    node: {
      id: "QXJ0d29yazprYXdzLXBpbm9jY2hpby0z",
      image: {
        aspect_ratio: 0.67,
        placeholder: "150%",
        url:
          "https://d32dm0rphc51dk.cloudfront.net/qu24dwWrXHfw5Z3e6KhXPQ/large.jpg",
      },
      is_biddable: false,
      href: "/artwork/kaws-pinocchio-3",
      title: "Pinocchio",
      image_title: "KAWS, Pinocchio, 2018",
      date: "2018",
      sale_message: "Contact For Price",
      cultural_maker: null,
      artists: [
        {
          id: "QXJ0aXN0Omthd3M=",
          href: "/artist/kaws",
          name: "KAWS",
        },
      ],
      artistNames: "KAWS",
      collecting_institution: null,
      partner: {
        name: "IDEA",
        href: "/idea",
        id: "UGFydG5lcjppZGVhLTE=",
        type: "Gallery",
      },
      sale: null,
      sale_artwork: null,
      internalID: "5b33f5fa139b2110e3393f17",
      is_inquireable: true,
      slug: "kaws-pinocchio-3",
      is_saved: false,
    },
  },
  {
    __typename: "ArtworkEdge",
    id: "QXJ0d29yazprYXdzLWthd3MteC11bmRlcmNvdmVyLTU=",
    node: {
      id: "QXJ0d29yazprYXdzLWthd3MteC11bmRlcmNvdmVyLTU=",
      image: {
        aspect_ratio: 0.71,
        placeholder: "141.82142857142856%",
        url:
          "https://d32dm0rphc51dk.cloudfront.net/oQDgNpsXPr14ZN1Bh_-03A/large.jpg",
      },
      is_biddable: false,
      href: "/artwork/kaws-kaws-x-undercover-5",
      title: "KAWS x Undercover ",
      image_title: "KAWS, KAWS x Undercover, 1999",
      date: "1999",
      sale_message: "$2,500",
      cultural_maker: null,
      artists: [
        {
          id: "QXJ0aXN0Omthd3M=",
          href: "/artist/kaws",
          name: "KAWS",
        },
      ],
      artistNames: "KAWS",
      collecting_institution: null,
      partner: {
        name: "Alpha 137 Gallery",
        href: "/alpha-137-gallery",
        id: "UGFydG5lcjphbHBoYS0xMzctZ2FsbGVyeQ==",
        type: "Gallery",
      },
      sale: null,
      sale_artwork: null,
      internalID: "5b7296385bca99428e22c3ff",
      is_inquireable: true,
      slug: "kaws-kaws-x-undercover-5",
      is_saved: false,
    },
  },
  {
    __typename: "ArtworkEdge",
    id: "QXJ0d29yazprYXdzLWthd3MteC11bmRlcmNvdmVyLTQ=",
    node: {
      id: "QXJ0d29yazprYXdzLWthd3MteC11bmRlcmNvdmVyLTQ=",
      image: {
        aspect_ratio: 0.71,
        placeholder: "141.42857142857144%",
        url:
          "https://d32dm0rphc51dk.cloudfront.net/uW1NTw1GoTtuViaEFwxX-A/large.jpg",
      },
      is_biddable: false,
      href: "/artwork/kaws-kaws-x-undercover-4",
      title: "KAWS x Undercover ",
      image_title: "KAWS, KAWS x Undercover, 1999",
      date: "1999",
      sale_message: "$2,500",
      cultural_maker: null,
      artists: [
        {
          id: "QXJ0aXN0Omthd3M=",
          href: "/artist/kaws",
          name: "KAWS",
        },
      ],
      artistNames: "KAWS",
      collecting_institution: null,
      partner: {
        name: "Alpha 137 Gallery",
        href: "/alpha-137-gallery",
        id: "UGFydG5lcjphbHBoYS0xMzctZ2FsbGVyeQ==",
        type: "Gallery",
      },
      sale: null,
      sale_artwork: null,
      internalID: "5b729753a0916842e6238818",
      is_inquireable: true,
      slug: "kaws-kaws-x-undercover-4",
      is_saved: false,
    },
  },
  {
    __typename: "ArtworkEdge",
    id: "QXJ0d29yazprYXdzLXBhc3NpbmctdGhyb3VnaC1icm93bi1vcGVuLWVkaXRpb24=",
    node: {
      collecting_institution: null,
      cultural_maker: null,
      date: "2018",
      href: "/artwork/kaws-passing-through-brown-open-edition",
      id: "QXJ0d29yazprYXdzLXBhc3NpbmctdGhyb3VnaC1icm93bi1vcGVuLWVkaXRpb24=",
      image: {
        aspect_ratio: 1.5,
        placeholder: "66.66666666666666%",
        url:
          "https://d32dm0rphc51dk.cloudfront.net/USLhDw-XGCq7haTeCRPeDg/large.jpg",
      },
      is_biddable: false,
      is_inquireable: true,
      is_saved: false,
      partner: {
        name: "Marcel Katz Art",
        href: "/marcel-katz-art",
        id: "UGFydG5lcjptYXJjZWwta2F0ei1hcnQ=",
        type: "Gallery",
      },
      sale: null,
      sale_artwork: null,
      sale_message: "$450",
      title: "PASSING THROUGH BROWN (OPEN EDITION)",
      image_title: "PASSING THROUGH BROWN (OPEN EDITION)",
      internalID: "5b9c4afc2779fa4c5c47a748",
      slug: "kaws-passing-through-brown-open-edition",

      artists: null,
      artistNames: "",
    },
  },
]

// @ts-expect-error STRICT_NULL_CHECK
export const ArtworkGridFixture: ArtworkGrid_Test_QueryRawResponse["artist"]["artworks_connection"] = {
  // pageInfo: {
  //   hasNextPage: true,
  //   endCursor: "YXJyYXljb25uZWN0aW9uOjI5",
  // },
  // pageCursors: {
  //   around: [{ cursor: "YXJyYXljb25uZWN0aW9uOi0x", page: 1, isCurrent: true }],
  //   first: null,
  //   last: null,
  //   previous: null,
  // },
  edges: ArtworksGridEdges,
}
