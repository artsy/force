import { ArtistInfo_Test_QueryRawResponse } from "v2/__generated__/ArtistInfo_Test_Query.graphql"

export const ArtistInfoFixture: ArtistInfo_Test_QueryRawResponse["artist"] = {
  internalID: "pablo-picasso",
  slug: "pablo-picasso",
  name: "Pablo Picasso",
  href: "/artist/pablo-picasso",
  image: {
    cropped: {
      src:
        "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=100&height=100&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fi3rCA3IaKE-cLBnc-U5swQ%2Flarge.jpg",
      srcSet:
        "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=100&height=100&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fi3rCA3IaKE-cLBnc-U5swQ%2Flarge.jpg 1x",
    },
  },
  formatted_nationality_and_birthday: "Spanish, 1881–1973",
  counts: { partner_shows: 314, follows: 0 },
  exhibition_highlights: [
    {
      partner: {
        __isNode: "Partner",
        __typename: "Partner",
        name: "Tate Modern",
        id: "UGFydG5lcjp0YXRlLW1vZGVybg==",
      },
      name: "The EY Exhibition: PICASSO 1932 – Love, Fame, Tragedy",
      start_at: "2018",
      cover_image: {
        cropped: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRKXtbPHeAhlCMj5N9r04SA%2Flarge.jpg",
        },
      },
      city: "London",
      id:
        "U2hvdzp0YXRlLW1vZGVybi10aGUtZXktZXhoaWJpdGlvbi1waWNhc3NvLTE5MzItbG92ZS1mYW1lLXRyYWdlZHk=",
    },
    {
      partner: {
        __isNode: "Partner",
        __typename: "Partner",
        name: "Musée Picasso Paris",
        id: "UGFydG5lcjptdXNlZS1waWNhc3NvLXBhcmlz",
      },
      name: "Picasso 1932. Année érotique",
      start_at: "2017",
      cover_image: {
        cropped: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FgU16ukVwAAgtHy9mjhIWQw%2Flarge.jpg",
        },
      },
      city: "Paris",
      id:
        "U2hvdzptdXNlZS1waWNhc3NvLXBhcmlzLXBpY2Fzc28tMTkzMi1hbm5lZS1lcm90aXF1ZQ==",
    },
    {
      partner: {
        __typename: "Partner",
        __isNode: "Partner",
        name: "Musée Picasso Paris",
        id: "UGFydG5lcjptdXNlZS1waWNhc3NvLXBhcmlz",
      },
      name: "Olga Picasso",
      start_at: "2017",
      cover_image: {
        cropped: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FTSBi03uZrWrng6Wx2dXvbQ%2Flarge.jpg",
        },
      },
      city: "Paris",
      id: "U2hvdzptdXNlZS1waWNhc3NvLXBhcmlzLW9sZ2EtcGljYXNzbw==",
    },
  ],
  biographyBlurb: {
    credit: "",
    partnerID: "",
    text:
      '<p>A prolific and tireless innovator of art forms, Pablo Picasso impacted the course of 20th-century art with unparalleled magnitude. Inspired by African and Iberian art and developments in the world around him, Picasso contributed significantly to a number of artistic movements, notably <a href="/gene/cubism">Cubism</a>, <a href="/gene/surrealism">Surrealism</a>, <a href="/gene/neoclassicism">Neoclassicism</a>, and <a href="/gene/austrian-and-german-expressionism">Expressionism</a>. Along with <a href="/artist/georges-braque">Georges Braque</a>, Picasso is best known for pioneering <a href="/gene/cubism">Cubism</a> in an attempt to reconcile three-dimensional space with the two-dimensional picture plane, once asking, “Are we to paint what’s on the face, what’s inside the face, or what’s behind it?” Responding to the Spanish Civil War, he painted his most famous work, <em>Guernica</em> (1937), whose violent images of anguished figures rendered in grisaille made it a definitive work of anti-war art. “Painting is not made to decorate apartments,” he said. “It’s an offensive and defensive weapon against the enemy.” Picasso’s sizable oeuvre includes over 20,000 paintings, prints, drawings, sculptures, ceramics, theater sets, and costume designs.</p>\n',
  },
  id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
  collections: [
    "Tate",
    "Museum of Modern Art (MoMA)",
    "National Gallery of Art, Washington, D.C.",
    "Indianapolis Museum of Art at Newfields",
    "San Francisco Museum of Modern Art (SFMOMA) ",
  ],
  highlights: {
    partnersConnection: {
      edges: [
        {
          node: {
            __typename: "Partner",
            categories: [
              { id: "contemporary", slug: "contemporary" },
              { id: "established", slug: "established" },
              { id: "modern", slug: "modern" },
              { id: "painting", slug: "painting" },
              { id: "blue-chip", slug: "blue-chip" },
            ],
            id: "UGFydG5lcjpnYWdvc2lhbg==",
          },
          id: "UGFydG5lckFydGlzdEVkZ2U6NTIwNTBlYmMzYjU1NTIzOTNmMDAwMDk0",
        },
        {
          node: {
            __typename: "Partner",
            categories: [
              { id: "contemporary", slug: "contemporary" },
              { id: "established", slug: "established" },
              { id: "painting", slug: "painting" },
              { id: "blue-chip", slug: "blue-chip" },
            ],
            id: "UGFydG5lcjpwYWNlLWdhbGxlcnk=",
          },
          id: "UGFydG5lckFydGlzdEVkZ2U6NTZmNTRhYjdjZDUzMGU2NTg3MDAwMWM4",
        },
        {
          node: {
            __typename: "Partner",
            categories: [
              { id: "contemporary", slug: "contemporary" },
              { id: "established", slug: "established" },
              { id: "mid-career", slug: "mid-career" },
              { id: "painting", slug: "painting" },
              { id: "top-established", slug: "top-established" },
            ],
            id: "UGFydG5lcjpiZWNrLWFuZC1lZ2dlbGluZw==",
          },
          id: "UGFydG5lckFydGlzdEVkZ2U6NTM2YWE5YmVlYmFkNjQ4MzM4MDAwMDk2",
        },
      ],
    },
  },
  auctionResultsConnection: {
    edges: [
      {
        node: {
          __typename: "AuctionResult",
          price_realized: { display: "$179m" },
          organization: "Christie's",
          sale_date: "2015",
          id: "QXVjdGlvblJlc3VsdDoxNjQ3MQ==",
        },
      },
    ],
  },
  is_followed: false,
}
