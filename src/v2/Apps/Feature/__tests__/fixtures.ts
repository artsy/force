import { FeatureApp_Test_QueryRawResponse } from "v2/__generated__/FeatureApp_Test_Query.graphql"

export const FEATURED_LINKS_SET = {
  description: "",
  id: "T3JkZXJlZFNldDo1ZTZmNWVlMmM1MmE1OTAwMTExMTEyMWY=",
  itemType: "FeaturedLink",
  layout: "DEFAULT" as "DEFAULT" | "FULL",
  name: "Latest News",
  orderedItems: {
    edges: [
      {
        __typename: "OrderedSetItemEdge",
        node: {
          __typename: "FeaturedLink",
          description: "",
          href:
            "/article/alserkal-art-week-upcoming-exhibitions-alserkal-avenue",
          id: "RmVhdHVyZWRMaW5rOjVlNmY2MmU2NmU4YTcxMDAwZWM1NjViNA==",
          image: null,
          subtitle: "",
          title: "Upcoming Exhibitions at Alserkal Avenue",
        },
      },
    ],
  },
}

export const ARTWORKS_SET = {
  description: "",
  id: "T3JkZXJlZFNldDo1ZWJkODBiMjA2ZmU4ZjAwMTI3YWQ4N2Y=",
  itemType: "Artwork",
  layout: "DEFAULT" as "DEFAULT" | "FULL",
  name: "CRM test artworks",
  orderedItems: {
    edges: [
      {
        __typename: "OrderedSetItemEdge",
        node: {
          __typename: "Artwork",
          cultural_maker: null,
          artists: [
            {
              href: "/artist/duaiv",
              id: "QXJ0aXN0OjU3NzdmNmY5Y2I0YzI3NjVkYzAwMDNlMg==",
              name: "Duaiv",
            },
          ],
          date: "",
          collecting_institution: null,
          href: "/artwork/duaiv-flowers",
          id: "QXJ0d29yazo1YmI1MjgxZWEyYzdjZDAwMjgyMzA1YzM=",
          image: {
            aspect_ratio: 0.79,
            placeholder: "126.2510254306809%",
            url:
              "https://d32dm0rphc51dk.cloudfront.net/LhtpDuCsx_PE-VcqYgG-JA/large.jpg",
          },
          image_title: "Duaiv, ‘Flowers’",
          internalID: "5bb5281ea2c7cd00282305c3",
          is_acquireable: false,
          is_inquireable: true,
          is_biddable: false,
          title: "Flowers",
          is_offerable: false,
          is_saved: false,
          partner: {
            href: "/baterbys",
            id: "UGFydG5lcjo1OGVkNDg5ZGM5ZGMyNDIzOTcxMjY3NTQ=",
            name: "Baterbys",
            type: "Gallery",
          },
          sale: null,
          sale_message: "$175",
          sale_artwork: null,
          slug: "duaiv-flowers",
        },
      },
    ],
  },
}

export const FEATURE = {
  defaultImage: {
    cropped: {
      src: "https://example.com/example.jpg",
      srcSet: "https://example.com/example.jpg",
    },
  },
  callout:
    "<p>Alserkal Art Week Online</p>\n<p>Discover new exhibitions by Alserkal Avenue Galleries</p>\n",
  description:
    "<p>Alserkal Art Week Online</p>\n<p>Discover new exhibitions by Alserkal Avenue Galleries</p>\n",
  fullImage: {
    cropped: {
      src: "https://example.com/example.jpg",
      srcSet: "https://example.com/example.jpg",
    },
  },
  id: "RmVhdHVyZTo1ZTY5MGMzMWQyMmZmMTAwMTIwYzQzMzY=",
  layout: "DEFAULT" as "DEFAULT" | "FULL",
  meta: {
    description: "some description",
    image: "some-url.jpg",
    name: "Alserkal Art Week",
  },
  name: "Alserkal Art Week",
  sets: {
    edges: [{ node: FEATURED_LINKS_SET }, { node: ARTWORKS_SET }],
  },
  slug: "alserkal-art-week",
  subheadline:
    "<p>Alserkal Art Week Online</p>\n<p>Discover new exhibitions by Alserkal Avenue Galleries</p>\n",
}

export const FEATURE_APP_FIXTURE: FeatureApp_Test_QueryRawResponse = {
  feature: FEATURE,
}
