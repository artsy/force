/**
 * @generated SignedSource<<8bd189509fe1fd16df52bbd1f0e82788>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommercePaymentMethodEnum = "CREDIT_CARD" | "SEPA_DEBIT" | "US_BANK_ACCOUNT" | "WIRE_TRANSFER" | "%future added value";
export type orderRoutes_OrderQuery$variables = {
  orderID: string;
};
export type orderRoutes_OrderQuery$data = {
  readonly me: {
    readonly name: string | null;
  } | null;
  readonly order: {
    readonly bankAccountId: string | null;
    readonly internalID: string;
    readonly mode: CommerceOrderModeEnum | null;
    readonly state: CommerceOrderStateEnum;
    readonly lastTransactionFailed: boolean | null;
    readonly requestedFulfillment: {
      readonly __typename: string;
    } | null;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly slug: string;
          } | null;
          readonly shippingQuoteOptions: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly isSelected: boolean;
              } | null;
            } | null> | null;
          } | null;
        } | null;
      } | null> | null;
    } | null;
    readonly creditCard: {
      readonly internalID: string;
    } | null;
    readonly paymentMethod: CommercePaymentMethodEnum | null;
    readonly paymentMethodDetails: {
      readonly __typename: "CreditCard";
      readonly id: string;
    } | {
      readonly __typename: "BankAccount";
      readonly id: string;
    } | {
      readonly __typename: "WireTransfer";
      readonly isManualPayment: boolean;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null;
    readonly myLastOffer?: {
      readonly internalID: string;
      readonly createdAt: string;
    } | null;
    readonly lastOffer?: {
      readonly internalID: string;
      readonly createdAt: string;
    } | null;
    readonly awaitingResponseFrom?: CommerceOrderParticipantEnum | null;
    readonly " $fragmentSpreads": FragmentRefs<"OrderApp_order">;
  } | null;
};
export type orderRoutes_OrderQuery$rawResponse = {
  readonly me: {
    readonly name: string | null;
    readonly id: string;
  } | null;
  readonly order: {
    readonly __typename: "CommerceOfferOrder";
    readonly __isCommerceOrder: "CommerceOfferOrder";
    readonly bankAccountId: string | null;
    readonly internalID: string;
    readonly mode: CommerceOrderModeEnum | null;
    readonly state: CommerceOrderStateEnum;
    readonly lastTransactionFailed: boolean | null;
    readonly requestedFulfillment: {
      readonly __typename: string;
    } | null;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly slug: string;
            readonly id: string;
            readonly href: string | null;
            readonly is_acquireable: boolean | null;
            readonly is_offerable: boolean | null;
          } | null;
          readonly shippingQuoteOptions: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly isSelected: boolean;
                readonly id: string;
              } | null;
            } | null> | null;
          } | null;
          readonly id: string;
        } | null;
      } | null> | null;
    } | null;
    readonly creditCard: {
      readonly internalID: string;
      readonly id: string;
    } | null;
    readonly paymentMethod: CommercePaymentMethodEnum | null;
    readonly paymentMethodDetails: {
      readonly __typename: "CreditCard";
      readonly id: string;
    } | {
      readonly __typename: "BankAccount";
      readonly id: string;
    } | {
      readonly __typename: "WireTransfer";
      readonly isManualPayment: boolean;
    } | {
      readonly __typename: string;
    } | null;
    readonly currencyCode: string;
    readonly itemsTotalCents: number | null;
    readonly id: string;
    readonly myLastOffer: {
      readonly internalID: string;
      readonly createdAt: string;
      readonly id: string;
    } | null;
    readonly lastOffer: {
      readonly internalID: string;
      readonly createdAt: string;
      readonly id: string;
    } | null;
    readonly awaitingResponseFrom: CommerceOrderParticipantEnum | null;
  } | {
    readonly __typename: string;
    readonly __isCommerceOrder: string;
    readonly bankAccountId: string | null;
    readonly internalID: string;
    readonly mode: CommerceOrderModeEnum | null;
    readonly state: CommerceOrderStateEnum;
    readonly lastTransactionFailed: boolean | null;
    readonly requestedFulfillment: {
      readonly __typename: string;
    } | null;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly slug: string;
            readonly id: string;
            readonly href: string | null;
            readonly is_acquireable: boolean | null;
            readonly is_offerable: boolean | null;
          } | null;
          readonly shippingQuoteOptions: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly isSelected: boolean;
                readonly id: string;
              } | null;
            } | null> | null;
          } | null;
          readonly id: string;
        } | null;
      } | null> | null;
    } | null;
    readonly creditCard: {
      readonly internalID: string;
      readonly id: string;
    } | null;
    readonly paymentMethod: CommercePaymentMethodEnum | null;
    readonly paymentMethodDetails: {
      readonly __typename: "CreditCard";
      readonly id: string;
    } | {
      readonly __typename: "BankAccount";
      readonly id: string;
    } | {
      readonly __typename: "WireTransfer";
      readonly isManualPayment: boolean;
    } | {
      readonly __typename: string;
    } | null;
    readonly currencyCode: string;
    readonly itemsTotalCents: number | null;
    readonly id: string;
  } | null;
};
export type orderRoutes_OrderQuery = {
  variables: orderRoutes_OrderQuery$variables;
  response: orderRoutes_OrderQuery$data;
  rawResponse: orderRoutes_OrderQuery$rawResponse;
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
  "name": "lastTransactionFailed",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v9 = [
  (v4/*: any*/),
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "awaitingResponseFrom",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "requestedFulfillment",
  "plural": false,
  "selections": [
    (v11/*: any*/)
  ],
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSelected",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "paymentMethod",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v17 = [
  (v16/*: any*/)
],
v18 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "paymentMethodDetails",
  "plural": false,
  "selections": [
    (v11/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": (v17/*: any*/),
      "type": "CreditCard",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v17/*: any*/),
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
v19 = [
  (v4/*: any*/),
  (v8/*: any*/),
  (v16/*: any*/)
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
                "selections": (v9/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "lastOffer",
                "plural": false,
                "selections": (v9/*: any*/),
                "storageKey": null
              },
              (v10/*: any*/)
            ],
            "type": "CommerceOfferOrder",
            "abstractKey": null
          },
          (v12/*: any*/),
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
                          (v13/*: any*/)
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
                                  (v14/*: any*/)
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
          (v15/*: any*/),
          (v18/*: any*/),
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
          (v16/*: any*/)
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
          (v11/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
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
                "selections": (v19/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "lastOffer",
                "plural": false,
                "selections": (v19/*: any*/),
                "storageKey": null
              },
              (v10/*: any*/)
            ],
            "type": "CommerceOfferOrder",
            "abstractKey": null
          },
          (v12/*: any*/),
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
                          (v13/*: any*/),
                          (v16/*: any*/),
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
                                  (v14/*: any*/),
                                  (v16/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v16/*: any*/)
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
              (v16/*: any*/)
            ],
            "storageKey": null
          },
          (v15/*: any*/),
          (v18/*: any*/),
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
          (v16/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "090a133b0629cc4b1b5bf1b7bd56af02",
    "id": null,
    "metadata": {},
    "name": "orderRoutes_OrderQuery",
    "operationKind": "query",
    "text": "query orderRoutes_OrderQuery(\n  $orderID: ID!\n) {\n  me {\n    name\n    id\n  }\n  order: commerceOrder(id: $orderID) @principalField {\n    __typename\n    __isCommerceOrder: __typename\n    bankAccountId\n    internalID\n    mode\n    state\n    lastTransactionFailed\n    ... on CommerceOfferOrder {\n      myLastOffer {\n        internalID\n        createdAt\n        id\n      }\n      lastOffer {\n        internalID\n        createdAt\n        id\n      }\n      awaitingResponseFrom\n    }\n    requestedFulfillment {\n      __typename\n    }\n    lineItems {\n      edges {\n        node {\n          artwork {\n            slug\n            id\n          }\n          shippingQuoteOptions {\n            edges {\n              node {\n                isSelected\n                id\n              }\n            }\n          }\n          id\n        }\n      }\n    }\n    creditCard {\n      internalID\n      id\n    }\n    paymentMethod\n    paymentMethodDetails {\n      __typename\n      ... on CreditCard {\n        id\n      }\n      ... on BankAccount {\n        id\n      }\n      ... on WireTransfer {\n        isManualPayment\n      }\n    }\n    ...OrderApp_order\n    id\n  }\n}\n\nfragment OrderApp_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  mode\n  currencyCode\n  itemsTotalCents\n  lineItems {\n    edges {\n      node {\n        artwork {\n          href\n          slug\n          is_acquireable: isAcquireable\n          is_offerable: isOfferable\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9bdd79b212bd6b969f744c45247c5933";

export default node;
