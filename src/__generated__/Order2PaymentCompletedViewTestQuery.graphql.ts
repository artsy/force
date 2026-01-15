/**
 * @generated SignedSource<<f3e374b75be29636f25d14565d6d27a8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2PaymentCompletedViewTestQuery$variables = Record<PropertyKey, never>;
export type Order2PaymentCompletedViewTestQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutRoute_viewer">;
  } | null | undefined;
};
export type Order2PaymentCompletedViewTestQuery = {
  response: Order2PaymentCompletedViewTestQuery$data;
  variables: Order2PaymentCompletedViewTestQuery$variables;
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
  "name": "expirationYear",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expirationMonth",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "last4",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bankName",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "addressLine1",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "addressLine2",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "region",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v18 = {
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
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "minor",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "major",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "amount",
  "plural": false,
  "selections": [
    (v24/*: any*/),
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
v26 = [
  (v22/*: any*/),
  (v23/*: any*/),
  (v25/*: any*/)
],
v27 = {
  "kind": "InlineFragment",
  "selections": (v26/*: any*/),
  "type": "ShippingLine",
  "abstractKey": null
},
v28 = {
  "kind": "InlineFragment",
  "selections": (v26/*: any*/),
  "type": "TaxLine",
  "abstractKey": null
},
v29 = {
  "kind": "InlineFragment",
  "selections": [
    (v22/*: any*/),
    (v25/*: any*/)
  ],
  "type": "SubtotalLine",
  "abstractKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currencyCode",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "amount",
  "plural": false,
  "selections": [
    (v20/*: any*/)
  ],
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v33 = [
  (v32/*: any*/)
],
v34 = {
  "alias": "resizedSquare",
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
  "selections": (v33/*: any*/),
  "storageKey": "resized(height:200,version:[\"square\"])"
},
v35 = {
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
  "selections": (v33/*: any*/),
  "storageKey": "resized(height:138,width:185)"
},
v36 = [
  (v7/*: any*/)
],
v37 = [
  (v21/*: any*/)
],
v38 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "maxPrice",
      "plural": false,
      "selections": (v37/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "minPrice",
      "plural": false,
      "selections": (v37/*: any*/),
      "storageKey": null
    }
  ],
  "type": "PriceRange",
  "abstractKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "listPrice",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v38/*: any*/)
  ],
  "storageKey": null
},
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v41 = {
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
v42 = {
  "kind": "InlineFragment",
  "selections": (v36/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v43 = [
  (v19/*: any*/),
  (v30/*: any*/),
  (v20/*: any*/)
],
v44 = [
  (v19/*: any*/),
  (v20/*: any*/)
],
v45 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v46 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v47 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v48 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v49 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PhoneNumberType"
},
v50 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v51 = [
  "CREDIT_CARD",
  "SEPA_DEBIT",
  "US_BANK_ACCOUNT",
  "WIRE_TRANSFER"
],
v52 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v53 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Long"
},
v54 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v55 = {
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
v56 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v57 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ListPrice"
},
v58 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v59 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v60 = {
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
    "name": "Order2PaymentCompletedViewTestQuery",
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
    "name": "Order2PaymentCompletedViewTestQuery",
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
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/)
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
                          (v8/*: any*/),
                          (v2/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
                          (v7/*: any*/)
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
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v15/*: any*/),
                          (v16/*: any*/),
                          (v17/*: any*/),
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
                              (v18/*: any*/)
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
                          (v7/*: any*/)
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
                          (v19/*: any*/),
                          (v20/*: any*/),
                          (v21/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "pricingBreakdownLines",
                        "plural": true,
                        "selections": [
                          (v1/*: any*/),
                          (v27/*: any*/),
                          (v28/*: any*/),
                          (v29/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v22/*: any*/),
                              (v23/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Money",
                                "kind": "LinkedField",
                                "name": "amount",
                                "plural": false,
                                "selections": [
                                  (v20/*: any*/),
                                  (v24/*: any*/),
                                  (v30/*: any*/)
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
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v15/*: any*/),
                      (v14/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PhoneNumberType",
                        "kind": "LinkedField",
                        "name": "phoneNumber",
                        "plural": false,
                        "selections": [
                          (v18/*: any*/),
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
                      (v8/*: any*/),
                      (v31/*: any*/)
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
                          (v7/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/)
                        ],
                        "type": "CreditCard",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v7/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/)
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
                          (v7/*: any*/),
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
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "includeAll",
                                "value": false
                              }
                            ],
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "figures",
                            "plural": true,
                            "selections": [
                              (v1/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v34/*: any*/),
                                  (v35/*: any*/)
                                ],
                                "type": "Image",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v36/*: any*/),
                                "type": "Video",
                                "abstractKey": null
                              }
                            ],
                            "storageKey": "figures(includeAll:false)"
                          },
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
                                "selections": (v37/*: any*/),
                                "type": "Money",
                                "abstractKey": null
                              },
                              (v38/*: any*/)
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
                              (v7/*: any*/)
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
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkVersion",
                        "kind": "LinkedField",
                        "name": "artworkVersion",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v7/*: any*/),
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
                              (v32/*: any*/),
                              (v34/*: any*/)
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
                              (v7/*: any*/)
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
                              (v32/*: any*/),
                              (v35/*: any*/)
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
                          (v21/*: any*/)
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
                              (v39/*: any*/),
                              (v40/*: any*/),
                              (v41/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v39/*: any*/),
                              (v7/*: any*/),
                              (v40/*: any*/),
                              (v41/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
                          },
                          (v42/*: any*/)
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
                    "selections": (v43/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "itemsTotal",
                    "plural": false,
                    "selections": (v43/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "shippingTotal",
                    "plural": false,
                    "selections": (v44/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "taxTotal",
                    "plural": false,
                    "selections": (v44/*: any*/),
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
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "amount",
                        "plural": false,
                        "selections": (v43/*: any*/),
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
                      (v42/*: any*/)
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
                      (v27/*: any*/),
                      (v28/*: any*/),
                      (v29/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v22/*: any*/),
                          (v23/*: any*/),
                          (v31/*: any*/)
                        ],
                        "type": "TotalLine",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v30/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "shippingOrigin",
                    "storageKey": null
                  },
                  (v7/*: any*/),
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
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d4784b92d47366a3cef41a38729d0dc3",
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
        "viewer.me.addressConnection.edges.node.addressLine1": (v45/*: any*/),
        "viewer.me.addressConnection.edges.node.addressLine2": (v46/*: any*/),
        "viewer.me.addressConnection.edges.node.city": (v45/*: any*/),
        "viewer.me.addressConnection.edges.node.country": (v45/*: any*/),
        "viewer.me.addressConnection.edges.node.id": (v47/*: any*/),
        "viewer.me.addressConnection.edges.node.internalID": (v47/*: any*/),
        "viewer.me.addressConnection.edges.node.isDefault": (v48/*: any*/),
        "viewer.me.addressConnection.edges.node.name": (v46/*: any*/),
        "viewer.me.addressConnection.edges.node.phoneNumber": (v46/*: any*/),
        "viewer.me.addressConnection.edges.node.phoneNumberCountryCode": (v46/*: any*/),
        "viewer.me.addressConnection.edges.node.phoneNumberParsed": (v49/*: any*/),
        "viewer.me.addressConnection.edges.node.phoneNumberParsed.display": (v46/*: any*/),
        "viewer.me.addressConnection.edges.node.postalCode": (v46/*: any*/),
        "viewer.me.addressConnection.edges.node.region": (v46/*: any*/),
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
        "viewer.me.bankAccounts.edges.node.__typename": (v45/*: any*/),
        "viewer.me.bankAccounts.edges.node.bankName": (v46/*: any*/),
        "viewer.me.bankAccounts.edges.node.id": (v47/*: any*/),
        "viewer.me.bankAccounts.edges.node.internalID": (v47/*: any*/),
        "viewer.me.bankAccounts.edges.node.last4": (v45/*: any*/),
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
        "viewer.me.creditCards.edges.node.__typename": (v45/*: any*/),
        "viewer.me.creditCards.edges.node.brand": (v45/*: any*/),
        "viewer.me.creditCards.edges.node.expirationMonth": (v50/*: any*/),
        "viewer.me.creditCards.edges.node.expirationYear": (v50/*: any*/),
        "viewer.me.creditCards.edges.node.id": (v47/*: any*/),
        "viewer.me.creditCards.edges.node.internalID": (v47/*: any*/),
        "viewer.me.creditCards.edges.node.lastDigits": (v45/*: any*/),
        "viewer.me.id": (v47/*: any*/),
        "viewer.me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "viewer.me.order.availablePaymentMethods": {
          "enumValues": (v51/*: any*/),
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
        "viewer.me.order.bankAccountBalanceCheck.message": (v46/*: any*/),
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
        "viewer.me.order.buyerStateExpiresAt": (v46/*: any*/),
        "viewer.me.order.buyerTotal": (v52/*: any*/),
        "viewer.me.order.buyerTotal.currencyCode": (v45/*: any*/),
        "viewer.me.order.buyerTotal.display": (v46/*: any*/),
        "viewer.me.order.buyerTotal.minor": (v53/*: any*/),
        "viewer.me.order.code": (v45/*: any*/),
        "viewer.me.order.currencyCode": (v45/*: any*/),
        "viewer.me.order.fulfillmentDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FulfillmentDetails"
        },
        "viewer.me.order.fulfillmentDetails.addressLine1": (v46/*: any*/),
        "viewer.me.order.fulfillmentDetails.addressLine2": (v46/*: any*/),
        "viewer.me.order.fulfillmentDetails.city": (v46/*: any*/),
        "viewer.me.order.fulfillmentDetails.country": (v46/*: any*/),
        "viewer.me.order.fulfillmentDetails.name": (v46/*: any*/),
        "viewer.me.order.fulfillmentDetails.phoneNumber": (v49/*: any*/),
        "viewer.me.order.fulfillmentDetails.phoneNumber.countryCode": (v46/*: any*/),
        "viewer.me.order.fulfillmentDetails.phoneNumber.display": (v46/*: any*/),
        "viewer.me.order.fulfillmentDetails.phoneNumber.originalNumber": (v46/*: any*/),
        "viewer.me.order.fulfillmentDetails.phoneNumber.regionCode": (v46/*: any*/),
        "viewer.me.order.fulfillmentDetails.postalCode": (v46/*: any*/),
        "viewer.me.order.fulfillmentDetails.region": (v46/*: any*/),
        "viewer.me.order.fulfillmentOptions": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "FulfillmentOption"
        },
        "viewer.me.order.fulfillmentOptions.amount": (v52/*: any*/),
        "viewer.me.order.fulfillmentOptions.amount.currencyCode": (v45/*: any*/),
        "viewer.me.order.fulfillmentOptions.amount.display": (v46/*: any*/),
        "viewer.me.order.fulfillmentOptions.amount.minor": (v53/*: any*/),
        "viewer.me.order.fulfillmentOptions.selected": (v54/*: any*/),
        "viewer.me.order.fulfillmentOptions.type": (v55/*: any*/),
        "viewer.me.order.id": (v47/*: any*/),
        "viewer.me.order.internalID": (v47/*: any*/),
        "viewer.me.order.itemsTotal": (v52/*: any*/),
        "viewer.me.order.itemsTotal.currencyCode": (v45/*: any*/),
        "viewer.me.order.itemsTotal.display": (v46/*: any*/),
        "viewer.me.order.itemsTotal.minor": (v53/*: any*/),
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
        "viewer.me.order.lineItems.artwork.artworkMeta.share": (v46/*: any*/),
        "viewer.me.order.lineItems.artwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "viewer.me.order.lineItems.artwork.editionSets.id": (v47/*: any*/),
        "viewer.me.order.lineItems.artwork.editionSets.internalID": (v47/*: any*/),
        "viewer.me.order.lineItems.artwork.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtworkFigures"
        },
        "viewer.me.order.lineItems.artwork.figures.__typename": (v45/*: any*/),
        "viewer.me.order.lineItems.artwork.figures.id": (v47/*: any*/),
        "viewer.me.order.lineItems.artwork.figures.resized": (v56/*: any*/),
        "viewer.me.order.lineItems.artwork.figures.resized.url": (v45/*: any*/),
        "viewer.me.order.lineItems.artwork.figures.resizedSquare": (v56/*: any*/),
        "viewer.me.order.lineItems.artwork.figures.resizedSquare.url": (v45/*: any*/),
        "viewer.me.order.lineItems.artwork.href": (v46/*: any*/),
        "viewer.me.order.lineItems.artwork.id": (v47/*: any*/),
        "viewer.me.order.lineItems.artwork.internalID": (v47/*: any*/),
        "viewer.me.order.lineItems.artwork.isAcquireable": (v54/*: any*/),
        "viewer.me.order.lineItems.artwork.isFixedShippingFeeOnly": (v54/*: any*/),
        "viewer.me.order.lineItems.artwork.isPriceHidden": (v54/*: any*/),
        "viewer.me.order.lineItems.artwork.isPriceRange": (v54/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice": (v57/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.__typename": (v45/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.major": (v58/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.maxPrice": (v52/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.maxPrice.major": (v58/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.minPrice": (v52/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.minPrice.major": (v58/*: any*/),
        "viewer.me.order.lineItems.artwork.priceDisplay": (v46/*: any*/),
        "viewer.me.order.lineItems.artwork.slug": (v47/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "viewer.me.order.lineItems.artworkOrEditionSet.__isNode": (v45/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.__typename": (v45/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "viewer.me.order.lineItems.artworkOrEditionSet.dimensions.cm": (v46/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.dimensions.in": (v46/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.id": (v47/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice": (v57/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.__typename": (v45/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.maxPrice": (v52/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.maxPrice.major": (v58/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.minPrice": (v52/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.minPrice.major": (v58/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.price": (v46/*: any*/),
        "viewer.me.order.lineItems.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "viewer.me.order.lineItems.artworkVersion.artistNames": (v46/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "viewer.me.order.lineItems.artworkVersion.attributionClass.id": (v47/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.attributionClass.shortDescription": (v46/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.date": (v46/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.id": (v47/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.image": (v59/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.image.resized": (v56/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.image.resized.url": (v45/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.image.url": (v46/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.internalID": (v47/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.thumbnail": (v59/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.thumbnail.resizedSquare": (v56/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.thumbnail.resizedSquare.url": (v45/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.thumbnail.url": (v46/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.title": (v46/*: any*/),
        "viewer.me.order.lineItems.id": (v47/*: any*/),
        "viewer.me.order.lineItems.listPrice": (v52/*: any*/),
        "viewer.me.order.lineItems.listPrice.__typename": (v45/*: any*/),
        "viewer.me.order.lineItems.listPrice.major": (v58/*: any*/),
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
          "enumValues": (v51/*: any*/),
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
        "viewer.me.order.paymentMethodDetails.__typename": (v45/*: any*/),
        "viewer.me.order.paymentMethodDetails.bankName": (v46/*: any*/),
        "viewer.me.order.paymentMethodDetails.brand": (v45/*: any*/),
        "viewer.me.order.paymentMethodDetails.expirationMonth": (v50/*: any*/),
        "viewer.me.order.paymentMethodDetails.expirationYear": (v50/*: any*/),
        "viewer.me.order.paymentMethodDetails.id": (v47/*: any*/),
        "viewer.me.order.paymentMethodDetails.internalID": (v47/*: any*/),
        "viewer.me.order.paymentMethodDetails.isManualPayment": (v48/*: any*/),
        "viewer.me.order.paymentMethodDetails.last4": (v45/*: any*/),
        "viewer.me.order.paymentMethodDetails.lastDigits": (v45/*: any*/),
        "viewer.me.order.pendingOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Offer"
        },
        "viewer.me.order.pendingOffer.amount": (v52/*: any*/),
        "viewer.me.order.pendingOffer.amount.display": (v46/*: any*/),
        "viewer.me.order.pendingOffer.amount.major": (v58/*: any*/),
        "viewer.me.order.pendingOffer.amount.minor": (v53/*: any*/),
        "viewer.me.order.pendingOffer.id": (v47/*: any*/),
        "viewer.me.order.pendingOffer.internalID": (v47/*: any*/),
        "viewer.me.order.pendingOffer.note": (v46/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines": (v60/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.__typename": (v45/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.amount": (v52/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.amount.amount": (v46/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.amount.currencyCode": (v45/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.amount.currencySymbol": (v46/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.amount.display": (v46/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.amountFallbackText": (v46/*: any*/),
        "viewer.me.order.pendingOffer.pricingBreakdownLines.displayName": (v45/*: any*/),
        "viewer.me.order.pricingBreakdownLines": (v60/*: any*/),
        "viewer.me.order.pricingBreakdownLines.__typename": (v45/*: any*/),
        "viewer.me.order.pricingBreakdownLines.amount": (v52/*: any*/),
        "viewer.me.order.pricingBreakdownLines.amount.amount": (v46/*: any*/),
        "viewer.me.order.pricingBreakdownLines.amount.currencySymbol": (v46/*: any*/),
        "viewer.me.order.pricingBreakdownLines.amount.display": (v46/*: any*/),
        "viewer.me.order.pricingBreakdownLines.amountFallbackText": (v46/*: any*/),
        "viewer.me.order.pricingBreakdownLines.displayName": (v45/*: any*/),
        "viewer.me.order.selectedFulfillmentOption": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FulfillmentOption"
        },
        "viewer.me.order.selectedFulfillmentOption.amount": (v52/*: any*/),
        "viewer.me.order.selectedFulfillmentOption.amount.display": (v46/*: any*/),
        "viewer.me.order.selectedFulfillmentOption.type": (v55/*: any*/),
        "viewer.me.order.seller": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SellerType"
        },
        "viewer.me.order.seller.__isNode": (v45/*: any*/),
        "viewer.me.order.seller.__typename": (v45/*: any*/),
        "viewer.me.order.seller.id": (v47/*: any*/),
        "viewer.me.order.seller.merchantAccount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerMerchantAccount"
        },
        "viewer.me.order.seller.merchantAccount.externalId": (v45/*: any*/),
        "viewer.me.order.shippingOrigin": (v46/*: any*/),
        "viewer.me.order.shippingTotal": (v52/*: any*/),
        "viewer.me.order.shippingTotal.display": (v46/*: any*/),
        "viewer.me.order.shippingTotal.minor": (v53/*: any*/),
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
        "viewer.me.order.stripeConfirmationToken": (v46/*: any*/),
        "viewer.me.order.taxTotal": (v52/*: any*/),
        "viewer.me.order.taxTotal.display": (v46/*: any*/),
        "viewer.me.order.taxTotal.minor": (v53/*: any*/)
      }
    },
    "name": "Order2PaymentCompletedViewTestQuery",
    "operationKind": "query",
    "text": "query Order2PaymentCompletedViewTestQuery {\n  viewer {\n    ...Order2CheckoutRoute_viewer_oauVf\n  }\n}\n\nfragment Order2CheckoutApp_me on Me {\n  ...Order2PaymentStep_me\n  ...Order2FulfillmentDetailsStep_me\n}\n\nfragment Order2CheckoutApp_order on Order {\n  internalID\n  mode\n  selectedFulfillmentOption {\n    type\n  }\n  lineItems {\n    artwork {\n      slug\n      isFixedShippingFeeOnly\n      id\n    }\n    id\n  }\n  ...useLoadCheckout_order\n  ...Order2ExpressCheckout_order\n  ...Order2CollapsibleOrderSummary_order\n  ...Order2OfferStep_order\n  ...Order2FulfillmentDetailsStep_order\n  ...Order2DeliveryOptionsStep_order\n  ...Order2PaymentStep_order\n  ...Order2ReviewStep_order\n  ...Order2CheckoutLoadingSkeleton_order\n  ...Order2HelpLinks_order\n}\n\nfragment Order2CheckoutContext_order on Order {\n  ...useBuildInitialSteps_order\n  internalID\n  mode\n  source\n  stripeConfirmationToken\n  selectedFulfillmentOption {\n    type\n  }\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutLoadingSkeleton_order on Order {\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  lineItems {\n    artworkVersion {\n      title\n      artistNames\n      date\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutPricingBreakdown_order on Order {\n  source\n  mode\n  buyerStateExpiresAt\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n  pendingOffer {\n    pricingBreakdownLines {\n      __typename\n      ... on ShippingLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TaxLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on SubtotalLine {\n        displayName\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TotalLine {\n        displayName\n        amountFallbackText\n        amount {\n          display\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutRoute_viewer_oauVf on Viewer {\n  me {\n    ...Order2CheckoutApp_me\n    order(id: \"order-id\") {\n      internalID\n      ...Order2CheckoutContext_order\n      ...Order2CheckoutApp_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CollapsibleOrderSummary_order on Order {\n  ...Order2CheckoutPricingBreakdown_order\n  source\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  shippingTotal {\n    display\n  }\n  taxTotal {\n    display\n  }\n  lineItems {\n    artworkVersion {\n      title\n      artistNames\n      date\n      thumbnail: image {\n        url\n        resizedSquare: resized(height: 200, version: [\"square\"]) {\n          url\n        }\n      }\n      id\n    }\n    artwork {\n      figures(includeAll: false) {\n        __typename\n        ... on Image {\n          resizedSquare: resized(height: 200, version: [\"square\"]) {\n            url\n          }\n        }\n        ... on Video {\n          id\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Order2DeliveryForm_me on Me {\n  addressConnection(first: 20) {\n    edges {\n      node {\n        internalID\n        addressLine1\n        addressLine2\n        city\n        region\n        postalCode\n        country\n        name\n        phoneNumber\n        phoneNumberCountryCode\n        phoneNumberParsed {\n          display(format: INTERNATIONAL)\n        }\n        isDefault\n        id\n      }\n    }\n  }\n}\n\nfragment Order2DeliveryForm_order on Order {\n  internalID\n  selectedFulfillmentOption {\n    type\n  }\n  availableShippingCountries\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    region\n    postalCode\n    country\n    name\n    phoneNumber {\n      originalNumber\n      regionCode\n      countryCode\n    }\n  }\n}\n\nfragment Order2DeliveryOptionsForm_order on Order {\n  internalID\n  fulfillmentOptions {\n    amount {\n      display\n    }\n    type\n    selected\n  }\n}\n\nfragment Order2DeliveryOptionsStep_order on Order {\n  ...useCompleteDeliveryOptionData_order\n  ...Order2DeliveryOptionsForm_order\n  internalID\n  selectedFulfillmentOption {\n    type\n    amount {\n      display\n    }\n  }\n}\n\nfragment Order2ExpressCheckoutUI_order on Order {\n  internalID\n  source\n  mode\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n  }\n  shippingTotal {\n    minor\n  }\n  taxTotal {\n    minor\n  }\n  availableShippingCountries\n  fulfillmentOptions {\n    type\n    amount {\n      minor\n      currencyCode\n    }\n    selected\n  }\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    name\n  }\n  lineItems {\n    artwork {\n      internalID\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment Order2ExpressCheckout_order on Order {\n  ...Order2ExpressCheckoutUI_order\n  availableShippingCountries\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Order2FulfillmentDetailsStep_me on Me {\n  ...Order2DeliveryForm_me\n}\n\nfragment Order2FulfillmentDetailsStep_order on Order {\n  ...useCompleteFulfillmentDetailsData_order\n  ...Order2PickupForm_order\n  ...Order2DeliveryForm_order\n  id\n  fulfillmentDetails {\n    phoneNumber {\n      countryCode\n      regionCode\n      originalNumber\n      display(format: INTERNATIONAL)\n    }\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  fulfillmentOptions {\n    type\n    selected\n  }\n  availableShippingCountries\n}\n\nfragment Order2HelpLinks_order on Order {\n  internalID\n  mode\n  source\n}\n\nfragment Order2OfferOptions_order on Order {\n  currencyCode\n  lineItems {\n    listPrice {\n      __typename\n      major\n    }\n    artworkOrEditionSet {\n      __typename\n      ... on Artwork {\n        listPrice {\n          __typename\n          ... on PriceRange {\n            maxPrice {\n              major\n            }\n            minPrice {\n              major\n            }\n          }\n        }\n      }\n      ... on EditionSet {\n        listPrice {\n          __typename\n          ... on PriceRange {\n            maxPrice {\n              major\n            }\n            minPrice {\n              major\n            }\n          }\n        }\n        id\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment Order2OfferStep_order on Order {\n  ...useCompleteOfferData_order\n  ...Order2OfferOptions_order\n  internalID\n  mode\n  source\n  currencyCode\n  selectedFulfillmentOption {\n    type\n  }\n  pendingOffer {\n    amount {\n      display\n      major\n    }\n    note\n    id\n  }\n  lineItems {\n    artwork {\n      slug\n      priceDisplay\n      isPriceRange\n      isPriceHidden\n      listPrice {\n        __typename\n        ... on Money {\n          major\n        }\n        ... on PriceRange {\n          maxPrice {\n            major\n          }\n          minPrice {\n            major\n          }\n        }\n      }\n      editionSets {\n        internalID\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Order2PaymentCompletedView_order on Order {\n  paymentMethod\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      brand\n      lastDigits\n      expirationYear\n      expirationMonth\n      id\n    }\n    ... on BankAccount {\n      last4\n      bankName\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n}\n\nfragment Order2PaymentForm_me on Me {\n  creditCards(first: 10) {\n    edges {\n      node {\n        __typename\n        internalID\n        brand\n        lastDigits\n        expirationYear\n        expirationMonth\n        id\n      }\n    }\n  }\n  bankAccounts(first: 10) {\n    edges {\n      node {\n        __typename\n        type\n        internalID\n        last4\n        bankName\n        id\n      }\n    }\n  }\n}\n\nfragment Order2PaymentForm_order on Order {\n  code\n  mode\n  source\n  internalID\n  currencyCode\n  availablePaymentMethods\n  bankAccountBalanceCheck {\n    result\n    message\n  }\n  pendingOffer {\n    pricingBreakdownLines {\n      __typename\n      ... on TotalLine {\n        amount {\n          amount\n          currencyCode\n        }\n      }\n    }\n    id\n  }\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  fulfillmentDetails {\n    name\n    addressLine1\n    addressLine2\n    city\n    region\n    postalCode\n    country\n  }\n  lineItems {\n    artwork {\n      href\n      artworkMeta: meta {\n        share\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Order2PaymentStep_me on Me {\n  ...Order2PaymentForm_me\n}\n\nfragment Order2PaymentStep_order on Order {\n  ...useCompletePaymentData_order\n  ...Order2PaymentForm_order\n  ...Order2PaymentCompletedView_order\n  internalID\n  paymentMethod\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      internalID\n      id\n    }\n    ... on BankAccount {\n      internalID\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  shippingTotal {\n    minor\n  }\n  taxTotal {\n    minor\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Order2PickupForm_order on Order {\n  internalID\n  fulfillmentOptions {\n    type\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  fulfillmentDetails {\n    phoneNumber {\n      countryCode\n      regionCode\n      originalNumber\n    }\n  }\n  shippingOrigin\n}\n\nfragment Order2ReviewStep_order on Order {\n  ...Order2CheckoutPricingBreakdown_order\n  internalID\n  mode\n  source\n  stripeConfirmationToken\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  shippingTotal {\n    display\n  }\n  taxTotal {\n    display\n  }\n  lineItems {\n    artworkOrEditionSet {\n      __typename\n      ... on Artwork {\n        price\n        dimensions {\n          in\n          cm\n        }\n      }\n      ... on EditionSet {\n        price\n        dimensions {\n          in\n          cm\n        }\n        id\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    artworkVersion {\n      title\n      artistNames\n      date\n      attributionClass {\n        shortDescription\n        id\n      }\n      image {\n        url\n        resized(width: 185, height: 138) {\n          url\n        }\n      }\n      id\n    }\n    artwork {\n      figures(includeAll: false) {\n        __typename\n        ... on Image {\n          resized(width: 185, height: 138) {\n            url\n          }\n        }\n        ... on Video {\n          id\n        }\n      }\n      id\n    }\n    id\n  }\n  pendingOffer {\n    internalID\n    id\n  }\n}\n\nfragment useBuildInitialSteps_order on Order {\n  ...useCompleteOfferData_order\n  ...useCompleteFulfillmentDetailsData_order\n  ...useCompleteDeliveryOptionData_order\n  ...useCompletePaymentData_order\n  mode\n  selectedFulfillmentOption {\n    type\n  }\n}\n\nfragment useCompleteDeliveryOptionData_order on Order {\n  selectedFulfillmentOption {\n    type\n  }\n}\n\nfragment useCompleteFulfillmentDetailsData_order on Order {\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n    phoneNumber {\n      display(format: INTERNATIONAL)\n    }\n  }\n  selectedFulfillmentOption {\n    type\n  }\n}\n\nfragment useCompleteOfferData_order on Order {\n  mode\n  pendingOffer {\n    note\n    amount {\n      minor\n      display\n    }\n    id\n  }\n}\n\nfragment useCompletePaymentData_order on Order {\n  paymentMethod\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      internalID\n      id\n    }\n    ... on BankAccount {\n      internalID\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n}\n\nfragment useLoadCheckout_order on Order {\n  internalID\n  lineItems {\n    artwork {\n      isAcquireable\n      id\n    }\n    artworkVersion {\n      internalID\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "93a6ca75292d3f271355ead5d7d43ceb";

export default node;
