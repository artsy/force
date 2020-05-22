/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type UpdateSmsSecondFactorInput = {
    readonly attributes: SmsSecondFactorAttributes;
    readonly clientMutationId?: string | null;
    readonly secondFactorID: string;
};
export type SmsSecondFactorAttributes = {
    readonly countryCode?: string | null;
    readonly phoneNumber?: string | null;
};
export type UpdateSmsSecondFactorMutationVariables = {
    input: UpdateSmsSecondFactorInput;
};
export type UpdateSmsSecondFactorMutationResponse = {
    readonly updateSmsSecondFactor: {
        readonly secondFactorOrErrors: {
            readonly __typename: "SmsSecondFactor";
        } | {
            readonly __typename: "Errors";
            readonly errors: ReadonlyArray<{
                readonly message: string;
                readonly code: string;
                readonly data: unknown | null;
            }>;
        } | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        };
    } | null;
};
export type UpdateSmsSecondFactorMutationRawResponse = {
    readonly updateSmsSecondFactor: ({
        readonly secondFactorOrErrors: {
            readonly __typename: "SmsSecondFactor";
        } | {
            readonly __typename: "Errors";
            readonly errors: ReadonlyArray<{
                readonly message: string;
                readonly code: string;
                readonly data: unknown | null;
            }>;
        } | {
            readonly __typename: string | null;
        };
    }) | null;
};
export type UpdateSmsSecondFactorMutation = {
    readonly response: UpdateSmsSecondFactorMutationResponse;
    readonly variables: UpdateSmsSecondFactorMutationVariables;
    readonly rawResponse: UpdateSmsSecondFactorMutationRawResponse;
};



/*
mutation UpdateSmsSecondFactorMutation(
  $input: UpdateSmsSecondFactorInput!
) {
  updateSmsSecondFactor(input: $input) {
    secondFactorOrErrors {
      __typename
      ... on SmsSecondFactor {
        __typename
      }
      ... on Errors {
        __typename
        errors {
          message
          code
          data
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
    "type": "UpdateSmsSecondFactorInput!",
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
  "type": "SmsSecondFactor",
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
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "data",
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
    "name": "UpdateSmsSecondFactorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateSmsSecondFactor",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateSmsSecondFactorPayload",
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
    "name": "UpdateSmsSecondFactorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateSmsSecondFactor",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateSmsSecondFactorPayload",
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
    "name": "UpdateSmsSecondFactorMutation",
    "id": null,
    "text": "mutation UpdateSmsSecondFactorMutation(\n  $input: UpdateSmsSecondFactorInput!\n) {\n  updateSmsSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on SmsSecondFactor {\n        __typename\n      }\n      ... on Errors {\n        __typename\n        errors {\n          message\n          code\n          data\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'b80fa9c087543c25564b1ede065855ca';
export default node;
