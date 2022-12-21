/**
 * @generated SignedSource<<5771534d71139b6b1a439b3376424b18>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileImage_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileHeaderAvatar_me">;
  readonly " $fragmentType": "SettingsEditProfileImage_me";
};
export type SettingsEditProfileImage_me$key = {
  readonly " $data"?: SettingsEditProfileImage_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileImage_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditProfileImage_me",
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

(node as any).hash = "ed1171f875babf22bca2f49e327b34ed";

export default node;
