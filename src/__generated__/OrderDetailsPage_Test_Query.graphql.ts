/**
 * @generated SignedSource<<c911958c61d8103c229020c7d896e5ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DisplayTextsMessageTypeEnum = "APPROVED_PICKUP" | "APPROVED_SHIP" | "APPROVED_SHIP_EXPRESS" | "APPROVED_SHIP_STANDARD" | "APPROVED_SHIP_WHITE_GLOVE" | "CANCELED" | "COMPLETED_PICKUP" | "COMPLETED_SHIP" | "DECLINED_BY_BUYER" | "DECLINED_BY_SELLER" | "PAYMENT_FAILED" | "PROCESSING_PAYMENT_PICKUP" | "PROCESSING_PAYMENT_SHIP" | "PROCESSING_WIRE" | "REFUNDED" | "SHIPPED" | "SUBMITTED_OFFER" | "SUBMITTED_ORDER" | "UNKNOWN" | "%future added value";
export type FulfillmentOptionTypeEnum = "ARTSY_EXPRESS" | "ARTSY_STANDARD" | "ARTSY_WHITE_GLOVE" | "DOMESTIC_FLAT" | "INTERNATIONAL_FLAT" | "PICKUP" | "SHIPPING_TBD" | "%future added value";
export type OrderCreditCardWalletTypeEnum = "APPLE_PAY" | "GOOGLE_PAY" | "%future added value";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type OrderSourceEnum = "ARTWORK_PAGE" | "INQUIRY" | "PARTNER_OFFER" | "PRIVATE_SALE" | "%future added value";
export type OrderDetailsPage_Test_Query$variables = Record<PropertyKey, never>;
export type OrderDetailsPage_Test_Query$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"OrderDetailsPage_order">;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"OrderDetailsPage_me">;
  } | null | undefined;
};
export type OrderDetailsPage_Test_Query$rawResponse = {
  readonly me: {
    readonly collectorProfile: {
      readonly bio: string | null | undefined;
      readonly id: string;
      readonly isEmailConfirmed: boolean | null | undefined;
      readonly isIdentityVerified: boolean | null | undefined;
      readonly location: {
        readonly country: string | null | undefined;
        readonly id: string;
      } | null | undefined;
      readonly otherRelevantPositions: string | null | undefined;
      readonly profession: string | null | undefined;
    } | null | undefined;
    readonly id: string;
    readonly order: {
      readonly buyerStateExpiresAt: string | null | undefined;
      readonly code: string;
      readonly creditCardWalletType: OrderCreditCardWalletTypeEnum | null | undefined;
      readonly currencyCode: string;
      readonly deliveryInfo: {
        readonly estimatedDelivery: string | null | undefined;
        readonly estimatedDeliveryWindow: string | null | undefined;
        readonly shipperName: string | null | undefined;
        readonly trackingNumber: string | null | undefined;
        readonly trackingURL: string | null | undefined;
      } | null | undefined;
      readonly displayTexts: {
        readonly messageType: DisplayTextsMessageTypeEnum;
        readonly title: string;
      };
      readonly fulfillmentDetails: {
        readonly addressLine1: string | null | undefined;
        readonly addressLine2: string | null | undefined;
        readonly city: string | null | undefined;
        readonly country: string | null | undefined;
        readonly name: string | null | undefined;
        readonly phoneNumber: {
          readonly display: string | null | undefined;
        } | null | undefined;
        readonly postalCode: string | null | undefined;
        readonly region: string | null | undefined;
      } | null | undefined;
      readonly id: string;
      readonly impulseConversationId: string | null | undefined;
      readonly internalID: string;
      readonly itemsTotal: {
        readonly display: string | null | undefined;
      } | null | undefined;
      readonly lineItems: ReadonlyArray<{
        readonly artwork: {
          readonly id: string;
          readonly partner: {
            readonly id: string;
            readonly name: string | null | undefined;
          } | null | undefined;
          readonly published: boolean;
          readonly slug: string;
        } | null | undefined;
        readonly artworkOrEditionSet: {
          readonly __typename: "Artwork";
          readonly __isNode: "Artwork";
          readonly dimensions: {
            readonly cm: string | null | undefined;
            readonly in: string | null | undefined;
          } | null | undefined;
          readonly id: string;
          readonly price: string | null | undefined;
        } | {
          readonly __typename: "EditionSet";
          readonly __isNode: "EditionSet";
          readonly dimensions: {
            readonly cm: string | null | undefined;
            readonly in: string | null | undefined;
          } | null | undefined;
          readonly id: string;
          readonly price: string | null | undefined;
        } | {
          readonly __typename: string;
          readonly __isNode: string;
          readonly id: string;
        } | null | undefined;
        readonly artworkVersion: {
          readonly artistNames: string | null | undefined;
          readonly attributionClass: {
            readonly id: string;
            readonly shortDescription: string | null | undefined;
          } | null | undefined;
          readonly date: string | null | undefined;
          readonly id: string;
          readonly image: {
            readonly resized: {
              readonly height: number | null | undefined;
              readonly url: string;
              readonly width: number | null | undefined;
            } | null | undefined;
          } | null | undefined;
          readonly title: string | null | undefined;
        } | null | undefined;
        readonly id: string;
      } | null | undefined>;
      readonly mode: OrderModeEnum;
      readonly paymentMethodDetails: {
        readonly __typename: "BankAccount";
        readonly id: string;
        readonly last4: string;
      } | {
        readonly __typename: "CreditCard";
        readonly brand: string;
        readonly expirationMonth: number;
        readonly expirationYear: number;
        readonly id: string;
        readonly lastDigits: string;
      } | {
        readonly __typename: "WireTransfer";
        readonly isManualPayment: boolean;
      } | {
        readonly __typename: string;
      } | null | undefined;
      readonly pricingBreakdownLines: ReadonlyArray<{
        readonly __typename: "ShippingLine";
        readonly amount: {
          readonly amount: string | null | undefined;
          readonly currencySymbol: string | null | undefined;
        } | null | undefined;
        readonly amountFallbackText: string | null | undefined;
        readonly displayName: string;
      } | {
        readonly __typename: "SubtotalLine";
        readonly amount: {
          readonly amount: string | null | undefined;
          readonly currencySymbol: string | null | undefined;
        } | null | undefined;
        readonly displayName: string;
      } | {
        readonly __typename: "TaxLine";
        readonly amount: {
          readonly amount: string | null | undefined;
          readonly currencySymbol: string | null | undefined;
        } | null | undefined;
        readonly amountFallbackText: string | null | undefined;
        readonly displayName: string;
      } | {
        readonly __typename: "TotalLine";
        readonly amount: {
          readonly display: string | null | undefined;
        } | null | undefined;
        readonly amountFallbackText: string | null | undefined;
        readonly displayName: string;
      } | {
        readonly __typename: string;
      } | null | undefined>;
      readonly selectedFulfillmentOption: {
        readonly type: FulfillmentOptionTypeEnum;
      } | null | undefined;
      readonly shippingOrigin: string | null | undefined;
      readonly shippingTotal: {
        readonly display: string | null | undefined;
      } | null | undefined;
      readonly source: OrderSourceEnum;
      readonly taxTotal: {
        readonly display: string | null | undefined;
      } | null | undefined;
      readonly totalListPrice: {
        readonly display: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type OrderDetailsPage_Test_Query = {
  rawResponse: OrderDetailsPage_Test_Query$rawResponse;
  response: OrderDetailsPage_Test_Query$data;
  variables: OrderDetailsPage_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "123"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v6 = {
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v10 = {
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
v11 = [
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/)
],
v12 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "OrderDetailsPage_Test_Query",
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
            "name": "OrderDetailsPage_me"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "OrderDetailsPage_order"
              }
            ],
            "storageKey": "order(id:\"123\")"
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
    "name": "OrderDetailsPage_Test_Query",
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
            "concreteType": "CollectorProfileType",
            "kind": "LinkedField",
            "name": "collectorProfile",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isEmailConfirmed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "MyLocation",
                "kind": "LinkedField",
                "name": "location",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "profession",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isIdentityVerified",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "otherRelevantPositions",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "bio",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
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
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "published",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "artworkOrEditionSet",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v5/*: any*/),
                          (v6/*: any*/)
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v2/*: any*/)
                        ],
                        "type": "EditionSet",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/)
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
                      (v7/*: any*/),
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
                          (v2/*: any*/)
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
                                "value": 360
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 700
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
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "width",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "height",
                                "storageKey": null
                              }
                            ],
                            "storageKey": "resized(height:360,width:700)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
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
                "concreteType": "DisplayTexts",
                "kind": "LinkedField",
                "name": "displayTexts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "messageType",
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
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
                "name": "buyerStateExpiresAt",
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
                "name": "internalID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "impulseConversationId",
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
                    "name": "shipperName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "trackingNumber",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "trackingURL",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "estimatedDelivery",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "estimatedDeliveryWindow",
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
                  (v4/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": (v11/*: any*/),
                    "type": "ShippingLine",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v11/*: any*/),
                    "type": "TaxLine",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v8/*: any*/),
                      (v10/*: any*/)
                    ],
                    "type": "SubtotalLine",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v8/*: any*/),
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "amount",
                        "plural": false,
                        "selections": (v12/*: any*/),
                        "storageKey": null
                      }
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
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "totalListPrice",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "itemsTotal",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "shippingTotal",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "taxTotal",
                "plural": false,
                "selections": (v12/*: any*/),
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
                "concreteType": null,
                "kind": "LinkedField",
                "name": "paymentMethodDetails",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
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
                      (v2/*: any*/)
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
                      (v2/*: any*/)
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
                  (v1/*: any*/),
                  (v3/*: any*/),
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
              (v2/*: any*/)
            ],
            "storageKey": "order(id:\"123\")"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "261d0562f09ba303c7201a8fb7250907",
    "id": null,
    "metadata": {},
    "name": "OrderDetailsPage_Test_Query",
    "operationKind": "query",
    "text": "query OrderDetailsPage_Test_Query {\n  me {\n    ...OrderDetailsPage_me\n    order(id: \"123\") {\n      ...OrderDetailsPage_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2HelpLinks_order on Order {\n  internalID\n  mode\n  source\n}\n\nfragment OrderDetailsFulfillmentInfo_order on Order {\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n    phoneNumber {\n      display(format: INTERNATIONAL)\n    }\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  shippingOrigin\n}\n\nfragment OrderDetailsHeader_order on Order {\n  code\n  displayTexts {\n    title\n  }\n}\n\nfragment OrderDetailsMessage_me on Me {\n  collectorProfile {\n    isEmailConfirmed\n    location {\n      country\n      id\n    }\n    profession\n    isIdentityVerified\n    otherRelevantPositions\n    bio\n    id\n  }\n}\n\nfragment OrderDetailsMessage_order on Order {\n  buyerStateExpiresAt\n  code\n  currencyCode\n  internalID\n  impulseConversationId\n  displayTexts {\n    messageType\n  }\n  deliveryInfo {\n    shipperName\n    trackingNumber\n    trackingURL\n    estimatedDelivery\n    estimatedDeliveryWindow\n  }\n  source\n  mode\n}\n\nfragment OrderDetailsOrderSummary_order on Order {\n  ...OrderDetailsPricingBreakdown_order\n  source\n  mode\n  totalListPrice {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  shippingTotal {\n    display\n  }\n  taxTotal {\n    display\n  }\n  lineItems {\n    artwork {\n      slug\n      published\n      partner {\n        name\n        id\n      }\n      id\n    }\n    artworkOrEditionSet {\n      __typename\n      ... on Artwork {\n        price\n        dimensions {\n          in\n          cm\n        }\n      }\n      ... on EditionSet {\n        price\n        dimensions {\n          in\n          cm\n        }\n        id\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    artworkVersion {\n      title\n      artistNames\n      date\n      attributionClass {\n        shortDescription\n        id\n      }\n      image {\n        resized(height: 360, width: 700) {\n          url\n          width\n          height\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment OrderDetailsPage_me on Me {\n  ...OrderDetailsMessage_me\n}\n\nfragment OrderDetailsPage_order on Order {\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    id\n  }\n  mode\n  source\n  displayTexts {\n    messageType\n  }\n  ...OrderDetailsHeader_order\n  ...OrderDetailsMessage_order\n  ...OrderDetailsOrderSummary_order\n  ...OrderDetailsPricingBreakdown_order\n  ...OrderDetailsPaymentInfo_order\n  ...OrderDetailsFulfillmentInfo_order\n  ...Order2HelpLinks_order\n}\n\nfragment OrderDetailsPaymentInfo_order on Order {\n  creditCardWalletType\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      brand\n      lastDigits\n      expirationYear\n      expirationMonth\n      id\n    }\n    ... on BankAccount {\n      last4\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n}\n\nfragment OrderDetailsPricingBreakdown_order on Order {\n  mode\n  source\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d116dc001837d93993a2970a17fc9158";

export default node;
