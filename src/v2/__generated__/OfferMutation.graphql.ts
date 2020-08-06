/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceAddInitialOfferToOrderInput = {
    readonly amountCents: number;
    readonly clientMutationId?: string | null;
    readonly note?: string | null;
    readonly orderId: string;
};
export type OfferMutationVariables = {
    input: CommerceAddInitialOfferToOrderInput;
};
export type OfferMutationResponse = {
    readonly commerceAddInitialOfferToOrder: {
        readonly orderOrError: {
            readonly __typename: "CommerceOrderWithMutationSuccess";
            readonly order?: {
                readonly internalID: string;
                readonly mode: CommerceOrderModeEnum | null;
                readonly totalListPrice: string | null;
                readonly totalListPriceCents: number;
                readonly myLastOffer?: {
                    readonly internalID: string;
                    readonly amountCents: number;
                    readonly note: string | null;
                } | null;
            };
            readonly error?: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            };
        };
    } | null;
};
export type OfferMutation = {
    readonly response: OfferMutationResponse;
    readonly variables: OfferMutationVariables;
};



/*
mutation OfferMutation(
  $input: CommerceAddInitialOfferToOrderInput!
) {
  commerceAddInitialOfferToOrder(input: $input) {
    orderOrError {
      __typename
      ... on CommerceOrderWithMutationSuccess {
        __typename
        order {
          __typename
          internalID
          mode
          totalListPrice
          totalListPriceCents
          ... on CommerceOfferOrder {
            myLastOffer {
              internalID
              amountCents
              note
              id
            }
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
    "kind": "LocalArgument",
    "name": "input",
    "type": "CommerceAddInitialOfferToOrderInput!",
    "defaultValue": null
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
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "mode",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "totalListPrice",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "totalListPriceCents",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amountCents",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "note",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "InlineFragment",
  "type": "CommerceOrderWithMutationFailure",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "error",
      "storageKey": null,
      "args": null,
      "concreteType": "CommerceApplicationError",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "type",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "code",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "data",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "OfferMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "commerceAddInitialOfferToOrder",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceAddInitialOfferToOrderPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "type": "CommerceOrderWithMutationSuccess",
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "order",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "type": "CommerceOfferOrder",
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "myLastOffer",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "CommerceOffer",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              (v7/*: any*/),
                              (v8/*: any*/)
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              (v9/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "OfferMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "commerceAddInitialOfferToOrder",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceAddInitialOfferToOrderPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "CommerceOrderWithMutationSuccess",
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "order",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v10/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "type": "CommerceOfferOrder",
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "myLastOffer",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "CommerceOffer",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              (v7/*: any*/),
                              (v8/*: any*/),
                              (v10/*: any*/)
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              (v9/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "OfferMutation",
    "id": null,
    "text": "mutation OfferMutation(\n  $input: CommerceAddInitialOfferToOrderInput!\n) {\n  commerceAddInitialOfferToOrder(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationSuccess {\n        __typename\n        order {\n          __typename\n          internalID\n          mode\n          totalListPrice\n          totalListPriceCents\n          ... on CommerceOfferOrder {\n            myLastOffer {\n              internalID\n              amountCents\n              note\n              id\n            }\n          }\n          id\n        }\n      }\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '0fd563773d66cf6524c984c87c3194e9';
export default node;
