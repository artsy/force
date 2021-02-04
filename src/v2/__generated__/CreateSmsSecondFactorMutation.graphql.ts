/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateSmsSecondFactorInput = {
    attributes: SmsSecondFactorAttributes;
    clientMutationId?: string | null;
    password: string;
};
export type SmsSecondFactorAttributes = {
    countryCode?: string | null;
    phoneNumber?: string | null;
};
export type CreateSmsSecondFactorMutationVariables = {
    input: CreateSmsSecondFactorInput;
};
export type CreateSmsSecondFactorMutationResponse = {
    readonly createSmsSecondFactor: {
        readonly secondFactorOrErrors: {
            readonly __typename: "SmsSecondFactor";
            readonly internalID: string;
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
export type CreateSmsSecondFactorMutationRawResponse = {
    readonly createSmsSecondFactor: ({
        readonly secondFactorOrErrors: {
            readonly __typename: "SmsSecondFactor";
            readonly internalID: string;
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
export type CreateSmsSecondFactorMutation = {
    readonly response: CreateSmsSecondFactorMutationResponse;
    readonly variables: CreateSmsSecondFactorMutationVariables;
    readonly rawResponse: CreateSmsSecondFactorMutationRawResponse;
};



/*
mutation CreateSmsSecondFactorMutation(
  $input: CreateSmsSecondFactorInput!
) {
  createSmsSecondFactor(input: $input) {
    secondFactorOrErrors {
      __typename
      ... on SmsSecondFactor {
        __typename
        internalID
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
    "name": "input",
    "type": "CreateSmsSecondFactorInput!"
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
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
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
    "name": "CreateSmsSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateSmsSecondFactorPayload",
        "kind": "LinkedField",
        "name": "createSmsSecondFactor",
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
    "name": "CreateSmsSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateSmsSecondFactorPayload",
        "kind": "LinkedField",
        "name": "createSmsSecondFactor",
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
    "name": "CreateSmsSecondFactorMutation",
    "operationKind": "mutation",
    "text": "mutation CreateSmsSecondFactorMutation(\n  $input: CreateSmsSecondFactorInput!\n) {\n  createSmsSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on SmsSecondFactor {\n        __typename\n        internalID\n      }\n      ... on Errors {\n        __typename\n        errors {\n          message\n          code\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2ecc9fd98f69d9f9197cdd78f399016f';
export default node;
