/**
 * @generated SignedSource<<2294686851c8cf707b94edcf2a9814fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileRoute_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileAboutYou_me" | "SettingsEditProfileArtistsYouCollect_me" | "SettingsEditProfileFields_me">;
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
      "name": "SettingsEditProfileFields_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "8cf5af564f5a80830b49917f2629f14e";

export default node;
