/**
 * @generated SignedSource<<d3aeb850bc8872db3906cbfa631f33a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationsSidebarTestQuery$variables = {};
export type ConversationsSidebarTestQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ConversationsSidebar_viewer">;
  } | null;
};
export type ConversationsSidebarTestQuery = {
  response: ConversationsSidebarTestQuery$data;
  variables: ConversationsSidebarTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "Literal",
  "name": "partnerId",
  "value": "partner-id"
},
v1 = {
  "kind": "Literal",
  "name": "sellerId",
  "value": "partner-id"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  (v0/*: any*/),
  {
    "kind": "Literal",
    "name": "type",
    "value": "USER"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConversationsSidebarTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": [
              (v0/*: any*/),
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ConversationsSidebar_viewer"
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
    "name": "ConversationsSidebarTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
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
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  },
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
                        "concreteType": "ConversationInitiator",
                        "kind": "LinkedField",
                        "name": "from",
                        "plural": false,
                        "selections": (v4/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "fromUser",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CollectorProfileType",
                            "kind": "LinkedField",
                            "name": "collectorProfile",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "confirmedBuyerAt",
                                "storageKey": null
                              },
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMM D"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "lastMessageAt",
                        "storageKey": "lastMessageAt(format:\"MMM D\")"
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "last",
                            "value": 1
                          },
                          (v1/*: any*/),
                          {
                            "kind": "Literal",
                            "name": "states",
                            "value": [
                              "APPROVED",
                              "FULFILLED",
                              "SUBMITTED",
                              "PROCESSING_APPROVAL",
                              "REFUNDED"
                            ]
                          }
                        ],
                        "concreteType": "CommerceOrderConnectionWithTotalCount",
                        "kind": "LinkedField",
                        "name": "orderConnection",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceOrderEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v5/*: any*/),
                                  (v3/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "orderConnection(last:1,sellerId:\"partner-id\",states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"PROCESSING_APPROVAL\",\"REFUNDED\"])"
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
                              (v5/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v3/*: any*/),
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
                                    "name": "date",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Artist",
                                    "kind": "LinkedField",
                                    "name": "artist",
                                    "plural": false,
                                    "selections": (v4/*: any*/),
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Image",
                                    "kind": "LinkedField",
                                    "name": "image",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "version",
                                            "value": [
                                              "small",
                                              "square"
                                            ]
                                          }
                                        ],
                                        "kind": "ScalarField",
                                        "name": "url",
                                        "storageKey": "url(version:[\"small\",\"square\"])"
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "type": "Artwork",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v3/*: any*/)
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
                      (v3/*: any*/),
                      (v5/*: any*/)
                    ],
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
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "conversationsConnection(first:10,partnerId:\"partner-id\",type:\"USER\")"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": [
              "partnerId",
              "type",
              "toBeReplied",
              "hasReply"
            ],
            "handle": "connection",
            "key": "ConversationsSidebar_viewer_conversationsConnection",
            "kind": "LinkedHandle",
            "name": "conversationsConnection"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "53716ad4164873dc15027c3d3e13f0c8",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.conversationsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ConversationConnection"
        },
        "viewer.conversationsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ConversationEdge"
        },
        "viewer.conversationsConnection.edges.cursor": (v6/*: any*/),
        "viewer.conversationsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Conversation"
        },
        "viewer.conversationsConnection.edges.node.__typename": (v6/*: any*/),
        "viewer.conversationsConnection.edges.node.from": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ConversationInitiator"
        },
        "viewer.conversationsConnection.edges.node.from.id": (v7/*: any*/),
        "viewer.conversationsConnection.edges.node.from.name": (v6/*: any*/),
        "viewer.conversationsConnection.edges.node.fromUser": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "User"
        },
        "viewer.conversationsConnection.edges.node.fromUser.collectorProfile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorProfileType"
        },
        "viewer.conversationsConnection.edges.node.fromUser.collectorProfile.confirmedBuyerAt": (v8/*: any*/),
        "viewer.conversationsConnection.edges.node.fromUser.collectorProfile.id": (v7/*: any*/),
        "viewer.conversationsConnection.edges.node.fromUser.id": (v7/*: any*/),
        "viewer.conversationsConnection.edges.node.id": (v7/*: any*/),
        "viewer.conversationsConnection.edges.node.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "viewer.conversationsConnection.edges.node.items": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ConversationItem"
        },
        "viewer.conversationsConnection.edges.node.items.item": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ConversationItemType"
        },
        "viewer.conversationsConnection.edges.node.items.item.__isNode": (v6/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.__typename": (v6/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "viewer.conversationsConnection.edges.node.items.item.artist.id": (v7/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.artist.name": (v8/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.date": (v8/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.id": (v7/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "viewer.conversationsConnection.edges.node.items.item.image.url": (v8/*: any*/),
        "viewer.conversationsConnection.edges.node.items.item.title": (v8/*: any*/),
        "viewer.conversationsConnection.edges.node.lastMessageAt": (v8/*: any*/),
        "viewer.conversationsConnection.edges.node.orderConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderConnectionWithTotalCount"
        },
        "viewer.conversationsConnection.edges.node.orderConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceOrderEdge"
        },
        "viewer.conversationsConnection.edges.node.orderConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "viewer.conversationsConnection.edges.node.orderConnection.edges.node.__typename": (v6/*: any*/),
        "viewer.conversationsConnection.edges.node.orderConnection.edges.node.id": (v7/*: any*/),
        "viewer.conversationsConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "viewer.conversationsConnection.pageInfo.endCursor": (v8/*: any*/),
        "viewer.conversationsConnection.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        }
      }
    },
    "name": "ConversationsSidebarTestQuery",
    "operationKind": "query",
    "text": "query ConversationsSidebarTestQuery {\n  viewer {\n    ...ConversationsSidebar_viewer_6vkwV\n  }\n}\n\nfragment ConversationsSidebarItem_conversation_2b5dec on Conversation {\n  internalID\n  from {\n    name\n    id\n  }\n  fromUser {\n    collectorProfile {\n      confirmedBuyerAt\n      id\n    }\n    id\n  }\n  lastMessageAt(format: \"MMM D\")\n  orderConnection(last: 1, states: [APPROVED, FULFILLED, SUBMITTED, PROCESSING_APPROVAL, REFUNDED], sellerId: \"partner-id\") {\n    edges {\n      node {\n        __typename\n        id\n      }\n    }\n  }\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        id\n        title\n        date\n        artist {\n          name\n          id\n        }\n        image {\n          url(version: [\"small\", \"square\"])\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationsSidebar_viewer_6vkwV on Viewer {\n  conversationsConnection(first: 10, partnerId: \"partner-id\", type: USER) {\n    edges {\n      cursor\n      node {\n        internalID\n        ...ConversationsSidebarItem_conversation_2b5dec\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "953263b8309e72cb20b1a789def60ce9";

export default node;
