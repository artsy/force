/**
 * @generated SignedSource<<a7dcb0f14558aa732d2f8c53d2ac5240>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FulfillmentOptionTypeEnum = "DOMESTIC_FLAT" | "INTERNATIONAL_FLAT" | "PICKUP" | "SHIPPING_TBD" | "%future added value";
export type updateOrderShippingAddressInput = {
  buyerPhoneNumber?: string | null | undefined;
  buyerPhoneNumberCountryCode?: string | null | undefined;
  clientMutationId?: string | null | undefined;
  id: string;
  shippingAddressLine1?: string | null | undefined;
  shippingAddressLine2?: string | null | undefined;
  shippingCity?: string | null | undefined;
  shippingCountry?: string | null | undefined;
  shippingName?: string | null | undefined;
  shippingPostalCode?: string | null | undefined;
  shippingRegion?: string | null | undefined;
};
export type useOrder2UpdateShippingAddressMutation$variables = {
  input: updateOrderShippingAddressInput;
};
export type useOrder2UpdateShippingAddressMutation$data = {
  readonly updateOrderShippingAddress: {
    readonly orderOrError: {
      readonly __typename: "OrderMutationError";
      readonly mutationError: {
        readonly code: string;
        readonly message: string;
      };
    } | {
      readonly __typename: "OrderMutationSuccess";
      readonly order: {
        readonly fulfillmentOptions: ReadonlyArray<{
          readonly type: FulfillmentOptionTypeEnum;
        }>;
        readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutApp_order" | "Order2CheckoutContext_order">;
      };
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  } | null | undefined;
};
export type useOrder2UpdateShippingAddressMutation = {
  response: useOrder2UpdateShippingAddressMutation$data;
  variables: useOrder2UpdateShippingAddressMutation$variables;
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
  "name": "type",
  "storageKey": null
},
v4 = {
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderMutationError",
  "abstractKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v9 = {
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
v10 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "minor",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v13 = [
  (v11/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currencyCode",
    "storageKey": null
  },
  (v12/*: any*/)
],
v14 = [
  (v11/*: any*/),
  (v12/*: any*/)
],
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v17 = {
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
v18 = [
  (v15/*: any*/),
  (v16/*: any*/),
  (v17/*: any*/)
],
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "amount",
  "plural": false,
  "selections": [
    (v12/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useOrder2UpdateShippingAddressMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "updateOrderShippingAddressPayload",
        "kind": "LinkedField",
        "name": "updateOrderShippingAddress",
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
                        "name": "Order2CheckoutApp_order"
                      },
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "Order2CheckoutContext_order"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FulfillmentOption",
                        "kind": "LinkedField",
                        "name": "fulfillmentOptions",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "OrderMutationSuccess",
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
    "name": "useOrder2UpdateShippingAddressMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "updateOrderShippingAddressPayload",
        "kind": "LinkedField",
        "name": "updateOrderShippingAddress",
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
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mode",
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
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isFixedShippingFeeOnly",
                                "storageKey": null
                              },
                              (v5/*: any*/),
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v5/*: any*/),
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
                                    "selections": (v7/*: any*/),
                                    "storageKey": "resized(height:200,version:[\"square\"])"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v5/*: any*/),
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
                                    "selections": (v7/*: any*/),
                                    "storageKey": "resized(height:138,width:185)"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v6/*: any*/)
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
                                  (v8/*: any*/),
                                  (v9/*: any*/)
                                ],
                                "type": "Artwork",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v8/*: any*/),
                                  (v9/*: any*/),
                                  (v5/*: any*/)
                                ],
                                "type": "EditionSet",
                                "abstractKey": null
                              },
                              (v10/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v6/*: any*/),
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
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "buyerTotal",
                        "plural": false,
                        "selections": (v13/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "itemsTotal",
                        "plural": false,
                        "selections": (v13/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "shippingTotal",
                        "plural": false,
                        "selections": (v14/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "taxTotal",
                        "plural": false,
                        "selections": (v14/*: any*/),
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
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Money",
                            "kind": "LinkedField",
                            "name": "amount",
                            "plural": false,
                            "selections": (v13/*: any*/),
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
                              (v12/*: any*/)
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
                          (v10/*: any*/)
                        ],
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
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "pricingBreakdownLines",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v18/*: any*/),
                            "type": "ShippingLine",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v18/*: any*/),
                            "type": "TaxLine",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v15/*: any*/),
                              (v17/*: any*/)
                            ],
                            "type": "SubtotalLine",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v15/*: any*/),
                              (v16/*: any*/),
                              (v19/*: any*/)
                            ],
                            "type": "TotalLine",
                            "abstractKey": null
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
                          (v3/*: any*/),
                          (v19/*: any*/)
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
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "stripeConfirmationToken",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "OrderMutationSuccess",
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
    "cacheID": "cba8e25142b3b49bdede8a9cd514a763",
    "id": null,
    "metadata": {},
    "name": "useOrder2UpdateShippingAddressMutation",
    "operationKind": "mutation",
    "text": "mutation useOrder2UpdateShippingAddressMutation(\n  $input: updateOrderShippingAddressInput!\n) {\n  updateOrderShippingAddress(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderMutationSuccess {\n        order {\n          ...Order2CheckoutApp_order\n          ...Order2CheckoutContext_order\n          fulfillmentOptions {\n            type\n          }\n          id\n        }\n      }\n      ... on OrderMutationError {\n        mutationError {\n          message\n          code\n        }\n      }\n    }\n  }\n}\n\nfragment Order2CheckoutApp_order on Order {\n  mode\n  lineItems {\n    artwork {\n      slug\n      isFixedShippingFeeOnly\n      id\n    }\n    id\n  }\n  ...Order2ExpressCheckout_order\n  ...Order2CollapsibleOrderSummary_order\n  ...Order2FulfillmentDetailsStep_order\n  ...Order2DeliveryOptionsStep_order\n  ...Order2PaymentStep_order\n  ...Order2ReviewStep_order\n  ...Order2CheckoutLoadingSkeleton_order\n  ...Order2HelpLinks_order\n}\n\nfragment Order2CheckoutContext_order on Order {\n  internalID\n  mode\n  source\n  buyerStateExpiresAt\n  stripeConfirmationToken\n  selectedFulfillmentOption {\n    type\n  }\n  lineItems {\n    artworkVersion {\n      internalID\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutLoadingSkeleton_order on Order {\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  lineItems {\n    artworkVersion {\n      title\n      artistNames\n      date\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutPricingBreakdown_order on Order {\n  source\n  buyerStateExpiresAt\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n}\n\nfragment Order2CollapsibleOrderSummary_order on Order {\n  ...Order2CheckoutPricingBreakdown_order\n  source\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  shippingTotal {\n    display\n  }\n  taxTotal {\n    display\n  }\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    artworkVersion {\n      title\n      artistNames\n      date\n      thumbnail: image {\n        resized(height: 200, version: [\"square\"]) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Order2DeliveryForm_order on Order {\n  internalID\n  availableShippingCountries\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    region\n    postalCode\n    country\n    name\n    phoneNumber {\n      countryCode\n      originalNumber\n    }\n  }\n}\n\nfragment Order2DeliveryOptionsCompletedView_order on Order {\n  internalID\n  selectedFulfillmentOption {\n    type\n  }\n}\n\nfragment Order2DeliveryOptionsForm_order on Order {\n  internalID\n  fulfillmentOptions {\n    amount {\n      display\n    }\n    type\n    selected\n  }\n}\n\nfragment Order2DeliveryOptionsStep_order on Order {\n  internalID\n  ...Order2DeliveryOptionsForm_order\n  ...Order2DeliveryOptionsCompletedView_order\n  selectedFulfillmentOption {\n    type\n    amount {\n      display\n    }\n  }\n}\n\nfragment Order2ExpressCheckoutUI_order on Order {\n  internalID\n  source\n  mode\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n  }\n  shippingTotal {\n    minor\n  }\n  taxTotal {\n    minor\n  }\n  availableShippingCountries\n  fulfillmentOptions {\n    type\n    amount {\n      minor\n      currencyCode\n    }\n    selected\n  }\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    name\n  }\n  lineItems {\n    artwork {\n      internalID\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment Order2ExpressCheckout_order on Order {\n  ...Order2ExpressCheckoutUI_order\n  availableShippingCountries\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Order2FulfillmentDetailsCompletedView_order on Order {\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n    phoneNumber {\n      display\n    }\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  shippingOrigin\n}\n\nfragment Order2FulfillmentDetailsStep_order on Order {\n  ...Order2PickupForm_order\n  ...Order2DeliveryForm_order\n  ...Order2FulfillmentDetailsCompletedView_order\n  id\n  fulfillmentDetails {\n    phoneNumber {\n      countryCode\n      regionCode\n      originalNumber\n    }\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  fulfillmentOptions {\n    type\n    selected\n  }\n  availableShippingCountries\n}\n\nfragment Order2HelpLinks_order on Order {\n  internalID\n  mode\n  source\n}\n\nfragment Order2PaymentForm_order on Order {\n  mode\n  source\n  internalID\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Order2PaymentStep_order on Order {\n  ...Order2PaymentForm_order\n  internalID\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  shippingTotal {\n    minor\n  }\n  taxTotal {\n    minor\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Order2PickupForm_order on Order {\n  internalID\n  fulfillmentOptions {\n    type\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  fulfillmentDetails {\n    phoneNumber {\n      countryCode\n      regionCode\n      originalNumber\n    }\n  }\n  shippingOrigin\n}\n\nfragment Order2ReviewStep_order on Order {\n  ...Order2CheckoutPricingBreakdown_order\n  internalID\n  mode\n  source\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  shippingTotal {\n    display\n  }\n  taxTotal {\n    display\n  }\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    artworkOrEditionSet {\n      __typename\n      ... on Artwork {\n        price\n        dimensions {\n          in\n          cm\n        }\n      }\n      ... on EditionSet {\n        price\n        dimensions {\n          in\n          cm\n        }\n        id\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    artworkVersion {\n      title\n      artistNames\n      date\n      attributionClass {\n        shortDescription\n        id\n      }\n      image {\n        resized(width: 185, height: 138) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "47878ed11526a9e977df56b5d1b05b34";

export default node;
