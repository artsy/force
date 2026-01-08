/**
 * @generated SignedSource<<6a72682a92452b7540857f3a428b925f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2CheckoutRouteTestQuery$variables = Record<PropertyKey, never>;
export type Order2CheckoutRouteTestQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutRoute_viewer">;
  } | null | undefined;
};
export type Order2CheckoutRouteTestQuery = {
  response: Order2CheckoutRouteTestQuery$data;
  variables: Order2CheckoutRouteTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
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
  "name": "brand",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastDigits",
  "storageKey": null
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
  "name": "type",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "last4",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bankName",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "addressLine1",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "addressLine2",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "region",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v16 = {
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
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "minor",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "major",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v23 = {
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
      "name": "currencySymbol",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v24 = [
  (v20/*: any*/),
  (v21/*: any*/),
  (v23/*: any*/)
],
v25 = {
  "kind": "InlineFragment",
  "selections": (v24/*: any*/),
  "type": "ShippingLine",
  "abstractKey": null
},
v26 = {
  "kind": "InlineFragment",
  "selections": (v24/*: any*/),
  "type": "TaxLine",
  "abstractKey": null
},
v27 = {
  "kind": "InlineFragment",
  "selections": [
    (v20/*: any*/),
    (v23/*: any*/)
  ],
  "type": "SubtotalLine",
  "abstractKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currencyCode",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "amount",
  "plural": false,
  "selections": [
    (v18/*: any*/)
  ],
  "storageKey": null
},
v30 = [
  (v19/*: any*/)
],
v31 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "maxPrice",
      "plural": false,
      "selections": (v30/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "minPrice",
      "plural": false,
      "selections": (v30/*: any*/),
      "storageKey": null
    }
  ],
  "type": "PriceRange",
  "abstractKey": null
},
v32 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
],
v33 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "listPrice",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v31/*: any*/)
  ],
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v35 = {
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
v36 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v37 = [
  (v17/*: any*/),
  (v28/*: any*/),
  (v18/*: any*/)
],
v38 = [
  (v17/*: any*/),
  (v18/*: any*/)
],
v39 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v40 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v41 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v42 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v43 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PhoneNumberType"
},
v44 = [
  "CREDIT_CARD",
  "SEPA_DEBIT",
  "US_BANK_ACCOUNT",
  "WIRE_TRANSFER"
],
v45 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v46 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Long"
},
v47 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v48 = {
  "enumValues": [
    "ARTSY_EXPRESS",
    "ARTSY_STANDARD",
    "ARTSY_WHITE_GLOVE",
    "DOMESTIC_FLAT",
    "INTERNATIONAL_FLAT",
    "PICKUP",
    "SHIPPING_TBD"
  ],
  "nullable": false,
  "plural": false,
  "type": "FulfillmentOptionTypeEnum"
},
v49 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ListPrice"
},
v50 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v51 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v52 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v53 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "PricingBreakdownLineUnion"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Order2CheckoutRouteTestQuery",
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
              {
                "kind": "Literal",
                "name": "orderID",
                "value": "order-id"
              }
            ],
            "kind": "FragmentSpread",
            "name": "Order2CheckoutRoute_viewer"
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
    "name": "Order2CheckoutRouteTestQuery",
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
                "args": (v0/*: any*/),
                "concreteType": "CreditCardConnection",
                "kind": "LinkedField",
                "name": "creditCards",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CreditCardEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CreditCard",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "creditCards(first:10)"
              },
              {
                "alias": null,
                "args": (v0/*: any*/),
                "concreteType": "BankAccountConnection",
                "kind": "LinkedField",
                "name": "bankAccounts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "BankAccountEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "BankAccount",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v6/*: any*/),
                          (v2/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "bankAccounts(first:10)"
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 20
                  }
                ],
                "concreteType": "UserAddressConnection",
                "kind": "LinkedField",
                "name": "addressConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserAddressEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "UserAddress",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v15/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "phoneNumber",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "phoneNumberCountryCode",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PhoneNumberType",
                            "kind": "LinkedField",
                            "name": "phoneNumberParsed",
                            "plural": false,
                            "selections": [
                              (v16/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isDefault",
                            "storageKey": null
                          },
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "addressConnection(first:20)"
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "id",
                    "value": "order-id"
                  }
                ],
                "concreteType": "Order",
                "kind": "LinkedField",
                "name": "order",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
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
                    "name": "pendingOffer",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "note",
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
                          (v17/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "pricingBreakdownLines",
                        "plural": true,
                        "selections": [
                          (v1/*: any*/),
                          (v25/*: any*/),
                          (v26/*: any*/),
                          (v27/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v20/*: any*/),
                              (v21/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Money",
                                "kind": "LinkedField",
                                "name": "amount",
                                "plural": false,
                                "selections": [
                                  (v18/*: any*/),
                                  (v22/*: any*/),
                                  (v28/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "TotalLine",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
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
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v13/*: any*/),
                      (v12/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PhoneNumberType",
                        "kind": "LinkedField",
                        "name": "phoneNumber",
                        "plural": false,
                        "selections": [
                          (v16/*: any*/),
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
                      (v6/*: any*/),
                      (v29/*: any*/)
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
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "paymentMethodDetails",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v5/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/)
                        ],
                        "type": "CreditCard",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v5/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/)
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
                    "kind": "ScalarField",
                    "name": "source",
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isFixedShippingFeeOnly",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isAcquireable",
                            "storageKey": null
                          },
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "priceDisplay",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isPriceRange",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isPriceHidden",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "listPrice",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v30/*: any*/),
                                "type": "Money",
                                "abstractKey": null
                              },
                              (v31/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EditionSet",
                            "kind": "LinkedField",
                            "name": "editionSets",
                            "plural": true,
                            "selections": [
                              (v2/*: any*/),
                              (v5/*: any*/)
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
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkVersion",
                        "kind": "LinkedField",
                        "name": "artworkVersion",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v5/*: any*/),
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
                                "selections": (v32/*: any*/),
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
                                "selections": (v32/*: any*/),
                                "storageKey": "resized(height:138,width:185)"
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
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "listPrice",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v19/*: any*/)
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
                          (v1/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v33/*: any*/),
                              (v34/*: any*/),
                              (v35/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v33/*: any*/),
                              (v5/*: any*/),
                              (v34/*: any*/),
                              (v35/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
                          },
                          (v36/*: any*/)
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
                    "selections": (v37/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "itemsTotal",
                    "plural": false,
                    "selections": (v37/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "shippingTotal",
                    "plural": false,
                    "selections": (v38/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "taxTotal",
                    "plural": false,
                    "selections": (v38/*: any*/),
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
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "amount",
                        "plural": false,
                        "selections": (v37/*: any*/),
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
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "seller",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
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
                      (v36/*: any*/)
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
                      (v1/*: any*/),
                      (v25/*: any*/),
                      (v26/*: any*/),
                      (v27/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v20/*: any*/),
                          (v21/*: any*/),
                          (v29/*: any*/)
                        ],
                        "type": "TotalLine",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v28/*: any*/),
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
                    "name": "code",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "availablePaymentMethods",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "BankAccountBalanceCheck",
                    "kind": "LinkedField",
                    "name": "bankAccountBalanceCheck",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "result",
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
                "storageKey": "order(id:\"order-id\")"
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
    "cacheID": "9330f189cd388b5a6e7ebdc4469ce066",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "viewer.me.addressConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "UserAddressConnection"
        },
        "viewer.me.addressConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "UserAddressEdge"
        },
        "viewer.me.addressConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "UserAddress"
        },
        "viewer.me.addressConnection.edges.node.addressLine1": (v39/*: any*/),
        "viewer.me.addressConnection.edges.node.addressLine2": (v40/*: any*/),
        "viewer.me.addressConnection.edges.node.city": (v39/*: any*/),
        "viewer.me.addressConnection.edges.node.country": (v39/*: any*/),
        "viewer.me.addressConnection.edges.node.id": (v41/*: any*/),
        "viewer.me.addressConnection.edges.node.internalID": (v41/*: any*/),
        "viewer.me.addressConnection.edges.node.isDefault": (v42/*: any*/),
        "viewer.me.addressConnection.edges.node.name": (v40/*: any*/),
        "viewer.me.addressConnection.edges.node.phoneNumber": (v40/*: any*/),
        "viewer.me.addressConnection.edges.node.phoneNumberCountryCode": (v40/*: any*/),
        "viewer.me.addressConnection.edges.node.phoneNumberParsed": (v43/*: any*/),
        "viewer.me.addressConnection.edges.node.phoneNumberParsed.display": (v40/*: any*/),
        "viewer.me.addressConnection.edges.node.postalCode": (v40/*: any*/),
        "viewer.me.addressConnection.edges.node.region": (v40/*: any*/),
        "viewer.me.bankAccounts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BankAccountConnection"
        },
        "viewer.me.bankAccounts.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "BankAccountEdge"
        },
        "viewer.me.bankAccounts.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BankAccount"
        },
        "viewer.me.bankAccounts.edges.node.__typename": (v39/*: any*/),
        "viewer.me.bankAccounts.edges.node.bankName": (v39/*: any*/),
        "viewer.me.bankAccounts.edges.node.id": (v41/*: any*/),
        "viewer.me.bankAccounts.edges.node.internalID": (v41/*: any*/),
        "viewer.me.bankAccounts.edges.node.last4": (v39/*: any*/),
        "viewer.me.bankAccounts.edges.node.type": {
          "enumValues": [
            "SEPA_DEBIT",
            "US_BANK_ACCOUNT"
          ],
          "nullable": false,
          "plural": false,
          "type": "BankAccountTypes"
        },
        "viewer.me.creditCards": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CreditCardConnection"
        },
        "viewer.me.creditCards.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CreditCardEdge"
        },
        "viewer.me.creditCards.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CreditCard"
        },
        "viewer.me.creditCards.edges.node.__typename": (v39/*: any*/),
        "viewer.me.creditCards.edges.node.brand": (v39/*: any*/),
        "viewer.me.creditCards.edges.node.id": (v41/*: any*/),
        "viewer.me.creditCards.edges.node.internalID": (v41/*: any*/),
        "viewer.me.creditCards.edges.node.lastDigits": (v39/*: any*/),
        "viewer.me.id": (v41/*: any*/),
        "viewer.me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "viewer.me.order.availablePaymentMethods": {
          "enumValues": (v44/*: any*/),
          "nullable": false,
          "plural": true,
          "type": "OrderPaymentMethodEnum"
        },
        "viewer.me.order.availableShippingCountries": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "String"
        },
        "viewer.me.order.bankAccountBalanceCheck": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BankAccountBalanceCheck"
        },
        "viewer.me.order.bankAccountBalanceCheck.message": (v40/*: any*/),
        "viewer.me.order.bankAccountBalanceCheck.result": {
          "enumValues": [
            "INSUFFICIENT",
            "INVALID",
            "NOT_SUPPORTED",
            "PENDING",
            "SUFFICIENT"
          ],
          "nullable": false,
          "plural": false,
          "type": "BankAccountBalanceCheckResult"
        },
        "viewer.me.order.buyerStateExpiresAt": (v40/*: any*/),
        "viewer.me.order.buyerTotal": (v45/*: any*/),
        "viewer.me.order.buyerTotal.currencyCode": (v39/*: any*/),
        "viewer.me.order.buyerTotal.display": (v40/*: any*/),
        "viewer.me.order.buyerTotal.minor": (v46/*: any*/),
        "viewer.me.order.code": (v39/*: any*/),
        "viewer.me.order.currencyCode": (v39/*: any*/),
        "viewer.me.order.fulfillmentDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FulfillmentDetails"
        },
        "viewer.me.order.fulfillmentDetails.addressLine1": (v40/*: any*/),
        "viewer.me.order.fulfillmentDetails.addressLine2": (v40/*: any*/),
        "viewer.me.order.fulfillmentDetails.city": (v40/*: any*/),
        "viewer.me.order.fulfillmentDetails.country": (v40/*: any*/),
        "viewer.me.order.fulfillmentDetails.name": (v40/*: any*/),
        "viewer.me.order.fulfillmentDetails.phoneNumber": (v43/*: any*/),
        "viewer.me.order.fulfillmentDetails.phoneNumber.countryCode": (v40/*: any*/),
        "viewer.me.order.fulfillmentDetails.phoneNumber.display": (v40/*: any*/),
        "viewer.me.order.fulfillmentDetails.phoneNumber.originalNumber": (v40/*: any*/),
        "viewer.me.order.fulfillmentDetails.phoneNumber.regionCode": (v40/*: any*/),
        "viewer.me.order.fulfillmentDetails.postalCode": (v40/*: any*/),
        "viewer.me.order.fulfillmentDetails.region": (v40/*: any*/),
        "viewer.me.order.fulfillmentOptions": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "FulfillmentOption"
        },
        "viewer.me.order.fulfillmentOptions.amount": (v45/*: any*/),
        "viewer.me.order.fulfillmentOptions.amount.currencyCode": (v39/*: any*/),
        "viewer.me.order.fulfillmentOptions.amount.display": (v40/*: any*/),
        "viewer.me.order.fulfillmentOptions.amount.minor": (v46/*: any*/),
        "viewer.me.order.fulfillmentOptions.selected": (v47/*: any*/),
        "viewer.me.order.fulfillmentOptions.type": (v48/*: any*/),
        "viewer.me.order.id": (v41/*: any*/),
        "viewer.me.order.internalID": (v41/*: any*/),
        "viewer.me.order.itemsTotal": (v45/*: any*/),
        "viewer.me.order.itemsTotal.currencyCode": (v39/*: any*/),
        "viewer.me.order.itemsTotal.display": (v40/*: any*/),
        "viewer.me.order.itemsTotal.minor": (v46/*: any*/),
        "viewer.me.order.lineItems": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "LineItem"
        },
        "viewer.me.order.lineItems.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "viewer.me.order.lineItems.artwork.artworkMeta": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMeta"
        },
        "viewer.me.order.lineItems.artwork.artworkMeta.share": (v40/*: any*/),
        "viewer.me.order.lineItems.artwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "viewer.me.order.lineItems.artwork.editionSets.id": (v41/*: any*/),
        "viewer.me.order.lineItems.artwork.editionSets.internalID": (v41/*: any*/),
        "viewer.me.order.lineItems.artwork.href": (v40/*: any*/),
        "viewer.me.order.lineItems.artwork.id": (v41/*: any*/),
        "viewer.me.order.lineItems.artwork.internalID": (v41/*: any*/),
        "viewer.me.order.lineItems.artwork.isAcquireable": (v47/*: any*/),
        "viewer.me.order.lineItems.artwork.isFixedShippingFeeOnly": (v47/*: any*/),
        "viewer.me.order.lineItems.artwork.isPriceHidden": (v47/*: any*/),
        "viewer.me.order.lineItems.artwork.isPriceRange": (v47/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice": (v49/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.__typename": (v39/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.major": (v50/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.maxPrice": (v45/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.maxPrice.major": (v50/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.minPrice": (v45/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.minPrice.major": (v50/*: any*/),
        "viewer.me.order.lineItems.artwork.priceDisplay": (v40/*: any*/),
        "viewer.me.order.lineItems.artwork.slug": (v41/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "viewer.me.order.lineItems.artworkOrEditionSet.__isNode": (v39/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.__typename": (v39/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "viewer.me.order.lineItems.artworkOrEditionSet.dimensions.cm": (v40/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.dimensions.in": (v40/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.id": (v41/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice": (v49/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.__typename": (v39/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.maxPrice": (v45/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.maxPrice.major": (v50/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.minPrice": (v45/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.minPrice.major": (v50/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.price": (v40/*: any*/),
        "viewer.me.order.lineItems.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "viewer.me.order.lineItems.artworkVersion.artistNames": (v40/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "viewer.me.order.lineItems.artworkVersion.attributionClass.id": (v41/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.attributionClass.shortDescription": (v40/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.date": (v40/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.id": (v41/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.image": (v51/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.image.resized": (v52/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.image.resized.url": (v39/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.internalID": (v41/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.thumbnail": (v51/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.thumbnail.resized": (v52/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.thumbnail.resized.url": (v39/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.title": (v40/*: any*/),
        "viewer.me.order.lineItems.id": (v41/*: any*/),
        "viewer.me.order.lineItems.listPrice": (v45/*: any*/),
        "viewer.me.order.lineItems.listPrice.__typename": (v39/*: any*/),
        "viewer.me.order.lineItems.listPrice.major": (v50/*: any*/),
        "viewer.me.order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderModeEnum"
        },
        "viewer.me.order.paymentMethod": {
          "enumValues": (v44/*: any*/),
          "nullable": true,
          "plural": false,
          "type": "OrderPaymentMethodEnum"
        },
        "viewer.me.order.paymentMethodDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PaymentMethodUnion"
        },
        "viewer.me.order.paymentMethodDetails.__typename": (v39/*: any*/),
        "viewer.me.order.paymentMethodDetails.bankName": (v39/*: any*/),
        "viewer.me.order.paymentMethodDetails.brand": (v39/*: any*/),
        "viewer.me.order.paymentMethodDetails.id": (v41/*: any*/),
        "viewer.me.order.paymentMethodDetails.internalID": (v41/*: any*/),
        "viewer.me.order.paymentMethodDetails.isManualPayment": (v42/*: any*/),
        "viewer.me.order.paymentMethodDetails.last4": (v39/*: any*/),
        "viewer.me.order.paymentMethodDetails.lastDigits": (v39/*: any*/),
        "viewer.me.order.pendingOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Offer"
        },
        "viewer.me.order.pendingOffer.amount": (v45/*: any*/),
        "viewer.me.order.pendingOffer.amount.display": (v40/*: any*/),
        "viewer.me.order.pendingOffer.amount.major": (v50/*: any*/),
        "viewer.me.order.pendingOffer.amount.minor": (v46/*: any*/),
        "viewer.me.order.pendingOffer.id": (v41/*: any*/),
        "viewer.me.order.pendingOffer.internalID": (v41/*: any*/),
        "viewer.me.order.pendingOffer.note": (v40/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines": (v53/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.__typename": (v39/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.amount": (v45/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.amount.amount": (v40/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.amount.currencyCode": (v39/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.amount.currencySymbol": (v40/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.amount.display": (v40/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.amountFallbackText": (v40/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.displayName": (v39/*: any*/),
        "viewer.me.order.pricingBreakdownLines": (v53/*: any*/),
        "viewer.me.order.pricingBreakdownLines.__typename": (v39/*: any*/),
        "viewer.me.order.pricingBreakdownLines.amount": (v45/*: any*/),
        "viewer.me.order.pricingBreakdownLines.amount.amount": (v40/*: any*/),
        "viewer.me.order.pricingBreakdownLines.amount.currencySymbol": (v40/*: any*/),
        "viewer.me.order.pricingBreakdownLines.amount.display": (v40/*: any*/),
        "viewer.me.order.pricingBreakdownLines.amountFallbackText": (v40/*: any*/),
        "viewer.me.order.pricingBreakdownLines.displayName": (v39/*: any*/),
        "viewer.me.order.selectedFulfillmentOption": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FulfillmentOption"
        },
        "viewer.me.order.selectedFulfillmentOption.amount": (v45/*: any*/),
        "viewer.me.order.selectedFulfillmentOption.amount.display": (v40/*: any*/),
        "viewer.me.order.selectedFulfillmentOption.type": (v48/*: any*/),
        "viewer.me.order.seller": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SellerType"
        },
        "viewer.me.order.seller.__isNode": (v39/*: any*/),
        "viewer.me.order.seller.__typename": (v39/*: any*/),
        "viewer.me.order.seller.id": (v41/*: any*/),
        "viewer.me.order.seller.merchantAccount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerMerchantAccount"
        },
        "viewer.me.order.seller.merchantAccount.externalId": (v39/*: any*/),
        "viewer.me.order.shippingOrigin": (v40/*: any*/),
        "viewer.me.order.shippingTotal": (v45/*: any*/),
        "viewer.me.order.shippingTotal.display": (v40/*: any*/),
        "viewer.me.order.shippingTotal.minor": (v46/*: any*/),
        "viewer.me.order.source": {
          "enumValues": [
            "ARTWORK_PAGE",
            "INQUIRY",
            "PARTNER_OFFER",
            "PRIVATE_SALE"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderSourceEnum"
        },
        "viewer.me.order.stripeConfirmationToken": (v40/*: any*/),
        "viewer.me.order.taxTotal": (v45/*: any*/),
        "viewer.me.order.taxTotal.display": (v40/*: any*/),
        "viewer.me.order.taxTotal.minor": (v46/*: any*/)
      }
    },
    "name": "Order2CheckoutRouteTestQuery",
    "operationKind": "query",
    "text": "query Order2CheckoutRouteTestQuery {\n  viewer {\n    ...Order2CheckoutRoute_viewer_oauVf\n  }\n}\n\nfragment Order2CheckoutApp_me on Me {\n  ...Order2PaymentStep_me\n  ...Order2FulfillmentDetailsStep_me\n}\n\nfragment Order2CheckoutApp_order on Order {\n  internalID\n  mode\n  selectedFulfillmentOption {\n    type\n  }\n  lineItems {\n    artwork {\n      slug\n      isFixedShippingFeeOnly\n      id\n    }\n    id\n  }\n  ...useLoadCheckout_order\n  ...Order2ExpressCheckout_order\n  ...Order2CollapsibleOrderSummary_order\n  ...Order2OfferStep_order\n  ...Order2FulfillmentDetailsStep_order\n  ...Order2DeliveryOptionsStep_order\n  ...Order2PaymentStep_order\n  ...Order2ReviewStep_order\n  ...Order2CheckoutLoadingSkeleton_order\n  ...Order2HelpLinks_order\n}\n\nfragment Order2CheckoutContext_order on Order {\n  ...useBuildInitialSteps_order\n  internalID\n  mode\n  source\n  stripeConfirmationToken\n  selectedFulfillmentOption {\n    type\n  }\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutLoadingSkeleton_order on Order {\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  lineItems {\n    artworkVersion {\n      title\n      artistNames\n      date\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutPricingBreakdown_order on Order {\n  source\n  mode\n  buyerStateExpiresAt\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n  pendingOffer {\n    pricingBreakdownLines {\n      __typename\n      ... on ShippingLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TaxLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on SubtotalLine {\n        displayName\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TotalLine {\n        displayName\n        amountFallbackText\n        amount {\n          display\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutRoute_viewer_oauVf on Viewer {\n  me {\n    ...Order2CheckoutApp_me\n    order(id: \"order-id\") {\n      internalID\n      ...Order2CheckoutContext_order\n      ...Order2CheckoutApp_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CollapsibleOrderSummary_order on Order {\n  ...Order2CheckoutPricingBreakdown_order\n  source\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  shippingTotal {\n    display\n  }\n  taxTotal {\n    display\n  }\n  lineItems {\n    artworkVersion {\n      title\n      artistNames\n      date\n      thumbnail: image {\n        resized(height: 200, version: [\"square\"]) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Order2DeliveryForm_me on Me {\n  addressConnection(first: 20) {\n    edges {\n      node {\n        internalID\n        addressLine1\n        addressLine2\n        city\n        region\n        postalCode\n        country\n        name\n        phoneNumber\n        phoneNumberCountryCode\n        phoneNumberParsed {\n          display(format: INTERNATIONAL)\n        }\n        isDefault\n        id\n      }\n    }\n  }\n}\n\nfragment Order2DeliveryForm_order on Order {\n  internalID\n  selectedFulfillmentOption {\n    type\n  }\n  availableShippingCountries\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    region\n    postalCode\n    country\n    name\n    phoneNumber {\n      originalNumber\n      regionCode\n      countryCode\n    }\n  }\n}\n\nfragment Order2DeliveryOptionsForm_order on Order {\n  internalID\n  fulfillmentOptions {\n    amount {\n      display\n    }\n    type\n    selected\n  }\n}\n\nfragment Order2DeliveryOptionsStep_order on Order {\n  ...useCompleteDeliveryOptionData_order\n  ...Order2DeliveryOptionsForm_order\n  internalID\n  selectedFulfillmentOption {\n    type\n    amount {\n      display\n    }\n  }\n}\n\nfragment Order2ExpressCheckoutUI_order on Order {\n  internalID\n  source\n  mode\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n  }\n  shippingTotal {\n    minor\n  }\n  taxTotal {\n    minor\n  }\n  availableShippingCountries\n  fulfillmentOptions {\n    type\n    amount {\n      minor\n      currencyCode\n    }\n    selected\n  }\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    name\n  }\n  lineItems {\n    artwork {\n      internalID\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment Order2ExpressCheckout_order on Order {\n  ...Order2ExpressCheckoutUI_order\n  availableShippingCountries\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Order2FulfillmentDetailsStep_me on Me {\n  ...Order2DeliveryForm_me\n}\n\nfragment Order2FulfillmentDetailsStep_order on Order {\n  ...useCompleteFulfillmentDetailsData_order\n  ...Order2PickupForm_order\n  ...Order2DeliveryForm_order\n  id\n  fulfillmentDetails {\n    phoneNumber {\n      countryCode\n      regionCode\n      originalNumber\n      display(format: INTERNATIONAL)\n    }\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  fulfillmentOptions {\n    type\n    selected\n  }\n  availableShippingCountries\n}\n\nfragment Order2HelpLinks_order on Order {\n  internalID\n  mode\n  source\n}\n\nfragment Order2OfferOptions_order on Order {\n  currencyCode\n  lineItems {\n    listPrice {\n      __typename\n      major\n    }\n    artworkOrEditionSet {\n      __typename\n      ... on Artwork {\n        listPrice {\n          __typename\n          ... on PriceRange {\n            maxPrice {\n              major\n            }\n            minPrice {\n              major\n            }\n          }\n        }\n      }\n      ... on EditionSet {\n        listPrice {\n          __typename\n          ... on PriceRange {\n            maxPrice {\n              major\n            }\n            minPrice {\n              major\n            }\n          }\n        }\n        id\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment Order2OfferStep_order on Order {\n  ...useCompleteOfferData_order\n  ...Order2OfferOptions_order\n  internalID\n  mode\n  source\n  currencyCode\n  selectedFulfillmentOption {\n    type\n  }\n  pendingOffer {\n    amount {\n      display\n      major\n    }\n    note\n    id\n  }\n  lineItems {\n    artwork {\n      slug\n      priceDisplay\n      isPriceRange\n      isPriceHidden\n      listPrice {\n        __typename\n        ... on Money {\n          major\n        }\n        ... on PriceRange {\n          maxPrice {\n            major\n          }\n          minPrice {\n            major\n          }\n        }\n      }\n      editionSets {\n        internalID\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Order2PaymentCompletedView_order on Order {\n  paymentMethod\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      brand\n      lastDigits\n      id\n    }\n    ... on BankAccount {\n      last4\n      bankName\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n}\n\nfragment Order2PaymentForm_me on Me {\n  creditCards(first: 10) {\n    edges {\n      node {\n        __typename\n        internalID\n        brand\n        lastDigits\n        id\n      }\n    }\n  }\n  bankAccounts(first: 10) {\n    edges {\n      node {\n        __typename\n        type\n        internalID\n        last4\n        bankName\n        id\n      }\n    }\n  }\n}\n\nfragment Order2PaymentForm_order on Order {\n  code\n  mode\n  source\n  internalID\n  currencyCode\n  availablePaymentMethods\n  bankAccountBalanceCheck {\n    result\n    message\n  }\n  pendingOffer {\n    pricingBreakdownLines {\n      __typename\n      ... on TotalLine {\n        amount {\n          amount\n          currencyCode\n        }\n      }\n    }\n    id\n  }\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  fulfillmentDetails {\n    name\n    addressLine1\n    addressLine2\n    city\n    region\n    postalCode\n    country\n  }\n  lineItems {\n    artwork {\n      href\n      artworkMeta: meta {\n        share\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Order2PaymentStep_me on Me {\n  ...Order2PaymentForm_me\n}\n\nfragment Order2PaymentStep_order on Order {\n  ...useCompletePaymentData_order\n  ...Order2PaymentForm_order\n  ...Order2PaymentCompletedView_order\n  internalID\n  paymentMethod\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      internalID\n      id\n    }\n    ... on BankAccount {\n      internalID\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  shippingTotal {\n    minor\n  }\n  taxTotal {\n    minor\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Order2PickupForm_order on Order {\n  internalID\n  fulfillmentOptions {\n    type\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  fulfillmentDetails {\n    phoneNumber {\n      countryCode\n      regionCode\n      originalNumber\n    }\n  }\n  shippingOrigin\n}\n\nfragment Order2ReviewStep_order on Order {\n  ...Order2CheckoutPricingBreakdown_order\n  internalID\n  mode\n  source\n  stripeConfirmationToken\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  shippingTotal {\n    display\n  }\n  taxTotal {\n    display\n  }\n  lineItems {\n    artworkOrEditionSet {\n      __typename\n      ... on Artwork {\n        price\n        dimensions {\n          in\n          cm\n        }\n      }\n      ... on EditionSet {\n        price\n        dimensions {\n          in\n          cm\n        }\n        id\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    artworkVersion {\n      title\n      artistNames\n      date\n      attributionClass {\n        shortDescription\n        id\n      }\n      image {\n        resized(width: 185, height: 138) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n  pendingOffer {\n    internalID\n    id\n  }\n}\n\nfragment useBuildInitialSteps_order on Order {\n  ...useCompleteOfferData_order\n  ...useCompleteFulfillmentDetailsData_order\n  ...useCompleteDeliveryOptionData_order\n  ...useCompletePaymentData_order\n  mode\n  selectedFulfillmentOption {\n    type\n  }\n}\n\nfragment useCompleteDeliveryOptionData_order on Order {\n  selectedFulfillmentOption {\n    type\n  }\n}\n\nfragment useCompleteFulfillmentDetailsData_order on Order {\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n    phoneNumber {\n      display(format: INTERNATIONAL)\n    }\n  }\n  selectedFulfillmentOption {\n    type\n  }\n}\n\nfragment useCompleteOfferData_order on Order {\n  mode\n  pendingOffer {\n    note\n    amount {\n      minor\n      display\n    }\n    id\n  }\n}\n\nfragment useCompletePaymentData_order on Order {\n  paymentMethod\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      internalID\n      id\n    }\n    ... on BankAccount {\n      internalID\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n}\n\nfragment useLoadCheckout_order on Order {\n  internalID\n  lineItems {\n    artwork {\n      isAcquireable\n      id\n    }\n    artworkVersion {\n      internalID\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3e89dbf0c313ecb53327bf9900bf4641";

export default node;
