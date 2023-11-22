/**
 * @generated SignedSource<<d60d0423140fcd95017c51b182308c7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsTwoFactorBackupCodesDialog_me$data = {
  readonly backupSecondFactors: ReadonlyArray<{
    readonly code?: string;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "SettingsEditSettingsTwoFactorBackupCodesDialog_me";
};
export type SettingsEditSettingsTwoFactorBackupCodesDialog_me$key = {
  readonly " $data"?: SettingsEditSettingsTwoFactorBackupCodesDialog_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditSettingsTwoFactorBackupCodesDialog_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditSettingsTwoFactorBackupCodesDialog_me",
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
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "8dec593e291c27aed0dc5db187bac60e";

export default node;
