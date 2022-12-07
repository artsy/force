/**
 * @generated SignedSource<<7ce3a3ad89bb6deb5d693ffbe298ab53>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileFields_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileHeaderAvatar_me">;
  readonly " $fragmentType": "SettingsEditProfileFields_me";
};
export type SettingsEditProfileFields_me$key = {
  readonly " $data"?: SettingsEditProfileFields_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileFields_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditProfileFields_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectorProfileHeaderAvatar_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "baac3d86dad577bb0b23c17d42119fde";

export default node;
