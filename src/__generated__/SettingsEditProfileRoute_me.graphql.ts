/**
 * @generated SignedSource<<4945e131ceacffc8279e20ed9c2cee78>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileRoute_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileAboutYou_me" | "SettingsEditProfileArtistsYouCollect_me">;
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
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "26d0fff4b261bc91bb804dfbdfcdfbb4";

export default node;
