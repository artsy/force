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
