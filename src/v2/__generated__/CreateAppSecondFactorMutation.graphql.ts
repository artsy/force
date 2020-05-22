/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateAppSecondFactorInput = {
    readonly attributes: AppSecondFactorAttributes;
    readonly clientMutationId?: string | null;
};
export type AppSecondFactorAttributes = {
    readonly name?: string | null;
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
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateAppSecondFactorInput!",
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
    (v2/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "otpSecret",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "otpProvisioningURI",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    }
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
    "name": "CreateAppSecondFactorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createAppSecondFactor",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateAppSecondFactorPayload",
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
    "name": "CreateAppSecondFactorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createAppSecondFactor",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateAppSecondFactorPayload",
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
    "name": "CreateAppSecondFactorMutation",
    "id": null,
    "text": "mutation CreateAppSecondFactorMutation(\n  $input: CreateAppSecondFactorInput!\n) {\n  createAppSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on AppSecondFactor {\n        __typename\n        internalID\n        otpSecret\n        otpProvisioningURI\n        name\n      }\n      ... on Errors {\n        __typename\n        errors {\n          message\n          code\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '6c55f2fcf9ffd17825721a9443d0cb4d';
export default node;
