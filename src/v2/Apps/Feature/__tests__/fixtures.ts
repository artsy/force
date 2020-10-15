import { FeatureApp_Test_QueryRawResponse } from "v2/__generated__/FeatureApp_Test_Query.graphql"

export const FEATURED_LINKS_SET = {
  id: "T3JkZXJlZFNldDo1ZTZmNWVlMmM1MmE1OTAwMTExMTEyMWY=",
  name: "Latest News",
  layout: "DEFAULT" as "DEFAULT" | "FULL",
  description: "",
  itemType: "FeaturedLink",
  orderedItems: {
    edges: [
      {
        __typename: "OrderedSetItemEdge",
        node: {
          __typename: "FeaturedLink",
          id: "RmVhdHVyZWRMaW5rOjVlNmY2MmU2NmU4YTcxMDAwZWM1NjViNA==",
          href:
            "/article/alserkal-art-week-upcoming-exhibitions-alserkal-avenue",
          title: "Upcoming Exhibitions at Alserkal Avenue",
          subtitle: "",
          description: "",
          image: null,
        },
      },
    ],
  },
}

export const ARTWORKS_SET = {
  id: "T3JkZXJlZFNldDo1ZWJkODBiMjA2ZmU4ZjAwMTI3YWQ4N2Y=",
  name: "CRM test artworks",
  layout: "DEFAULT" as "DEFAULT" | "FULL",
  description: "",
  itemType: "Artwork",
  orderedItems: {
    edges: [
      {
        __typename: "OrderedSetItemEdge",
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
  layout: "DEFAULT" as "DEFAULT" | "FULL",
  meta: {
    name: "Alserkal Art Week",
    description: "some description",
    image: "some-url.jpg",
  },
  subheadline:
    "<p>Alserkal Art Week Online</p>\n<p>Discover new exhibitions by Alserkal Avenue Galleries</p>\n",
  defaultImage: {
    cropped: {
      src: "https://example.com/example.jpg",
      srcSet: "https://example.com/example.jpg",
    },
  },
  fullImage: {
    cropped: {
      src: "https://example.com/example.jpg",
      srcSet: "https://example.com/example.jpg",
    },
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
