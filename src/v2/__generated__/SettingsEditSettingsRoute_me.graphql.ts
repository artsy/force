/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsRoute_me = {
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsInformation_me" | "SettingsEditSettingsPassword_me" | "SettingsEditSettingsTwoFactor_me" | "SettingsEditSettingsEmailPreferences_me" | "SettingsEditSettingsLinkedAccounts_me">;
    readonly " $refType": "SettingsEditSettingsRoute_me";
};
export type SettingsEditSettingsRoute_me$data = SettingsEditSettingsRoute_me;
export type SettingsEditSettingsRoute_me$key = {
    readonly " $data"?: SettingsEditSettingsRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditSettingsRoute_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditSettingsInformation_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditSettingsPassword_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditSettingsTwoFactor_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditSettingsEmailPreferences_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditSettingsLinkedAccounts_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'c49b3def6cc8f6d68da449ed6eb41c02';
export default node;
