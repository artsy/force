import { FeatureApp_Test_QueryRawResponse } from "v2/__generated__/FeatureApp_Test_Query.graphql"

export const FEATURED_LINKS_SET = {
  id: "T3JkZXJlZFNldDo1ZTZmNWVlMmM1MmE1OTAwMTExMTEyMWY=",
  name: "Latest News",
  description: "",
  itemType: "FeaturedLink",
  orderedItems: {
    edges: [
      {
        node: {
          __typename: "FeaturedLink",
          id: "RmVhdHVyZWRMaW5rOjVlNmY2MmU2NmU4YTcxMDAwZWM1NjViNA==",
          href:
            "/article/alserkal-art-week-upcoming-exhibitions-alserkal-avenue",
          title: "Upcoming Exhibitions at Alserkal Avenue",
          subtitle: "",
          description: "",
          image: {
            cropped: {
              src:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F_SzbXBMwj9JIj0QFspYcZQ%2Fwide.jpg",
              width: 800,
              height: 600,
            },
          },
        },
      },
    ],
  },
}

export const ARTWORKS_SET = {
  id: "T3JkZXJlZFNldDo1ZWJkODBiMjA2ZmU4ZjAwMTI3YWQ4N2Y=",
  name: "CRM test artworks",
  description: "",
  itemType: "Artwork",
  orderedItems: {
    edges: [
      {
        node: {
          __typename: "Artwork",
          id: "QXJ0d29yazo1YmI1MjgxZWEyYzdjZDAwMjgyMzA1YzM=",
          internalID: "5bb5281ea2c7cd00282305c3",
          title: "Flowers",
          image_title: "Duaiv, ‘Flowers’",
          image: {
            placeholder: "126.2510254306809%",
            url:
              "https://d32dm0rphc51dk.cloudfront.net/LhtpDuCsx_PE-VcqYgG-JA/large.jpg",
            aspect_ratio: 0.79,
          },
          href: "/artwork/duaiv-flowers",
          date: "",
          sale_message: "$175",
          cultural_maker: null,
          artists: [
            {
              id: "QXJ0aXN0OjU3NzdmNmY5Y2I0YzI3NjVkYzAwMDNlMg==",
              href: "/artist/duaiv",
              name: "Duaiv",
            },
          ],
          collecting_institution: null,
          partner: {
            name: "Baterbys",
            href: "/baterbys",
            id: "UGFydG5lcjo1OGVkNDg5ZGM5ZGMyNDIzOTcxMjY3NTQ=",
            type: "Gallery",
          },
          sale: null,
          sale_artwork: null,
          is_inquireable: true,
          slug: "duaiv-flowers",
          is_saved: false,
          is_biddable: false,
          is_acquireable: false,
          is_offerable: false,
        },
      },
    ],
  },
}

export const FEATURE = {
  id: "RmVhdHVyZTo1ZTY5MGMzMWQyMmZmMTAwMTIwYzQzMzY=",
  name: "Alserkal Art Week",
  slug: "alserkal-art-week",
  meta: {
    name: "Alserkal Art Week",
    description: "some description",
    image: "some-url.jpg",
  },
  subheadline:
    "<p>Alserkal Art Week Online</p>\n<p>Discover new exhibitions by Alserkal Avenue Galleries</p>\n",
  image: {
    url: "some-url.jpg",
    cropped: { url: null },
  },
  description:
    "<p>Alserkal Art Week Online</p>\n<p>Discover new exhibitions by Alserkal Avenue Galleries</p>\n",
  callout:
    "<p>Alserkal Art Week Online</p>\n<p>Discover new exhibitions by Alserkal Avenue Galleries</p>\n",
  sets: {
    edges: [{ node: FEATURED_LINKS_SET }, { node: ARTWORKS_SET }],
  },
}

export const FEATURE_APP_FIXTURE: FeatureApp_Test_QueryRawResponse = {
  feature: FEATURE,
}
