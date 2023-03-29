/**
 * @generated SignedSource<<09f29f6b3246d360eadebb1778663cfc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationsSidebarPaginationQuery$variables = {
  after?: string | null;
  first?: number | null;
  hasReply?: boolean | null;
  partnerId: string;
  sellerId: string;
  toBeReplied?: boolean | null;
};
export type ConversationsSidebarPaginationQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ConversationsSidebar_viewer">;
  } | null;
};
export type ConversationsSidebarPaginationQuery = {
  response: ConversationsSidebarPaginationQuery$data;
  variables: ConversationsSidebarPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 10,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "hasReply"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "partnerId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sellerId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "toBeReplied"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v3 = {
  "kind": "Variable",
  "name": "hasReply",
  "variableName": "hasReply"
},
v4 = {
  "kind": "Variable",
  "name": "partnerId",
  "variableName": "partnerId"
},
v5 = {
  "kind": "Variable",
  "name": "sellerId",
  "variableName": "sellerId"
},
v6 = {
  "kind": "Variable",
  "name": "toBeReplied",
  "variableName": "toBeReplied"
},
v7 = [
  (v1/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/),
  (v6/*: any*/),
  {
    "kind": "Literal",
    "name": "type",
    "value": "PARTNER"
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ConversationsSidebarPaginationQuery",
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
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConversationsSidebarPaginationQuery",
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
            "args": (v7/*: any*/),
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
                        "selections": (v9/*: any*/),
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
                              (v8/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v8/*: any*/)
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
                          (v5/*: any*/),
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
                                  (v10/*: any*/),
                                  (v8/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
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
                              (v10/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v8/*: any*/),
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
                                    "selections": (v9/*: any*/),
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
                                  (v8/*: any*/)
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
                      (v8/*: any*/),
                      (v10/*: any*/)
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
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
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
    "cacheID": "dc00b5753150650e79e8b8c7c56490c7",
    "id": null,
    "metadata": {},
    "name": "ConversationsSidebarPaginationQuery",
    "operationKind": "query",
    "text": "query ConversationsSidebarPaginationQuery(\n  $after: String\n  $first: Int = 10\n  $hasReply: Boolean\n  $partnerId: String!\n  $sellerId: ID!\n  $toBeReplied: Boolean\n) {\n  viewer {\n    ...ConversationsSidebar_viewer_4bhtjM\n  }\n}\n\nfragment ConversationsSidebarItem_conversation_2hSCbN on Conversation {\n  internalID\n  from {\n    name\n    id\n  }\n  fromUser {\n    collectorProfile {\n      confirmedBuyerAt\n      id\n    }\n    id\n  }\n  lastMessageAt(format: \"MMM D\")\n  orderConnection(last: 1, states: [APPROVED, FULFILLED, SUBMITTED, PROCESSING_APPROVAL, REFUNDED], sellerId: $sellerId) {\n    edges {\n      node {\n        __typename\n        id\n      }\n    }\n  }\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        id\n        title\n        date\n        artist {\n          name\n          id\n        }\n        image {\n          url(version: [\"small\", \"square\"])\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationsSidebar_viewer_4bhtjM on Viewer {\n  conversationsConnection(first: $first, after: $after, partnerId: $partnerId, type: PARTNER, toBeReplied: $toBeReplied, hasReply: $hasReply) {\n    edges {\n      cursor\n      node {\n        internalID\n        ...ConversationsSidebarItem_conversation_2hSCbN\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c3f94ffc3988eed61e5f71090992f29b";

export default node;
