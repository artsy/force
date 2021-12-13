/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsTwoFactorBackupCodesDialog_me = {
    readonly backupSecondFactors: ReadonlyArray<{
        readonly code?: string;
    } | null> | null;
    readonly " $refType": "SettingsEditSettingsTwoFactorBackupCodesDialog_me";
};
export type SettingsEditSettingsTwoFactorBackupCodesDialog_me$data = SettingsEditSettingsTwoFactorBackupCodesDialog_me;
export type SettingsEditSettingsTwoFactorBackupCodesDialog_me$key = {
    readonly " $data"?: SettingsEditSettingsTwoFactorBackupCodesDialog_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsTwoFactorBackupCodesDialog_me">;
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
          "type": "BackupSecondFactor"
        }
      ],
      "storageKey": "secondFactors(kinds:[\"backup\"])"
    }
  ],
  "type": "Me"
};
(node as any).hash = '8dec593e291c27aed0dc5db187bac60e';
export default node;
