/**
 * @generated SignedSource<<50c9808bf412ebaae604d58b38da074e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommerceFixFailedPaymentInput = {
  clientMutationId?: string | null;
  creditCardId: string;
  offerId: string;
};
export type AcceptRouteSetOrderPaymentMutation$variables = {
  input: CommerceFixFailedPaymentInput;
};
export type AcceptRouteSetOrderPaymentMutation$data = {
  readonly commerceFixFailedPayment: {
    readonly orderOrError: {
      readonly order?: {
        readonly state: CommerceOrderStateEnum;
        readonly creditCard: {
          readonly internalID: string;
          readonly name: string | null;
          readonly street1: string | null;
          readonly street2: string | null;
          readonly city: string | null;
          readonly state: string | null;
          readonly country: string | null;
          readonly postal_code: string | null;
        } | null;
        readonly awaitingResponseFrom?: CommerceOrderParticipantEnum | null;
      };
      readonly actionData?: {
        readonly clientSecret: string;
      };
      readonly error?: {
        readonly type: string;
        readonly code: string;
        readonly data: string | null;
      };
    };
  } | null;
};
export type AcceptRouteSetOrderPaymentMutation = {
  variables: AcceptRouteSetOrderPaymentMutation$variables;
  response: AcceptRouteSetOrderPaymentMutation$data;
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
  "name": "state",
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
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "street1",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "street2",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v9 = {
  "alias": "postal_code",
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v10 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "awaitingResponseFrom",
      "storageKey": null
    }
  ],
  "type": "CommerceOfferOrder",
  "abstractKey": null
},
v11 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceOrderActionData",
      "kind": "LinkedField",
      "name": "actionData",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "clientSecret",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceOrderRequiresAction",
  "abstractKey": null
},
v12 = {
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
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AcceptRouteSetOrderPaymentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceFixFailedPaymentPayload",
        "kind": "LinkedField",
        "name": "commerceFixFailedPayment",
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
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CreditCard",
                        "kind": "LinkedField",
                        "name": "creditCard",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v2/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CommerceOrderWithMutationSuccess",
                "abstractKey": null
              },
              (v11/*: any*/),
              (v12/*: any*/)
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
    "name": "AcceptRouteSetOrderPaymentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceFixFailedPaymentPayload",
        "kind": "LinkedField",
        "name": "commerceFixFailedPayment",
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
              (v13/*: any*/),
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
                      (v13/*: any*/),
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CreditCard",
                        "kind": "LinkedField",
                        "name": "creditCard",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v2/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v14/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v10/*: any*/),
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CommerceOrderWithMutationSuccess",
                "abstractKey": null
              },
              (v11/*: any*/),
              (v12/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ec7b4633ec51474450c3cf93414dfb27",
    "id": null,
    "metadata": {},
    "name": "AcceptRouteSetOrderPaymentMutation",
    "operationKind": "mutation",
    "text": "mutation AcceptRouteSetOrderPaymentMutation(\n  $input: CommerceFixFailedPaymentInput!\n) {\n  commerceFixFailedPayment(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationSuccess {\n        order {\n          __typename\n          state\n          creditCard {\n            internalID\n            name\n            street1\n            street2\n            city\n            state\n            country\n            postal_code: postalCode\n            id\n          }\n          ... on CommerceOfferOrder {\n            awaitingResponseFrom\n          }\n          id\n        }\n      }\n      ... on CommerceOrderRequiresAction {\n        actionData {\n          clientSecret\n        }\n      }\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "71543d69722bdec8421a30e8d0601c29";

export default node;
