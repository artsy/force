/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateAccountRequestMutationInput = {
    action?: string | null;
    clientMutationId?: string | null;
    email?: string | null;
    name?: string | null;
    notes: string;
    userID?: string | null;
};
export type CCPARequestMutationVariables = {
    input: CreateAccountRequestMutationInput;
};
export type CCPARequestMutationResponse = {
    readonly createAccountRequest: {
        readonly accountRequestOrError: {
            readonly accountRequest?: {
                readonly notes: string | null;
            } | null;
            readonly mutationError?: {
                readonly type: string | null;
                readonly message: string;
                readonly detail: string | null;
            } | null;
        } | null;
    } | null;
};
export type CCPARequestMutation = {
    readonly response: CCPARequestMutationResponse;
    readonly variables: CCPARequestMutationVariables;
};



/*
mutation CCPARequestMutation(
  $input: CreateAccountRequestMutationInput!
) {
  createAccountRequest(input: $input) {
    accountRequestOrError {
      __typename
      ... on CreateAccountRequestMutationSuccess {
        accountRequest {
          notes
          id
        }
      }
      ... on CreateAccountRequestMutationFailure {
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "notes",
  "storageKey": null
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
  "type": "CreateAccountRequestMutationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CCPARequestMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateAccountRequestMutationPayload",
        "kind": "LinkedField",
        "name": "createAccountRequest",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "accountRequestOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AccountRequest",
                    "kind": "LinkedField",
                    "name": "accountRequest",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CreateAccountRequestMutationSuccess",
                "abstractKey": null
              },
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
    "name": "CCPARequestMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateAccountRequestMutationPayload",
        "kind": "LinkedField",
        "name": "createAccountRequest",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "accountRequestOrError",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AccountRequest",
                    "kind": "LinkedField",
                    "name": "accountRequest",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
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
                "type": "CreateAccountRequestMutationSuccess",
                "abstractKey": null
              },
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
    "cacheID": "c204624ec6199106e9a4fa62d39f8f3e",
    "id": null,
    "metadata": {},
    "name": "CCPARequestMutation",
    "operationKind": "mutation",
    "text": "mutation CCPARequestMutation(\n  $input: CreateAccountRequestMutationInput!\n) {\n  createAccountRequest(input: $input) {\n    accountRequestOrError {\n      __typename\n      ... on CreateAccountRequestMutationSuccess {\n        accountRequest {\n          notes\n          id\n        }\n      }\n      ... on CreateAccountRequestMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '261c7e53f35fe29653572bf16c4f031a';
export default node;
