/**
 * @generated SignedSource<<1368ea6744b67a19f23e47333d97f3a9>>
 * @relayHash 04eb65e8e71c48f3bbaeb023379fb57e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 04eb65e8e71c48f3bbaeb023379fb57e

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderDisplayStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_TRANSIT" | "PAYMENT_FAILED" | "PENDING" | "PROCESSING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderSourceEnum = "artwork_page" | "inquiry" | "partner_offer" | "private_sale" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommercePaymentMethodEnum = "CREDIT_CARD" | "SEPA_DEBIT" | "US_BANK_ACCOUNT" | "WIRE_TRANSFER" | "%future added value";
export type orderRoutes_OrderQuery$variables = {
  orderID: string;
};
export type orderRoutes_OrderQuery$data = {
  readonly me: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly order: {
    readonly awaitingResponseFrom?: CommerceOrderParticipantEnum | null | undefined;
    readonly bankAccountId: string | null | undefined;
    readonly creditCard: {
      readonly internalID: string;
    } | null | undefined;
    readonly displayState: CommerceOrderDisplayStateEnum;
    readonly internalID: string;
    readonly lastOffer?: {
      readonly createdAt: string;
      readonly internalID: string;
    } | null | undefined;
    readonly lastTransactionFailed: boolean | null | undefined;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly slug: string;
          } | null | undefined;
          readonly shippingQuoteOptions: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly isSelected: boolean;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly mode: CommerceOrderModeEnum | null | undefined;
    readonly myLastOffer?: {
      readonly createdAt: string;
      readonly internalID: string;
    } | null | undefined;
    readonly paymentMethod: CommercePaymentMethodEnum | null | undefined;
    readonly paymentMethodDetails: {
      readonly __typename: "BankAccount";
      readonly id: string;
    } | {
      readonly __typename: "CreditCard";
      readonly id: string;
    } | {
      readonly __typename: "WireTransfer";
      readonly isManualPayment: boolean;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
    readonly paymentSet: boolean;
    readonly requestedFulfillment: {
      readonly __typename: string;
    } | null | undefined;
    readonly source: CommerceOrderSourceEnum;
    readonly state: CommerceOrderStateEnum;
    readonly " $fragmentSpreads": FragmentRefs<"OrderApp_order">;
  } | null | undefined;
};
export type orderRoutes_OrderQuery$rawResponse = {
  readonly me: {
    readonly id: string;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly order: {
    readonly __typename: "CommerceOfferOrder";
    readonly __isCommerceOrder: "CommerceOfferOrder";
    readonly awaitingResponseFrom: CommerceOrderParticipantEnum | null | undefined;
    readonly bankAccountId: string | null | undefined;
    readonly creditCard: {
      readonly id: string;
      readonly internalID: string;
    } | null | undefined;
    readonly currencyCode: string;
    readonly displayState: CommerceOrderDisplayStateEnum;
    readonly id: string;
    readonly internalID: string;
    readonly itemsTotalCents: number | null | undefined;
    readonly lastOffer: {
      readonly createdAt: string;
      readonly id: string;
      readonly internalID: string;
    } | null | undefined;
    readonly lastTransactionFailed: boolean | null | undefined;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly href: string | null | undefined;
            readonly id: string;
            readonly is_acquireable: boolean | null | undefined;
            readonly is_offerable: boolean | null | undefined;
            readonly slug: string;
          } | null | undefined;
          readonly id: string;
          readonly shippingQuoteOptions: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly id: string;
                readonly isSelected: boolean;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly mode: CommerceOrderModeEnum | null | undefined;
    readonly myLastOffer: {
      readonly createdAt: string;
      readonly id: string;
      readonly internalID: string;
    } | null | undefined;
    readonly paymentMethod: CommercePaymentMethodEnum | null | undefined;
    readonly paymentMethodDetails: {
      readonly __typename: "BankAccount";
      readonly id: string;
    } | {
      readonly __typename: "CreditCard";
      readonly id: string;
    } | {
      readonly __typename: "WireTransfer";
      readonly isManualPayment: boolean;
    } | {
      readonly __typename: string;
    } | null | undefined;
    readonly paymentSet: boolean;
    readonly requestedFulfillment: {
      readonly __typename: string;
    } | null | undefined;
    readonly source: CommerceOrderSourceEnum;
    readonly state: CommerceOrderStateEnum;
  } | {
    readonly __typename: string;
    readonly __isCommerceOrder: string;
    readonly bankAccountId: string | null | undefined;
    readonly creditCard: {
      readonly id: string;
      readonly internalID: string;
    } | null | undefined;
    readonly currencyCode: string;
    readonly displayState: CommerceOrderDisplayStateEnum;
    readonly id: string;
    readonly internalID: string;
    readonly itemsTotalCents: number | null | undefined;
    readonly lastTransactionFailed: boolean | null | undefined;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly href: string | null | undefined;
            readonly id: string;
            readonly is_acquireable: boolean | null | undefined;
            readonly is_offerable: boolean | null | undefined;
            readonly slug: string;
          } | null | undefined;
          readonly id: string;
          readonly shippingQuoteOptions: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly id: string;
                readonly isSelected: boolean;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly mode: CommerceOrderModeEnum | null | undefined;
    readonly paymentMethod: CommercePaymentMethodEnum | null | undefined;
    readonly paymentMethodDetails: {
      readonly __typename: "BankAccount";
      readonly id: string;
    } | {
      readonly __typename: "CreditCard";
      readonly id: string;
    } | {
      readonly __typename: "WireTransfer";
      readonly isManualPayment: boolean;
    } | {
      readonly __typename: string;
    } | null | undefined;
    readonly paymentSet: boolean;
    readonly requestedFulfillment: {
      readonly __typename: string;
    } | null | undefined;
    readonly source: CommerceOrderSourceEnum;
    readonly state: CommerceOrderStateEnum;
  } | null | undefined;
};
export type orderRoutes_OrderQuery = {
  rawResponse: orderRoutes_OrderQuery$rawResponse;
  response: orderRoutes_OrderQuery$data;
  variables: orderRoutes_OrderQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "orderID"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "orderID"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bankAccountId",
  "storageKey": null
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
  "name": "mode",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayState",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "source",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastTransactionFailed",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "paymentSet",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v12 = [
  (v4/*: any*/),
  (v11/*: any*/)
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awaitingResponseFrom",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "requestedFulfillment",
  "plural": false,
  "selections": [
    (v14/*: any*/)
  ],
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSelected",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "paymentMethod",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v20 = [
  (v19/*: any*/)
],
v21 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "paymentMethodDetails",
  "plural": false,
  "selections": [
    (v14/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": (v20/*: any*/),
      "type": "CreditCard",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v20/*: any*/),
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
v22 = [
  (v4/*: any*/),
  (v11/*: any*/),
  (v19/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "orderRoutes_OrderQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "order",
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "myLastOffer",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "lastOffer",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": null
              },
              (v13/*: any*/)
            ],
            "type": "CommerceOfferOrder",
            "abstractKey": null
          },
          (v15/*: any*/),
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
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "artwork",
                        "plural": false,
                        "selections": [
                          (v16/*: any*/)
                        ],
                        "storageKey": null
                      },
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
                                  (v17/*: any*/)
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CreditCard",
            "kind": "LinkedField",
            "name": "creditCard",
            "plural": false,
            "selections": [
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v18/*: any*/),
          (v21/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "OrderApp_order"
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
    "name": "orderRoutes_OrderQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v19/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "order",
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          (v14/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "myLastOffer",
                "plural": false,
                "selections": (v22/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "lastOffer",
                "plural": false,
                "selections": (v22/*: any*/),
                "storageKey": null
              },
              (v13/*: any*/)
            ],
            "type": "CommerceOfferOrder",
            "abstractKey": null
          },
          (v15/*: any*/),
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
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "artwork",
                        "plural": false,
                        "selections": [
                          (v16/*: any*/),
                          (v19/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "href",
                            "storageKey": null
                          },
                          {
                            "alias": "is_acquireable",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isAcquireable",
                            "storageKey": null
                          },
                          {
                            "alias": "is_offerable",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isOfferable",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
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
                                  (v17/*: any*/),
                                  (v19/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v19/*: any*/)
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
            "concreteType": "CreditCard",
            "kind": "LinkedField",
            "name": "creditCard",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v19/*: any*/)
            ],
            "storageKey": null
          },
          (v18/*: any*/),
          (v21/*: any*/),
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
            "name": "itemsTotalCents",
            "storageKey": null
          },
          (v19/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "04eb65e8e71c48f3bbaeb023379fb57e",
    "metadata": {},
    "name": "orderRoutes_OrderQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "9bdd79b212bd6b969f744c45247c5933";

export default node;
