export const Message = {
  attachments: [],
  body: "Body of the message",
  createdAt: "2020-02-17T22:51:15+00:00",
  from: {
    email: "ashkan@ross.biz",
    name: "Ashkan",
  },
  internalID: "message1",
  isFromUser: false,
}

export const Items = [
  {
    item: {
      __typename: "Artwork",
      artistNames: "Some Artists",
      date: "2020-02-17",
      id: "artwork1",
      image: {
        url: "http://test.com",
      },
      title: "Title 1",
    },
  },
]

export const MockedConversation = {
  __typename: "Conversation",
  from: {
    email: "bob@bob.biz",
    name: "Bob",
  },
  id: "123898",
  initialMessage: "Im kind of interested in this work",
  internalID: "conversation1",
  items: Items,
  lastMessage: null,
  lastMessageAt: "2020-02-17T22:51:15+00:00",
  lastMessageID: "message1",
  messages: {
    edges: [
      {
        cursor: "message1",
        node: {
          ...Message,
        },
      },
    ],
  },
  messagesConnection: {
    edges: [
      {
        cursor: "message1",
        node: {
          ...Message,
        },
      },
    ],
    totalCount: 1,
  },
  to: {
    id: "partnerId",
    initials: "AG",
    name: "Ashkan Gallery",
  },
  unread: true,
} as const
