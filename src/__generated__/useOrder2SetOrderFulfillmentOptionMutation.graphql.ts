/**
 * @generated SignedSource<<1b094a5392421e0a458861ae8d4afb7d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FulfillmentOptionInputEnum = "ARTSY_EXPRESS" | "ARTSY_STANDARD" | "ARTSY_WHITE_GLOVE" | "DOMESTIC_FLAT" | "INTERNATIONAL_FLAT" | "PICKUP" | "%future added value";
export type setOrderFulfillmentOptionInput = {
  clientMutationId?: string | null | undefined;
  fulfillmentOption: FulfillmentOptionInput;
  id: string;
};
export type FulfillmentOptionInput = {
  type: FulfillmentOptionInputEnum;
};
export type useOrder2SetOrderFulfillmentOptionMutation$variables = {
  input: setOrderFulfillmentOptionInput;
};
export type useOrder2SetOrderFulfillmentOptionMutation$data = {
  readonly setOrderFulfillmentOption: {
    readonly orderOrError: {
      readonly __typename: "OrderMutationError";
      readonly mutationError: {
        readonly message: string;
      };
    } | {
      readonly __typename: "OrderMutationSuccess";
      readonly order: {
        readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutApp_order" | "Order2CheckoutContext_order">;
      };
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  } | null | undefined;
};
export type useOrder2SetOrderFulfillmentOptionMutation = {
  response: useOrder2SetOrderFulfillmentOptionMutation$data;
  variables: useOrder2SetOrderFulfillmentOptionMutation$variables;
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
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ExchangeError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
      "selections": [
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
  "type": "OrderMutationError",
  "abstractKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "amount",
  "plural": false,
  "selections": [
    (v6/*: any*/)
  ],
  "storageKey": null
},
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
    "name": "url",
    "storageKey": null
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v11 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "major",
    "storageKey": null
  }
],
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "dimensions",
  "plural": false,
  "selections": [
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
  "storageKey": null
},
v13 = {
  "kind": "InlineFragment",
  "selections": [
    (v8/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "minor",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currencyCode",
  "storageKey": null
},
v16 = [
  (v14/*: any*/),
  (v15/*: any*/),
  (v6/*: any*/)
],
v17 = [
  (v14/*: any*/),
  (v6/*: any*/)
],
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v20 = {
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencySymbol",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v21 = [
  (v18/*: any*/),
  (v19/*: any*/),
  (v20/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useOrder2SetOrderFulfillmentOptionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "setOrderFulfillmentOptionPayload",
        "kind": "LinkedField",
        "name": "setOrderFulfillmentOption",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "orderOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Order",
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "Order2CheckoutContext_order"
                      },
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "Order2CheckoutApp_order"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "OrderMutationSuccess",
                "abstractKey": null
              },
              (v3/*: any*/)
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
    "name": "useOrder2SetOrderFulfillmentOptionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "setOrderFulfillmentOptionPayload",
        "kind": "LinkedField",
        "name": "setOrderFulfillmentOption",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "orderOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Order",
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
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
                        "kind": "ScalarField",
                        "name": "source",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "buyerStateExpiresAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "stripeConfirmationToken",
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
                          (v5/*: any*/),
                          (v7/*: any*/)
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
                            "concreteType": "ArtworkVersion",
                            "kind": "LinkedField",
                            "name": "artworkVersion",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
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
                                "alias": "thumbnail",
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
                                        "name": "height",
                                        "value": 200
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "version",
                                        "value": [
                                          "square"
                                        ]
                                      }
                                    ],
                                    "concreteType": "ResizedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "resized",
                                    "plural": false,
                                    "selections": (v9/*: any*/),
                                    "storageKey": "resized(height:200,version:[\"square\"])"
                                  }
                                ],
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
                                  (v8/*: any*/)
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
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "height",
                                        "value": 138
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 185
                                      }
                                    ],
                                    "concreteType": "ResizedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "resized",
                                    "plural": false,
                                    "selections": (v9/*: any*/),
                                    "storageKey": "resized(height:138,width:185)"
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v8/*: any*/),
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
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isFixedShippingFeeOnly",
                                "storageKey": null
                              },
                              (v8/*: any*/),
                              (v4/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "EditionSet",
                                "kind": "LinkedField",
                                "name": "editionSets",
                                "plural": true,
                                "selections": [
                                  (v4/*: any*/),
                                  (v8/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v10/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "listPrice",
                                "plural": false,
                                "selections": [
                                  (v2/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": (v11/*: any*/),
                                    "type": "Money",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Money",
                                        "kind": "LinkedField",
                                        "name": "maxPrice",
                                        "plural": false,
                                        "selections": (v11/*: any*/),
                                        "storageKey": null
                                      }
                                    ],
                                    "type": "PriceRange",
                                    "abstractKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "href",
                                "storageKey": null
                              },
                              {
                                "alias": "artworkMeta",
                                "args": null,
                                "concreteType": "ArtworkMeta",
                                "kind": "LinkedField",
                                "name": "meta",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "share",
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
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "artworkOrEditionSet",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v10/*: any*/),
                                  (v12/*: any*/)
                                ],
                                "type": "Artwork",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v10/*: any*/),
                                  (v12/*: any*/),
                                  (v8/*: any*/)
                                ],
                                "type": "EditionSet",
                                "abstractKey": null
                              },
                              (v13/*: any*/)
                            ],
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
                        "selections": (v16/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "itemsTotal",
                        "plural": false,
                        "selections": (v16/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "shippingTotal",
                        "plural": false,
                        "selections": (v17/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "taxTotal",
                        "plural": false,
                        "selections": (v17/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "availableShippingCountries",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FulfillmentOption",
                        "kind": "LinkedField",
                        "name": "fulfillmentOptions",
                        "plural": true,
                        "selections": [
                          (v5/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Money",
                            "kind": "LinkedField",
                            "name": "amount",
                            "plural": false,
                            "selections": (v16/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "selected",
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
                            "concreteType": "PhoneNumberType",
                            "kind": "LinkedField",
                            "name": "phoneNumber",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "countryCode",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "regionCode",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "originalNumber",
                                "storageKey": null
                              },
                              (v6/*: any*/)
                            ],
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
                        "name": "seller",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "PartnerMerchantAccount",
                                "kind": "LinkedField",
                                "name": "merchantAccount",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "externalId",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "Partner",
                            "abstractKey": null
                          },
                          (v13/*: any*/)
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
                          (v2/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v21/*: any*/),
                            "type": "ShippingLine",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v21/*: any*/),
                            "type": "TaxLine",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v18/*: any*/),
                              (v20/*: any*/)
                            ],
                            "type": "SubtotalLine",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v18/*: any*/),
                              (v19/*: any*/),
                              (v7/*: any*/)
                            ],
                            "type": "TotalLine",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v15/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "shippingOrigin",
                        "storageKey": null
                      },
                      (v8/*: any*/),
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
                        "name": "availablePaymentMethods",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "OrderMutationSuccess",
                "abstractKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5874626c8266d42dbc0359927c59f6f5",
    "id": null,
    "metadata": {},
    "name": "useOrder2SetOrderFulfillmentOptionMutation",
    "operationKind": "mutation",
    "text": "mutation useOrder2SetOrderFulfillmentOptionMutation(\n  $input: setOrderFulfillmentOptionInput!\n) {\n  setOrderFulfillmentOption(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderMutationSuccess {\n        order {\n          ...Order2CheckoutContext_order\n          ...Order2CheckoutApp_order\n          id\n        }\n      }\n      ... on OrderMutationError {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n\nfragment Order2CheckoutApp_order on Order {\n  internalID\n  mode\n  selectedFulfillmentOption {\n    type\n  }\n  lineItems {\n    artwork {\n      slug\n      isFixedShippingFeeOnly\n      id\n    }\n    id\n  }\n  ...Order2ExpressCheckout_order\n  ...Order2CollapsibleOrderSummary_order\n  ...Order2OfferStep_order\n  ...Order2FulfillmentDetailsStep_order\n  ...Order2DeliveryOptionsStep_order\n  ...Order2PaymentStep_order\n  ...Order2ReviewStep_order\n  ...Order2CheckoutLoadingSkeleton_order\n  ...Order2HelpLinks_order\n}\n\nfragment Order2CheckoutContext_order on Order {\n  internalID\n  mode\n  source\n  buyerStateExpiresAt\n  stripeConfirmationToken\n  selectedFulfillmentOption {\n    type\n  }\n  lineItems {\n    artworkVersion {\n      internalID\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutLoadingSkeleton_order on Order {\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  lineItems {\n    artworkVersion {\n      title\n      artistNames\n      date\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutPricingBreakdown_order on Order {\n  source\n  buyerStateExpiresAt\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n}\n\nfragment Order2CollapsibleOrderSummary_order on Order {\n  ...Order2CheckoutPricingBreakdown_order\n  source\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  shippingTotal {\n    display\n  }\n  taxTotal {\n    display\n  }\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    artworkVersion {\n      title\n      artistNames\n      date\n      thumbnail: image {\n        resized(height: 200, version: [\"square\"]) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Order2DeliveryForm_order on Order {\n  internalID\n  selectedFulfillmentOption {\n    type\n  }\n  availableShippingCountries\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    region\n    postalCode\n    country\n    name\n    phoneNumber {\n      originalNumber\n      regionCode\n      countryCode\n    }\n  }\n}\n\nfragment Order2DeliveryOptionsCompletedView_order on Order {\n  internalID\n  selectedFulfillmentOption {\n    type\n  }\n}\n\nfragment Order2DeliveryOptionsForm_order on Order {\n  internalID\n  fulfillmentOptions {\n    amount {\n      display\n    }\n    type\n    selected\n  }\n}\n\nfragment Order2DeliveryOptionsStep_order on Order {\n  internalID\n  ...Order2DeliveryOptionsForm_order\n  ...Order2DeliveryOptionsCompletedView_order\n  selectedFulfillmentOption {\n    type\n    amount {\n      display\n    }\n  }\n}\n\nfragment Order2ExactPriceOfferForm_order on Order {\n  currencyCode\n  lineItems {\n    artwork {\n      price\n      listPrice {\n        __typename\n        ... on Money {\n          major\n        }\n        ... on PriceRange {\n          maxPrice {\n            major\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Order2ExpressCheckoutUI_order on Order {\n  internalID\n  source\n  mode\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n  }\n  shippingTotal {\n    minor\n  }\n  taxTotal {\n    minor\n  }\n  availableShippingCountries\n  fulfillmentOptions {\n    type\n    amount {\n      minor\n      currencyCode\n    }\n    selected\n  }\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    name\n  }\n  lineItems {\n    artwork {\n      internalID\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment Order2ExpressCheckout_order on Order {\n  ...Order2ExpressCheckoutUI_order\n  availableShippingCountries\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Order2FulfillmentDetailsCompletedView_order on Order {\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n    phoneNumber {\n      display\n    }\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  shippingOrigin\n}\n\nfragment Order2FulfillmentDetailsStep_order on Order {\n  ...Order2PickupForm_order\n  ...Order2DeliveryForm_order\n  ...Order2FulfillmentDetailsCompletedView_order\n  id\n  fulfillmentDetails {\n    phoneNumber {\n      countryCode\n      regionCode\n      originalNumber\n    }\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  fulfillmentOptions {\n    type\n    selected\n  }\n  availableShippingCountries\n}\n\nfragment Order2HelpLinks_order on Order {\n  internalID\n  mode\n  source\n}\n\nfragment Order2OfferCompletedView_order on Order {\n  currencyCode\n}\n\nfragment Order2OfferStep_order on Order {\n  internalID\n  mode\n  currencyCode\n  lineItems {\n    artwork {\n      slug\n      editionSets {\n        internalID\n        id\n      }\n      id\n    }\n    id\n  }\n  ...Order2ExactPriceOfferForm_order\n  ...Order2OfferCompletedView_order\n}\n\nfragment Order2PaymentForm_order on Order {\n  code\n  mode\n  source\n  internalID\n  currencyCode\n  availablePaymentMethods\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  fulfillmentDetails {\n    name\n    addressLine1\n    addressLine2\n    city\n    region\n    postalCode\n    country\n  }\n  lineItems {\n    artwork {\n      href\n      artworkMeta: meta {\n        share\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Order2PaymentStep_order on Order {\n  ...Order2PaymentForm_order\n  internalID\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  shippingTotal {\n    minor\n  }\n  taxTotal {\n    minor\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Order2PickupForm_order on Order {\n  internalID\n  fulfillmentOptions {\n    type\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  fulfillmentDetails {\n    phoneNumber {\n      countryCode\n      regionCode\n      originalNumber\n    }\n  }\n  shippingOrigin\n}\n\nfragment Order2ReviewStep_order on Order {\n  ...Order2CheckoutPricingBreakdown_order\n  internalID\n  mode\n  source\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  shippingTotal {\n    display\n  }\n  taxTotal {\n    display\n  }\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    artworkOrEditionSet {\n      __typename\n      ... on Artwork {\n        price\n        dimensions {\n          in\n          cm\n        }\n      }\n      ... on EditionSet {\n        price\n        dimensions {\n          in\n          cm\n        }\n        id\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    artworkVersion {\n      title\n      artistNames\n      date\n      attributionClass {\n        shortDescription\n        id\n      }\n      image {\n        resized(width: 185, height: 138) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a77e8ddf89e8057352def7dda1433e7d";

export default node;
