/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DeleteAccountInput = {
    clientMutationId?: string | null;
    explanation?: string | null;
    url?: string | null;
};
export type useDeleteAccountMutationVariables = {
    input: DeleteAccountInput;
};
export type useDeleteAccountMutationResponse = {
    readonly deleteMyAccountMutation: {
        readonly userAccountOrError: {
            readonly success?: boolean | null;
            readonly mutationError?: {
                readonly type: string | null;
                readonly message: string;
                readonly detail: string | null;
            } | null;
        } | null;
    } | null;
};
export type useDeleteAccountMutation = {
    readonly response: useDeleteAccountMutationResponse;
    readonly variables: useDeleteAccountMutationVariables;
};



/*
mutation useDeleteAccountMutation(
  $input: DeleteAccountInput!
) {
  deleteMyAccountMutation(input: $input) {
    userAccountOrError {
      __typename
      ... on AccountMutationSuccess {
        success
      }
      ... on AccountMutationFailure {
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
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "success",
      "storageKey": null
    }
  ],
  "type": "AccountMutationSuccess",
  "abstractKey": null
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
  "type": "AccountMutationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useDeleteAccountMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteAccountPayload",
        "kind": "LinkedField",
        "name": "deleteMyAccountMutation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "userAccountOrError",
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteAccountMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteAccountPayload",
        "kind": "LinkedField",
        "name": "deleteMyAccountMutation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "userAccountOrError",
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
    "cacheID": "c5558559415a9d7bab2a700b4f47826f",
    "id": null,
    "metadata": {},
    "name": "useDeleteAccountMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteAccountMutation(\n  $input: DeleteAccountInput!\n) {\n  deleteMyAccountMutation(input: $input) {\n    userAccountOrError {\n      __typename\n      ... on AccountMutationSuccess {\n        success\n      }\n      ... on AccountMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b0ae491406ec68a04c85c5772175b2de';
export default node;
