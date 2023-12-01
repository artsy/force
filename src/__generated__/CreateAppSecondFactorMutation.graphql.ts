/**
 * @generated SignedSource<<1b10f8df473bbaa7c7f98b7df2cc0eeb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateAppSecondFactorInput = {
  attributes: AppSecondFactorAttributes;
  clientMutationId?: string | null | undefined;
  password: string;
};
export type AppSecondFactorAttributes = {
  name?: string | null | undefined;
};
export type CreateAppSecondFactorMutation$variables = {
  input: CreateAppSecondFactorInput;
};
export type CreateAppSecondFactorMutation$data = {
  readonly createAppSecondFactor: {
    readonly secondFactorOrErrors: {
      readonly __typename: "AppSecondFactor";
      readonly internalID: string;
      readonly name: string | null | undefined;
      readonly otpProvisioningURI: string | null | undefined;
      readonly otpSecret: string | null | undefined;
    } | {
      readonly __typename: "Errors";
      readonly errors: ReadonlyArray<{
        readonly code: string;
        readonly message: string;
      }>;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
  } | null | undefined;
};
export type CreateAppSecondFactorMutation$rawResponse = {
  readonly createAppSecondFactor: {
    readonly secondFactorOrErrors: {
      readonly __typename: "AppSecondFactor";
      readonly internalID: string;
      readonly name: string | null | undefined;
      readonly otpProvisioningURI: string | null | undefined;
      readonly otpSecret: string | null | undefined;
    } | {
      readonly __typename: "Errors";
      readonly errors: ReadonlyArray<{
        readonly code: string;
        readonly message: string;
      }>;
    } | {
      readonly __typename: string;
    };
  } | null | undefined;
};
export type CreateAppSecondFactorMutation = {
  rawResponse: CreateAppSecondFactorMutation$rawResponse;
  response: CreateAppSecondFactorMutation$data;
  variables: CreateAppSecondFactorMutation$variables;
};

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
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "otpSecret",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "otpProvisioningURI",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
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
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
                "type": "AppSecondFactor",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v7/*: any*/)
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
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
                "type": "AppSecondFactor",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v7/*: any*/)
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
    "cacheID": "1ec05b9437b8c677dac812951e7cbffa",
    "id": null,
    "metadata": {},
    "name": "CreateAppSecondFactorMutation",
    "operationKind": "mutation",
    "text": "mutation CreateAppSecondFactorMutation(\n  $input: CreateAppSecondFactorInput!\n) {\n  createAppSecondFactor(input: $input) {\n    secondFactorOrErrors {\n      __typename\n      ... on AppSecondFactor {\n        __typename\n        internalID\n        otpSecret\n        otpProvisioningURI\n        name\n      }\n      ... on Errors {\n        __typename\n        errors {\n          message\n          code\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6c55f2fcf9ffd17825721a9443d0cb4d";

export default node;
