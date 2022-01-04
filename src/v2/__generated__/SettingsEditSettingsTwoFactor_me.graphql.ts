/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsTwoFactor_me = {
    readonly hasSecondFactorEnabled: boolean;
    readonly " $fragmentRefs": FragmentRefs<"AppSecondFactor_me" | "SmsSecondFactor_me" | "SettingsEditSettingsTwoFactorBackupCodes_me">;
    readonly " $refType": "SettingsEditSettingsTwoFactor_me";
};
export type SettingsEditSettingsTwoFactor_me$data = SettingsEditSettingsTwoFactor_me;
export type SettingsEditSettingsTwoFactor_me$key = {
    readonly " $data"?: SettingsEditSettingsTwoFactor_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsTwoFactor_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditSettingsTwoFactor_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasSecondFactorEnabled",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AppSecondFactor_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SmsSecondFactor_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditSettingsTwoFactorBackupCodes_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '7176ddcf512b6018b12a55a8ad4cedd1';
export default node;
