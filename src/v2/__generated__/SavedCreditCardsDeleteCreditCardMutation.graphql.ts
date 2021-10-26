/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type DeleteCreditCardInput = {
    clientMutationId?: string | null;
    id: string;
};
export type SavedCreditCardsDeleteCreditCardMutationVariables = {
    input: DeleteCreditCardInput;
};
export type SavedCreditCardsDeleteCreditCardMutationResponse = {
    readonly deleteCreditCard: {
        readonly creditCardOrError: {
            readonly creditCard?: {
                readonly internalID: string;
                readonly id: string;
            } | null;
            readonly mutationError?: {
                readonly type: string | null;
                readonly message: string;
                readonly detail: string | null;
            } | null;
        } | null;
    } | null;
};
export type SavedCreditCardsDeleteCreditCardMutation = {
    readonly response: SavedCreditCardsDeleteCreditCardMutationResponse;
    readonly variables: SavedCreditCardsDeleteCreditCardMutationVariables;
};



/*
mutation SavedCreditCardsDeleteCreditCardMutation(
  $input: DeleteCreditCardInput!
) {
  deleteCreditCard(input: $input) {
    creditCardOrError {
      __typename
      ... on CreditCardMutationSuccess {
        creditCard {
          internalID
          id
        }
      }
      ... on CreditCardMutationFailure {
        mutationError {
          type
          message
          detail
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
    "type": "DeleteCreditCardInput!"
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
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CreditCard",
      "kind": "LinkedField",
      "name": "creditCard",
      "plural": false,
      "selections": [
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
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CreditCardMutationSuccess"
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "kind": "LinkedField",
      "name": "mutationError",
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
          "name": "message",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "detail",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CreditCardMutationFailure"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SavedCreditCardsDeleteCreditCardMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteCreditCardPayload",
        "kind": "LinkedField",
        "name": "deleteCreditCard",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "creditCardOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
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
    "name": "SavedCreditCardsDeleteCreditCardMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteCreditCardPayload",
        "kind": "LinkedField",
        "name": "deleteCreditCard",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "creditCardOrError",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/)
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
    "name": "SavedCreditCardsDeleteCreditCardMutation",
    "operationKind": "mutation",
    "text": "mutation SavedCreditCardsDeleteCreditCardMutation(\n  $input: DeleteCreditCardInput!\n) {\n  deleteCreditCard(input: $input) {\n    creditCardOrError {\n      __typename\n      ... on CreditCardMutationSuccess {\n        creditCard {\n          internalID\n          id\n        }\n      }\n      ... on CreditCardMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ce7bea3afbfaef2fde581717df94613f';
export default node;
