/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type DisableSecondFactorInput = {
    readonly clientMutationId?: string | null;
    readonly secondFactorID: string;
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
            readonly __typename: string | null;
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
    "kind": "LocalArgument",
    "name": "input",
    "type": "DisableSecondFactorInput!",
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
v3 = [
  (v2/*: any*/)
],
v4 = {
  "kind": "InlineFragment",
  "type": "AppSecondFactor",
  "selections": (v3/*: any*/)
},
v5 = {
  "kind": "InlineFragment",
  "type": "SmsSecondFactor",
  "selections": (v3/*: any*/)
},
v6 = {
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
    "name": "DisableSecondFactorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "disableSecondFactor",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "DisableSecondFactorPayload",
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
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "DisableSecondFactorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "disableSecondFactor",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "DisableSecondFactorPayload",
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
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "DisableSecondFactorMutation",
    "id": null,
    "text": "mutation DisableSecondFactorMutation(\n  $input: DisableSecondFactorInput!\n) {\n  disableSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on AppSecondFactor {\n        __typename\n      }\n      ... on SmsSecondFactor {\n        __typename\n      }\n      ... on Errors {\n        __typename\n        errors {\n          message\n          code\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'bdacff640561201d956f43229eaf2b1c';
export default node;
