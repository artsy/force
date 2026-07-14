/**
 * @generated SignedSource<<bf7057fc34c4796cccb09af7dc9347a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type createBuyerOfferInput = {
  amountMinor: any;
  clientMutationId?: string | null | undefined;
  note?: string | null | undefined;
  orderID: string;
  respondsToID?: string | null | undefined;
};
export type useOrder2CreateCounterOfferMutation$variables = {
  input: createBuyerOfferInput;
};
export type useOrder2CreateCounterOfferMutation$data = {
  readonly createBuyerOffer: {
    readonly offerOrError: {
      readonly __typename: "OfferMutationSuccess";
      readonly mutationError?: {
        readonly code: string;
        readonly message: string;
      };
      readonly offer?: {
        readonly order: {
          readonly id: string;
          readonly " $fragmentSpreads": FragmentRefs<"Order2RespondApp_order" | "Order2RespondContext_order">;
        } | null | undefined;
      };
    } | null | undefined;
  } | null | undefined;
};
export type useOrder2CreateCounterOfferMutation = {
  response: useOrder2CreateCounterOfferMutation$data;
  variables: useOrder2CreateCounterOfferMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "OfferExchangeError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
      "selections": [
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
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OfferMutationError",
  "abstractKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "major",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v9 = [
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "buyerTotal",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currencySymbol",
  "storageKey": null
},
v14 = {
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
      "name": "amount",
      "storageKey": null
    },
    (v13/*: any*/)
  ],
  "storageKey": null
},
v15 = [
  (v11/*: any*/),
  (v12/*: any*/),
  (v14/*: any*/)
],
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "amount",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "pricingBreakdownLines",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": (v15/*: any*/),
      "type": "ShippingLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v15/*: any*/),
      "type": "TaxLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v11/*: any*/),
        (v14/*: any*/)
      ],
      "type": "SubtotalLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v11/*: any*/),
        (v12/*: any*/),
        (v16/*: any*/)
      ],
      "type": "TotalLine",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v18 = [
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
v19 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useOrder2CreateCounterOfferMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "createBuyerOfferPayload",
        "kind": "LinkedField",
        "name": "createBuyerOffer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "offerOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Offer",
                    "kind": "LinkedField",
                    "name": "offer",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Order",
                        "kind": "LinkedField",
                        "name": "order",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "Order2RespondContext_order"
                          },
                          {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "Order2RespondApp_order"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "OfferMutationSuccess",
                "abstractKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useOrder2CreateCounterOfferMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "createBuyerOfferPayload",
        "kind": "LinkedField",
        "name": "createBuyerOffer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "offerOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Offer",
                    "kind": "LinkedField",
                    "name": "offer",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Order",
                        "kind": "LinkedField",
                        "name": "order",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
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
                            "name": "mode",
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
                              (v5/*: any*/),
                              (v3/*: any*/),
                              (v6/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Money",
                                "kind": "LinkedField",
                                "name": "amount",
                                "plural": false,
                                "selections": [
                                  (v7/*: any*/),
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
                              (v10/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Offer",
                            "kind": "LinkedField",
                            "name": "pendingOffer",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              (v3/*: any*/),
                              (v17/*: any*/),
                              (v6/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Money",
                                "kind": "LinkedField",
                                "name": "amount",
                                "plural": false,
                                "selections": [
                                  (v7/*: any*/)
                                ],
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
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "slug",
                                    "storageKey": null
                                  },
                                  (v3/*: any*/),
                                  (v6/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "price",
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
                                      (v3/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "dimensions",
                                    "kind": "LinkedField",
                                    "name": "dimensions",
                                    "plural": false,
                                    "selections": (v18/*: any*/),
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "dimensions",
                                    "kind": "LinkedField",
                                    "name": "framedDimensions",
                                    "plural": false,
                                    "selections": (v18/*: any*/),
                                    "storageKey": null
                                  },
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
                                    "selections": (v19/*: any*/),
                                    "storageKey": "images(includeAll:false)"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v3/*: any*/),
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
                                    "name": "artistNames",
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
                                    "name": "date",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Image",
                                    "kind": "LinkedField",
                                    "name": "image",
                                    "plural": false,
                                    "selections": (v19/*: any*/),
                                    "storageKey": null
                                  },
                                  (v3/*: any*/)
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
                            "name": "buyerState",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "buyerStateExpiresAt",
                            "storageKey": null
                          },
                          (v17/*: any*/),
                          (v6/*: any*/),
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
                                  (v8/*: any*/),
                                  (v13/*: any*/),
                                  (v7/*: any*/)
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
                              (v2/*: any*/),
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
                                  (v3/*: any*/)
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
                                  (v3/*: any*/)
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
                              (v6/*: any*/),
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
                              (v10/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "OfferMutationSuccess",
                "abstractKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9479fb3ae141d2691499cf490021622f",
    "id": null,
    "metadata": {},
    "name": "useOrder2CreateCounterOfferMutation",
    "operationKind": "mutation",
    "text": "mutation useOrder2CreateCounterOfferMutation(\n  $input: createBuyerOfferInput!\n) {\n  createBuyerOffer(input: $input) {\n    offerOrError {\n      __typename\n      ... on OfferMutationSuccess {\n        __typename\n        offer {\n          order {\n            id\n            ...Order2RespondContext_order\n            ...Order2RespondApp_order\n          }\n          id\n        }\n      }\n      ... on OfferMutationError {\n        mutationError {\n          code\n          message\n        }\n      }\n    }\n  }\n}\n\nfragment Order2HelpLinks_order on Order {\n  internalID\n  mode\n  source\n}\n\nfragment Order2OfferHistory_order on Order {\n  submittedOffers {\n    internalID\n    createdAt(format: \"MMMM D, YYYY\")\n    fromParticipant\n    amount {\n      display\n    }\n    buyerTotal {\n      display\n    }\n    id\n  }\n}\n\nfragment Order2OrderSummary_order on Order {\n  ...Order2PricingBreakdown_order\n}\n\nfragment Order2PaymentCompletedView_order on Order {\n  paymentMethod\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      brand\n      lastDigits\n      expirationYear\n      expirationMonth\n      id\n    }\n    ... on BankAccount {\n      last4\n      bankName\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n}\n\nfragment Order2PricingBreakdown_order on Order {\n  source\n  mode\n  buyerState\n  buyerStateExpiresAt\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n  pendingOffer {\n    pricingBreakdownLines {\n      __typename\n      ... on ShippingLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TaxLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on SubtotalLine {\n        displayName\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TotalLine {\n        displayName\n        amountFallbackText\n        amount {\n          display\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment Order2RespondApp_order on Order {\n  paymentMethod\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    id\n  }\n  ...Order2RespondSummary_order\n  ...useCompleteFulfillmentDetailsData_order\n  ...useCompleteDeliveryOptionData_order\n  ...Order2PaymentCompletedView_order\n  ...Order2RespondForm_order\n  ...Order2OfferHistory_order\n  ...Order2HelpLinks_order\n}\n\nfragment Order2RespondContext_order on Order {\n  source\n  mode\n  lastSubmittedOffer {\n    createdAt\n    id\n  }\n  pendingOffer {\n    createdAt\n    id\n  }\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment Order2RespondForm_order on Order {\n  internalID\n  lastSubmittedOffer {\n    internalID\n    amount {\n      major\n      currencyCode\n    }\n    buyerTotal {\n      display\n    }\n    id\n  }\n  pendingOffer {\n    amount {\n      major\n    }\n    id\n  }\n  ...Order2RespondOfferDetails_order\n}\n\nfragment Order2RespondOfferDetails_order on Order {\n  ...Order2PricingBreakdown_order\n}\n\nfragment Order2RespondSummary_order on Order {\n  ...Order2OrderSummary_order\n  internalID\n  lastSubmittedOffer {\n    internalID\n    id\n  }\n  pendingOffer {\n    internalID\n    id\n  }\n  lineItems {\n    artworkVersion {\n      artistNames\n      title\n      date\n      image {\n        resized(height: 200) {\n          url\n        }\n      }\n      id\n    }\n    artwork {\n      internalID\n      price\n      attributionClass {\n        shortDescription\n        id\n      }\n      dimensions {\n        in\n        cm\n      }\n      framedDimensions {\n        in\n        cm\n      }\n      images(includeAll: false) {\n        resized(height: 200) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment useCompleteDeliveryOptionData_order on Order {\n  shippingOrigin\n  shippingRadius\n  selectedFulfillmentOption {\n    type\n    amount {\n      minor\n      display\n      currencySymbol\n      major\n    }\n  }\n}\n\nfragment useCompleteFulfillmentDetailsData_order on Order {\n  mode\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n    phoneNumber {\n      display(format: INTERNATIONAL)\n    }\n  }\n  selectedFulfillmentOption {\n    type\n  }\n}\n"
  }
};
})();

(node as any).hash = "f14836e1d162fdcac804c8752bab3d73";

export default node;
