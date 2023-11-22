/**
 * @generated SignedSource<<30bfe07831bef7e760dc95afe2e07741>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateAccountRequestMutationInput = {
  action?: string | null | undefined;
  clientMutationId?: string | null | undefined;
  email?: string | null | undefined;
  name?: string | null | undefined;
  notes: string;
  userID?: string | null | undefined;
};
export type CCPARequestMutation$variables = {
  input: CreateAccountRequestMutationInput;
};
export type CCPARequestMutation$data = {
  readonly createAccountRequest: {
    readonly accountRequestOrError: {
      readonly accountRequest?: {
        readonly notes: string | null | undefined;
      } | null | undefined;
      readonly mutationError?: {
        readonly message: string;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type CCPARequestMutation = {
  response: CCPARequestMutation$data;
  variables: CCPARequestMutation$variables;
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
          "name": "message",
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
    "cacheID": "d1b1f778074aa47d433f9a222a60685a",
    "id": null,
    "metadata": {},
    "name": "CCPARequestMutation",
    "operationKind": "mutation",
    "text": "mutation CCPARequestMutation(\n  $input: CreateAccountRequestMutationInput!\n) {\n  createAccountRequest(input: $input) {\n    accountRequestOrError {\n      __typename\n      ... on CreateAccountRequestMutationSuccess {\n        accountRequest {\n          notes\n          id\n        }\n      }\n      ... on CreateAccountRequestMutationFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e1d550810190e2f3e06e6e9f74f413b9";

export default node;
