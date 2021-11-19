/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsTwoFactor_me = {
    readonly hasSecondFactorEnabled: boolean;
    readonly " $fragmentRefs": FragmentRefs<"AppSecondFactor_me" | "SmsSecondFactor_me" | "BackupSecondFactor_me">;
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
      "name": "BackupSecondFactor_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = 'd918c88835cf5bb886d68ee1d80fcec1';
export default node;
