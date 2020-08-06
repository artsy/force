/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommerceBuyerAcceptOfferInput = {
    readonly clientMutationId?: string | null;
    readonly offerId: string;
};
export type createMockNetworkLayerTestMutationResultsMutationVariables = {
    input: CommerceBuyerAcceptOfferInput;
};
export type createMockNetworkLayerTestMutationResultsMutationResponse = {
    readonly commerceBuyerAcceptOffer: {
        readonly orderOrError: {
            readonly error?: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            };
            readonly order?: {
                readonly internalID: string;
                readonly state: CommerceOrderStateEnum;
            };
        };
    } | null;
};
export type createMockNetworkLayerTestMutationResultsMutation = {
    readonly response: createMockNetworkLayerTestMutationResultsMutationResponse;
    readonly variables: createMockNetworkLayerTestMutationResultsMutationVariables;
};



/*
mutation createMockNetworkLayerTestMutationResultsMutation(
  $input: CommerceBuyerAcceptOfferInput!
) {
  commerceBuyerAcceptOffer(input: $input) {
    orderOrError {
      __typename
      ... on CommerceOrderWithMutationFailure {
        error {
          type
          code
          data
        }
      }
      ... on CommerceOrderWithMutationSuccess {
        order {
          __typename
          internalID
          state
          id
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
    "type": "CommerceBuyerAcceptOfferInput!",
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
  "name": "state",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "createMockNetworkLayerTestMutationResultsMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "commerceBuyerAcceptOffer",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceBuyerAcceptOfferPayload",
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
                      (v4/*: any*/)
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "createMockNetworkLayerTestMutationResultsMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "commerceBuyerAcceptOffer",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceBuyerAcceptOfferPayload",
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
              (v5/*: any*/),
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "CommerceOrderWithMutationSuccess",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "order",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "id",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "createMockNetworkLayerTestMutationResultsMutation",
    "id": null,
    "text": "mutation createMockNetworkLayerTestMutationResultsMutation(\n  $input: CommerceBuyerAcceptOfferInput!\n) {\n  commerceBuyerAcceptOffer(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n      ... on CommerceOrderWithMutationSuccess {\n        order {\n          __typename\n          internalID\n          state\n          id\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'dcfa0d5642e51295d881dcd55a1c3515';
export default node;
