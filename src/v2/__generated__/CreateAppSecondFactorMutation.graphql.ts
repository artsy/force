/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateAppSecondFactorInput = {
    attributes: AppSecondFactorAttributes;
    clientMutationId?: string | null;
    password: string;
};
export type AppSecondFactorAttributes = {
    name?: string | null;
};
export type CreateAppSecondFactorMutationVariables = {
    input: CreateAppSecondFactorInput;
};
export type CreateAppSecondFactorMutationResponse = {
    readonly createAppSecondFactor: {
        readonly secondFactorOrErrors: {
            readonly __typename: "AppSecondFactor";
            readonly internalID: string;
            readonly otpSecret: string | null;
            readonly otpProvisioningURI: string | null;
            readonly name: string | null;
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
export type CreateAppSecondFactorMutationRawResponse = {
    readonly createAppSecondFactor: ({
        readonly secondFactorOrErrors: {
            readonly __typename: "AppSecondFactor";
            readonly internalID: string;
            readonly otpSecret: string | null;
            readonly otpProvisioningURI: string | null;
            readonly name: string | null;
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
export type CreateAppSecondFactorMutation = {
    readonly response: CreateAppSecondFactorMutationResponse;
    readonly variables: CreateAppSecondFactorMutationVariables;
    readonly rawResponse: CreateAppSecondFactorMutationRawResponse;
};



/*
mutation CreateAppSecondFactorMutation(
  $input: CreateAppSecondFactorInput!
) {
  createAppSecondFactor(input: $input) {
    secondFactorOrErrors {
      __typename
      ... on AppSecondFactor {
        __typename
        internalID
        otpSecret
        otpProvisioningURI
        name
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
    "type": "CreateAppSecondFactorInput!"
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "otpSecret",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "otpProvisioningURI",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "AppSecondFactor"
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
    "name": "CreateAppSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateAppSecondFactorPayload",
        "kind": "LinkedField",
        "name": "createAppSecondFactor",
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
    "name": "CreateAppSecondFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateAppSecondFactorPayload",
        "kind": "LinkedField",
        "name": "createAppSecondFactor",
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
    "name": "CreateAppSecondFactorMutation",
    "operationKind": "mutation",
    "text": "mutation CreateAppSecondFactorMutation(\n  $input: CreateAppSecondFactorInput!\n) {\n  createAppSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on AppSecondFactor {\n        __typename\n        internalID\n        otpSecret\n        otpProvisioningURI\n        name\n      }\n      ... on Errors {\n        __typename\n        errors {\n          message\n          code\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6c55f2fcf9ffd17825721a9443d0cb4d';
export default node;
