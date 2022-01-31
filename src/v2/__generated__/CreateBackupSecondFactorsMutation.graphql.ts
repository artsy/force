/**
 * @generated SignedSource<<0a72b0100c8a43f8631f901cbad319b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateBackupSecondFactorsInput = {
  clientMutationId?: string | null;
  password?: string | null;
};
export type CreateBackupSecondFactorsMutation$variables = {
  input: CreateBackupSecondFactorsInput;
};
export type CreateBackupSecondFactorsMutation$data = {
  readonly createBackupSecondFactors: {
    readonly secondFactorsOrErrors: {
      readonly __typename: "BackupSecondFactors";
      readonly secondFactors: ReadonlyArray<{
        readonly code: string;
      }>;
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
  } | null;
};
export type CreateBackupSecondFactorsMutation = {
  variables: CreateBackupSecondFactorsMutation$variables;
  response: CreateBackupSecondFactorsMutation$data;
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
  "name": "code",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "BackupSecondFactor",
  "kind": "LinkedField",
  "name": "secondFactors",
  "plural": true,
  "selections": [
    (v3/*: any*/)
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Error",
  "kind": "LinkedField",
  "name": "errors",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
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
    "name": "CreateBackupSecondFactorsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBackupSecondFactorsPayload",
        "kind": "LinkedField",
        "name": "createBackupSecondFactors",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "secondFactorsOrErrors",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/)
                ],
                "type": "BackupSecondFactors",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v5/*: any*/)
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
    "name": "CreateBackupSecondFactorsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBackupSecondFactorsPayload",
        "kind": "LinkedField",
        "name": "createBackupSecondFactors",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "secondFactorsOrErrors",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/)
                ],
                "type": "BackupSecondFactors",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v5/*: any*/)
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
    "cacheID": "3dac7c0aea63ee923203d821af1d1443",
    "id": null,
    "metadata": {},
    "name": "CreateBackupSecondFactorsMutation",
    "operationKind": "mutation",
    "text": "mutation CreateBackupSecondFactorsMutation(\n  $input: CreateBackupSecondFactorsInput!\n) {\n  createBackupSecondFactors(input: $input) {\n    secondFactorsOrErrors {\n      __typename\n      ... on BackupSecondFactors {\n        __typename\n        secondFactors {\n          code\n        }\n      }\n      ... on Errors {\n        __typename\n        errors {\n          code\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bcf355b344cd120155860af9215df977";

export default node;
