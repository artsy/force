/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CommerceSetPaymentInput = {
    readonly clientMutationId?: string | null;
    readonly creditCardId: string;
    readonly id: string;
};
export type commitMutationTest1MutationVariables = {
    input: CommerceSetPaymentInput;
};
export type commitMutationTest1MutationResponse = {
    readonly commerceSetPayment: {
        readonly orderOrError: {
            readonly error?: {
                readonly code: string;
            };
        };
    } | null;
};
export type commitMutationTest1Mutation = {
    readonly response: commitMutationTest1MutationResponse;
    readonly variables: commitMutationTest1MutationVariables;
};



/*
mutation commitMutationTest1Mutation(
  $input: CommerceSetPaymentInput!
) {
  commerceSetPayment(input: $input) {
    orderOrError {
      __typename
      ... on CommerceOrderWithMutationFailure {
        error {
          code
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
    "type": "CommerceSetPaymentInput!",
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
          "name": "code",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "commitMutationTest1Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "commerceSetPayment",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceSetPaymentPayload",
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
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "commitMutationTest1Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "commerceSetPayment",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceSetPaymentPayload",
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
                "kind": "ScalarField",
                "alias": null,
                "name": "__typename",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "commitMutationTest1Mutation",
    "id": null,
    "text": "mutation commitMutationTest1Mutation(\n  $input: CommerceSetPaymentInput!\n) {\n  commerceSetPayment(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          code\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '00dce5aa5f8ecdb281f7afb350b5d5b8';
export default node;
