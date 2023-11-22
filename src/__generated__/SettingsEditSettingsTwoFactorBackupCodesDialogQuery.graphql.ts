/**
 * @generated SignedSource<<17c901f8ef8525672c9edfcdd224e228>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsTwoFactorBackupCodesDialogQuery$variables = Record<PropertyKey, never>;
export type SettingsEditSettingsTwoFactorBackupCodesDialogQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsEditSettingsTwoFactorBackupCodesDialog_me">;
  } | null | undefined;
};
export type SettingsEditSettingsTwoFactorBackupCodesDialogQuery = {
  response: SettingsEditSettingsTwoFactorBackupCodesDialogQuery$data;
  variables: SettingsEditSettingsTwoFactorBackupCodesDialogQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsEditSettingsTwoFactorBackupCodesDialogQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SettingsEditSettingsTwoFactorBackupCodesDialog_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SettingsEditSettingsTwoFactorBackupCodesDialogQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": "backupSecondFactors",
            "args": [
              {
                "kind": "Literal",
                "name": "kinds",
                "value": [
                  "backup"
                ]
              }
            ],
            "concreteType": null,
            "kind": "LinkedField",
            "name": "secondFactors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "code",
                    "storageKey": null
                  }
                ],
                "type": "BackupSecondFactor",
                "abstractKey": null
              }
            ],
            "storageKey": "secondFactors(kinds:[\"backup\"])"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7ea1e0571ad11d9a39628f1c3ecab821",
    "id": null,
    "metadata": {},
    "name": "SettingsEditSettingsTwoFactorBackupCodesDialogQuery",
    "operationKind": "query",
    "text": "query SettingsEditSettingsTwoFactorBackupCodesDialogQuery {\n  me {\n    ...SettingsEditSettingsTwoFactorBackupCodesDialog_me\n    id\n  }\n}\n\nfragment SettingsEditSettingsTwoFactorBackupCodesDialog_me on Me {\n  backupSecondFactors: secondFactors(kinds: [backup]) {\n    __typename\n    ... on BackupSecondFactor {\n      code\n    }\n  }\n}\n"
  }
};

(node as any).hash = "9c28e8c257e52c793e703fe70ca563b7";

export default node;
