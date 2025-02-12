/**
 * @generated SignedSource<<10b37b2247ee4996fdcdb8cb9dfe4df6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderFulfillmentTypeEnum = "PICKUP" | "SHIP" | "SHIP_ARTA" | "%future added value";
export type CommerceShippingAddressVerifiedByEnum = "ARTSY" | "USER" | "%future added value";
export type CommerceSetShippingInput = {
  addressVerifiedBy?: CommerceShippingAddressVerifiedByEnum | null | undefined;
  clientMutationId?: string | null | undefined;
  fulfillmentType: CommerceOrderFulfillmentTypeEnum;
  id: string;
  phoneNumber?: string | null | undefined;
  phoneNumberCountryCode?: string | null | undefined;
  shipping?: CommerceShippingAttributes | null | undefined;
};
export type CommerceShippingAttributes = {
  addressLine1?: string | null | undefined;
  addressLine2?: string | null | undefined;
  city?: string | null | undefined;
  country?: string | null | undefined;
  name?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  postalCode?: string | null | undefined;
  region?: string | null | undefined;
};
export type useSaveFulfillmentDetailsMutation$variables = {
  input: CommerceSetShippingInput;
};
export type useSaveFulfillmentDetailsMutation$data = {
  readonly commerceSetShipping: {
    readonly orderOrError: {
      readonly __typename: "CommerceOrderRequiresAction";
      readonly __typename: "CommerceOrderRequiresAction";
    } | {
      readonly __typename: "CommerceOrderWithMutationFailure";
      readonly error: {
        readonly code: string;
        readonly data: string | null | undefined;
        readonly type: string;
      };
    } | {
      readonly __typename: "CommerceOrderWithMutationSuccess";
      readonly order: {
        readonly __typename: string;
        readonly internalID: string;
        readonly lineItems: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly shippingQuoteOptions: {
                readonly edges: ReadonlyArray<{
                  readonly node: {
                    readonly id: string;
                    readonly isSelected: boolean;
                    readonly name: string | null | undefined;
                    readonly tier: string;
                  } | null | undefined;
                } | null | undefined> | null | undefined;
              } | null | undefined;
            } | null | undefined;
          } | null | undefined> | null | undefined;
        } | null | undefined;
        readonly shippingTotalCents: number | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"Shipping_order">;
      };
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
  } | null | undefined;
};
export type useSaveFulfillmentDetailsMutation = {
  response: useSaveFulfillmentDetailsMutation$data;
  variables: useSaveFulfillmentDetailsMutation$variables;
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
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shippingTotalCents",
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
  "name": "isSelected",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tier",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v10 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceApplicationError",
      "kind": "LinkedField",
      "name": "error",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        (v9/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "data",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceOrderWithMutationFailure",
  "abstractKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phoneNumber",
  "storageKey": null
},
v12 = [
  (v8/*: any*/),
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
    "name": "postalCode",
    "storageKey": null
  },
  (v11/*: any*/)
],
v13 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "typeName",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v16 = [
  (v5/*: any*/)
],
v17 = {
  "kind": "InlineFragment",
  "selections": (v16/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v18 = {
  "alias": null,
  "args": (v13/*: any*/),
  "kind": "ScalarField",
  "name": "shippingTotal",
  "storageKey": "shippingTotal(precision:2)"
},
v19 = {
  "alias": null,
  "args": (v13/*: any*/),
  "kind": "ScalarField",
  "name": "taxTotal",
  "storageKey": "taxTotal(precision:2)"
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "taxTotalCents",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": (v13/*: any*/),
  "kind": "ScalarField",
  "name": "buyerTotal",
  "storageKey": "buyerTotal(precision:2)"
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "buyerTotalCents",
  "storageKey": null
},
v23 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": (v13/*: any*/),
    "kind": "ScalarField",
    "name": "amount",
    "storageKey": "amount(precision:2)"
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "amountCents",
    "storageKey": null
  },
  (v18/*: any*/),
  (v4/*: any*/),
  (v19/*: any*/),
  (v20/*: any*/),
  (v21/*: any*/),
  (v22/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "fromParticipant",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "note",
    "storageKey": null
  },
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useSaveFulfillmentDetailsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceSetShippingPayload",
        "kind": "LinkedField",
        "name": "commerceSetShipping",
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
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v2/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "Shipping_order"
                      },
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommerceLineItemConnection",
                        "kind": "LinkedField",
                        "name": "lineItems",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceLineItemEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CommerceLineItem",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "CommerceShippingQuoteConnection",
                                    "kind": "LinkedField",
                                    "name": "shippingQuoteOptions",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "CommerceShippingQuoteEdge",
                                        "kind": "LinkedField",
                                        "name": "edges",
                                        "plural": true,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "CommerceShippingQuote",
                                            "kind": "LinkedField",
                                            "name": "node",
                                            "plural": false,
                                            "selections": [
                                              (v5/*: any*/),
                                              (v6/*: any*/),
                                              (v7/*: any*/),
                                              (v8/*: any*/)
                                            ],
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CommerceOrderWithMutationSuccess",
                "abstractKey": null
              },
              (v10/*: any*/)
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
    "name": "useSaveFulfillmentDetailsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceSetShippingPayload",
        "kind": "LinkedField",
        "name": "commerceSetShipping",
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
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v2/*: any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isCommerceOrder"
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
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "requestedFulfillment",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v11/*: any*/)
                            ],
                            "type": "CommercePickup",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v12/*: any*/),
                            "type": "CommerceShip",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v12/*: any*/),
                            "type": "CommerceShipArta",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommerceLineItemConnection",
                        "kind": "LinkedField",
                        "name": "lineItems",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceLineItemEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CommerceLineItem",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "CommerceShippingQuoteConnection",
                                    "kind": "LinkedField",
                                    "name": "shippingQuoteOptions",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "CommerceShippingQuoteEdge",
                                        "kind": "LinkedField",
                                        "name": "edges",
                                        "plural": true,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "CommerceShippingQuote",
                                            "kind": "LinkedField",
                                            "name": "node",
                                            "plural": false,
                                            "selections": [
                                              (v5/*: any*/),
                                              (v6/*: any*/),
                                              {
                                                "alias": null,
                                                "args": (v13/*: any*/),
                                                "kind": "ScalarField",
                                                "name": "price",
                                                "storageKey": "price(precision:2)"
                                              },
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "priceCents",
                                                "storageKey": null
                                              },
                                              (v14/*: any*/),
                                              (v8/*: any*/),
                                              (v7/*: any*/)
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
                                    "concreteType": "Artwork",
                                    "kind": "LinkedField",
                                    "name": "artwork",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "processWithArtsyShippingDomestic",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "artsyShippingInternational",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "onlyShipsDomestically",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "euShippingOrigin",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "shippingCountry",
                                        "storageKey": null
                                      },
                                      (v5/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "pickupAvailable",
                                        "storageKey": null
                                      },
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
                                        "name": "shippingOrigin",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "isUnlisted",
                                        "storageKey": null
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
                                      (v2/*: any*/),
                                      {
                                        "kind": "InlineFragment",
                                        "selections": [
                                          (v15/*: any*/)
                                        ],
                                        "type": "Artwork",
                                        "abstractKey": null
                                      },
                                      {
                                        "kind": "InlineFragment",
                                        "selections": [
                                          (v15/*: any*/),
                                          (v5/*: any*/)
                                        ],
                                        "type": "EditionSet",
                                        "abstractKey": null
                                      },
                                      (v17/*: any*/)
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
                                        "name": "date",
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
                                        "name": "title",
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
                                                "name": "width",
                                                "value": 185
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
                                            "storageKey": "resized(width:185)"
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      (v5/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "CommerceShippingQuote",
                                    "kind": "LinkedField",
                                    "name": "selectedShippingQuote",
                                    "plural": false,
                                    "selections": [
                                      (v14/*: any*/),
                                      (v5/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
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
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "sellerDetails",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v8/*: any*/)
                            ],
                            "type": "Partner",
                            "abstractKey": null
                          },
                          (v17/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "currencyCode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "source",
                        "storageKey": null
                      },
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "displayState",
                        "storageKey": null
                      },
                      (v18/*: any*/),
                      (v4/*: any*/),
                      (v19/*: any*/),
                      (v20/*: any*/),
                      {
                        "alias": null,
                        "args": (v13/*: any*/),
                        "kind": "ScalarField",
                        "name": "itemsTotal",
                        "storageKey": "itemsTotal(precision:2)"
                      },
                      (v21/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceOffer",
                            "kind": "LinkedField",
                            "name": "lastOffer",
                            "plural": false,
                            "selections": (v23/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceOffer",
                            "kind": "LinkedField",
                            "name": "myLastOffer",
                            "plural": false,
                            "selections": (v23/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "type": "CommerceOfferOrder",
                        "abstractKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "paymentSet",
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
                            "selections": (v16/*: any*/),
                            "type": "CreditCard",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v16/*: any*/),
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
                      (v22/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CommerceOrderWithMutationSuccess",
                "abstractKey": null
              },
              (v10/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e7a0aee0c6cbba46a2d928fac46d7de4",
    "id": null,
    "metadata": {},
    "name": "useSaveFulfillmentDetailsMutation",
    "operationKind": "mutation",
    "text": "mutation useSaveFulfillmentDetailsMutation(\n  $input: CommerceSetShippingInput!\n) {\n  commerceSetShipping(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationSuccess {\n        order {\n          internalID\n          __typename\n          ...Shipping_order\n          shippingTotalCents\n          lineItems {\n            edges {\n              node {\n                shippingQuoteOptions {\n                  edges {\n                    node {\n                      id\n                      isSelected\n                      tier\n                      name\n                    }\n                  }\n                }\n                id\n              }\n            }\n          }\n          id\n        }\n      }\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n      ... on CommerceOrderRequiresAction {\n        __typename\n      }\n    }\n  }\n}\n\nfragment ArtworkSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  sellerDetails {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  currencyCode\n  mode\n  source\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        artwork {\n          slug\n          shippingOrigin\n          isUnlisted\n          id\n        }\n        artworkVersion {\n          date\n          artistNames\n          title\n          image {\n            resized(width: 185) {\n              url\n            }\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ExpressCheckoutUI_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  mode\n  buyerTotalCents\n  requestedFulfillment {\n    __typename\n  }\n  currencyCode\n  shippingTotalCents\n  lineItems {\n    edges {\n      node {\n        artwork {\n          processWithArtsyShippingDomestic\n          artsyShippingInternational\n          euShippingOrigin\n          shippingCountry\n          onlyShipsDomestically\n          id\n        }\n        shippingQuoteOptions {\n          edges {\n            node {\n              name\n              priceCents\n              tier\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ExpressCheckout_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  ...ExpressCheckoutUI_order\n  buyerTotalCents\n  currencyCode\n}\n\nfragment FulfillmentDetailsForm_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  lineItems {\n    edges {\n      node {\n        artwork {\n          pickupAvailable\n          id\n        }\n        id\n      }\n    }\n  }\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n  ...OrderStepper_order\n}\n\nfragment OrderStepper_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  mode\n  paymentSet\n  requestedFulfillment {\n    __typename\n  }\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      id\n    }\n    ... on BankAccount {\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        shippingQuoteOptions {\n          edges {\n            node {\n              isSelected\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment SaveAndContinueButton_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n}\n\nfragment ShippingContext_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  mode\n  requestedFulfillment {\n    __typename\n    ... on CommercePickup {\n      phoneNumber\n    }\n    ... on CommerceShip {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n      phoneNumber\n    }\n    ... on CommerceShipArta {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n      phoneNumber\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        shippingQuoteOptions {\n          edges {\n            node {\n              id\n              isSelected\n            }\n          }\n        }\n        artwork {\n          processWithArtsyShippingDomestic\n          artsyShippingInternational\n          onlyShipsDomestically\n          euShippingOrigin\n          shippingCountry\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ShippingQuotes_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  lineItems {\n    edges {\n      node {\n        shippingQuoteOptions {\n          edges {\n            node {\n              id\n              isSelected\n              price(precision: 2)\n              priceCents\n              typeName\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment Shipping_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  ...ShippingContext_order\n  ...FulfillmentDetailsForm_order\n  ...SaveAndContinueButton_order\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n  ...OrderStepper_order\n  ...ShippingQuotes_order\n  ...ExpressCheckout_order\n  internalID\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  __typename\n  requestedFulfillment {\n    __typename\n  }\n  code\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        selectedShippingQuote {\n          typeName\n          id\n        }\n        id\n      }\n    }\n  }\n  mode\n  source\n  displayState\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  buyerTotal(precision: 2)\n  currencyCode\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3621cd0517261194bfb30089f6ef35f8";

export default node;
