/**
 * @generated SignedSource<<385588dda50551e0c8dbb16b71fb5162>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationAppTestQuery$variables = {};
export type ConversationAppTestQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ConversationApp_me">;
  } | null;
};
export type ConversationAppTestQuery$rawResponse = {
  readonly me: {
    readonly conversationsConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly internalID: string | null;
          readonly to: {
            readonly name: string;
            readonly id: string;
          };
          readonly id: string;
          readonly lastMessage: string | null;
          readonly lastMessageAt: string | null;
          readonly unread: boolean | null;
          readonly items: ReadonlyArray<{
            readonly item: {
              readonly __typename: "Artwork";
              readonly __isNode: "Artwork";
              readonly id: string;
              readonly date: string | null;
              readonly title: string | null;
              readonly artistNames: string | null;
              readonly image: {
                readonly url: string | null;
              } | null;
            } | {
              readonly __typename: "Show";
              readonly __isNode: "Show";
              readonly id: string;
              readonly fair: {
                readonly name: string | null;
                readonly id: string;
              } | null;
              readonly name: string | null;
              readonly coverImage: {
                readonly url: string | null;
              } | null;
            } | {
              readonly __typename: string;
              readonly __isNode: string;
              readonly id: string;
            } | null;
          } | null> | null;
          readonly __typename: "Conversation";
        } | null;
        readonly cursor: string;
      } | null> | null;
      readonly pageInfo: {
        readonly endCursor: string | null;
        readonly hasNextPage: boolean;
        readonly hasPreviousPage: boolean;
        readonly startCursor: string | null;
      };
    } | null;
    readonly id: string;
  } | null;
};
export type ConversationAppTestQuery = {
  variables: ConversationAppTestQuery$variables;
  response: ConversationAppTestQuery$data;
  rawResponse: ConversationAppTestQuery$rawResponse;
};

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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
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
    "type": "Query",
    "abstractKey": null
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
                                "type": "Artwork",
                                "abstractKey": null
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
                                "type": "Show",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v2/*: any*/)
                                ],
                                "type": "Node",
                                "abstractKey": "__isNode"
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
    "cacheID": "61db404b0a2582a8797f7af66b22cd5c",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.conversationsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ConversationConnection"
        },
        "me.conversationsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ConversationEdge"
        },
        "me.conversationsConnection.edges.cursor": (v6/*: any*/),
        "me.conversationsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Conversation"
        },
        "me.conversationsConnection.edges.node.__typename": (v6/*: any*/),
        "me.conversationsConnection.edges.node.id": (v7/*: any*/),
        "me.conversationsConnection.edges.node.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "me.conversationsConnection.edges.node.items": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ConversationItem"
        },
        "me.conversationsConnection.edges.node.items.item": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ConversationItemType"
        },
        "me.conversationsConnection.edges.node.items.item.__isNode": (v6/*: any*/),
        "me.conversationsConnection.edges.node.items.item.__typename": (v6/*: any*/),
        "me.conversationsConnection.edges.node.items.item.artistNames": (v8/*: any*/),
        "me.conversationsConnection.edges.node.items.item.coverImage": (v9/*: any*/),
        "me.conversationsConnection.edges.node.items.item.coverImage.url": (v8/*: any*/),
        "me.conversationsConnection.edges.node.items.item.date": (v8/*: any*/),
        "me.conversationsConnection.edges.node.items.item.fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "me.conversationsConnection.edges.node.items.item.fair.id": (v7/*: any*/),
        "me.conversationsConnection.edges.node.items.item.fair.name": (v8/*: any*/),
        "me.conversationsConnection.edges.node.items.item.id": (v7/*: any*/),
        "me.conversationsConnection.edges.node.items.item.image": (v9/*: any*/),
        "me.conversationsConnection.edges.node.items.item.image.url": (v8/*: any*/),
        "me.conversationsConnection.edges.node.items.item.name": (v8/*: any*/),
        "me.conversationsConnection.edges.node.items.item.title": (v8/*: any*/),
        "me.conversationsConnection.edges.node.lastMessage": (v8/*: any*/),
        "me.conversationsConnection.edges.node.lastMessageAt": (v8/*: any*/),
        "me.conversationsConnection.edges.node.to": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ConversationResponder"
        },
        "me.conversationsConnection.edges.node.to.id": (v7/*: any*/),
        "me.conversationsConnection.edges.node.to.name": (v6/*: any*/),
        "me.conversationsConnection.edges.node.unread": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "me.conversationsConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "me.conversationsConnection.pageInfo.endCursor": (v8/*: any*/),
        "me.conversationsConnection.pageInfo.hasNextPage": (v10/*: any*/),
        "me.conversationsConnection.pageInfo.hasPreviousPage": (v10/*: any*/),
        "me.conversationsConnection.pageInfo.startCursor": (v8/*: any*/),
        "me.id": (v7/*: any*/)
      }
    },
    "name": "ConversationAppTestQuery",
    "operationKind": "query",
    "text": "query ConversationAppTestQuery {\n  me {\n    ...ConversationApp_me\n    id\n  }\n}\n\nfragment ConversationApp_me on Me {\n  conversationsConnection(first: 25) {\n    edges {\n      node {\n        internalID\n        to {\n          name\n          id\n        }\n        id\n      }\n    }\n  }\n  ...ConversationList_me\n}\n\nfragment ConversationList_me on Me {\n  conversationsConnection(first: 25) {\n    edges {\n      cursor\n      node {\n        id\n        internalID\n        lastMessage\n        ...ConversationSnippet_conversation\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment ConversationSnippet_conversation on Conversation {\n  internalID\n  to {\n    name\n    id\n  }\n  lastMessage\n  lastMessageAt\n  unread\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        date\n        title\n        artistNames\n        image {\n          url\n        }\n      }\n      ... on Show {\n        fair {\n          name\n          id\n        }\n        name\n        coverImage {\n          url\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "147aa4e89f37fe45ef44d5211bcfc0d9";

export default node;
