/**
 * @generated SignedSource<<b1f467e8a8491f4fb4560ad0b00422c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderBuyerStateEnum = "APPROVED" | "CANCELED" | "COMPLETED" | "COUNTEROFFER_SENT" | "DECLINED_BY_BUYER" | "DECLINED_BY_SELLER" | "INCOMPLETE" | "OFFER_RECEIVED" | "PAYMENT_FAILED" | "PROCESSING_OFFLINE_PAYMENT" | "PROCESSING_PAYMENT" | "REFUNDED" | "SHIPPED" | "SUBMITTED" | "UNKNOWN" | "%future added value";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type order2Routes_RespondQuery$variables = {
  orderID: string;
};
export type order2Routes_RespondQuery$data = {
  readonly viewer: {
    readonly me: {
      readonly order: {
        readonly buyerState: OrderBuyerStateEnum | null | undefined;
        readonly internalID: string;
        readonly mode: OrderModeEnum;
      } | null | undefined;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"Order2RespondRoute_viewer">;
  } | null | undefined;
};
export type order2Routes_RespondQuery = {
  response: order2Routes_RespondQuery$data;
  variables: order2Routes_RespondQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "orderID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "orderID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mode",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "buyerState",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "height",
        "value": 200
      }
    ],
    "concreteType": "ResizedImageUrl",
    "kind": "LinkedField",
    "name": "resized",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "url",
        "storageKey": null
      }
    ],
    "storageKey": "resized(height:200)"
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
  "name": "price",
  "storageKey": null
},
v9 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "in",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "cm",
    "storageKey": null
  }
],
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "dimensions",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "framedDimensions",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currencySymbol",
  "storageKey": null
},
v15 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "amount",
    "storageKey": null
  },
  (v14/*: any*/)
],
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "amount",
  "plural": false,
  "selections": (v15/*: any*/),
  "storageKey": null
},
v17 = [
  (v12/*: any*/),
  (v13/*: any*/),
  (v16/*: any*/)
],
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v19 = [
  (v18/*: any*/)
],
v20 = {
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
      "selections": (v17/*: any*/),
      "type": "ShippingLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v17/*: any*/),
      "type": "TaxLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v12/*: any*/),
        (v16/*: any*/)
      ],
      "type": "SubtotalLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v12/*: any*/),
        (v13/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "amount",
          "plural": false,
          "selections": (v19/*: any*/),
          "storageKey": null
        }
      ],
      "type": "TotalLine",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "major",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "order2Routes_RespondQuery",
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
            "args": null,
            "concreteType": "Me",
            "kind": "LinkedField",
            "name": "me",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "Order",
                "kind": "LinkedField",
                "name": "order",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "args": [
              {
                "kind": "Variable",
                "name": "orderID",
                "variableName": "orderID"
              }
            ],
            "kind": "FragmentSpread",
            "name": "Order2RespondRoute_viewer"
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
    "name": "order2Routes_RespondQuery",
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
            "args": null,
            "concreteType": "Me",
            "kind": "LinkedField",
            "name": "me",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "Order",
                "kind": "LinkedField",
                "name": "order",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          },
                          (v5/*: any*/),
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "includeAll",
                                "value": false
                              }
                            ],
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "images",
                            "plural": true,
                            "selections": (v6/*: any*/),
                            "storageKey": "images(includeAll:false)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "artworkOrEditionSet",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v8/*: any*/),
                              (v10/*: any*/),
                              (v11/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v8/*: any*/),
                              (v10/*: any*/),
                              (v11/*: any*/),
                              (v5/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v5/*: any*/)
                            ],
                            "type": "Node",
                            "abstractKey": "__isNode"
                          }
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
                            "kind": "ScalarField",
                            "name": "date",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AttributionClass",
                            "kind": "LinkedField",
                            "name": "attributionClass",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "shortDescription",
                                "storageKey": null
                              },
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": (v6/*: any*/),
                            "storageKey": null
                          },
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
                    "kind": "ScalarField",
                    "name": "paymentMethod",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "buyerStateExpiresAt",
                    "storageKey": null
                  },
                  (v20/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Offer",
                    "kind": "LinkedField",
                    "name": "pendingOffer",
                    "plural": false,
                    "selections": [
                      (v20/*: any*/),
                      (v5/*: any*/),
                      (v2/*: any*/),
                      (v21/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "amount",
                        "plural": false,
                        "selections": [
                          (v22/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Offer",
                    "kind": "LinkedField",
                    "name": "lastSubmittedOffer",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v21/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "amount",
                        "plural": false,
                        "selections": [
                          (v22/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "currencyCode",
                            "storageKey": null
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
                        "selections": (v19/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FulfillmentDetails",
                    "kind": "LinkedField",
                    "name": "fulfillmentDetails",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "addressLine1",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "addressLine2",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "city",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "country",
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
                        "kind": "ScalarField",
                        "name": "postalCode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "region",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PhoneNumberType",
                        "kind": "LinkedField",
                        "name": "phoneNumber",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "format",
                                "value": "INTERNATIONAL"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "display",
                            "storageKey": "display(format:\"INTERNATIONAL\")"
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
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "amount",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "minor",
                            "storageKey": null
                          },
                          (v18/*: any*/),
                          (v14/*: any*/),
                          (v22/*: any*/)
                        ],
                        "storageKey": null
                      }
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
                    "name": "shippingRadius",
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
                            "name": "brand",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lastDigits",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "expirationYear",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "expirationMonth",
                            "storageKey": null
                          },
                          (v5/*: any*/)
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "bankName",
                            "storageKey": null
                          },
                          (v5/*: any*/)
                        ],
                        "type": "BankAccount",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isManualPayment",
                            "storageKey": null
                          }
                        ],
                        "type": "WireTransfer",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Offer",
                    "kind": "LinkedField",
                    "name": "submittedOffers",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMMM D, YYYY"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "createdAt",
                        "storageKey": "createdAt(format:\"MMMM D, YYYY\")"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "fromParticipant",
                        "storageKey": null
                      },
                      (v16/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "buyerTotal",
                        "plural": false,
                        "selections": (v15/*: any*/),
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e1237384b15a9d0ff17410ff4436e802",
    "id": null,
    "metadata": {},
    "name": "order2Routes_RespondQuery",
    "operationKind": "query",
    "text": "query order2Routes_RespondQuery(\n  $orderID: ID!\n) {\n  viewer {\n    me {\n      order(id: $orderID) {\n        internalID\n        mode\n        buyerState\n        id\n      }\n      id\n    }\n    ...Order2RespondRoute_viewer_3HPek8\n  }\n}\n\nfragment Order2CheckoutPricingBreakdown_order on Order {\n  source\n  mode\n  buyerState\n  buyerStateExpiresAt\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n  pendingOffer {\n    pricingBreakdownLines {\n      __typename\n      ... on ShippingLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TaxLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on SubtotalLine {\n        displayName\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TotalLine {\n        displayName\n        amountFallbackText\n        amount {\n          display\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment Order2HelpLinks_order on Order {\n  internalID\n  mode\n  source\n}\n\nfragment Order2OfferHistory_order on Order {\n  submittedOffers {\n    internalID\n    createdAt(format: \"MMMM D, YYYY\")\n    fromParticipant\n    amount {\n      amount\n      currencySymbol\n    }\n    buyerTotal {\n      amount\n      currencySymbol\n    }\n    id\n  }\n}\n\nfragment Order2OrderSummary_order on Order {\n  ...Order2CheckoutPricingBreakdown_order\n}\n\nfragment Order2PaymentCompletedView_order on Order {\n  paymentMethod\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      brand\n      lastDigits\n      expirationYear\n      expirationMonth\n      id\n    }\n    ... on BankAccount {\n      last4\n      bankName\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n}\n\nfragment Order2RespondApp_order on Order {\n  internalID\n  mode\n  paymentMethod\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    id\n  }\n  ...Order2RespondSummary_order\n  ...useCompleteFulfillmentDetailsData_order\n  ...useCompleteDeliveryOptionData_order\n  ...Order2PaymentCompletedView_order\n  ...Order2RespondForm_order\n  ...Order2OfferHistory_order\n  ...Order2HelpLinks_order\n}\n\nfragment Order2RespondContext_order on Order {\n  internalID\n  source\n  mode\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment Order2RespondForm_order on Order {\n  internalID\n  lastSubmittedOffer {\n    internalID\n    createdAt\n    amount {\n      major\n      currencyCode\n    }\n    buyerTotal {\n      display\n    }\n    id\n  }\n  pendingOffer {\n    createdAt\n    amount {\n      major\n    }\n    id\n  }\n  ...Order2RespondOfferDetails_order\n}\n\nfragment Order2RespondOfferDetails_order on Order {\n  ...Order2CheckoutPricingBreakdown_order\n}\n\nfragment Order2RespondRoute_viewer_3HPek8 on Viewer {\n  me {\n    order(id: $orderID) {\n      internalID\n      ...Order2RespondContext_order\n      ...Order2RespondApp_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2RespondSummary_order on Order {\n  ...Order2OrderSummary_order\n  internalID\n  lastSubmittedOffer {\n    internalID\n    createdAt\n    id\n  }\n  pendingOffer {\n    internalID\n    createdAt\n    id\n  }\n  lineItems {\n    artworkOrEditionSet {\n      __typename\n      ... on Artwork {\n        price\n        dimensions {\n          in\n          cm\n        }\n        framedDimensions {\n          in\n          cm\n        }\n      }\n      ... on EditionSet {\n        price\n        dimensions {\n          in\n          cm\n        }\n        framedDimensions {\n          in\n          cm\n        }\n        id\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    artworkVersion {\n      title\n      artistNames\n      date\n      attributionClass {\n        shortDescription\n        id\n      }\n      image {\n        resized(height: 200) {\n          url\n        }\n      }\n      id\n    }\n    artwork {\n      internalID\n      images(includeAll: false) {\n        resized(height: 200) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment useCompleteDeliveryOptionData_order on Order {\n  shippingOrigin\n  shippingRadius\n  selectedFulfillmentOption {\n    type\n    amount {\n      minor\n      display\n      currencySymbol\n      major\n    }\n  }\n}\n\nfragment useCompleteFulfillmentDetailsData_order on Order {\n  mode\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n    phoneNumber {\n      display(format: INTERNATIONAL)\n    }\n  }\n  selectedFulfillmentOption {\n    type\n  }\n}\n"
  }
};
})();

(node as any).hash = "66d7490abd32c304cc2d872a23f16d29";

export default node;
