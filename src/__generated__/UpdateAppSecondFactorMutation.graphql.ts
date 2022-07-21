/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateAppSecondFactorInput = {
    attributes: AppSecondFactorAttributes;
    clientMutationId?: string | null | undefined;
    secondFactorID: string;
};
export type AppSecondFactorAttributes = {
    name?: string | null | undefined;
};
export type UpdateAppSecondFactorMutationVariables = {
    input: UpdateAppSecondFactorInput;
};
export type UpdateAppSecondFactorMutationResponse = {
    readonly updateAppSecondFactor: {
        readonly secondFactorOrErrors: {
            readonly __typename: "AppSecondFactor";
        } | {
            readonly __typename: "Errors";
            readonly errors: ReadonlyArray<{
                readonly message: string;
                readonly code: string;
            }>;
        } | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        };
    } | null;
};
export type UpdateAppSecondFactorMutationRawResponse = {
    readonly updateAppSecondFactor: ({
        readonly secondFactorOrErrors: {
            readonly __typename: "Errors";
            readonly errors: ReadonlyArray<{
                readonly message: string;
                readonly code: string;
            }>;
        } | {
            readonly __typename: string;
        };
    }) | null;
};
export type UpdateAppSecondFactorMutation = {
    readonly response: UpdateAppSecondFactorMutationResponse;
    readonly variables: UpdateAppSecondFactorMutationVariables;
    readonly rawResponse: UpdateAppSecondFactorMutationRawResponse;
};



/*
mutation UpdateAppSecondFactorMutation(
  $input: UpdateAppSecondFactorInput!
) {
  updateAppSecondFactor(input: $input) {
    secondFactorOrErrors {
      __typename
      ... on AppSecondFactor {
        __typename
      }
      ... on Errors {
        __typename
        errors {
          message
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
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Error",
  "kind": "LinkedField",
  "name": "errors",
  "plural": true,
  "selections": [
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
      "name": "code",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateAppSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateAppSecondFactorPayload",
        "kind": "LinkedField",
        "name": "updateAppSecondFactor",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "secondFactorOrErrors",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/)
                ],
                "type": "AppSecondFactor",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "type": "Errors",
                "abstractKey": null
              }
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
    "name": "UpdateAppSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateAppSecondFactorPayload",
        "kind": "LinkedField",
        "name": "updateAppSecondFactor",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "secondFactorOrErrors",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/)
                ],
                "type": "Errors",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "59d4d1d54b0ed11accd68172132e3b93",
    "id": null,
    "metadata": {},
    "name": "UpdateAppSecondFactorMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateAppSecondFactorMutation(\n  $input: UpdateAppSecondFactorInput!\n) {\n  updateAppSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on AppSecondFactor {\n        __typename\n      }\n      ... on Errors {\n        __typename\n        errors {\n          message\n          code\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '013c7fe073e73339db609d4021ecaf9e';
export default node;
