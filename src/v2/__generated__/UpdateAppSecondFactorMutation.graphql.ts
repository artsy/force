/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type UpdateAppSecondFactorInput = {
    readonly attributes: AppSecondFactorAttributes;
    readonly clientMutationId?: string | null;
    readonly secondFactorID: string;
};
export type AppSecondFactorAttributes = {
    readonly name?: string | null;
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
            readonly __typename: "AppSecondFactor";
        } | {
            readonly __typename: "Errors";
            readonly errors: ReadonlyArray<{
                readonly message: string;
                readonly code: string;
            }>;
        } | {
            readonly __typename: string | null;
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
    "kind": "LocalArgument",
    "name": "input",
    "type": "UpdateAppSecondFactorInput!",
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
  "kind": "InlineFragment",
  "type": "AppSecondFactor",
  "selections": [
    (v2/*: any*/)
  ]
},
v4 = {
  "kind": "InlineFragment",
  "type": "Errors",
  "selections": [
    (v2/*: any*/),
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "errors",
      "storageKey": null,
      "args": null,
      "concreteType": "Error",
      "plural": true,
      "selections": [
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
    "name": "UpdateAppSecondFactorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateAppSecondFactor",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateAppSecondFactorPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "secondFactorOrErrors",
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
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateAppSecondFactorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateAppSecondFactor",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateAppSecondFactorPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "secondFactorOrErrors",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateAppSecondFactorMutation",
    "id": null,
    "text": "mutation UpdateAppSecondFactorMutation(\n  $input: UpdateAppSecondFactorInput!\n) {\n  updateAppSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on AppSecondFactor {\n        __typename\n      }\n      ... on Errors {\n        __typename\n        errors {\n          message\n          code\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '013c7fe073e73339db609d4021ecaf9e';
export default node;
