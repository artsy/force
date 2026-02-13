/**
 * @generated SignedSource<<da91d7c9e7a97d95cb22bf47ddab5d89>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderBuyerStateEnum = "APPROVED" | "CANCELED" | "COMPLETED" | "DECLINED_BY_BUYER" | "DECLINED_BY_SELLER" | "INCOMPLETE" | "OFFER_RECEIVED" | "PAYMENT_FAILED" | "PROCESSING_OFFLINE_PAYMENT" | "PROCESSING_PAYMENT" | "REFUNDED" | "SHIPPED" | "SUBMITTED" | "UNKNOWN" | "%future added value";
export type SettingsOrdersQuery$variables = {
  buyerState?: ReadonlyArray<OrderBuyerStateEnum | null | undefined> | null | undefined;
  page?: number | null | undefined;
};
export type SettingsOrdersQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsOrders_me">;
  } | null | undefined;
};
export type SettingsOrdersQuery = {
  response: SettingsOrdersQuery$data;
  variables: SettingsOrdersQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "buyerState"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "page"
},
v2 = {
  "kind": "Variable",
  "name": "buyerState",
  "variableName": "buyerState"
},
v3 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v6 = [
  (v4/*: any*/),
  (v5/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "height",
        "value": 45
      },
      {
        "kind": "Literal",
        "name": "width",
        "value": 45
      }
    ],
    "concreteType": "CroppedImageUrl",
    "kind": "LinkedField",
    "name": "cropped",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "src",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "srcSet",
        "storageKey": null
      }
    ],
    "storageKey": "cropped(height:45,width:45)"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsOrdersQuery",
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
            "args": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SettingsOrdersQuery",
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
            "args": [
              (v2/*: any*/),
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              (v3/*: any*/)
            ],
            "concreteType": "MeOrdersConnection",
            "kind": "LinkedField",
            "name": "ordersConnection",
            "plural": false,
            "selections": [
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
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasPreviousPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageCursors",
                "kind": "LinkedField",
                "name": "pageCursors",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "around",
                    "plural": true,
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "previous",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
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
                "concreteType": "MeOrdersEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Order",
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
                        "kind": "ScalarField",
                        "name": "source",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "code",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "buyerState",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "createdAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "creditCardWalletType",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DisplayTexts",
                        "kind": "LinkedField",
                        "name": "displayTexts",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "stateName",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "actionPrompt",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DeliveryInfo",
                        "kind": "LinkedField",
                        "name": "deliveryInfo",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "trackingURL",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FulfillmentOption",
                        "kind": "LinkedField",
                        "name": "selectedFulfillmentOption",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "type",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "pricingBreakdownLines",
                        "plural": true,
                        "selections": [
                          (v7/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "displayName",
                                "storageKey": null
                              }
                            ],
                            "type": "ShippingLine",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "paymentMethodDetails",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lastDigits",
                                "storageKey": null
                              },
                              (v8/*: any*/)
                            ],
                            "type": "CreditCard",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "last4",
                                "storageKey": null
                              },
                              (v8/*: any*/)
                            ],
                            "type": "BankAccount",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "buyerTotal",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "display",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "LineItem",
                        "kind": "LinkedField",
                        "name": "lineItems",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "kind": "LinkedField",
                            "name": "artwork",
                            "plural": false,
                            "selections": [
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Partner",
                                "kind": "LinkedField",
                                "name": "partner",
                                "plural": false,
                                "selections": [
                                  (v9/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "initials",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "name",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Profile",
                                    "kind": "LinkedField",
                                    "name": "profile",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Image",
                                        "kind": "LinkedField",
                                        "name": "icon",
                                        "plural": false,
                                        "selections": (v10/*: any*/),
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
                                "args": null,
                                "kind": "ScalarField",
                                "name": "shippingOrigin",
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
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "shallow",
                                    "value": true
                                  }
                                ],
                                "concreteType": "Artist",
                                "kind": "LinkedField",
                                "name": "artists",
                                "plural": true,
                                "selections": [
                                  (v9/*: any*/),
                                  (v8/*: any*/)
                                ],
                                "storageKey": "artists(shallow:true)"
                              },
                              (v8/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtworkVersion",
                            "kind": "LinkedField",
                            "name": "artworkVersion",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Image",
                                "kind": "LinkedField",
                                "name": "image",
                                "plural": false,
                                "selections": (v10/*: any*/),
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
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8beb5076455c412378e0677f639fdbbc",
    "id": null,
    "metadata": {},
    "name": "SettingsOrdersQuery",
    "operationKind": "query",
    "text": "query SettingsOrdersQuery(\n  $page: Int\n  $buyerState: [OrderBuyerStateEnum]\n) {\n  me {\n    ...SettingsOrders_me_1T01WT\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SettingsOrdersRow_order on Order {\n  source\n  internalID\n  code\n  buyerState\n  createdAt\n  creditCardWalletType\n  displayTexts {\n    stateName\n    actionPrompt\n  }\n  deliveryInfo {\n    trackingURL\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n    }\n  }\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      lastDigits\n      id\n    }\n    ... on BankAccount {\n      last4\n      id\n    }\n    ... on WireTransfer {\n      __typename\n    }\n  }\n  buyerTotal {\n    display\n  }\n  lineItems {\n    artwork {\n      href\n      partner {\n        href\n        initials\n        name\n        profile {\n          icon {\n            cropped(width: 45, height: 45) {\n              src\n              srcSet\n            }\n          }\n          id\n        }\n        id\n      }\n      shippingOrigin\n      title\n      artistNames\n      artists(shallow: true) {\n        href\n        id\n      }\n      id\n    }\n    artworkVersion {\n      image {\n        cropped(width: 45, height: 45) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment SettingsOrders_me_1T01WT on Me {\n  ordersConnection(first: 10, page: $page, buyerState: $buyerState) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        internalID\n        ...SettingsOrdersRow_order\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1cf58f8dec3025e60bb9cd98229acc92";

export default node;
