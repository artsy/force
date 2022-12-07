/**
 * @generated SignedSource<<1da68bc5faf93f0603a777b7edd3a75a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileRoute_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileAboutYou_me" | "SettingsEditProfileArtistsYouCollect_me" | "SettingsEditSettingsInformation_me" | "SettingsEditSettingsLinkedAccounts_me" | "SettingsEditSettingsPassword_me" | "SettingsEditSettingsTwoFactor_me">;
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
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "4f410b2a037c247d551a4b381e7b333f";

export default node;
