/**
 * @generated SignedSource<<243168003fcb5766fbd2701f98c2c753>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
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
        readonly internalID: string;
        readonly order: {
          readonly id: string;
          readonly pendingOffer: {
            readonly amount: {
              readonly major: number;
            } | null | undefined;
            readonly createdAt: string | null | undefined;
            readonly id: string;
            readonly internalID: string;
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
              // This will never be '%other', but we need some
              // value in case none of the concrete values match.
              readonly __typename: "%other";
            } | null | undefined>;
          } | null | undefined;
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
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
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
v8 = [
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/)
],
v9 = {
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
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "pendingOffer",
      "plural": false,
      "selections": [
        (v4/*: any*/),
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "createdAt",
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
              "name": "major",
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
            (v2/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": (v8/*: any*/),
              "type": "ShippingLine",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v8/*: any*/),
              "type": "TaxLine",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                (v5/*: any*/),
                (v7/*: any*/)
              ],
              "type": "SubtotalLine",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                (v5/*: any*/),
                (v6/*: any*/),
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
                      "name": "display",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "type": "TotalLine",
              "abstractKey": null
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
v10 = {
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
};
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
                      (v3/*: any*/),
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "OfferMutationSuccess",
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
                      (v3/*: any*/),
                      (v9/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "OfferMutationSuccess",
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
    "cacheID": "fb9a53a46a605f8e8cbe100fe4207dc8",
    "id": null,
    "metadata": {},
    "name": "useOrder2CreateCounterOfferMutation",
    "operationKind": "mutation",
    "text": "mutation useOrder2CreateCounterOfferMutation(\n  $input: createBuyerOfferInput!\n) {\n  createBuyerOffer(input: $input) {\n    offerOrError {\n      __typename\n      ... on OfferMutationSuccess {\n        __typename\n        offer {\n          internalID\n          order {\n            id\n            pendingOffer {\n              id\n              internalID\n              createdAt\n              amount {\n                major\n              }\n              pricingBreakdownLines {\n                __typename\n                ... on ShippingLine {\n                  displayName\n                  amountFallbackText\n                  amount {\n                    amount\n                    currencySymbol\n                  }\n                }\n                ... on TaxLine {\n                  displayName\n                  amountFallbackText\n                  amount {\n                    amount\n                    currencySymbol\n                  }\n                }\n                ... on SubtotalLine {\n                  displayName\n                  amount {\n                    amount\n                    currencySymbol\n                  }\n                }\n                ... on TotalLine {\n                  displayName\n                  amountFallbackText\n                  amount {\n                    display\n                  }\n                }\n              }\n            }\n          }\n          id\n        }\n      }\n      ... on OfferMutationError {\n        mutationError {\n          code\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f5bf6d73de5607c6bda1b4c8a33703cf";

export default node;
