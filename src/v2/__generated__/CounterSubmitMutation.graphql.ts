/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommerceSubmitPendingOfferInput = {
    clientMutationId?: string | null;
    offerId: string;
};
export type CounterSubmitMutationVariables = {
    input: CommerceSubmitPendingOfferInput;
};
export type CounterSubmitMutationResponse = {
    readonly commerceSubmitPendingOffer: {
        readonly orderOrError: {
            readonly order?: {
                readonly state: CommerceOrderStateEnum;
                readonly awaitingResponseFrom?: CommerceOrderParticipantEnum | null;
            };
            readonly error?: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            };
        };
    } | null;
};
export type CounterSubmitMutation = {
    readonly response: CounterSubmitMutationResponse;
    readonly variables: CounterSubmitMutationVariables;
};



/*
mutation CounterSubmitMutation(
  $input: CommerceSubmitPendingOfferInput!
) {
  commerceSubmitPendingOffer(input: $input) {
    orderOrError {
      __typename
      ... on CommerceOrderWithMutationSuccess {
        order {
          __typename
          state
          ... on CommerceOfferOrder {
            awaitingResponseFrom
          }
          id
        }
      }
      ... on CommerceOrderWithMutationFailure {
        error {
          type
          code
          data
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "CommerceSubmitPendingOfferInput!"
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
  "type": "CommerceOfferOrder"
},
v4 = {
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
  "type": "CommerceOrderWithMutationFailure"
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CounterSubmitMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceSubmitPendingOfferPayload",
        "kind": "LinkedField",
        "name": "commerceSubmitPendingOffer",
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CommerceOrderWithMutationSuccess"
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CounterSubmitMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceSubmitPendingOfferPayload",
        "kind": "LinkedField",
        "name": "commerceSubmitPendingOffer",
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
              (v5/*: any*/),
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
                      (v5/*: any*/),
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "id",
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CommerceOrderWithMutationSuccess"
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
    "id": null,
    "metadata": {},
    "name": "CounterSubmitMutation",
    "operationKind": "mutation",
    "text": "mutation CounterSubmitMutation(\n  $input: CommerceSubmitPendingOfferInput!\n) {\n  commerceSubmitPendingOffer(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationSuccess {\n        order {\n          __typename\n          state\n          ... on CommerceOfferOrder {\n            awaitingResponseFrom\n          }\n          id\n        }\n      }\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '498e2167e61dc5b2ecbb9fa2738cf453';
export default node;
