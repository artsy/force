/**
 * @generated SignedSource<<ba53bd1a2a986649311331ec34da61b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileRoute_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileAboutYou_me" | "SettingsEditProfileArtistsYouCollect_me" | "SettingsEditProfileFields_me" | "SettingsEditSettingsInformation_me" | "SettingsEditSettingsLinkedAccounts_me" | "SettingsEditSettingsPassword_me" | "SettingsEditSettingsTwoFactor_me">;
  readonly " $fragmentType": "SettingsEditProfileRoute_me";
};
export type SettingsEditProfileRoute_me$key = {
  readonly " $data"?: SettingsEditProfileRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditProfileRoute_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditProfileAboutYou_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditProfileArtistsYouCollect_me"
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditProfileFields_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "e4b24a260ad71b2f5280ecbab9bceb7f";

export default node;
