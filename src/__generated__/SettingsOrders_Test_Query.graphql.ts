/**
 * @generated SignedSource<<0fb406f43f915aec96baaaf6e37fd45a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsOrders_Test_Query$variables = Record<PropertyKey, never>;
export type SettingsOrders_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsOrders_me">;
  } | null | undefined;
};
export type SettingsOrders_Test_Query = {
  response: SettingsOrders_Test_Query$data;
  variables: SettingsOrders_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
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
  "type": "Boolean"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommercePageCursor"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsOrders_Test_Query",
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
            "name": "SettingsOrders_me"
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
    "name": "SettingsOrders_Test_Query",
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
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "states",
                "value": [
                  "APPROVED",
                  "CANCELED",
                  "FULFILLED",
                  "REFUNDED",
                  "SUBMITTED",
                  "PROCESSING_APPROVAL"
                ]
              }
            ],
            "concreteType": "CommerceOrderConnectionWithTotalCount",
            "kind": "LinkedField",
            "name": "orders",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommercePageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
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
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommercePageCursors",
                "kind": "LinkedField",
                "name": "pageCursors",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommercePageCursor",
                    "kind": "LinkedField",
                    "name": "around",
                    "plural": true,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommercePageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommercePageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommercePageCursor",
                    "kind": "LinkedField",
                    "name": "previous",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "orders(first:10,states:[\"APPROVED\",\"CANCELED\",\"FULFILLED\",\"REFUNDED\",\"SUBMITTED\",\"PROCESSING_APPROVAL\"])"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4a3e5896ab8275e75a5e08e4ac6d86cb",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v4/*: any*/),
        "me.name": (v5/*: any*/),
        "me.orders": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderConnectionWithTotalCount"
        },
        "me.orders.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceOrderEdge"
        },
        "me.orders.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "me.orders.edges.node.__typename": (v6/*: any*/),
        "me.orders.edges.node.id": (v4/*: any*/),
        "me.orders.edges.node.internalID": (v4/*: any*/),
        "me.orders.pageCursors": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommercePageCursors"
        },
        "me.orders.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "CommercePageCursor"
        },
        "me.orders.pageCursors.around.cursor": (v6/*: any*/),
        "me.orders.pageCursors.around.isCurrent": (v7/*: any*/),
        "me.orders.pageCursors.around.page": (v8/*: any*/),
        "me.orders.pageCursors.first": (v9/*: any*/),
        "me.orders.pageCursors.first.cursor": (v6/*: any*/),
        "me.orders.pageCursors.first.isCurrent": (v7/*: any*/),
        "me.orders.pageCursors.first.page": (v8/*: any*/),
        "me.orders.pageCursors.last": (v9/*: any*/),
        "me.orders.pageCursors.last.cursor": (v6/*: any*/),
        "me.orders.pageCursors.last.isCurrent": (v7/*: any*/),
        "me.orders.pageCursors.last.page": (v8/*: any*/),
        "me.orders.pageCursors.previous": (v9/*: any*/),
        "me.orders.pageCursors.previous.cursor": (v6/*: any*/),
        "me.orders.pageCursors.previous.page": (v8/*: any*/),
        "me.orders.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "CommercePageInfo"
        },
        "me.orders.pageInfo.endCursor": (v5/*: any*/),
        "me.orders.pageInfo.hasNextPage": (v7/*: any*/),
        "me.orders.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        }
      }
    },
    "name": "SettingsOrders_Test_Query",
    "operationKind": "query",
    "text": "query SettingsOrders_Test_Query {\n  me {\n    ...SettingsOrders_me\n    id\n  }\n}\n\nfragment CommercePagination_pageCursors on CommercePageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SettingsOrders_me on Me {\n  name\n  orders(states: [APPROVED, CANCELED, FULFILLED, REFUNDED, SUBMITTED, PROCESSING_APPROVAL], first: 10) {\n    totalCount\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...CommercePagination_pageCursors\n    }\n    edges {\n      node {\n        __typename\n        internalID\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "05b99d699252894e894960b4619689e1";

export default node;
