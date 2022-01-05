/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConversationAppTestQueryVariables = {};
export type ConversationAppTestQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"ConversationApp_me">;
    } | null;
};
export type ConversationAppTestQueryRawResponse = {
    readonly me: ({
        readonly conversationsConnection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly internalID: string | null;
                    readonly to: {
                        readonly name: string;
                        readonly id: string | null;
                    };
                    readonly id: string | null;
                    readonly lastMessage: string | null;
                    readonly lastMessageAt: string | null;
                    readonly unread: boolean | null;
                    readonly items: ReadonlyArray<({
                        readonly item: ({
                            readonly __typename: "Artwork";
                            readonly id: string | null;
                            readonly date: string | null;
                            readonly title: string | null;
                            readonly artistNames: string | null;
                            readonly image: ({
                                readonly url: string | null;
                            }) | null;
                        } | {
                            readonly __typename: "Show";
                            readonly id: string | null;
                            readonly fair: ({
                                readonly name: string | null;
                                readonly id: string | null;
                            }) | null;
                            readonly name: string | null;
                            readonly coverImage: ({
                                readonly url: string | null;
                            }) | null;
                        } | {
                            readonly __typename: string;
                            readonly id: string | null;
                        }) | null;
                    }) | null> | null;
                    readonly __typename: "Conversation";
                }) | null;
                readonly cursor: string;
            }) | null> | null;
            readonly pageInfo: {
                readonly endCursor: string | null;
                readonly hasNextPage: boolean;
                readonly hasPreviousPage: boolean;
                readonly startCursor: string | null;
            };
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type ConversationAppTestQuery = {
    readonly response: ConversationAppTestQueryResponse;
    readonly variables: ConversationAppTestQueryVariables;
    readonly rawResponse: ConversationAppTestQueryRawResponse;
};



/*
query ConversationAppTestQuery {
  me {
    ...ConversationApp_me
    id
  }
}

fragment ConversationApp_me on Me {
  conversationsConnection(first: 25) {
    edges {
      node {
        internalID
        to {
          name
          id
        }
        id
      }
    }
  }
  ...ConversationList_me
}

fragment ConversationList_me on Me {
  conversationsConnection(first: 25) {
    edges {
      cursor
      node {
        id
        internalID
        lastMessage
        ...ConversationSnippet_conversation
        __typename
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}

fragment ConversationSnippet_conversation on Conversation {
  internalID
  to {
    name
    id
  }
  lastMessage
  lastMessageAt
  unread
  items {
    item {
      __typename
      ... on Artwork {
        date
        title
        artistNames
        image {
          url
        }
      }
      ... on Show {
        fair {
          name
          id
        }
        name
        coverImage {
          url
        }
      }
      ... on Node {
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 25
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
],
v6 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v7 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v8 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v9 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v10 = {
  "type": "Image",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConversationAppTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ConversationApp_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConversationAppTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "ConversationConnection",
            "kind": "LinkedField",
            "name": "conversationsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ConversationEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Conversation",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ConversationResponder",
                        "kind": "LinkedField",
                        "name": "to",
                        "plural": false,
                        "selections": (v3/*: any*/),
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lastMessage",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lastMessageAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "unread",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ConversationItem",
                        "kind": "LinkedField",
                        "name": "items",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "item",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
                              (v2/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "date",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "title",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "artistNames",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Image",
                                    "kind": "LinkedField",
                                    "name": "image",
                                    "plural": false,
                                    "selections": (v5/*: any*/),
                                    "storageKey": null
                                  }
                                ],
                                "type": "Artwork"
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Fair",
                                    "kind": "LinkedField",
                                    "name": "fair",
                                    "plural": false,
                                    "selections": (v3/*: any*/),
                                    "storageKey": null
                                  },
                                  (v1/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Image",
                                    "kind": "LinkedField",
                                    "name": "coverImage",
                                    "plural": false,
                                    "selections": (v5/*: any*/),
                                    "storageKey": null
                                  }
                                ],
                                "type": "Show"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasPreviousPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "conversationsConnection(first:25)"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "ConversationList_conversationsConnection",
            "kind": "LinkedHandle",
            "name": "conversationsConnection"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.id": (v6/*: any*/),
        "me.conversationsConnection": {
          "type": "ConversationConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.conversationsConnection.edges": {
          "type": "ConversationEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.conversationsConnection.edges.node": {
          "type": "Conversation",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.conversationsConnection.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.conversationsConnection.edges.node.internalID": (v6/*: any*/),
        "me.conversationsConnection.edges.node.to": {
          "type": "ConversationResponder",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.conversationsConnection.edges.node.id": (v6/*: any*/),
        "me.conversationsConnection.edges.cursor": (v7/*: any*/),
        "me.conversationsConnection.pageInfo.endCursor": (v8/*: any*/),
        "me.conversationsConnection.pageInfo.hasNextPage": (v9/*: any*/),
        "me.conversationsConnection.pageInfo.hasPreviousPage": (v9/*: any*/),
        "me.conversationsConnection.pageInfo.startCursor": (v8/*: any*/),
        "me.conversationsConnection.edges.node.to.name": (v7/*: any*/),
        "me.conversationsConnection.edges.node.to.id": (v6/*: any*/),
        "me.conversationsConnection.edges.node.lastMessage": (v8/*: any*/),
        "me.conversationsConnection.edges.node.lastMessageAt": (v8/*: any*/),
        "me.conversationsConnection.edges.node.unread": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.conversationsConnection.edges.node.items": {
          "type": "ConversationItem",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.conversationsConnection.edges.node.__typename": (v7/*: any*/),
        "me.conversationsConnection.edges.node.items.item": {
          "type": "ConversationItemType",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.conversationsConnection.edges.node.items.item.__typename": (v7/*: any*/),
        "me.conversationsConnection.edges.node.items.item.date": (v8/*: any*/),
        "me.conversationsConnection.edges.node.items.item.title": (v8/*: any*/),
        "me.conversationsConnection.edges.node.items.item.artistNames": (v8/*: any*/),
        "me.conversationsConnection.edges.node.items.item.image": (v10/*: any*/),
        "me.conversationsConnection.edges.node.items.item.fair": {
          "type": "Fair",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.conversationsConnection.edges.node.items.item.name": (v8/*: any*/),
        "me.conversationsConnection.edges.node.items.item.coverImage": (v10/*: any*/),
        "me.conversationsConnection.edges.node.items.item.id": (v6/*: any*/),
        "me.conversationsConnection.edges.node.items.item.image.url": (v8/*: any*/),
        "me.conversationsConnection.edges.node.items.item.fair.name": (v8/*: any*/),
        "me.conversationsConnection.edges.node.items.item.fair.id": (v6/*: any*/),
        "me.conversationsConnection.edges.node.items.item.coverImage.url": (v8/*: any*/)
      }
    },
    "name": "ConversationAppTestQuery",
    "operationKind": "query",
    "text": "query ConversationAppTestQuery {\n  me {\n    ...ConversationApp_me\n    id\n  }\n}\n\nfragment ConversationApp_me on Me {\n  conversationsConnection(first: 25) {\n    edges {\n      node {\n        internalID\n        to {\n          name\n          id\n        }\n        id\n      }\n    }\n  }\n  ...ConversationList_me\n}\n\nfragment ConversationList_me on Me {\n  conversationsConnection(first: 25) {\n    edges {\n      cursor\n      node {\n        id\n        internalID\n        lastMessage\n        ...ConversationSnippet_conversation\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment ConversationSnippet_conversation on Conversation {\n  internalID\n  to {\n    name\n    id\n  }\n  lastMessage\n  lastMessageAt\n  unread\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        date\n        title\n        artistNames\n        image {\n          url\n        }\n      }\n      ... on Show {\n        fair {\n          name\n          id\n        }\n        name\n        coverImage {\n          url\n        }\n      }\n      ... on Node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '147aa4e89f37fe45ef44d5211bcfc0d9';
export default node;
