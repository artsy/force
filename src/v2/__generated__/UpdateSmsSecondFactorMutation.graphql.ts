/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type UpdateSmsSecondFactorInput = {
    attributes: SmsSecondFactorAttributes;
    clientMutationId?: string | null;
    secondFactorID: string;
};
export type SmsSecondFactorAttributes = {
    countryCode?: string | null;
    phoneNumber?: string | null;
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "UpdateSmsSecondFactorInput!"
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
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/)
  ],
  "type": "SmsSecondFactor"
},
v4 = {
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "data",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Errors"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateSmsSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateSmsSecondFactorPayload",
        "kind": "LinkedField",
        "name": "updateSmsSecondFactor",
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
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
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
    "name": "UpdateSmsSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateSmsSecondFactorPayload",
        "kind": "LinkedField",
        "name": "updateSmsSecondFactor",
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
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "UpdateSmsSecondFactorMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateSmsSecondFactorMutation(\n  $input: UpdateSmsSecondFactorInput!\n) {\n  updateSmsSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on SmsSecondFactor {\n        __typename\n      }\n      ... on Errors {\n        __typename\n        errors {\n          message\n          code\n          data\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b80fa9c087543c25564b1ede065855ca';
export default node;
