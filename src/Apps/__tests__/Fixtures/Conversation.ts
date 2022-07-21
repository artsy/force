export const Message = {
  internalID: "message1",
  body: "Body of the message",
  createdAt: "2020-02-17T22:51:15+00:00",
  isFromUser: false,
  from: {
    name: "Ashkan",
    email: "ashkan@ross.biz",
  },
  attachments: [],
}

export const Items = [
  {
    item: {
      __typename: "Artwork",
      id: "artwork1",
      date: "2020-02-17",
      title: "Title 1",
      artistNames: "Some Artists",
      __isNode: "Artwork",
      image: {
        url: "http://test.com",
      },
    },
  },
]

export const InquiryImage = {
  image: {
    resized: {
      src:
        "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fit&width=30&height=40&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FZZZiq1-ZEierGWYmr0rDCA%2Flarge.jpg",
      srcSet:
        "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fit&width=30&height=40&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FZZZiq1-ZEierGWYmr0rDCA%2Flarge.jpg 1x, https://d196wkiy8qx2u5.cloudfront.net?resize_to=fit&width=60&height=80&quality=50&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FZZZiq1-ZEierGWYmr0rDCA%2Flarge.jpg 2x",
      width: 30,
      height: 40,
    },
  },
  internalID: "5b561bcd2c22c10023390d22",
  title: "HDF_223 (Pattern Recognition)",
  date: "2018",
  saleMessage: "Contact For Price",
  attributionClass: {
    name: "Unique",
    id: "QXR0cmlidXRpb25DbGFzczp1bmlxdWU=",
  },
  category: "Painting",
  manufacturer: null,
  publisher: null,
  medium: "Casting compound and acrylic on board, steel frame.",
  conditionDescription: null,
  certificateOfAuthenticity: null,
  framed: null,
  dimensions: {
    in: "71 3/10 × 53 3/5 in",
    cm: "181.2 × 136.2 cm",
  },
  signatureInfo: null,
  artistNames: "Michael Staniak",
  isEdition: false,
  editionSets: [],
  id: "QXJ0d29yazo1YjU2MWJjZDJjMjJjMTAwMjMzOTBkMjI=",
}

export const MockedConversation = {
  __typename: "Conversation",
  id: "123898",
  internalID: "conversation1",
  from: {
    name: "Bob",
    email: "bob@bob.biz",
  },
  to: {
    id: "partnerId",
    name: "Ashkan Gallery",
    initials: "AG",
  },
  initialMessage: "Im kind of interested in this work",
  lastMessageID: "message1",
  lastMessage: null,
  lastMessageAt: "2020-02-17T22:51:15+00:00",
  unread: true,
  items: Items,
  messages: {
    edges: [
      {
        node: {
          ...Message,
        },
        cursor: "message1",
      },
    ],
  },
  messagesConnection: {
    totalCount: 1,
    edges: [
      {
        node: {
          ...Message,
        },
        cursor: "message1",
      },
    ],
  },
} as const

export const MockedInquiryConversation = {
  __typename: "Conversation",

  internalID: "6114",
  id: "Q29udmVyc2F0aW9uOjYxMTQ=",
  from: {
    name: "Vladimir Collector",
    email: "copperkraft+1@gmail.com",
    id: "Q29udmVyc2F0aW9uSW5pdGlhdG9yOjYwZmU3MGJjYTg1N2IzMDAwZTcyNDRlZA==",
  },
  to: {
    name: "Unit London",
    initials: "UL",
    id: "Q29udmVyc2F0aW9uUmVzcG9uZGVyOjU4NTE1YjI0MmE4OTNhNTRhMTAwMDRjYw==",
  },
  initialMessage: "I love pattern recognition! Can I buy one?",
  lastMessageID: "9941",
  unread: false,
  orderConnection: {
    edges: [],
  },
  messagesConnection: {
    pageInfo: {
      startCursor: "YXJyYXljb25uZWN0aW9uOjA=",
      endCursor: "YXJyYXljb25uZWN0aW9uOjE=",
      hasPreviousPage: false,
      hasNextPage: false,
    },
    edges: [
      {
        node: {
          id: "TWVzc2FnZTo5OTQx",
          __typename: "Message",
          internalID: "9941",
          createdAt: "2021-07-30T18:01:25+03:00",
          isFromUser: true,
          body: "Can I",
          from: {
            name: "Vladimir Collector",
            email: "copperkraft+1@gmail.com",
          },
          attachments: [],
        },
        cursor: "YXJyYXljb25uZWN0aW9uOjA=",
      },
      {
        node: {
          id: "TWVzc2FnZTo5Nzgx",
          __typename: "Message",
          internalID: "9781",
          createdAt: "2021-07-28T19:48:39+03:00",
          isFromUser: true,
          body: "I love pattern recognition! Can I buy one?",
          from: {
            name: "Vladimir Collector",
            email: "copperkraft+1@gmail.com",
          },
          attachments: [],
        },
        cursor: "YXJyYXljb25uZWN0aW9uOjE=",
      },
    ],
  },
  items: [
    {
      item: {
        __typename: "Artwork",
        __isNode: "Artwork",
        id: "QXJ0d29yazo1YjU2MWJjZDJjMjJjMTAwMjMzOTBkMjI=",
        isOfferableFromInquiry: true,
        internalID: "5b561bcd2c22c10023390d22",
        date: "2018",
        title: "HDF_223 (Pattern Recognition)",
        artistNames: "Michael Staniak",
        href: "/artwork/michael-staniak-hdf-223-pattern-recognition",
        image: {
          url:
            "https://d32dm0rphc51dk.cloudfront.net/ZZZiq1-ZEierGWYmr0rDCA/large.jpg",
          thumbnailUrl:
            "https://d32dm0rphc51dk.cloudfront.net/ZZZiq1-ZEierGWYmr0rDCA/small.jpg",
        },
        listPrice: null,
        sale_message: "Contact For Price",
        cultural_maker: null,
        artists: [
          {
            id: "QXJ0aXN0OjUyMmEzMWM2MTM5YjIxMGM3MjAwMGE4Nw==",
            href: "/artist/michael-staniak",
            name: "Michael Staniak",
          },
        ],
        collecting_institution: null,
        partner: {
          name: "Unit London",
          href: "/unit-london",
          id: "UGFydG5lcjo1ODUxNWIyNDJhODkzYTU0YTEwMDA0Y2M=",
          type: "Gallery",
        },
        sale: null,
        sale_artwork: null,
        is_inquireable: true,
      },
      liveArtwork: {
        __typename: "Artwork",
        isOfferableFromInquiry: true,
        internalID: "5b561bcd2c22c10023390d22",
        id: "QXJ0d29yazo1YjU2MWJjZDJjMjJjMTAwMjMzOTBkMjI=",
      },
    },
  ],
  activeOrders: {
    edges: [],
  },
} as const
