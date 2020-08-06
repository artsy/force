/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateAccountRequestMutationInput = {
    readonly action?: string | null;
    readonly clientMutationId?: string | null;
    readonly email?: string | null;
    readonly name?: string | null;
    readonly notes: string;
    readonly userID?: string | null;
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
                readonly message: string | null;
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
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateAccountRequestMutationInput!",
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
  "name": "notes",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "type": "CreateAccountRequestMutationFailure",
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
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "message",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "detail",
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
    "name": "CCPARequestMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createAccountRequest",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateAccountRequestMutationPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "accountRequestOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "type": "CreateAccountRequestMutationSuccess",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "accountRequest",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "AccountRequest",
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
    "name": "CCPARequestMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createAccountRequest",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateAccountRequestMutationPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "accountRequestOrError",
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
                "type": "CreateAccountRequestMutationSuccess",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "accountRequest",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "AccountRequest",
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
    "name": "CCPARequestMutation",
    "id": null,
    "text": "mutation CCPARequestMutation(\n  $input: CreateAccountRequestMutationInput!\n) {\n  createAccountRequest(input: $input) {\n    accountRequestOrError {\n      __typename\n      ... on CreateAccountRequestMutationSuccess {\n        accountRequest {\n          notes\n          id\n        }\n      }\n      ... on CreateAccountRequestMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '261c7e53f35fe29653572bf16c4f031a';
export default node;
