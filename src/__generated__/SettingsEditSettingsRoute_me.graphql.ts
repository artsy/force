/**
 * @generated SignedSource<<0530ac279960bd06421d525130291837>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsRoute_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileFields_me" | "SettingsEditSettingsInformation_me" | "SettingsEditSettingsLinkedAccounts_me" | "SettingsEditSettingsPassword_me" | "SettingsEditSettingsTwoFactor_me">;
  readonly " $fragmentType": "SettingsEditSettingsRoute_me";
};
export type SettingsEditSettingsRoute_me$key = {
  readonly " $data"?: SettingsEditSettingsRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditSettingsRoute_me">;
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
      "name": "SettingsEditProfileFields_me"
    },
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
      "name": "SettingsEditSettingsLinkedAccounts_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "49716742115249e8f37f6b61527828b3";

export default node;
