/**
 * @generated SignedSource<<4f8f0deacfb570f74589357ad459c48f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsSavesRoute_me$data = {
  readonly name: string | null;
  readonly " $fragmentType": "SettingsSavesRoute_me";
};
export type SettingsSavesRoute_me$key = {
  readonly " $data"?: SettingsSavesRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsSavesRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsSavesRoute_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "1982b79a39acf2359161c14affbb6914";

export default node;
