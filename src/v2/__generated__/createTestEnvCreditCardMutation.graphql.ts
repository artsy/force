/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CreditCardInput = {
    readonly clientMutationId?: string | null;
    readonly oneTimeUse?: boolean | null;
    readonly token: string;
};
export type createTestEnvCreditCardMutationVariables = {
    input: CreditCardInput;
};
export type createTestEnvCreditCardMutationResponse = {
    readonly createCreditCard: {
        readonly creditCardOrError: {
            readonly creditCard?: {
                readonly brand: string;
            } | null;
            readonly mutationError?: {
                readonly type: string | null;
            } | null;
        } | null;
    } | null;
};
export type createTestEnvCreditCardMutation = {
    readonly response: createTestEnvCreditCardMutationResponse;
    readonly variables: createTestEnvCreditCardMutationVariables;
};



/*
mutation createTestEnvCreditCardMutation(
  $input: CreditCardInput!
) {
  createCreditCard(input: $input) {
    creditCardOrError {
      __typename
      ... on CreditCardMutationSuccess {
        creditCard {
          brand
          id
        }
      }
      ... on CreditCardMutationFailure {
        mutationError {
          type
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
    "type": "CreditCardInput!",
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
  "name": "brand",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "type": "CreditCardMutationFailure",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "mutationError",
      "storageKey": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "type",
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
    "name": "createTestEnvCreditCardMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createCreditCard",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreditCardPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creditCardOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "type": "CreditCardMutationSuccess",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "creditCard",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "CreditCard",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/)
                    ]
                  }
                ]
              },
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "createTestEnvCreditCardMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createCreditCard",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreditCardPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creditCardOrError",
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
              {
                "kind": "InlineFragment",
                "type": "CreditCardMutationSuccess",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "creditCard",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "CreditCard",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
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
              },
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "createTestEnvCreditCardMutation",
    "id": null,
    "text": "mutation createTestEnvCreditCardMutation(\n  $input: CreditCardInput!\n) {\n  createCreditCard(input: $input) {\n    creditCardOrError {\n      __typename\n      ... on CreditCardMutationSuccess {\n        creditCard {\n          brand\n          id\n        }\n      }\n      ... on CreditCardMutationFailure {\n        mutationError {\n          type\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '4a8e9a9778e885c2061bbb99d3f158d1';
export default node;
