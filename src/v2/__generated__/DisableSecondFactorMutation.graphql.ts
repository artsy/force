/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DisableSecondFactorInput = {
    clientMutationId?: string | null;
    password: string;
    secondFactorID: string;
};
export type DisableSecondFactorMutationVariables = {
    input: DisableSecondFactorInput;
};
export type DisableSecondFactorMutationResponse = {
    readonly disableSecondFactor: {
        readonly secondFactorOrErrors: {
            readonly __typename: "AppSecondFactor";
        } | {
            readonly __typename: "SmsSecondFactor";
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
export type DisableSecondFactorMutationRawResponse = {
    readonly disableSecondFactor: ({
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
export type DisableSecondFactorMutation = {
    readonly response: DisableSecondFactorMutationResponse;
    readonly variables: DisableSecondFactorMutationVariables;
    readonly rawResponse: DisableSecondFactorMutationRawResponse;
};



/*
mutation DisableSecondFactorMutation(
  $input: DisableSecondFactorInput!
) {
  disableSecondFactor(input: $input) {
    secondFactorOrErrors {
      __typename
      ... on AppSecondFactor {
        __typename
      }
      ... on SmsSecondFactor {
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
v3 = [
  (v2/*: any*/)
],
v4 = {
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
    "name": "DisableSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DisableSecondFactorPayload",
        "kind": "LinkedField",
        "name": "disableSecondFactor",
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
                "selections": (v3/*: any*/),
                "type": "AppSecondFactor",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v3/*: any*/),
                "type": "SmsSecondFactor",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/)
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
    "name": "DisableSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DisableSecondFactorPayload",
        "kind": "LinkedField",
        "name": "disableSecondFactor",
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
                  (v4/*: any*/)
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
    "cacheID": "18d9c131aeeca27e4fc10c9f6c2ea129",
    "id": null,
    "metadata": {},
    "name": "DisableSecondFactorMutation",
    "operationKind": "mutation",
    "text": "mutation DisableSecondFactorMutation(\n  $input: DisableSecondFactorInput!\n) {\n  disableSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on AppSecondFactor {\n        __typename\n      }\n      ... on SmsSecondFactor {\n        __typename\n      }\n      ... on Errors {\n        __typename\n        errors {\n          message\n          code\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bdacff640561201d956f43229eaf2b1c';
export default node;
