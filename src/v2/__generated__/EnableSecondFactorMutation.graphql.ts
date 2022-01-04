/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type EnableSecondFactorInput = {
    clientMutationId?: string | null;
    code: string;
    password?: string | null;
    secondFactorID: string;
};
export type EnableSecondFactorMutationVariables = {
    input: EnableSecondFactorInput;
};
export type EnableSecondFactorMutationResponse = {
    readonly enableSecondFactor: {
        readonly secondFactorOrErrors: {
            readonly __typename: "SmsSecondFactor";
        } | {
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
        readonly recoveryCodes: ReadonlyArray<string> | null;
    } | null;
};
export type EnableSecondFactorMutationRawResponse = {
    readonly enableSecondFactor: ({
        readonly secondFactorOrErrors: {
            readonly __typename: "SmsSecondFactor";
        } | {
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
        readonly recoveryCodes: ReadonlyArray<string> | null;
    }) | null;
};
export type EnableSecondFactorMutation = {
    readonly response: EnableSecondFactorMutationResponse;
    readonly variables: EnableSecondFactorMutationVariables;
    readonly rawResponse: EnableSecondFactorMutationRawResponse;
};



/*
mutation EnableSecondFactorMutation(
  $input: EnableSecondFactorInput!
) {
  enableSecondFactor(input: $input) {
    secondFactorOrErrors {
      __typename
      ... on SmsSecondFactor {
        __typename
      }
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
    recoveryCodes
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "EnableSecondFactorInput!"
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
  "kind": "InlineFragment",
  "selections": (v3/*: any*/),
  "type": "SmsSecondFactor"
},
v5 = {
  "kind": "InlineFragment",
  "selections": (v3/*: any*/),
  "type": "AppSecondFactor"
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/),
    {
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
    }
  ],
  "type": "Errors"
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "recoveryCodes",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EnableSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EnableSecondFactorPayload",
        "kind": "LinkedField",
        "name": "enableSecondFactor",
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
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/)
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
    "name": "EnableSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EnableSecondFactorPayload",
        "kind": "LinkedField",
        "name": "enableSecondFactor",
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
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "EnableSecondFactorMutation",
    "operationKind": "mutation",
    "text": "mutation EnableSecondFactorMutation(\n  $input: EnableSecondFactorInput!\n) {\n  enableSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on SmsSecondFactor {\n        __typename\n      }\n      ... on AppSecondFactor {\n        __typename\n      }\n      ... on Errors {\n        __typename\n        errors {\n          message\n          code\n        }\n      }\n    }\n    recoveryCodes\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e3165b7db63bdd9ed7fd8fcef2304f43';
export default node;
