/**
 * @generated SignedSource<<9a45e30e16e2285fe426f29750cc8405>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateBackupSecondFactorsInput = {
  clientMutationId?: string | null | undefined;
  password: string;
};
export type useCreateSettingsBackupSecondFactorsMutation$variables = {
  input: CreateBackupSecondFactorsInput;
};
export type useCreateSettingsBackupSecondFactorsMutation$data = {
  readonly createBackupSecondFactors: {
    readonly secondFactorsOrErrors: {
      readonly __typename: "BackupSecondFactors";
      readonly secondFactors: ReadonlyArray<{
        readonly code: string;
      }>;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
  } | null | undefined;
};
export type useCreateSettingsBackupSecondFactorsMutation = {
  response: useCreateSettingsBackupSecondFactorsMutation$data;
  variables: useCreateSettingsBackupSecondFactorsMutation$variables;
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
  "concreteType": "BackupSecondFactor",
  "kind": "LinkedField",
  "name": "secondFactors",
  "plural": true,
  "selections": [
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
    "name": "useCreateSettingsBackupSecondFactorsMutation",
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
                  (v3/*: any*/)
                ],
                "type": "BackupSecondFactors",
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
    "name": "useCreateSettingsBackupSecondFactorsMutation",
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
                  (v3/*: any*/)
                ],
                "type": "BackupSecondFactors",
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
    "cacheID": "4114903b103c095c825571daddc6f56b",
    "id": null,
    "metadata": {},
    "name": "useCreateSettingsBackupSecondFactorsMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateSettingsBackupSecondFactorsMutation(\n  $input: CreateBackupSecondFactorsInput!\n) {\n  createBackupSecondFactors(input: $input) {\n    secondFactorsOrErrors {\n      __typename\n      ... on BackupSecondFactors {\n        __typename\n        secondFactors {\n          code\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d4d45fbde2bbcb128e5225f9a06c4b8c";

export default node;
